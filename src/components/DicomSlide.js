import { useState } from "react";
import pptxgen from "pptxgenjs";
import DicomViewPort from "./DicomViewPort";

const DicomSlide = ({
  imageFiles,
  slideNum,
  handleRemoveSlide,
  addNewImages,
}) => {
  // handle addition of new images to the slide
  const [newImages, setNewImages] = useState();
  const [loading, setLoading] = useState(false);

  const handleAddNewImages = (event) => {
    if (event.target.files.length > 5) {
      window.alert("Please select maximum 5 images only");
      return;
    }
    if (event.target.files.length + imageFiles.length > 5) {
      window.alert("Error:Maximum 5 images per slide is allowed");
      return;
    }

    setNewImages(event.target.files);
  };

  const sendNewImages = () => {
    if (newImages.length > 5 || newImages.length < 1) {
      window.alert("Please select upto 5 images");
      return;
    }
    if (newImages.length + imageFiles.length > 5) {
      window.alert("Error:Maximum 5 images per slide is allowed");
      return;
    }
    if (!window.confirm("Are you sure to add theses images?")) {
      return;
    }
    setLoading(true);
    addNewImages(slideNum, newImages);
    setTimeout(() => {
      setLoading(false);
      window.alert("New Images added to slide");
    }, 2000);
  };

  // download a slide
  const handleDownload = () => {
    // var JSZip = require("jszip");
    // let zip = new JSZip();

    // for (let i = 0; i < imageFiles.length; i++) {
    //   let file = "http://localhost:" + imageFiles[i].split(":")[4];
    //   zip.file(i + ".dcm", file);
    //   //console.log("file:", "http://localhost:" + imageFiles[i].split(":")[4]);
    // }

    // zip
    //   .generateAsync({
    //     type: "blob",
    //   })
    //   .then((content) => {
    //     saveAs(content, `slides_${slideNum}.zip`);
    //   });

    //create ppt and download
    let pptx = new pptxgen();
    let slide1 = pptx.addSlide();
    slide1.addText(`Dicom Slide ${slideNum}`, {
      x: "10%",
      y: "40%",
      fontSize: 24,
    });

    for (let i = 0; i < imageFiles.length; i++) {
      let slide = pptx.addSlide();
      slide.addImage({
        type: "image/jpg",
        path: imageFiles[i].replace("wadouri:", ""),
        x: "10%",
        y: "10%",
        w: "80%",
        h: "80%",
      });
      slide.slideNumber = { x: 1.0, y: "97%" };
    }

    pptx.writeFile({ fileName: `Dicom-slide-${slideNum}` });
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
          height: "110px",
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
            marginTop: "-5px",
          }}
        >
          <p className="text_normal">Slide: {parseInt(slideNum) + 1}</p>
          {loading && <p className="text_success">Adding Images...</p>}
          {!loading && <p>Total Images:{imageFiles.length}</p>}
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
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "-5px" }}
          >
            <span className="text_bold">Add New images to slide:</span>
            <input
              type="file"
              onChange={handleAddNewImages}
              multiple
              accept=".dcm,image/dicom-rle"
            />
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
        <button
          style={{
            marginTop: "10px",
            width: "90%",
            backgroundColor: "white",
            color: "black",
          }}
          className="button_normal"
          onClick={handleDownload}
        >
          Download Slide
        </button>
      </div>
    </div>
  );
};

export default DicomSlide;
