import React, { useEffect, useState } from "react";

export default function QuestionCard({
  question,
  translations,
  value,
  answers,
  onChange,
  questionNumber,
  disabled = false
}) {
  const [localValue, setLocalValue] = useState(getInitialValue(question.type, value));

  useEffect(() => {
    setLocalValue(getInitialValue(question.type, value));
  }, [question.id, question.type, value]);

  const tQuestion = translations?.questions?.[question.id] || {};
  const label = tQuestion.label || question.id;
  const help = tQuestion.help || "";
  const placeholder = tQuestion.placeholder || "";

  function handleChange(newValue) {
    setLocalValue(newValue);
    onChange(question.id, newValue);
  }

  return (
  <div className="question-card">
    <div className="question-header">
      <h3 className="question-title">
        <span className="question-number-inline">{questionNumber}</span>{" "}
        <span className="question-id">({question.id})</span>{" "}
        {label}
        {question.required && <span className="required">*</span>}
      </h3>
      {help ? <p className="question-help">{help}</p> : null}
    </div>

    <div className="question-input">
      {renderInput({
        question,
        tQuestion,
        value: localValue,
        placeholder,
        answers,
        onChange: handleChange,
        disabled
      })}
    </div>
  </div>
);
}

function renderInput({ question, tQuestion, value, placeholder, answers, onChange, disabled }) {
  const isOptionExcluded = (question, optionId, answers) => {
    if (!question.excludeWhen) return false;

    return question.excludeWhen.some((rule) => {
      if (rule.option !== optionId) return false;

      const actualValue = answers?.[rule.questionId];

      if (rule.equals !== undefined) {
        return actualValue === rule.equals;
      }

      if (rule.notEquals !== undefined) {
        return actualValue !== undefined && actualValue !== "" && actualValue !== rule.notEquals;
      }

      return false;
    });
  };

  switch (question.type) {
    case "single_select":
      return (
        <select
          className="select"
          value={value ?? ""}
          disabled={disabled}
          onChange={(e) => {
            if (disabled) return;
            onChange(e.target.value);
          }}
        >
          <option value="">Select...</option>
          {question.options?.map((opt) => {
            const excluded = isOptionExcluded(question, opt.id, answers);

            return (
              <option
                key={opt.id}
                value={opt.id}
                disabled={excluded}
              >
                {tQuestion.options?.[opt.id] || opt.id}
              </option>
            );
          })}
        </select>
      );
    
    case "multi_select":
    return (
    <div
      className={
        question.id === "Q02"
          ? "options-grid"
          : ["Q03", "Q09", "Q30"].includes(question.id)
          ? "options-list three-columns"
          : ["Q05", "Q13", "Q18"].includes(question.id)
          ? "options-list two-columns"
          : "options-list"
      }
    >
      {question.options?.map((opt) => {
        const optionLabel = tQuestion.options?.[opt.id] || opt.id;
        const selected = Array.isArray(value) && value.includes(opt.id);

        return (
        <button
          key={opt.id}
          type="button"
          disabled={disabled}
          className={`option-item ${selected ? "selected" : ""} ${disabled ? "disabled" : ""}`}
          onClick={() => {
            if (disabled) return;

            const current = Array.isArray(value) ? value : [];

            const exclusiveOptions = Array.isArray(question.exclusive_options)
              ? question.exclusive_options
              : question.options
                ?.filter((option) => option.exclusive)
                .map((option) => option.id) || [];

            const isExclusiveOption = exclusiveOptions.includes(opt.id);

            let next;

            if (selected) {
              next = current.filter((item) => item !== opt.id);
            } else if (isExclusiveOption) {
              next = [opt.id];
            } else {
              next = [
                ...current.filter((item) => !exclusiveOptions.includes(item)),
                opt.id
              ];
            }

            onChange(next);
          }}
          >
          {optionLabel}
          </button>
          );
        })}
      </div>
    );

    case "number":
      return (
        <input
          type="number"
          className="input"
          value={value ?? ""}
          onChange={(e) => {
            const raw = e.target.value;
            onChange(raw === "" ? "" : Number(raw));
          }}
          placeholder={placeholder}
        />
      );

    case "text":
    default:
      return (
        <textarea
          className="textarea"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
        />
      );
  }
}

function getOptionClass(active) {
  return active ? "option active" : "option";
}

function getInitialValue(type, value) {
  if (type === "multi_select") {
    return Array.isArray(value) ? value : [];
  }
  return value ?? "";
}