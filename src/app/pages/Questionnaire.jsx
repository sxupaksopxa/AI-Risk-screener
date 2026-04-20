import React, { useMemo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import questions from "../../data/questions.json";
import rules from "../../data/rules.json";
import QuestionCard from "../components/QuestionCard";
import { evaluateAssessment } from "../../engine/rulesEngine";

export default function Questionnaire({ translations }) {
  const [answers, setAnswers] = useState({});
  const [showValidationError, setShowValidationError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("ai-risk-answers");
    if (stored) {
      try {
        setAnswers(JSON.parse(stored));
      } catch (error) {
        console.error("Failed to parse stored answers:", error);
      }
    }
  }, []);

  function handleAnswer(questionId, value) {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value
    }));
  }

  function handleReset() {
    if (window.confirm(
      translations.questionnaire?.resetConfirm || "Reset all answers?"
    )) {
      setAnswers({});
      setShowValidationError(false);
      localStorage.removeItem("ai-risk-answers");
      localStorage.removeItem("ai-risk-result");
    }
  }

  function handleReviewResults() {
    if (!allRequiredAnswered) {
      setShowValidationError(true);
      return;
    }

    navigate("/results");
  }

  useEffect(() => {
    localStorage.setItem("ai-risk-answers", JSON.stringify(answers));
  }, [answers]);

  const result = useMemo(() => evaluateAssessment(answers), [answers]);

  const totalQuestions = useMemo(() => {
    return questions.sections.reduce(
      (sum, section) => sum + section.questions.length,
      0
    );
  }, []);

  const answeredQuestions = useMemo(() => {
    return Object.values(answers).filter(isAnswered).length;
  }, [answers]);

  const requiredQuestions = useMemo(() => {
    return questions.sections.flatMap((section) =>
      section.questions.filter((question) => question.required)
    );
  }, []);

  const answeredRequiredQuestions = useMemo(() => {
    return requiredQuestions.filter((question) =>
      isAnswered(answers[question.id])
    ).length;
  }, [requiredQuestions, answers]);

  const allRequiredAnswered = useMemo(() => {
    return requiredQuestions.every((question) =>
      isAnswered(answers[question.id])
    );
  }, [requiredQuestions, answers]);

  useEffect(() => {
    if (allRequiredAnswered) {
      setShowValidationError(false);
    }
  }, [allRequiredAnswered]);

  const progressPercent =
    totalQuestions > 0
      ? Math.round((answeredQuestions / totalQuestions) * 100)
      : 0;

  const positiveRuleIds = [
    "R_MATURITY_EVIDENCE",
    "R_OVERSIGHT_GOOD",
    "R_GOVERNANCE_DEFINED"
  ];

  const negativeRuleIds = [
    "R_GAP_NO_EVIDENCE",
    "R_OVERSIGHT_POOR"
  ];

  const strengths = result.matchedRules.filter((rule) =>
    positiveRuleIds.includes(rule.id)
  );

  const risks = result.matchedRules.filter((rule) =>
    negativeRuleIds.includes(rule.id)
  );

  return (
    <section className="page">
      <div className="page-header-row">
        <div>
          <h1>{translations.questionnaire.title || "Questionnaire"}</h1>
          <p>
            {translations.questionnaire.description ||
              "Complete the assessment below."}
          </p>

          <p className="helper-text">
            {translations.questionnaire?.helperText ||
            "You can complete this gradually. Results update automatically."}
          </p>

          <p className="helper-text-subtle">
            {translations.questionnaire?.helperTextSubtle ||
            "Answers are not saved after leaving this page."}
          </p>
          <p>
            <span className="required-asterisk">*</span>{" "}
            {translations.common?.requiredNote || "Required question"}
          </p>
        </div>
      </div>

      <div className="progress-block">
        <div className="progress-text">
          <span>
            {answeredQuestions} / {totalQuestions} answered
          </span>
          <span>{progressPercent}%</span>
        </div>

        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {questions.sections.map((section, sectionIndex) => (
        <section key={section.id} className="question-section">
          <h2 className="section-title">
            {sectionIndex + 1}.{" "}
            {translations.questionnaire.sections?.[section.id]?.title || section.id}
          </h2>

          <div className="question-list">
            {section.questions
              .filter((question) => question.visible !== false)
              .map((question, index) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  translations={translations.questionnaire}
                  value={answers[question.id]}
                  answers={answers}
                  onChange={handleAnswer}
                  questionNumber={`${sectionIndex + 1}.${index + 1}`}
                  disabled={question.id === "Q21" && answers.Q16 === "info"}
                />
            ))}
          </div>
        </section>
      ))}

      <section className="result-preview">
        <div className="required-status">
          <p>
          Required questions answered: {answeredRequiredQuestions} /{" "}
          {requiredQuestions.length}
          </p>
        </div>

        <div className="rules-engine-intro helper-text mt-4 mb-4">
          {Object.values(
          translations.questionnaire?.rules_engine?.notes || {}
          ).map((note, index) => (
          <p key={index}>
            {typeof note === "object" ? note?.en || "" : note}
          </p>
        ))}
        </div>

        <section className="result-preview-card">
        <h2>
          {translations.common?.results?.previewTitle || "Current Risk Overview"}
        </h2>

        <p>
          <strong>{translations.common?.results?.priority || "Priority"}:</strong>{" "}
          {translations.questionnaire?.priority?.[result.priority?.split(".").pop()] || result.priority}
        </p>

        <p>
          <strong>{translations.common?.results?.riskScore || "Risk Score"}:</strong>{" "}
          {result.riskPointsTotal}
        </p>
        
        {result.flags?.length > 0 && (
          <ul>
            {result.flags.slice(0, 3).map((flag) => (
              <li key={flag}>
                {translations.questionnaire?.flags?.[flag] || flag}
              </li>
            ))}
          </ul>
        )}
        </section>
      </section>

      {showValidationError && !allRequiredAnswered && (
        <div className="validation-message">

          {translations.questionnaire?.validationMessage ?? ""}
        </div>
      )}

      <p className="action-helper">
        {translations.questionnaire?.actionHelperLine1}
        <br />
        {translations.questionnaire?.actionHelperLine2}
      </p>

      <div className="actions">
        <Link className="button secondary" to="/">
          {translations.common.actions?.back || "Zurück"}
        </Link>

        <div className="actions-right">
          <button
            type="button"
            className="button"
            onClick={handleReviewResults}
          >
            {translations.common.actions?.viewResults || "Review results"}
          </button>

          <button
            type="button"
            className="button subtle"
            onClick={handleReset}
          >
            {translations.common.actions?.reset || "Reset questionnaire"}
          </button>
        </div>
      </div>
    </section>
  );
}

function isAnswered(value) {
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "string") return value.trim() !== "";
  return value !== undefined && value !== null && value !== "";
}