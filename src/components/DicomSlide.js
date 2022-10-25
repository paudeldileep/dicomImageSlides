import { useState } from "react";
import DicomViewPort from "./DicomViewPort";

const DicomSlide = ({ imageFiles, slideNum }) => {
  const [newImages, setNewImages] = useState([]);
  const [imageIds, setImageIds] = useState([]);

  // handle addition of new images to the slide

  const handleAddNewImages = (event) => {
    let newFileArray = [];
    for (let i = 0; i < event.target.files.length; i++) {
      const images = event.target.files[i];
      console.log("images", URL.createObjectURL(images));
      newFileArray.push("wadouri:" + URL.createObjectURL(images));
    }
    if (!window.confirm("Are you sure to add theses images?")) {
      return;
    }
  };

  return (
    <div
      style={{
        border: "1px solid green",
        height: "500px",
        width: "550px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {imageFiles.length > 0 && (
        <DicomViewPort
          containerStyle={{
            border: "2px solid red",
            width: "100%",
            height: "440px",
          }}
          imageIds={imageFiles}
        />
      )}
      {/* options area for a slide */}
      <div
        style={{
          position: "absolute",
          bottom: "0px",
          height: "50px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
          border: "1px solid blue",
        }}
      >
        {imageFiles.length > 0 && (
          <div>
            <span>Add New images to slide:</span>
            <input type="file" onChange={handleAddNewImages} multiple />
          </div>
        )}
      </div>
    </div>
  );
};

export default DicomSlide;
