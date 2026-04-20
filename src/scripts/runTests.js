import { runTests } from "../engine/testsEngine.js";

const { passed, failed, outputPath } = runTests();

console.log(`Tests passed: ${passed}`);
console.log(`Tests failed: ${failed}`);
console.log(`Report written to: ${outputPath}`);