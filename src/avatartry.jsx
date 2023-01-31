import { Box, styled } from "@mui/material";
import AvatarEditor from "react-avatar-editor";
import Dropzone from "react-dropzone";
// import Preview from "./Preview.js";
import Navbar from "./components/Navbar";
import React, { useState } from "react";

export const WrapperBox = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  width: "calc(100% -15px)",
  border: "1px solid rgba(50, 50, 50, .2) ",
  borderRadius: "10px",
  padding: "15px",
}));

function App() {
  // React.useEffect(() => {
  //   checkLoggedInUser();
  // }, []);

  const [image, setImage] = useState();
  const [allowZoomOut, setAllowZoomOut] = useState(false);
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [borderRadius, setBorderRadius] = useState(0);
  const [preview, setPreview] = useState();
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);
  const [disableCanvasRotation, setDisableCanvasRotation] = useState(false);
  const [isTransparent, setIsTransparent] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState();
  const [showGrid, setShowGrid] = useState(false);

  const editorRef = React.useRef < AvatarEditor > null;

  const handleNewImage = (e) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSave = () => {
    const img = editorRef.current?.getImageScaledToCanvas().toDataURL();
    const rect = editorRef.current?.getCroppingRect();

    if (!img || !rect) return;

    setPreview({
      img,
      rect,
      scale: scale,
      width: width,
      height: height,
      borderRadius: borderRadius,
    });
  };
  const handleScale = (e) => {
    setScale(parseFloat(e.target.value));
  };

  const handleAllowZoomOut = (e) => {
    setAllowZoomOut(e.target.checked);
  };

  const handleDisableCanvasRotation = (e) => {
    setDisableCanvasRotation(e.target.checked);
  };

  const rotateScale = (e) => {
    e.preventDefault();
    setRotate(parseFloat(e.target.value));
  };

  const rotateLeft = (e) => {
    e.preventDefault();
    setRotate((rotate - 90) % 360);
  };

  const rotateRight = (e) => {
    e.preventDefault();
    setRotate((rotate + 90) % 360);
  };

  const handleBorderRadius = (e) => {
    setBorderRadius(parseInt(e.target.value));
  };

  const handleXPosition = (e) => {
    setPosition({ ...position, x: parseFloat(e.target.value) });
  };

  const handleYPosition = (e) => {
    setPosition({ ...position, y: parseFloat(e.target.value) });
  };

  const handleWidth = (e) => {
    setWidth(parseInt(e.target.value));
  };

  const handleHeight = (e) => {
    setHeight(parseInt(e.target.value));
  };

  const logCallback = (e) => {
    console.log("callback", e);
  };

  const handlePositionChange = (changedPosition) => {
    setPosition(changedPosition);
  };

  const setBackgroundColorFunc = (e) => {
    setBackgroundColor(e.target.value);
  };

  const setTransparent = (e) => {
    const isTransparent = e.target.checked;
    const backgroundColor = isTransparent ? "#fff" : undefined;
    setIsTransparent(backgroundColor, isTransparent);
  };

  const handleShowGrid = (e) => setShowGrid(e.target.checked);

  return (
    <Box>
      <Navbar />
      {/* <Box width="100%" maxWidth="1100px" margin="0 auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Box> */}
      <div>
        <Dropzone
          onDrop={([image]) => setImage(image)}
          noClick
          multiple={false}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="preview">
              <AvatarEditor
                ref={editorRef}
                scale={scale}
                width={width}
                height={height}
                position={position}
                showGrid={showGrid}
                onPositionChange={handlePositionChange}
                rotate={rotate}
                borderRadius={width / (100 / borderRadius)}
                backgroundColor={backgroundColor}
                onLoadFailure={logCallback.bind(this, "onLoadFailed")}
                onLoadSuccess={logCallback.bind(this, "onLoadSuccess")}
                onImageReady={logCallback.bind(this, "onImageReady")}
                image={image}
                disableCanvasRotation={disableCanvasRotation}
              />
              <input
                name="newImage"
                type="file"
                onChange={handleNewImage}
                {...getInputProps()}
              />
            </div>
          )}
        </Dropzone>
        <br />
        <h3>Props</h3>
        Zoom:{" "}
        <input
          name="scale"
          type="range"
          onChange={handleScale}
          min={allowZoomOut ? "0.1" : "1"}
          max="2"
          step="0.01"
          defaultValue="1"
        />
        <br />
        {"Allow Scale < 1"}
        <input
          name="allowZoomOut"
          type="checkbox"
          onChange={handleAllowZoomOut}
          checked={allowZoomOut}
        />
        <br />
        Show grid:{" "}
        <input type="checkbox" checked={showGrid} onChange={handleShowGrid} />
        <br />
        Border radius:
        <input
          name="scale"
          type="range"
          onChange={handleBorderRadius}
          min="0"
          max="50"
          step="1"
          defaultValue="0"
        />
        <br />
        Avatar Width:
        <input
          name="width"
          type="number"
          onChange={handleWidth}
          min="50"
          max="400"
          step="10"
          value={width}
        />
        <br />
        Avatar Height:
        <input
          name="height"
          type="number"
          onChange={handleHeight}
          min="50"
          max="400"
          step="10"
          value={height}
        />
        <br />
        Rotate:
        <button onClick={rotateLeft}>Left</button>
        <button onClick={rotateRight}>Right</button>
        <br />
        Disable Canvas Rotation
        <input
          name="disableCanvasRotation"
          type="checkbox"
          onChange={handleDisableCanvasRotation}
          checked={disableCanvasRotation}
        />
        <br />
        Rotation:
        <input
          name="rotation"
          type="range"
          onChange={rotateScale}
          min="0"
          max="180"
          step="1"
          defaultValue="0"
        />
        <br />
        Transparent image?
        <input
          type="checkbox"
          onChange={setTransparent}
          defaultChecked={isTransparent}
        ></input>
        <br />
        {isTransparent && (
          <div style={{ marginLeft: "1rem" }}>
            Background color:
            <input
              name="backgroundColor"
              type="color"
              defaultValue={backgroundColor}
              onChange={setBackgroundColor}
            />
            <br />
          </div>
        )}
        <br />
        <input type="button" onClick={handleSave} value="Preview" />
        <br />
        {preview && (
          <>
            <img
              alt=""
              src={preview.img}
              style={{
                borderRadius: `${
                  (Math.min(preview.height, preview.width) + 10) *
                  (preview.borderRadius / 2 / 100)
                }px`,
              }}
            />
            {/* <Preview
              width={
                preview.scale < 1 ? preview.width : (preview.height * 478) / 270
              }
              height={preview.height}
              image={image}
              rect={preview.rect}
            /> */}
          </>
        )}
      </div>
    </Box>
  );
}

export default App;
