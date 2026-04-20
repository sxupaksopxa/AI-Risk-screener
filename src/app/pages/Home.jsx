import React from "react";
import { Link } from "react-router-dom";

export default function Home({ translations }) {
  const t = translations.common;

  return (
    <section className="page">
      <h1>{t.home.title}</h1>
      <p>{t.home.subtitle}</p>

      <section className="content-section">
        <h2>{t.home.sections.what.title}</h2>
        <p>{t.home.sections.what.p1}</p>
        <p>{t.home.sections.what.p2}</p>
      </section>

      <section className="content-section">
        <h2>{t.home.sections.how.title}</h2>

        <div className="how-grid">
          <div className="how-card">
          <div className="how-card-title">
            [1] {t.home.sections.how.step1Title}
          </div>
            <p>{t.home.sections.how.step1Text}</p>
          </div>

        <div className="how-card">
          <div className="how-card-title">
          [2] {t.home.sections.how.step2Title}
          </div>
            <p>{t.home.sections.how.step2Text}</p>
        </div>

        <div className="how-card">
          <div className="how-card-title">
          [3] {t.home.sections.how.step3Title}
          </div>
            <p>{t.home.sections.how.step3Text}</p>
          </div>
        </div>

        <p className="helper-text">
          {t.home.sections.how.how_it_works}
        </p>

        <div className="manual-link">
          <a
            href="/docs/ai_risk_screener_user_manual.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="button secondary"
          >
            {translations.common.actions?.userManual || "User Manual (EN)"}
          </a>
        </div>
      </section>

      <section className="content-section">
        <h2>{t.home.sections.why.title}</h2>
        <p>{t.home.sections.why.p1}</p>
        <p>{t.home.sections.why.p2}</p>
        <p>{t.home.sections.why.p3}</p>
      </section>

      <section className="content-section">
        <h2>{t.home.sections.who.title}</h2>
        <p>{t.home.sections.who.p1}</p>
        <p>{t.home.sections.who.p2}</p>
      </section>

      <section className="content-section">
        <h2>{t.home.sections.note.title}</h2>
        <p>{t.home.sections.note.p1}</p>
      </section>

      <div className="actions">
        <Link className="button" to="/questionnaire">
          {t.home.startAssessment}
        </Link>
      </div>
    </section>
  );
}