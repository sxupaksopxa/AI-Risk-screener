import rulesConfig from "../data/rules.json" with { type: "json" };

export function evaluateAssessment(answers = {}) {
  try {
    const rules = rulesConfig.rules || [];
    const maturityDomains = rulesConfig.scoring_model?.maturity_domains || [];

    const result = createInitialResult(maturityDomains);

    const answerRules = rules.filter((rule) => rule && !usesComputedCondition(rule));
    const computedRules = rules.filter((rule) => rule && usesComputedCondition(rule));

    for (const rule of answerRules) {
      if (matchesRule(rule.if, answers, result)) {
        applyThen(rule, result);
      }
    }

    for (const rule of computedRules) {
      if (matchesRule(rule.if, answers, result)) {
        applyThen(rule, result);
      }
    }

    finalizeResult(result);
    return result;
  } catch (error) {
    console.error("Failed to evaluate assessment:", error);
    return createInitialResult(
      rulesConfig.scoring_model?.maturity_domains || []
    );
  }
}

function createInitialResult(maturityDomains) {
  const maturityScores = {};

  for (const domain of maturityDomains) {
    maturityScores[domain] = 50;
  }

  maturityScores.overall = 50;

  return {
    regulatoryPaths: [],
    priority: "priority.lower_risk",
    priorityScore: 1,
    flags: [],
    cflags: [],    
    notes: [],
    recommendations: [],
    riskPointsTotal: 0,
    maturityScores,
    matchedRules: [],
    summary: ""
  };
}

function usesComputedCondition(rule) {
  const conditions = collectConditions(rule?.if);
  return conditions.some((condition) => Boolean(condition.computed));
}

function collectConditions(ifBlock) {
  if (!ifBlock) return [];

  const all = Array.isArray(ifBlock.all) ? ifBlock.all : [];
  const any = Array.isArray(ifBlock.any) ? ifBlock.any : [];

  return [...all, ...any];
}

function matchesRule(ifBlock, answers, result) {
  if (!ifBlock) return false;

  if (Array.isArray(ifBlock.all) && ifBlock.all.length > 0) {
    const allMatched = ifBlock.all.every((condition) =>
      evaluateCondition(condition, answers, result)
    );
    if (!allMatched) return false;
  }

  if (Array.isArray(ifBlock.any) && ifBlock.any.length > 0) {
    const anyMatched = ifBlock.any.some((condition) =>
      evaluateCondition(condition, answers, result)
    );
    if (!anyMatched) return false;
  }

  // direct single condition support
  if (ifBlock.field) {
    return evaluateCondition(ifBlock, answers, result);
  }

  return true;
}

function evaluateCondition(condition, answers, result) {
  const value = getConditionValue(condition, answers, result);

  if ("equals" in condition) {
    return value === condition.equals;
  }

  if ("in" in condition) {
    return Array.isArray(condition.in) && condition.in.includes(value);
  }

  if ("contains_any" in condition) {
    if (!Array.isArray(value)) return false;
    return condition.contains_any.some((item) => value.includes(item));
  }

  if ("not_contains_any" in condition) {
    if (!Array.isArray(value)) return false;
    return condition.not_contains_any.every((item) => !value.includes(item));
  }

  if ("gte" in condition) {
    return Number(value) >= Number(condition.gte);
  }

  if ("gt" in condition) {
    return Number(value) > Number(condition.gt);
  }

  if ("lte" in condition) {
    return Number(value) <= Number(condition.lte);
  }

  if ("lt" in condition) {
    return Number(value) < Number(condition.lt);
  }

  return false;
}

function getConditionValue(condition, answers, result) {
  if (condition.computed) {
    switch (condition.computed) {
      case "risk_points_total":
        return result.riskPointsTotal;
      default:
        return undefined;
    }
  }

  if (condition.field) {
    return answers[condition.field];
  }

  return undefined;
}

