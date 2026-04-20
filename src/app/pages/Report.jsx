import React, { useMemo } from "react";

export default function Report({ translations }) {
  const t = translations.common.report;

  const answers = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("ai-risk-answers") || "{}");
    } catch {
      return {};
    }
  }, []);

  const result = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("ai-risk-result") || "{}");
    } catch {
      return {};
    }
  }, []);

  function isAnswered(value) {
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "string") return value.trim() !== "";
    return value !== undefined && value !== null && value !== "";
  }

  const isEmpty = !Object.values(answers).some(isAnswered);
  const safeResult = isEmpty ? {} : result;

  const MATURITY_MIN_SCORE = 50;
  const MATURITY_CRITICAL_SCORE = 30;

  function handleDownloadPDF() {
    window.print();
  }

  const regulatoryPathText =
    Array.isArray(safeResult.regulatoryPaths) && safeResult.regulatoryPaths.length > 0
      ? safeResult.regulatoryPaths
          .map((path) => translations.questionnaire?.regulatory_paths?.[path] || path)
          .join(", ")
      : t.labels.notAssessed;

  const regulatoryPathClass =
    !isEmpty &&
    Array.isArray(safeResult.regulatoryPaths) &&
    safeResult.regulatoryPaths.some((path) => {
      const normalized = String(path).toLowerCase();
      return normalized.includes("high_risk") || normalized.includes("high-risk");
    })
      ? "report-critical-text"
      : "";

  const flags = Array.isArray(safeResult.flags) ? safeResult.flags : [];
  const cflags = Array.isArray(safeResult.cflags) ? safeResult.cflags : [];  

  const recommendations = Array.isArray(safeResult.recommendations)
    ? safeResult.recommendations
    : [];
  const maturityScores = safeResult.maturityScores || {};

  const maturityOrder = [
  "governance",
  "documentation",
  "oversight",
  "data",
  "monitoring",
  "security"
];

