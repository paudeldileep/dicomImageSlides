import { useState } from "react";
import "./App.css";
import DicomSlide from "./components/DicomSlide";
import FileInput from "./components/FileInput";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function App() {
  const [numberOfSlides, setNumberOfSlides] = useState(1);
  const [isSlidesSet, setIsSlidesSet] = useState(false);
  const [generateSlides, setGenerateSlides] = useState(false);

  //loader component
  const [isLoading, setIsLoading] = useState(false);

  //images for each slide
  const [slideImages, setSlideImages] = useState({});

  //invoke when user changes required slide num
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

  //reset created slides , start over
  const handleResetSlides = () => {
    setIsSlidesSet(false);
    setNumberOfSlides(1);
    setSlideImages({});
    setGenerateSlides(false);
  };

  //add images to slide from the modal dialogue box
  const handleAddImagesToSlide = (slideNum, images) => {
    //update state with slideNum and images array
    setSlideImages({ ...slideImages, [slideNum]: images });
  };

  //creating slides
  const handleCreateSlides = () => {
    if (numberOfSlides !== Object.keys(slideImages).length) {
      window.alert("Please provide atleast one image to selected slides");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setGenerateSlides(true);
    }, 2000);
  };

  //remove a slide
  const handleRemoveSlide = (slideNum) => {
    if (slideImages.hasOwnProperty(slideNum)) {
      setSlideImages((prev) => {
        const copy = { ...prev };
        delete copy[slideNum];
        return copy;
      });

      if (Object.keys(slideImages).length == 1) {
        handleResetSlides();
      }
    } else {
      window.alert("Unable to delete the slide");
    }
  };

  //add new images to existing slide
  const handleAddNewImages = (slideNum, imgs) => {
    setSlideImages((prev) => {
      const copy = { ...prev };
      copy[slideNum] = [...prev[slideNum], ...imgs];
      return copy;
    });
  };

  //handle cancel button
  const handleCancelButton = () => {
    setIsSlidesSet(false);
  };

  return (
    <div className="App">
      <h2>Dicom Image Slides</h2>
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
            height: "80px",
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
                <p className="text_bold" style={{ marginRight: "10px" }}>
                  Please select number of slides required(max:5):
                </p>
                <input
                  type="number"
                  max="5"
                  min="1"
                  style={{ width: "50px", height: "20px", marginRight: "10px" }}
                  onChange={handleNumberChange}
                />
                <button
                  className="button_normal"
                  type="button"
                  onClick={handleAddSlidesNumber}
                >
                  Create
                </button>
              </>
            )}
            {isSlidesSet && (
              <>
                <button
                  className="button_cancel"
                  style={{ width: "100px", fontWeight: "bold" }}
                  type="button"
                  onClick={handleResetSlides}
                >
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
              marginTop: "100px",
              height: "100%",
            }}
          >
            <div
              style={{
                width: "70%",
                borderColor: "grey",
                borderWidth: "2px 2px",
                borderStyle: "solid",
                height: "550px",
                borderRadius: "5px",
                marginBottom: "40px",
              }}
            >
              {/* carousal for displaying each slides */}
              <Carousel
                centerMode={true}
                showArrows={true}
                showIndicators={false}
                swipeable={false}
                showThumbs={false}
              >
                {Object.keys(slideImages).map((key, index) => {
                  const imageFiles = slideImages[key];
                  return (
                    <DicomSlide
                      imageFiles={imageFiles}
                      slideNum={key}
                      handleRemoveSlide={handleRemoveSlide}
                      addNewImages={handleAddNewImages}
                    />
                  );
                })}
              </Carousel>
            </div>
          </div>
        )}
      </div>
      {/* modal for adding images to each slides at the beginning */}
      {isSlidesSet && !generateSlides && (
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
          <div className="button_group">
            <button
              type="button"
              className="button_normal"
              style={{
                width: "100px",
                marginRight: "20px",
                marginLeft: "-50px",
              }}
              onClick={handleCreateSlides}
            >
              Create Slides
            </button>
            <button
              type="button"
              className="button_cancel"
              onClick={handleCancelButton}
            >
              Cancel
            </button>
          </div>
          <div>
            {isLoading && <h4 className="text_success">Creating slides...</h4>}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
