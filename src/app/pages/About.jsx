import React from "react";

export default function About({ translations }) {
  const t = translations.common.about;

  return (
    <section className="page">
      <h1>{t.title}</h1>
      <p>{t.intro}</p>

      <section className="content-section">
        <h2>{t.sections.mission.title}</h2>
        <p>{t.sections.mission.p1}</p>
      </section>

      <section className="content-section">
        <h2>{t.sections.why.title}</h2>
        <p>{t.sections.why.p1}</p>
      </section>

      <section className="content-section">
        <h2>{t.sections.help.title}</h2>
        <p>{t.sections.help.p1}</p>
      </section>

      <section className="content-section">
        <h2>{t.sections.note.title}</h2>
        <p>{t.sections.note.p1}</p>
      </section>
    </section>
  );
}