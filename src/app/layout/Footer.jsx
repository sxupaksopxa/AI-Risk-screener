import React from "react";

export default function Footer({ translations }) {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner text-sm text-gray-500 leading-relaxed">
        <p>{translations.common.footer.status}    © {new Date().getFullYear()} AIRisk Screener · by BKlein Digital Labs. All rights reserved. </p>
      </div>
    </footer>
  );
}