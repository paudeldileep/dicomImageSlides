import CornerstoneViewport from "react-cornerstone-viewport";

const DicomViewPort = (props) => {
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
    />
  );
};

export default DicomViewPort;
