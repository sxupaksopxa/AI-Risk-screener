# AI Risk Screener

AI Risk Screener is a practical assessment tool that helps organizations identify potential AI risk areas, highlight governance gaps, and assess evidence readiness in line with the EU AI Act.

## What it does

The tool guides users through a structured questionnaire about an AI use case, including:
- organizational context
- intended use
- affected people
- data and privacy considerations
- decision impact
- human oversight
- governance and evidence

Based on the answers, it provides:
- risk level
- risk score
- key findings
- improvement areas
- focused recommendations for critical issues
- evidence and documentation view
- maturity profile in the report

## Current scope

This version is designed as a screening and prioritization tool.
It helps structure internal review and identify areas that may need further attention.

It does not provide legal advice or a formal compliance determination.

## Main report sections

- Use Case Overview
- Risk Classification
- Key Findings
- Improvement Areas
- Recommended Actions
- Evidence & Documentation
- Maturity Profile

## Tech stack

- React
- Vite
- Tailwind CSS
- Rules-based assessment engine
- Azure Static Web Apps deployment

## Further Development

The current version represents an initial MVP focused on structured AI risk screening and clear, explainable outputs. Further development is planned in the following areas:

### 1. Questionnaire expansion

The tool currently uses a focused subset of questions (11 out of 30 defined).  
The full questionnaire will be expanded step by step to improve coverage and accuracy across different AI use cases.

This includes:
- gradual activation of additional questions
- validation and refinement of combinations
- testing with real-world use cases

This phase is intended to be supported by structured testing and user feedback, including external testers.

### 2. Report and results enhancement

The report will be further improved to provide clearer and more actionable insights.

Planned improvements include:
- more refined UI and structure of the report
- clearer separation of positive findings and improvement areas
- prioritization of key findings
- highlighting of critical risk signals
- more targeted and context-aware recommendations

The goal is to make the output easier to interpret and more useful for decision-making across business, risk, and technical teams.

These improvements aim to strengthen the practical usability and reliability of the tool, particularly for organizations that currently lack structured AI governance processes.