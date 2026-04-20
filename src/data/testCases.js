export const testCases = [
  {
    id: "TC-001",
    name: "General commercial informational AI",
    answers: {
      Q01: "general_commercial",
      Q08: "likely_yes",
      Q10: "no",
      Q16: "info",
      Q30: ["none_yet"]
    },
    expected: {
      priority: "priority.lower_risk",
      minScore: 0,
      maxScore: 24,
      mustIncludeFlags: [
        "general_commercial_context",
        "likely_ai_system",
        "informational_use",
        "evidence_pack_missing"
      ],
      mustExcludeFlags: [
        "material_impact_on_people",
        "human_impact_decision",
        "limited_human_oversight",
        "no_human_oversight_defined"
      ]
    }
  },
  {
    id: "TC-002",
    name: "Financial services decision support with approval",
    answers: {
      Q01: "financial_services",
      Q08: "likely_yes",
      Q10: "yes",
      Q16: "decision_support",
      Q21: "review_approval",
      Q30: ["none_yet"]
    },
    expected: {
      priority: "priority.possible_high_risk",
      minScore: 25,
      maxScore: 39,
      mustIncludeFlags: [
        "financial_services_context",
        "likely_ai_system",
        "material_impact_on_people",
        "human_in_the_loop",
        "strong_human_oversight",
        "evidence_pack_missing"
      ],
      mustExcludeFlags: [
        "eu_jurisdiction",
        "limited_human_oversight",
        "no_human_oversight_defined"
      ]
    }
  },
  {
    id: "TC-003",
    name: "Healthcare people decision with approval",
    answers: {
      Q01: "healthcare",
      Q08: "likely_yes",
      Q10: "yes",
      Q16: "people_decision",
      Q21: "review_approval",
      Q30: ["none_yet"]
    },
    expected: {
      priority: "priority.likely_high_risk",
      minScore: 40,
      maxScore: 79,
      mustIncludeFlags: [
        "high_risk_domain_indicator",
        "likely_ai_system",
        "material_impact_on_people",
        "human_impact_decision",
        "strong_human_oversight",
        "evidence_pack_missing"
      ]
    }
  },
  {
    id: "TC-004",
    name: "Employment HR people decision with limited oversight",
    answers: {
      Q01: "employment_hr",
      Q08: "likely_yes",
      Q10: "yes",
      Q16: "people_decision",
      Q21: "limited_oversight",
      Q30: ["none_yet"]
    },
    expected: {
      priority: "priority.likely_high_risk",
      minScore: 40,
      maxScore: 79,
      mustIncludeFlags: [
        "high_risk_domain_indicator",
        "likely_ai_system",
        "material_impact_on_people",
        "human_impact_decision",
        "limited_human_oversight",
        "evidence_pack_missing"
      ]
    }
  },
  {
    id: "TC-005",
    name: "Public sector people decision with no oversight defined",
    answers: {
      Q01: "public_sector",
      Q08: "likely_yes",
      Q10: "yes",
      Q16: "people_decision",
      Q21: "not_yet_defined",
      Q30: ["none_yet"]
    },
    expected: {
      priority: "priority.likely_high_risk",
      minScore: 40,
      maxScore: 79,
      mustIncludeFlags: [
        "high_risk_domain_indicator",
        "likely_ai_system",
        "material_impact_on_people",
        "human_impact_decision",
        "no_human_oversight_defined",
        "evidence_pack_missing"
      ]
    }
  },
  {
    id: "TC-006",
    name: "Critical infrastructure automated action with limited oversight",
    answers: {
      Q01: "critical_infra",
      Q08: "likely_yes",
      Q10: "yes",
      Q16: "trigger_auto",
      Q21: "limited_oversight",
      Q30: ["risk_assessment"]
    },
    expected: {
      priority: "priority.likely_high_risk",
      minScore: 40,
      maxScore: 79,
      mustIncludeFlags: [
        "high_risk_domain_indicator",
        "likely_ai_system",
        "material_impact_on_people",
        "automated_decision_making",
        "limited_human_oversight"
      ]
    }
  },
  {
    id: "TC-007",
    name: "Education decision support with review cases",
    answers: {
      Q01: "education",
      Q08: "likely_yes",
      Q10: "possible",
      Q16: "decision_support",
      Q21: "review_cases",
      Q30: ["none_yet"]
    },
    expected: {
      priority: "priority.lower_risk",
      minScore: 0,
      maxScore: 24,
      mustIncludeFlags: [
        "education_context",
        "likely_ai_system",
        "potential_impact_on_people",
        "human_in_the_loop",
        "evidence_pack_missing"
      ]
    }
  },
  {
    id: "TC-008",
    name: "General commercial possible AI scope",
    answers: {
      Q01: "general_commercial",
      Q08: "possible",
      Q10: "no",
      Q16: "info",
      Q30: ["none_yet"]
    },
    expected: {
      priority: "priority.lower_risk",
      minScore: 0,
      maxScore: 24,
      mustIncludeFlags: [
        "general_commercial_context",
        "scope_unclear",
        "informational_use",
        "evidence_pack_missing"
      ]
    }
  },
  {
    id: "TC-009",
    name: "Law and justice people decision with no oversight",
    answers: {
      Q01: "law_justice",
      Q08: "likely_yes",
      Q10: "yes",
      Q16: "people_decision",
      Q21: "not_yet_defined",
      Q30: ["none_yet"]
    },
    expected: {
      priority: "priority.likely_high_risk",
      minScore: 40,
      maxScore: 79,
      mustIncludeFlags: [
        "high_risk_domain_indicator",
        "likely_ai_system",
        "material_impact_on_people",
        "human_impact_decision",
        "no_human_oversight_defined",
        "evidence_pack_missing"
      ]
    }
  },
  {
    id: "TC-010",
    name: "Insurance decision support with approval",
    answers: {
      Q01: "insurance",
      Q08: "likely_yes",
      Q10: "yes",
      Q16: "decision_support",
      Q21: "review_approval",
      Q30: ["none_yet"]
    },
    expected: {
      priority: "priority.lower_risk",
      minScore: 0,
      maxScore: 24,
      mustIncludeFlags: [
        "insurance_context",
        "likely_ai_system",
        "material_impact_on_people",
        "human_in_the_loop",
        "strong_human_oversight",
        "evidence_pack_missing"
      ]
    }
  },
    {
    id: "TC-011",
    name: "Insurance people decision with limited oversight",
    answers: {
      Q01: "insurance",
      Q08: "likely_yes",
      Q10: "yes",
      Q16: "people_decision",
      Q21: "limited_oversight",
      Q30: ["none_yet"]
    },
    expected: {
      priority: "priority.likely_high_risk",
      minScore: 40,
      maxScore: 79,
      mustIncludeFlags: [
        "insurance_context",
        "likely_ai_system",
        "material_impact_on_people",
        "human_impact_decision",
        "limited_human_oversight",
        "evidence_pack_missing"
      ]
    }
  },
  {
    id: "TC-012",
    name: "Education people decision with strong approval",
    answers: {
      Q01: "education",
      Q08: "likely_yes",
      Q10: "yes",
      Q16: "people_decision",
      Q21: "review_approval",
      Q30: ["oversight_procedure"]
    },
    expected: {
      priority: "priority.lower_risk",
      minScore: 15,
      maxScore: 24,
      mustIncludeFlags: [
        "education_context",
        "likely_ai_system",
        "material_impact_on_people",
        "human_impact_decision",
        "strong_human_oversight",
        "oversight_procedure_defined"
      ]
    }
  },
  {
    id: "TC-013",
    name: "General commercial automated action with limited oversight",
    answers: {
      Q01: "general_commercial",
      Q08: "likely_yes",
      Q10: "yes",
      Q16: "trigger_auto",
      Q21: "limited_oversight",
      Q30: ["none_yet"]
    },
    expected: {
      priority: "priority.likely_high_risk",
      minScore: 40,
      maxScore: 79,
      mustIncludeFlags: [
        "general_commercial_context",
        "likely_ai_system",
        "material_impact_on_people",
        "automated_decision_making",
        "limited_human_oversight",
        "evidence_pack_missing"
      ]
    }
  },
  {
    id: "TC-014",
    name: "Other sector automated action without oversight",
    answers: {
      Q01: "other",
      Q08: "likely_yes",
      Q10: "yes",
      Q16: "trigger_auto",
      Q21: "not_yet_defined",
      Q30: ["none_yet"]
    },
    expected: {
      priority: "priority.likely_high_risk",
      minScore: 40,
      maxScore: 79,
      mustIncludeFlags: [
        "other_sector_context",
        "likely_ai_system",
        "material_impact_on_people",
        "automated_decision_making",
        "no_human_oversight_defined",
        "evidence_pack_missing"
      ]
    }
  },
  {
    id: "TC-015",
    name: "Financial services people decision with no oversight defined",
    answers: {
      Q01: "financial_services",
      Q08: "likely_yes",
      Q10: "yes",
      Q16: "people_decision",
      Q21: "not_yet_defined",
      Q30: ["testing_records"]
    },
    expected: {
      priority: "priority.likely_high_risk",
      minScore: 40,
      maxScore: 79,
      mustIncludeFlags: [
        "financial_services_context",
        "likely_ai_system",
        "material_impact_on_people",
        "human_impact_decision",
        "no_human_oversight_defined",
        "testing_records_available"
      ]
    }
  },
  {
    id: "TC-016",
    name: "Employment HR decision support with review cases",
    answers: {
      Q01: "employment_hr",
      Q08: "likely_yes",
      Q10: "yes",
      Q16: "decision_support",
      Q21: "review_cases",
      Q30: ["none_yet"]
    },
    expected: {
      priority: "priority.possible_high_risk",
      minScore: 25,
      maxScore: 39,
      mustIncludeFlags: [
        "high_risk_domain_indicator",
        "likely_ai_system",
        "material_impact_on_people",
        "human_in_the_loop",
        "evidence_pack_missing"
      ],
      mustExcludeFlags: [
        "limited_human_oversight",
        "no_human_oversight_defined"
      ]
    }
  },
  {
    id: "TC-017",
    name: "Public sector informational AI with no impact",
    answers: {
      Q01: "public_sector",
      Q08: "likely_yes",
      Q10: "no",
      Q16: "info",
      Q30: ["none_yet"]
    },
    expected: {
      priority: "priority.lower_risk",
      minScore: 0,
      maxScore: 24,
      mustIncludeFlags: [
        "high_risk_domain_indicator",
        "likely_ai_system",
        "informational_use",
        "evidence_pack_missing"
      ],
      mustExcludeFlags: [
        "material_impact_on_people",
        "human_impact_decision",
        "automated_decision_making"
      ]
    }
  },
  {
    id: "TC-018",
    name: "Healthcare possible AI scope with people decision",
    answers: {
      Q01: "healthcare",
      Q08: "possible",
      Q10: "yes",
      Q16: "people_decision",
      Q21: "review_approval",
      Q30: ["monitoring_plan"]
    },
    expected: {
      priority: "priority.possible_high_risk",
      minScore: 25,
      maxScore: 39,
      mustIncludeFlags: [
        "high_risk_domain_indicator",
        "scope_unclear",
        "material_impact_on_people",
        "human_impact_decision",
        "strong_human_oversight",
        "monitoring_plan_defined"
      ]
    }
  },
  {
    id: "TC-019",
    name: "Critical infrastructure decision support with approval",
    answers: {
      Q01: "critical_infra",
      Q08: "likely_yes",
      Q10: "yes",
      Q16: "decision_support",
      Q21: "review_approval",
      Q30: ["none_yet"]
    },
    expected: {
      priority: "priority.possible_high_risk",
      minScore: 25,
      maxScore: 39,
      mustIncludeFlags: [
        "high_risk_domain_indicator",
        "likely_ai_system",
        "material_impact_on_people",
        "human_in_the_loop",
        "strong_human_oversight",
        "evidence_pack_missing"
      ]
    }
  },
  {
    id: "TC-020",
    name: "Law and justice automated action with review cases",
    answers: {
      Q01: "law_justice",
      Q08: "likely_yes",
      Q10: "yes",
      Q16: "trigger_auto",
      Q21: "review_cases",
      Q30: ["use_case"]
    },
    expected: {
      priority: "priority.likely_high_risk",
      minScore: 40,
      maxScore: 79,
      mustIncludeFlags: [
        "high_risk_domain_indicator",
        "likely_ai_system",
        "material_impact_on_people",
        "automated_decision_making",
        "use_case_documented"
      ]
    }
  },
 {
    id: "TC-021",
    name: "General commercial possible impact with decision support",
    answers: {
      Q01: "general_commercial",
      Q08: "likely_yes",
      Q10: "possible",
      Q16: "decision_support",
      Q21: "review_approval",
      Q30: ["none_yet"]
    },
    expected: {
      priority: "priority.lower_risk",
      minScore: 0,
      maxScore: 24,
      mustIncludeFlags: [
        "general_commercial_context",
        "likely_ai_system",
        "potential_impact_on_people",
        "human_in_the_loop",
        "strong_human_oversight",
        "evidence_pack_missing"
      ]
    }
  },
  {
    id: "TC-022",
    name: "Insurance no AI certainty",
    answers: {
      Q01: "insurance",
      Q08: "unsure",
      Q10: "possible",
      Q16: "decision_support",
      Q21: "review_cases",
      Q30: ["none_yet"]
    },
    expected: {
      priority: "priority.lower_risk",
      minScore: 0,
      maxScore: 24,
      mustIncludeFlags: [
        "insurance_context",
        "scope_unclear",
        "potential_impact_on_people",
        "human_in_the_loop",
        "evidence_pack_missing"
      ]
    }
  },
  {
    id: "TC-023",
    name: "General commercial informational assistant with public data and evidence",
    answers: {
      Q01: "general_commercial",
      Q02: ["AT"],
      Q06: "internal",
      Q08: "likely_yes",
      Q10: "no",
      Q11: "no",
      Q13: ["public_data"],
      Q16: "info",
      Q30: ["use_case", "risk_assessment", "monitoring_plan"]
    },
    expected: {
      priority: "priority.lower_risk",
      minScore: 0,
      maxScore: 24,
      mustIncludeFlags: [
        "general_commercial_context",
        "eu_jurisdiction",
        "likely_ai_system",
        "informational_use"
      ],
      mustExcludeFlags: [
        "material_impact_on_people",
        "human_impact_decision",
        "automated_decision_making",
        "vulnerable_persons_in_scope",
        "sensitive_data_processing",
        "biometric_or_emotion_screening",
        "evidence_pack_missing"
      ]
    }
  },
  {
    id: "TC-024",
    name: "General commercial informational use with no data and no evidence",
    answers: {
      Q01: "general_commercial",
      Q02: ["AT"],
      Q06: "internal",
      Q08: "likely_yes",
      Q10: "no",
      Q11: "no",
      Q13: ["profiling_data"],
      Q16: "info",
      Q30: ["none_yet"]
    },
    expected: {
      priority: "priority.lower_risk",
      minScore: 0,
      maxScore: 24,
      mustIncludeFlags: [
        "general_commercial_context",
        "eu_jurisdiction",
        "likely_ai_system",
        "informational_use",
        "evidence_pack_missing"
      ]
    }
  },
  {
    id: "TC-025",
    name: "Education decision support affecting children with no evidence",
    answers: {
      Q01: "education",
      Q02: ["AT"],
      Q06: "employee_facing",
      Q08: "likely_yes",
      Q10: "yes",
      Q11: "yes",
      Q13: ["personal_data"],
      Q16: "decision_support",
      Q21: "review_cases",
      Q30: ["none_yet"]
    },
    expected: {
      priority: "priority.likely_high_risk",
      minScore: 40,
      maxScore: 79,
      mustIncludeFlags: [
        "education_context",
        "eu_jurisdiction",
        "likely_ai_system",
        "material_impact_on_people",
        "vulnerable_persons_in_scope",
        "human_in_the_loop",
        "evidence_pack_missing"
      ]
    }
  },
  {
    id: "TC-026",
    name: "Employment HR decision support with profiling data and partial evidence",
    answers: {
      Q01: "employment_hr",
      Q02: ["AT"],
      Q06: "employee_facing",
      Q08: "likely_yes",
      Q10: "yes",
      Q11: "no",
      Q13: ["profiling_data", "personal_data"],
      Q16: "decision_support",
      Q21: "review_approval",
      Q30: ["use_case", "oversight_procedure"]
    },
    expected: {
      priority: "priority.likely_high_risk",
      minScore: 40,
      maxScore: 79,
      mustIncludeFlags: [
        "high_risk_domain_indicator",
        "eu_jurisdiction",
        "likely_ai_system",
        "material_impact_on_people",
        "human_in_the_loop",
        "strong_human_oversight"
      ]
    }
  },
  {
    id: "TC-027",
    name: "Healthcare people decision with sensitive data and missing evidence",
    answers: {
      Q01: "healthcare",
      Q02: ["AT"],
      Q06: "customer_facing",
      Q08: "likely_yes",
      Q10: "yes",
      Q11: "possible",
      Q13: ["sensitive_data", "personal_data"],
      Q16: "people_decision",
      Q21: "limited_oversight",
      Q30: ["none_yet"]
    },
    expected: {
      priority: "priority.likely_high_risk",
      minScore: 40,
      maxScore: 79,
      mustIncludeFlags: [
        "high_risk_domain_indicator",
        "eu_jurisdiction",
        "external_exposure",
        "likely_ai_system",
        "material_impact_on_people",
        "potential_vulnerable_persons",
        "sensitive_data_processing",
        "human_impact_decision",
        "limited_human_oversight",
        "evidence_pack_missing"
      ]
    }
  },
  {
    id: "TC-028",
    name: "Critical infrastructure automated action with biometric data and no oversight",
    answers: {
      Q01: "critical_infra",
      Q02: ["AT"],
      Q06: "mixed",
      Q08: "likely_yes",
      Q10: "yes",
      Q11: "no",
      Q13: ["biometric_data"],
      Q16: "trigger_auto",
      Q21: "not_yet_defined",
      Q30: ["none_yet"]
    },
    expected: {
      priority: "priority.likely_high_risk",
      minScore: 40,
      maxScore: 79,
      mustIncludeFlags: [
        "high_risk_domain_indicator",
        "eu_jurisdiction",
        "external_exposure",
        "likely_ai_system",
        "material_impact_on_people",
        "biometric_or_emotion_screening",
        "automated_decision_making",
        "no_human_oversight_defined",
        "evidence_pack_missing"
      ]
    }
  },
  {
    id: "TC-029",
    name: "Public sector people decision with strong approval and good evidence",
    answers: {
      Q01: "public_sector",
      Q02: ["AT"],
      Q06: "employee_facing",
      Q08: "likely_yes",
      Q10: "yes",
      Q11: "no",
      Q13: ["personal_data"],
      Q16: "people_decision",
      Q21: "review_approval",
      Q30: ["use_case", "risk_assessment", "oversight_procedure", "monitoring_plan", "testing_records"]
    },
    expected: {
      priority: "priority.possible_high_risk",
      minScore: 25,
      maxScore: 39,
      mustIncludeFlags: [
        "high_risk_domain_indicator",
        "eu_jurisdiction",
        "likely_ai_system",
        "material_impact_on_people",
        "human_impact_decision",
        "strong_human_oversight"
      ]
    }
  },
  {
    id: "TC-030",
    name: "Law and justice decision support with strong evidence",
    answers: {
      Q01: "law_justice",
      Q02: ["AT"],
      Q06: "internal",
      Q08: "likely_yes",
      Q10: "yes",
      Q11: "no",
      Q13: ["confidential_data"],
      Q16: "decision_support",
      Q21: "review_approval",
      Q30: ["use_case", "risk_assessment", "oversight_procedure", "monitoring_plan"]
    },
    expected: {
      priority: "priority.possible_high_risk",
      minScore: 25,
      maxScore: 39,
      mustIncludeFlags: [
        "high_risk_domain_indicator",
        "eu_jurisdiction",
        "likely_ai_system",
        "material_impact_on_people",
        "human_in_the_loop",
        "strong_human_oversight"
      ]
    }
  },
  {
    id: "TC-031",
    name: "Insurance decision support with possible impact and public data",
    answers: {
      Q01: "insurance",
      Q02: ["AT"],
      Q06: "internal",
      Q08: "likely_yes",
      Q10: "possible",
      Q11: "no",
      Q13: ["public_data"],
      Q16: "decision_support",
      Q21: "review_approval",
      Q30: ["use_case"]
    },
    expected: {
      priority: "priority.lower_risk",
      minScore: 0,
      maxScore: 24,
      mustIncludeFlags: [
        "insurance_context",
        "eu_jurisdiction",
        "likely_ai_system",
        "potential_impact_on_people",
        "human_in_the_loop",
        "strong_human_oversight"
      ]
    }
  },
  {
    id: "TC-032",
    name: "Financial services automated action with sensitive data and review cases",
    answers: {
      Q01: "financial_services",
      Q02: ["AT"],
      Q06: "customer_facing",
      Q08: "likely_yes",
      Q10: "yes",
      Q11: "no",
      Q13: ["sensitive_data"],
      Q16: "trigger_auto",
      Q21: "review_cases",
      Q30: ["use_case", "risk_assessment"]
    },
    expected: {
      priority: "priority.likely_high_risk",
      minScore: 40,
      maxScore: 79,
      mustIncludeFlags: [
        "financial_services_context",
        "eu_jurisdiction",
        "external_exposure",
        "likely_ai_system",
        "material_impact_on_people",
        "sensitive_data_processing",
        "automated_decision_making"
      ]
    }
  },
  {
    id: "TC-033",
    name: "Other sector possible AI scope with no impact and personal data",
    answers: {
      Q01: "other",
      Q02: ["AT"],
      Q06: "internal",
      Q08: "possible",
      Q10: "no",
      Q11: "no",
      Q13: ["personal_data"],
      Q16: "info",
      Q30: ["none_yet"]
    },
    expected: {
      priority: "priority.lower_risk",
      minScore: 0,
      maxScore: 24,
      mustIncludeFlags: [
        "other_sector_context",
        "eu_jurisdiction",
        "scope_unclear",
        "informational_use",
        "evidence_pack_missing"
      ],
      mustExcludeFlags: [
        "likely_ai_system",
        "material_impact_on_people"
      ]
    }
  },
  {
    id: "TC-034",
    name: "General commercial customer-facing decision support with confidential data",
    answers: {
      Q01: "general_commercial",
      Q02: ["AT"],
      Q06: "customer_facing",
      Q08: "likely_yes",
      Q10: "yes",
      Q11: "no",
      Q13: ["confidential_data"],
      Q16: "decision_support",
      Q21: "review_approval",
      Q30: ["use_case", "oversight_procedure"]
    },
    expected: {
      priority: "priority.lower_risk",
      minScore: 0,
      maxScore: 24,
      mustIncludeFlags: [
        "general_commercial_context",
        "eu_jurisdiction",
        "external_exposure",
        "likely_ai_system",
        "material_impact_on_people",
        "human_in_the_loop",
        "strong_human_oversight"
      ]
    }
  },
{
  id: "TC-035",
  name: "Marketing text generator (no impact on people)",
  answers: {
    Q01: "general_commercial",
    Q06: "internal",    
    Q08: "likely_yes",
    Q10: "no",
    Q16: "info",
    Q13: ["none"],
    Q21: "review_approval",
    Q30: ["risk_assessment"]
  },
  expected: {
    priority: "priority.lower_risk",
    minScore: 0,
    maxScore: 24
  }
},
{
  id: "TC-036",
  name: "HR assistant for internal policy questions",
  answers: {
    Q01: "employment_hr",
    Q06: "internal",    
    Q08: "likely_yes",
    Q10: "no",
    Q16: "info",
    Q13: ["personal_data"],
    Q21: "review_cases",
    Q30: ["risk_assessment"]
  },
  expected: {
    priority: "priority.lower_risk",
    minScore: 0,
    maxScore: 24
  }
},
{
  id: "TC-037",
  name: "Customer support chatbot with scripted answers",
  answers: {
    Q01: "general_commercial",
    Q06: "customer_facing",    
    Q08: "likely_yes",
    Q10: "possibly",
    Q16: "decision_support",
    Q13: ["personal_data"],
    Q21: "review_cases",
    Q30: ["risk_assessment"]
  },
  expected: {
    priority: "priority.lower_risk",
    minScore: 0,
    maxScore: 24
  }
},
{
  id: "TC-038",
  name: "Insurance claim decision support",
  answers: {
    Q01: "financial_services",
    Q06: "embedded_services",    
    Q08: "likely_yes",
    Q10: "yes",
    Q16: "decision_support",
    Q13: ["personal_data"],
    Q21: "review_approval",
    Q30: ["risk_assessment"]
  },
  expected: {
    priority: "priority.possible_high_risk",
    minScore: 25,
    maxScore: 39
  }
},
{
  id: "TC-039",
  name: "Student performance recommendation system",
  answers: {
    Q01: "education",
    Q06: "customer_facing",
    Q08: "likely_yes",
    Q10: "yes",
    Q16: "decision_support",
    Q13: ["personal_data"],
    Q11: "possible",
    Q21: "review_cases",
    Q30: ["risk_assessment"]
  },
  expected: {
    priority: "priority.possible_high_risk",
    minScore: 25,
    maxScore: 39
  }
},
{
  id: "TC-040",
  name: "Automated credit scoring system",
  answers: {
    Q01: "financial_services",
    Q06: "customer_facing",    
    Q08: "likely_yes",
    Q10: "yes",
    Q13: ["sensitive_data"],   
    Q16: "trigger_auto",
    Q21: "limited_oversight",
    Q30: ["risk_assessment"]
  },
  expected: {
    priority: "priority.likely_high_risk",
    minScore: 40,
    maxScore: 79
  }
},
{
  id: "TC-041",
  name: "Automated CV screening with human approval",
  answers: {
    Q01: "employment_hr",
    Q06: "embedded_services",   
    Q08: "likely_yes",
    Q10: "yes",     
    Q16: "trigger_auto",
    Q13: ["personal_data"],
    Q21: "review_approval",
    Q30: ["risk_assessment"]
  },
  expected: {
    priority: "priority.likely_high_risk",
    minScore: 40,
    maxScore: 79
  }
},
{
  id: "TC-042",
  name: "Facial recognition access system with no oversight",
  answers: {
    Q01: "critical_infra",
    Q06: "customer_facing",   
    Q08: "likely_yes",
    Q10: "yes",
    Q16: "trigger_auto",
    Q13: ["biometric_data"],
    Q21: "not_yet_defined",
    Q30: ["none_yet"]
  },
  expected: {
    priority: "priority.likely_high_risk",
    minScore: 40,
    maxScore: 79
  }
},
{
  id: "TC-043",
  name: "AI-assisted diagnosis with doctor approval",
  answers: {
    Q01: "healthcare",
    Q06: "embedded_services",    
    Q08: "likely_yes",
    Q10: "yes",
    Q16: "decision_support",
    Q13: ["sensitive_data"],
    Q21: "review_approval",
    Q30: ["risk_assessment"]
  },
  expected: {
    priority: "priority.likely_high_risk",
    minScore: 40,
    maxScore: 79
  }
},
{
  id: "TC-044",
  name: "Automated public sector sanction decision system",
  answers: {
    Q01: "public_sector",
    Q06: "customer_facing",    
    Q08: "likely_yes",
    Q10: "yes",
    Q16: "trigger_auto",
    Q13: ["sensitive_data"],
    Q21: "not_yet_defined",
    Q30: ["none_yet"]
  },
  expected: {
    priority: "priority.likely_high_risk",
    minScore: 40,
    maxScore: 79
  }
}  
];