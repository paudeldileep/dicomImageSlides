import { useState } from "react";
import "./App.css";
import DicomSlide from "./components/DicomSlide";
import FileInput from "./components/FileInput";

function App() {
  const [numberOfSlides, setNumberOfSlides] = useState(1);
  const [isSlidesSet, setIsSlidesSet] = useState(false);
  const [generateSlides, setGenerateSlides] = useState(false);

  //images for each slide
  const [slideImages, setSlideImages] = useState({});

  const handleNumberChange = (event) => {
    const slidesNum = event.target.value;
    console.log(slidesNum);
    setNumberOfSlides(parseInt(slidesNum));
  };

  const handleAddSlidesNumber = () => {
    if (numberOfSlides > 0 && numberOfSlides <= 5) {
      setIsSlidesSet(true);
    } else {
      window.alert("Please select upto 5 slides");
    }
  };

  const handleResetSlides = () => {
    setIsSlidesSet(false);
    setNumberOfSlides(1);
  };

  const handleAddImagesToSlide = (slideNum, images) => {
    //update state with slideNum and images array

    setSlideImages({ ...slideImages, [slideNum]: images });
  };

  //creating slides
  const handleCreateSlides = () => {
    setGenerateSlides(true);
    setIsSlidesSet(false);
  };

  console.log("slide images", slideImages);

  return (
    <div className="App">
      <h1>Dicom Image Slides</h1>
      {/* seperator */}
      <div style={{ height: "2px", backgroundColor: "grey" }}></div>

      {/* main container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "85vh",
          width: "100%",
          position: "relative",
        }}
      >
        {/* options to select no.of slides */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: "5px",
            height: "100px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "80%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {!isSlidesSet && !generateSlides && (
              <>
                <p>Please select number of slides required(max:5):</p>
                <input
                  type="number"
                  max="5"
                  min="1"
                  style={{ width: "50px", height: "20px", marginRight: "10px" }}
                  onChange={handleNumberChange}
                />
                <button type="button" onClick={handleAddSlidesNumber}>
                  Create
                </button>
              </>
            )}
            {isSlidesSet && (
              <>
                <button type="button" onClick={handleResetSlides}>
                  Reset Slides
                </button>
              </>
            )}
          </div>
        </div>
        {/* slides area */}
        {generateSlides && Object.keys(slideImages).length !== 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              marginTop: "110px",
              border: "1px solid red",
            }}
          >
            {Object.keys(slideImages).map((key, index) => {
              const imageFiles = slideImages[key];
              return <DicomSlide imageFiles={imageFiles} slideNum={key} />;
            })}
          </div>
        )}
      </div>
      {/* modal for adding images to each slides at the beginning */}
      {isSlidesSet && (
        <div
          style={{
            position: "absolute",
            height: "80%",
            width: "80%",
            top: "10%",
            zIndex: "10",
            alignSelf: "center",
            justifySelf: "center",
          }}
          className="blur"
        >
          <h3>Add Images to the slides(max 5 per slide)</h3>
          {Array.from(Array(numberOfSlides).keys()).map((item, index) => (
            <div key={index}>
              <FileInput
                slideNum={index}
                addImagesToSlide={handleAddImagesToSlide}
              />
            </div>
          ))}
          <button type="button" onClick={handleCreateSlides}>
            Create Slides
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
