import React, { useMemo, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./app/pages/Home";
import Questionnaire from "./app/pages/Questionnaire";
import Results from "./app/pages/Results";
import Report from "./app/pages/Report";
import Header from "./app/layout/Header";
import Footer from "./app/layout/Footer";
import { getTranslations } from "./i18n";
import About from "./app/pages/About";

export default function App() {
  const [locale, setLocale] = useState("en");
  const translations = useMemo(() => getTranslations(locale), [locale]);

  return (
    <div className="app-shell">
      <Header
        locale={locale}
        setLocale={setLocale}
        translations={translations}
      />

      <main className="app-main">
        <Routes>
          <Route
            path="/"
            element={<Home translations={translations} />}
          />
          <Route
            path="/questionnaire"
            element={
              <Questionnaire
                locale={locale}
                setLocale={setLocale}
                translations={translations}
              />
            }
          />
          <Route
            path="/results"
            element={<Results translations={translations} />}
          />
          <Route
            path="/report"
            element={<Report translations={translations} />}
          />
          <Route
            path="/about"
            element={<About translations={translations} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer translations={translations} />
    </div>
  );
}