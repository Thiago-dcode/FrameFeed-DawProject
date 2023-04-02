import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function FileInput({ title, prevImage = null, handleFile }) {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No selected file");

  return (
    <div id="image-file">
      <h2
        style={{
          textTransform: "capitalize",
          fontSize: "1rem",
        }}
      >
        {title}
      </h2>
      <div
        style={{
          flexDirection: image ? "column" : "row",
        }}
        className="image-div"
      >
        <div
          onClick={() => {
            document.querySelector("#file-input").click();
          }}
          className="image-input input"
        >
          <input
            type="file"
            id="file-input"
            accept="image/*"
            onChange={({ target: { files } }) => {
              files[0] && setFileName(files[0].name);
              if (files) {
                handleFile(files[0]);
                setImage(URL.createObjectURL(files[0]));
              }
            }}
            hidden
          />
          {image ? (
            <img className="img-selected" src={image} alt="" />
          ) : (
            <>
              <FontAwesomeIcon
                icon={faFileImage}
                style={{ color: "#ffffff" }}
              />
              <p>Browse Files to upload</p>
            </>
          )}
        </div>
        {!image && prevImage && (
          <div id="previous">
            <p>Previous image</p>
            <div className={"img " + prevImage.shape}>
              <img src={prevImage.image} alt="" />
            </div>
          </div>
        )}
      </div>
      <p className="filename">
        {fileName}{" "}
        {image && (
          <span>
            <FontAwesomeIcon
              onClick={() => {
                setFileName("No selected file");
                setImage(null);
              }}
              icon={faTrashCan}
              style={{ color: "#ffffff" }}
            />
          </span>
        )}
      </p>
    </div>
  );
}
