import Cropper from "react-easy-crop";
import { useState } from "react";
import "../styles/imageCropper.css";

const ASPECTS = {
  // square: 1 / 1,
  portrait: 4 / 5,
  // landscape: 16 / 9
};

export default function PostImageCropper({
  image,
  onCropDone,
  onCancel
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(ASPECTS.square);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = (_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  };

  return (
    <div className="cropper-overlay">
      <div className="cropper-box">

        <h3 className="cropper-title">Crop Post</h3>

        <div className="cropper-container">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            cropShape="rect"     // 🔥 IMPORTANT
            showGrid={true}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        {/* 🔄 ASPECT RATIO SWITCH */}
        <div className="cropper-ratios">
          {/* <button onClick={() => setAspect(ASPECTS.square)}>1:1</button> */}
          {/* <button onClick={() => setAspect(ASPECTS.portrait)}>4:5</button> */}
          {/* <button onClick={() => setAspect(ASPECTS.landscape)}>16:9</button> */}
        </div>

        {/* 🔍 ZOOM */}
        <div className="cropper-zoom">
          <span>Zoom</span>
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(e.target.value)}
          />
        </div>

        {/* 🎯 ACTIONS */}
        <div className="cropper-actions">
          <button className="cropper-cancel" onClick={onCancel}>
            Cancel
          </button>

          <button
            className="cropper-done"
            onClick={() => onCropDone(croppedAreaPixels)}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
