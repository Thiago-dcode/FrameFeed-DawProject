import React from "react";

export default function Input({
  name,
  content = name,
  type = "text",
  valueInput = "",
  handleInput,
  placeholder = "Your " + name,
  style = { width: "300px" },
}) {
  return (
    <>
      <label htmlFor={name}>{content}</label>
      {type === "textarea" ? (
        <textarea
          style={style}
          onChange={({ target }) => {
            handleInput(target.value);
          }}
          name={name}
          id=""
          cols="30"
          rows="10"
          value={valueInput}
          placeholder={"Write your " + name}
        ></textarea>
      ) : (
        <input
          onChange={({ target }) => {
            handleInput(target.value);
          }}
          style={style}
          required
          name={name}
          placeholder={placeholder}
          type={type}
          value={valueInput}
        />
      )}
    </>
  );
}
