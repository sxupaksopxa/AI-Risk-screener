import fs from "node:fs";
import path from "node:path";
import { evaluateAssessment } from "./rulesEngine.js";
import { testCases } from "../data/testCases.js";

function includesAll(actual = [], expected = []) {
  return expected.every((item) => actual.includes(item));
}

function includesNone(actual = [], blocked = []) {
  return blocked.every((item) => !actual.includes(item));
}

function checkTestCase(testCase) {
  const actual = evaluateAssessment(testCase.answers);
  const expected = testCase.expected;

  const failures = [];

  if (expected.priority && actual.priority !== expected.priority) {
    failures.push(
      `priority mismatch: expected=${expected.priority}, actual=${actual.priority}`
    );
  }

  if (
    typeof expected.minScore === "number" &&
    actual.riskPointsTotal < expected.minScore
  ) {
    failures.push(
      `score below minimum: expected>=${expected.minScore}, actual=${actual.riskPointsTotal}`
    );
  }

  if (
    typeof expected.maxScore === "number" &&
    actual.riskPointsTotal > expected.maxScore
  ) {
    failures.push(
      `score above maximum: expected<=${expected.maxScore}, actual=${actual.riskPointsTotal}`
    );
  }

  if (
    Array.isArray(expected.mustIncludeFlags) &&
    !includesAll(actual.flags, expected.mustIncludeFlags)
  ) {
    const missing = expected.mustIncludeFlags.filter(
      (flag) => !actual.flags.includes(flag)
    );
    failures.push(`missing flags: ${missing.join(", ")}`);
  }

  if (
    Array.isArray(expected.mustExcludeFlags) &&
    !includesNone(actual.flags, expected.mustExcludeFlags)
  ) {
    const present = expected.mustExcludeFlags.filter((flag) =>
      actual.flags.includes(flag)
    );
    failures.push(`unexpected flags present: ${present.join(", ")}`);
  }

  return {
    id: testCase.id,
    name: testCase.name,
    pass: failures.length === 0,
    failures,
    actual: {
      priority: actual.priority,
      riskPointsTotal: actual.riskPointsTotal,
      flags: actual.flags,
      maturityScores: actual.maturityScores,
      matchedRules: actual.matchedRules.map((r) => r.id)
    }
  };
}

export function runTests() {
  const results = testCases.map(checkTestCase);

  const passed = results.filter((r) => r.pass).length;
  const failed = results.length - passed;

  const lines = [];
  lines.push("AI Risk Screener Test Report");
  lines.push(`Total: ${results.length}`);
  lines.push(`Passed: ${passed}`);
  lines.push(`Failed: ${failed}`);
  lines.push("");

  for (const result of results) {
    lines.push(`${result.pass ? "PASS" : "FAIL"} ${result.id} - ${result.name}`);

    if (!result.pass) {
      for (const failure of result.failures) {
        lines.push(`  - ${failure}`);
      }

      lines.push(`  actual.priority: ${result.actual.priority}`);
      lines.push(`  actual.riskPointsTotal: ${result.actual.riskPointsTotal}`);
      lines.push(`  actual.flags: ${result.actual.flags.join(", ")}`);
      lines.push(`  matchedRules: ${result.actual.matchedRules.join(", ")}`);
    }

    lines.push("");
  }

  const report = lines.join("\n");
  const outputPath = path.resolve("test-report.txt");
  fs.writeFileSync(outputPath, report, "utf8");

  return { results, passed, failed, outputPath };
}