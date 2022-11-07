import CornerstoneViewport from "react-cornerstone-viewport";
import cornerstone from "cornerstone-core";
import cornerstoneTools from "cornerstone-tools";

import { useState } from "react";

const DicomViewPort = (props) => {
  const [element, setElement] = useState();
  return (
    <CornerstoneViewport
      tools={[
        { name: "StackScrollMouseWheel", mode: "active" },
        {
          name: "Wwwc",
          mode: "active",
          modeOptions: { mouseButtonMask: 1 },
        },
        {
          name: "Zoom",
          mode: "active",
          modeOptions: { mouseButtonMask: 2 },
        },
        {
          name: "Pan",
          mode: "active",
          modeOptions: { mouseButtonMask: 4 },
        },
        { name: "PanMultiTouch", mode: "active" },
        { name: "ZoomTouchPinch", mode: "active" },
        { name: "StackScrollMultiTouch", mode: "active" },
      ]}
      style={props.containerStyle}
      imageIds={props.imageIds}
      imageIdIndex={0}
      activeTool={"Pan"}
      onElementEnabled={(elementEnabledEvt) => {
        const cornerstoneElement = elementEnabledEvt.detail.element;

        // Save this for later
        setElement(cornerstoneElement);

        // Wait for image to render, then invert it
        cornerstoneElement.addEventListener(
          "cornerstoneimagerendered",
          (imageRenderedEvent) => {
            // const viewport = imageRenderedEvent.detail.viewport;
            // const invertedViewport = Object.assign({}, viewport, {
            //   invert: true,
            // });

            // cornerstone.setViewport(cornerstoneElement, invertedViewport);
            console.log("element:", imageRenderedEvent.detail);
            // var canvasElement = imageRenderedEvent.detail.element.firstChild;

            // var MIME_TYPE = "image/png";

            // var imgURL = canvasElement.toDataURL(MIME_TYPE);

            // var dlLink = document.createElement("a");
            // dlLink.download = "test";
            // dlLink.href = imgURL;
            // dlLink.dataset.downloadurl = [
            //   MIME_TYPE,
            //   dlLink.download,
            //   dlLink.href,
            // ].join(":");

            // document.body.appendChild(dlLink);
            // dlLink.click();
            // document.body.removeChild(dlLink);
          }
        );
      }}
    />
  );
};

export default DicomViewPort;
