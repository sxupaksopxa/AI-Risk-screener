import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { evaluateAssessment } from "../../engine/rulesEngine";

export default function Results({ translations }) {
  const t = translations.common.results;

  const getByPath = (obj, path) => {
    return path.split(".").reduce((acc, part) => acc?.[part], obj);
  };

  function isAnswered(value) {
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "string") return value.trim() !== "";
    return value !== undefined && value !== null && value !== "";
  }

  const stored = localStorage.getItem("ai-risk-answers");
  const answers = stored ? JSON.parse(stored) : {};
  
  const hasAnyAnswers = Object.values(answers).some(isAnswered);

  if (!hasAnyAnswers) {
    return (
      <section className="page">
        <h1>{t.title}</h1>
        <p>{t.noData}</p>
      </section>
    );  
  }

  const getMaturityLabel = (v) => {
    if (v >= 80) return t.maturityLevels.mature;
    if (v >= 60) return t.maturityLevels.managed;
    if (v >= 40) return t.maturityLevels.developing;
    return t.maturityLevels.initial;
  };

const result = hasAnyAnswers ? evaluateAssessment(answers) : null;
const priorityKey = result.priority?.split(".").pop();

  useEffect(() => {
  localStorage.setItem("ai-risk-result", JSON.stringify(result));
}, [result]);

// Default maturity check
const isDefaultMaturity = result?.maturityScores
  ? Object.entries(result.maturityScores)
      .filter(([key]) => key !== "overall")
      .every(([, value]) => value === 50)
  : true;

// Calculate overall maturity
const maturityEntries = result?.maturityScores
  ? Object.entries(result.maturityScores).filter(([key]) => key !== "overall")
  : [];

const maturityValues = maturityEntries.map(([, value]) => value);

const overallMaturity = maturityValues.length
  ? Math.round(maturityValues.reduce((sum, val) => sum + val, 0) / maturityValues.length)
  : 0;

const getQuestionOptionLabel = (questionId, value) => {
  return translations.questionnaire?.questions?.[questionId]?.options?.[value] || value;
};

  return (
    <section className="page">
      <h1>{t.title}</h1>
      <p>{t.p1}</p>

 <div className="card">
  <h2>{t.useCaseOverview || "Use Case Overview"}</h2>

  <div className="use-case-grid">
    {answers.Q04?.trim() && (
      <div>
        <strong>{t.useCaseDescription || "System Description"}:</strong>{" "}
        {answers.Q04}
      </div>
    )}

    <div>
      <strong>{t.sector || "Sector"}:</strong>{" "}
      {getQuestionOptionLabel("Q01", answers.Q01)}
    </div>

    <div>
      <strong>{t.country || "Country"}:</strong>{" "}
      {getQuestionOptionLabel("Q02", answers.Q02)}
    </div>

    <div>
      <strong>{t.useCase || "Use case"}:</strong>{" "}
      {getQuestionOptionLabel("Q08", answers.Q08)}
    </div>

    <div>
      <strong>{t.decisionImpact || "Decision impact"}:</strong>{" "}
      {getQuestionOptionLabel("Q16", answers.Q16)}
    </div>
  </div>
</div>

      <div className="results-grid">
        <div className="card">
          <h3>{t.priority}</h3>
          <p className={`badge ${priorityKey || ""}`}>
            {translations.questionnaire?.priority?.[priorityKey] || result.priority}
          </p>
        </div>

        <div className="card">
          <h3>{t.riskScore}</h3>
          <p className="big-number">{result.riskPointsTotal}</p>
          <p>{t.riskTitle}</p>
        </div>

        <div className="card">
          <h2>Overall Maturity</h2>
            <div className="maturity-score">
              <strong>{overallMaturity} / 100</strong>
              <p>Governance readiness across key domains.</p>
          </div>
        </div>
      </div>


      <div className="card">
        <h2>{t.keyFlags}</h2>

        <ul className="flags-list compact-single">
          {result.flags.map((flag) => (
            <li key={flag}>
              {translations.questionnaire?.flags?.[flag] || flag}
            </li>
          ))}
        </ul>
      </div>

      {result.cflags?.length > 0 && (
        <div className="card">
          <h2>{t.combinedFindings || "Improvement areas"}</h2>

          <ul className="flags-list compact-single">
            {result.cflags.map((flag) => (
              <li key={flag}>
                {translations.questionnaire?.cflags?.[flag] || flag}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="card">
        <h2>{t.recommendations}</h2>
        <ul>
          {result.recommendations.slice(0, 5).map((recKey, index) => (
            <li key={index}>
              {getByPath(translations.questionnaire, recKey) || recKey}
            </li>
          ))}
        </ul>
      </div>

      {!isDefaultMaturity && (
        <div className="card">
          <h2>{t.maturityScores}</h2>

          <div className="maturity-grid">
          {Object.entries(result.maturityScores)
            .filter(([key, value]) => key !== "overall" && value !== 50)
            .map(([key, value]) => (
            <div key={key} className="maturity-item">
              <span>
                {translations.questionnaire?.maturity_domains?.[key] || key}
              </span>
              <strong>{value}</strong>
            </div>
          ))}
          </div>
        </div>
      )}

      <div className="actions">
        <Link className="button secondary" to="/questionnaire">
          {translations.common.actions?.back || "Back"}
        </Link>

        <Link className="button primary" to="/report">
          {translations.common.actions?.generateReport || "Generate Report"}
        </Link>
      </div>
    </section>
  );
}