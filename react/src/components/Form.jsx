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

  setInterval(() => {
    
  }, 5000);
  useEffect(() => {
    console.log(errors);
  }, [errors]);
  return (
    <div style={style} className="div-form">
    
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
   
          <div style={{ display: "flex", flexDirection: "column" }}>
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
          
            { errors && <div className="errors" style={{color:'white'}}>
        {errors &&
          Object.entries(errors).map(([key, value]) => {
            return (value.map((errorMessage,i) => {
            
              return (<ErrorField key={i} message={errorMessage} />);
            }))
          })}
      </div>}
        </div>
      </form>
    </div>
  );
}
