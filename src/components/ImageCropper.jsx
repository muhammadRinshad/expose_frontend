
// import Cropper from "react-easy-crop";
// import { useState } from "react";
// import "../styles/imageCropper.css";

// export default function ImageCropper({ image, onCropDone, onCancel }) {
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

//   const onCropComplete = (_, croppedPixels) => {
//     setCroppedAreaPixels(croppedPixels);
//   };

//   return (
//     <div className="cropper-overlay">
//       <div className="cropper-box">

//         {/* FIXED HEIGHT CONTAINER */}
//         <div>
//           <Cropper
//             image={image}
//             crop={crop}
//             zoom={zoom}
//             aspect={1}
//             cropShape="round"
//             onCropChange={setCrop}
//             onZoomChange={setZoom}
//             onCropComplete={onCropComplete}
//           />
//         </div>

//         <input
//           type="range"
//           min={1}
//           max={3}
//           step={0.1}
//           value={zoom}
//           onChange={(e) => setZoom(e.target.value)}
//         />

//         <div className="cropper-actions">
//           <button type="button" onClick={onCancel}>
//             Cancel
//           </button>
//           <button
//             type="button"
//             onClick={() => onCropDone(croppedAreaPixels)}
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
import Cropper from "react-easy-crop";
import { useState } from "react";
import "../styles/imageCropper.css";

export default function ImageCropper({ image, onCropDone, onCancel }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = (_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  };

  return (
    <div className="cropper-overlay">
      <div className="cropper-box">
        <h3 className="cropper-title">Edit Profile Picture</h3>

        {/* ✅ FIXED: Added 'cropper-container' class to provide height and relative positioning */}
        <div className="cropper-container" style={{ height: "300px", position: "relative" }}>
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        {/* ✅ ZOOM CONTROL - Styled using your CSS classes */}
        <div className="cropper-zoom">
          <span>Zoom</span>
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
          />
        </div>

        {/* ✅ ACTIONS - Properly labeled with your existing CSS classes */}
        <div className="cropper-actions">
          <button 
            type="button" 
            className="cropper-cancel" 
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="cropper-done"
            onClick={() => onCropDone(croppedAreaPixels)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}