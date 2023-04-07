import React, { useEffect, useState } from "react";
import ErrorField from "./Error";
import Loading from "./Loading";
export default function Form({
  style = null,
  title,
  elements,
  handleSubmit,
  buttonText,
  isPending = null,
  errors = null,
}) {
  const [isHover, setIsHover] = useState(false);


  return (
    <div style={style} className="home div-form">
      <h2
        style={{
          color: "white",
        }}
      >
        {title}
      </h2>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className={isHover ? "component-form hover" : "component-form"}
      >
        {elements.map((element, i) => {
          return (
            <div key={i} className="input-div">
              {element}
            </div>
          );
        })}

        <div
          className="btn-errors"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <button
            onMouseLeave={() => {
              setIsHover(false);
            }}
            onMouseOver={() => {
              setIsHover(true);
            }}
            type="submit"
          >
            {buttonText}
          </button>

          {errors && (
            <div className="errors" style={{ color: "white" }}>
              {errors &&
                Object.entries(errors).map(([key, value]) => {
                
                  if (!Array.isArray(value)) {
                    return <ErrorField key={key} message={value.message} />;
                  }
                  return value.map((errorMessage, i) => {
                    return <ErrorField key={i} message={errorMessage} />;
                  });
                })}
            </div>
          )}
          {isPending && !errors && <Loading />}
        </div>
      </form>
    </div>
  );
}
