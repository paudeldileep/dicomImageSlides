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
      ]}
      style={props.containerStyle}
      imageIds={props.imageIds}
      imageIdIndex={0}
    />
  );
};

export default DicomViewPort;
