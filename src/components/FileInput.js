import { useState } from "react";

const FileInput = (props) => {
  const { slideNum, addImagesToSlide } = props;

  const [images, setImages] = useState([]);
  const [isImagesAdded, setIsImagesAdded] = useState(false);

  const handleFileChange = (event) => {
    let fileArray = [];
    for (let i = 0; i < event.target.files.length; i++) {
      const fls = event.target.files[i];
      fileArray.push("wadouri:" + URL.createObjectURL(fls));
    }

    if (!window.confirm("Are you sure to add theses images?")) {
      return;
    }
    setImages(fileArray);
  };

  //send images back to parent(here App.js) where this component is loaded
  const handleAddImagesToSlide = () => {
    if (images.length > 0) {
      addImagesToSlide(slideNum, images);
      setIsImagesAdded(true);
      setImages([]);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "90%" }}>
      {!isImagesAdded && (
        <>
          <h5>select images for Slide {slideNum}</h5>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input
              type="file"
              max="5"
              min="1"
              onChange={handleFileChange}
              multiple
            />
            <button type="button" onClick={handleAddImagesToSlide}>
              Add Images
            </button>
          </div>
        </>
      )}
      {isImagesAdded && <p>Images added to Slide {slideNum}</p>}
    </div>
  );
};

export default FileInput;