const maturityRows = maturityOrder
  .filter((key) => typeof maturityScores[key] === "number")
  .map((key) => ({
    key,
    value: maturityScores[key]
  }));

  const getByPath = (obj, path) => {
    return path.split(".").reduce((acc, part) => acc?.[part], obj);
  };

  const controlGaps = [];
  if (flags.length > 0) {
    controlGaps.push(...flags);
  }

  if (
    typeof maturityScores.data === "number" &&
    maturityScores.data < MATURITY_CRITICAL_SCORE
  ) {
    controlGaps.push("⚠️ " + (t.gaps?.data || "Data maturity is critically low."));
  } else if (
    typeof maturityScores.data === "number" &&
    maturityScores.data < MATURITY_MIN_SCORE
  ) {
    controlGaps.push("report.gaps.data");
  }

  if (
    typeof maturityScores.documentation === "number" &&
    maturityScores.documentation < MATURITY_CRITICAL_SCORE
  ) {
    controlGaps.push("⚠️ " + (t.gaps?.documentation || "Documentation maturity is critically low."));
  } else if (
    typeof maturityScores.documentation === "number" &&
    maturityScores.documentation < MATURITY_MIN_SCORE
  ) {
    controlGaps.push("report.gaps.documentation");
  }

  if (
    typeof maturityScores.oversight === "number" &&
    maturityScores.oversight < MATURITY_CRITICAL_SCORE
  ) {
    controlGaps.push("⚠️ " + (t.gaps?.oversight || "Oversight maturity is critically low."));
  } else if (
    typeof maturityScores.oversight === "number" &&
    maturityScores.oversight < MATURITY_MIN_SCORE
  ) {
    controlGaps.push("report.gaps.oversight");
  }

  if (
    typeof maturityScores.governance === "number" &&
    maturityScores.governance < MATURITY_CRITICAL_SCORE
  ) {
    controlGaps.push("⚠️ " + (t.gaps?.governance || "Governance maturity is critically low."));
  } else if (
    typeof maturityScores.governance === "number" &&
    maturityScores.governance < MATURITY_MIN_SCORE
  ) {
    controlGaps.push("report.gaps.governance");
  }

  const uniqueControlGaps = [...new Set(controlGaps)];

  const evidenceAvailable = [];
  const evidenceMissing = [];

  if (typeof maturityScores.governance === "number" && maturityScores.governance > 50) {
    evidenceAvailable.push("governanceAvailable");
  } else {
    evidenceMissing.push("governanceMissing");
  }

  if (typeof maturityScores.oversight === "number" && maturityScores.oversight > 50) {
    evidenceAvailable.push("oversightAvailable");
  } else {
    evidenceMissing.push("oversightMissing");
  }

  if (typeof maturityScores.documentation === "number" && maturityScores.documentation > 50) {
    evidenceAvailable.push("documentationAvailable");
  } else {
    evidenceMissing.push("documentationMissing");
  }

  const purpose =
    answers.ai_purpose ||
    answers.use_case ||
    answers.system_purpose ||
    t.labels.defaultPurpose;

  const dataType =
    answers.data_type ||
    answers.personal_data_type ||
    answers.input_data ||
    t.labels.defaultData;

  const oversightText =
    typeof maturityScores.oversight === "number" && maturityScores.oversight >= 50
      ? t.labels.oversightGood
      : t.labels.oversightPoor;

  const priorityKey = safeResult.priority?.split(".").pop();

  const isCriticalFlag = (gap) => {
    const normalized = String(gap).toLowerCase();

    return (
      normalized.includes("sensitive") ||
      normalized.includes("biometric") ||
      normalized.includes("vulnerable") ||
      normalized.includes("children") ||
      normalized.includes("fully automated") ||
      normalized.includes("high-risk") ||
      normalized.includes("high risk")
    );
  };

  return (
    <section className="page report-container">
      <h1>{t.title}</h1>
      <p>{t.subtitle}</p>

      <section className="content-section">
        <h2>{t.sections.summary}</h2>

        {isEmpty ? (
          <p>{t.emptyState.summary}</p>
        ) : (
          <p>
            Priority:{" "}
            <strong>
              {translations.questionnaire?.priority?.[priorityKey] ||
                safeResult.priority ||
                t.labels.notAssessed}
            </strong>
            <br />
            Risk score: <strong>{safeResult.riskPointsTotal ?? 0}</strong>
          </p>
        )}
      </section>

     {/*} <section className="content-section">
        <h2>{t.sections.risk}</h2>
        {isEmpty ? (
          <p>{t.emptyState.risk}</p>
        ) : (
          <p className={regulatoryPathClass}>{regulatoryPathText}</p>
        )}
      </section>*/}

      <section className="content-section">
        <h2>{typeof t.sections.gaps === "string" ? t.sections.gaps : t.sections.gaps.title}</h2>

        {isEmpty ? (
          <p>{t.emptyState.gaps}</p>
        ) : uniqueControlGaps.length > 0 ? (
          <ul>
            {uniqueControlGaps.map((gap, index) => {
              const isInlineWarning = typeof gap === "string" && gap.startsWith("⚠️ ");
              const text = isInlineWarning
                ? gap
                : translations.questionnaire?.flags?.[gap] ||
                  t.gaps?.[gap.split(".").pop()] ||
                  gap;

              const itemClass = isInlineWarning
                ? "report-warning-text"
                : isCriticalFlag(gap)
                ? "report-critical-text"
                : "";

              return (
                <li key={index} className={itemClass}>
                  {text}
                </li>
              );
            })}
          </ul>
        ) : (
          <p>{t.labels.noMajorGaps}</p>
        )}
      </section>

      <section className="content-section">
        <h2>{t.sections.combinedFindings || "Combined findings"}</h2>

        {isEmpty ? (
          <p>{t.emptyState.gaps}</p>
        ) : cflags.length > 0 ? (
          <ul>
            {cflags.map((flag, index) => {
              const text =
                translations.questionnaire?.cflags?.[flag] || flag;

              return <li key={index}>{text}</li>;
            })}
          </ul>
        ) : (
          <p>{t.labels.noCombinedFindings || "No combined findings identified."}</p>
        )}
      </section>

      <section className="content-section">
      <h2>{t.sections.maturityProfile || "Maturity Profile"}</h2>
      <p>
        {t.labels.maturityProfileIntro ||
        "This profile shows readiness across key governance and control domains."}
      </p>

      <div className="maturity-profile">
        {maturityRows.map(({ key, value }) => (
          <div key={key} className="maturity-profile-item">
            <div className="maturity-profile-header">
              <span>
                {translations.questionnaire?.maturity_domains?.[key] || key}
              </span>
            <strong>{value} / 100</strong>
            </div>

            <div className="maturity-profile-bar">
              <div
                className="maturity-profile-fill"
                style={{ width: `${value}%` }}
              />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="content-section">
        <h2>{typeof t.sections.actions === "string" ? t.sections.actions : t.sections.actions.title}</h2>

        {isEmpty ? (
          <p>{t.emptyState.actions}</p>
        ) : recommendations.length > 0 ? (
          <ul>
            {recommendations.map((item, index) => (
              <li key={index}>
                {getByPath(translations.questionnaire, item) || item}
              </li>
            ))}
          </ul>
        ) : (
          <p>
            {t.labels.noImmediateActions}
            <br />
            {t.labels.continueDocumenting}
          </p>
        )}
      </section>

      <section className="content-section">
        <h2>{typeof t.sections.evidence === "string" ? t.sections.evidence : t.sections.evidence.title}</h2>

        {isEmpty ? (
          <p>{t.emptyState.evidence}</p>
        ) : (
          <>
            {evidenceAvailable.length > 0 && (
              <>
                <p><strong>{t.labels.available}</strong></p>
                <ul>
                  {evidenceAvailable.map((item, index) => (
                    <li key={`available-${index}`}>
                      {t.evidence?.[item] || item}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {evidenceMissing.length > 0 && (
              <>
                <p><strong>{t.labels.missingOrUnclear}</strong></p>
                <ul>
                  {evidenceMissing.map((item, index) => (
                    <li key={`missing-${index}`}>
                      {t.evidence?.[item] || item}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {evidenceAvailable.length === 0 && evidenceMissing.length === 0 && (
              <p>{t.labels.noEvidenceConfirmed}</p>
            )}
          </>
        )}
      </section>

      <div className="report-actions">
        <button className="button primary" onClick={handleDownloadPDF}>
          {translations.common.actions?.downloadPdf || "Download PDF"}
        </button>

        <a
          href="mailto:your@email.com?subject=AI Risk Screener Feedback"
          className="button secondary"
        >
          {translations.common.actions?.provideFeedback || "Provide feedback"}
        </a>
      </div>

      <div className="disclaimer-container">
        <p className="disclaimer-title">
          {t.sections.disclaimer?.title || "Disclaimer"}
        </p>

        <p className="disclaimer-text">
          {t.sections.disclaimer?.text ||
            "This report is generated for guidance purposes only and does not constitute legal advice."}
        </p>
      </div>
    </section>
  );
}