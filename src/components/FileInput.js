import { useState } from "react";

const FileInput = (props) => {
  const { slideNum, addImagesToSlide } = props;

  const [images, setImages] = useState();
  const [isImagesAdded, setIsImagesAdded] = useState(false);

  const handleFileChange = (event) => {
    if (event.target.files.length > 5) {
      window.alert("Please select maximum 5 images");
      return;
    }

    setImages(event.target.files);
  };

  //send images back to parent(here App.js) where this component is loaded
  const handleAddImagesToSlide = () => {
    if (!window.confirm("Are you sure to add theses images?")) {
      return;
    }
    if (images.length > 1 && images.length <= 5) {
      addImagesToSlide(slideNum, images);
      setIsImagesAdded(true);
      setImages();
    } else {
      window.alert("Maximum 5 and minimum 2 images is required");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "90%",
        marginBottom: "10px",
      }}
    >
      {!isImagesAdded && (
        <>
          <h5>select images for Slide {slideNum} (min:2,max:5)</h5>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <input
              type="file"
              max="5"
              min="1"
              onChange={handleFileChange}
              multiple
              accept=".dcm,image/dicom-rle"
            />
            <button
              className="button_normal"
              style={{
                width: "100px",
                height: "25px",
                marginLeft: "20px",
              }}
              type="button"
              onClick={handleAddImagesToSlide}
            >
              Add Images
            </button>
          </div>
        </>
      )}
      {isImagesAdded && (
        <p className="text_success">Images added to Slide {slideNum + 1}</p>
      )}
    </div>
  );
};

export default FileInput;
