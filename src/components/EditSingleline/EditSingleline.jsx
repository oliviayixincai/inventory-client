import React, { useEffect, useState } from "react";
import "./EditSingleline.scss";
import errorIcon from "../../assets/icons/error-24px.svg";

const EditSingleline = ({
  label,
  value,
  setValue,
  submitClicked,
  errorMsg,
}) => {
  let trimmedLabel = label.replace(/\s/g, "");

  const [inputValue, setInputValue] = useState(value || "");
  const [error, setError] = useState(false);

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  const changeHandler = (e) => {
    setInputValue(e.target.value);
    setValue(e.target.value);
  };

  const handleBlur = (e) => {
    setError(!e.target.value.trim());
  };

  useEffect(() => {
    if (errorMsg) {
      setError(true);
    }
    if (!inputValue) {
      setError(inputValue.trim() === "" && submitClicked);
    }
  }, [submitClicked, errorMsg]);

  return (
    <div className="edit-item">
      <label>{label}</label>
      <input
        type="text"
        autoComplete="off"
        placeholder={label}
        name={trimmedLabel}
        value={inputValue}
        onChange={changeHandler}
        onBlur={handleBlur}
        className={
          error
            ? "edit-item__input edit-item__input--error"
            : "edit-item__input"
        }
      />
      {error && (
        <div className="edit-item__error-wrapper">
          <img src={errorIcon} alt="errorIcon" />
          <p className="edit-item__error-prompt">
            {errorMsg ? errorMsg : "This field is required"}
          </p>
        </div>
      )}
    </div>
  );
};

export default EditSingleline;