function applyThen(rule, result) {
  const thenBlock = rule.then || {};

  if (thenBlock.add_flag) {
    pushUnique(result.flags, thenBlock.add_flag);
  }

  if (thenBlock.add_cflag) {
    pushUnique(result.cflags, thenBlock.add_cflag);
  }

  if (thenBlock.add_note) {
    pushUnique(result.notes, thenBlock.add_note);
  }

  if (thenBlock.set_regulatory_path) {
    result.regulatoryPaths = [thenBlock.set_regulatory_path];
  }

  if (thenBlock.add_regulatory_path) {
    pushUnique(result.regulatoryPaths, thenBlock.add_regulatory_path);
  }

  if (typeof thenBlock.risk_points === "number") {
    result.riskPointsTotal += thenBlock.risk_points;
  }

  if (thenBlock.maturity_adjustments) {
    applyMaturityAdjustments(
      result.maturityScores,
      thenBlock.maturity_adjustments
    );
  }

  if (Array.isArray(thenBlock.recommendations)) {
    for (const recommendation of thenBlock.recommendations) {
      pushUnique(result.recommendations, recommendation);
    }
  }

  if (thenBlock.set_priority) {
    result.priority = thenBlock.set_priority;
  }

  result.matchedRules.push({
    id: rule.id,
    name: rule.name,
    category: rule.category
  });

  console.log("Matched rule:", rule.id, rule.name, rule.then);
}

function applyMaturityAdjustments(maturityScores, adjustments) {
  for (const [domain, delta] of Object.entries(adjustments)) {
    if (typeof maturityScores[domain] !== "number") continue;
    maturityScores[domain] += delta;
  }
}

function finalizeResult(result) {
  if (!result?.maturityScores) return;

  for (const [domain, value] of Object.entries(result.maturityScores)) {
    if (domain === "overall") continue;
    result.maturityScores[domain] = clamp(value, 0, 100);
  }

  const domainEntries = Object.entries(result.maturityScores).filter(
    ([domain]) => domain !== "overall"
  );

  const total = domainEntries.reduce((sum, [, value]) => sum + value, 0);
  const average =
    domainEntries.length > 0 ? Math.round(total / domainEntries.length) : 0;

  result.maturityScores.overall = clamp(average, 0, 100);

  const hasScopeFlag = result.flags.includes("likely_ai_system");

  result.flags = uniqueArray(result.flags);
  result.notes = uniqueArray(result.notes);
  result.recommendations = uniqueArray(result.recommendations);
  result.regulatoryPaths = uniqueArray(result.regulatoryPaths);

  applyFinalRiskClassification(result);
}

function applyFinalRiskClassification(result) {
  const hasProhibitedFlag = result.flags.includes("potential_prohibited_practice");
  const hasProhibitedPath = result.regulatoryPaths.includes("possible_prohibited");

  const LIKELY_HIGH_RISK_SCORE_THRESHOLD = 40;
  const POSSIBLE_HIGH_RISK_SCORE_THRESHOLD = 25;

  if (hasProhibitedFlag || hasProhibitedPath) {
    result.priority = "priority.potentially_prohibited";
    result.priorityScore = 4;
    return;
  }

  if (result.riskPointsTotal >= LIKELY_HIGH_RISK_SCORE_THRESHOLD) {
    result.priority = "priority.likely_high_risk";
    result.priorityScore = 3;
    return;
  }

  if (result.riskPointsTotal >= POSSIBLE_HIGH_RISK_SCORE_THRESHOLD) {
    result.priority = "priority.possible_high_risk";
    result.priorityScore = 2;
    return;
  }

  result.priority = "priority.lower_risk";
  result.priorityScore = 1;
}

function pushUnique(array, value) {
  if (value == null || value === "") return;
  if (!array.includes(value)) {
    array.push(value);
  }
}

function uniqueArray(array) {
  return [...new Set(array)];
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}