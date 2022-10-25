import { useState } from "react";
import DicomViewPort from "./DicomViewPort";

const DicomSlide = ({
  imageFiles,
  slideNum,
  handleRemoveSlide,
  addNewImages,
}) => {
  // handle addition of new images to the slide
  const [newImages, setNewImages] = useState([]);

  const handleAddNewImages = (event) => {
    if (event.target.files.length > 5) {
      window.alert("Please select maximum 5 images");
      return;
    }
    let newFileArray = [];
    for (let i = 0; i < event.target.files.length; i++) {
      const images = event.target.files[i];
      console.log("images", URL.createObjectURL(images));
      newFileArray.push("wadouri:" + URL.createObjectURL(images));
    }
    setNewImages(newFileArray);
  };

  const sendNewImages = () => {
    if (newImages.length > 5 || newImages.length < 1) {
      window.alert("Please select maximum 5 images");
      return;
    }
    if (!window.confirm("Are you sure to add theses images?")) {
      return;
    }
    addNewImages(slideNum, newImages);
    window.alert("New Images added to slide");
  };

  return (
    <div
      style={{
        height: "550px",
        width: "550px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {imageFiles.length > 0 && (
        <DicomViewPort
          containerStyle={{
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
          height: "100px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "95%",
          }}
        >
          <p className="text_normal">Slide Number: {parseInt(slideNum) + 1}</p>
          <button
            type="button"
            className="button_cancel"
            style={{ width: "100px", height: "25px" }}
            onClick={() => handleRemoveSlide(parseInt(slideNum))}
          >
            Remove Slide
          </button>
        </div>
        {imageFiles.length > 0 && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <span className="text_bold">Add New images to slide:</span>
            <input type="file" onChange={handleAddNewImages} multiple />
            <button
              type="button"
              className="button_normal"
              style={{ width: "100px", height: "25px" }}
              onClick={sendNewImages}
            >
              Add to slide
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DicomSlide;
