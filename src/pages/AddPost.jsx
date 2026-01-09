
// // // import { useState } from "react";
// // // import API from "../api/axios";
// // // import PostImageCropper from "../components/PostImageCropper";
// // // import getCroppedImg from "../utils/cropImage";
// // // import { useNavigate } from "react-router-dom";

// // // export default function AddPost() {
// // //   const navigate = useNavigate();

// // //   const [rawImage, setRawImage] = useState(null);
// // //   const [croppedImage, setCroppedImage] = useState(null);
// // //   const [previewURL, setPreviewURL] = useState(null); // ✅ added
// // //   const [showCropper, setShowCropper] = useState(false);
// // //   const [caption, setCaption] = useState("");
// // //   const [loading, setLoading] = useState(false);

// // //   // 📁 IMAGE PICK
// // //   const handleFile = (e) => {
// // //     const file = e.target.files[0];
// // //     if (!file) return;

// // //     const reader = new FileReader();
// // //     reader.onload = () => {
// // //       setRawImage(reader.result);
// // //       setShowCropper(true);
// // //     };
// // //     reader.readAsDataURL(file);
// // //   };

// // //   // ✂️ CROP DONE
// // //   const onCropDone = async (cropPixels) => {
// // //     const blob = await getCroppedImg(rawImage, cropPixels);

// // //     setCroppedImage(blob);
// // //     setPreviewURL(URL.createObjectURL(blob)); // ✅ preview
// // //     setShowCropper(false);
// // //   };

// // //   // 🚀 POST SUBMIT
// // //   const submitPost = async () => {
// // //     if (!croppedImage) return;

// // //     setLoading(true);
// // //     const formData = new FormData();
// // //     formData.append("image", croppedImage);
// // //     formData.append("caption", caption);

// // //     try {
// // //       await API.post("/posts", formData, {
// // //         withCredentials: true,
// // //       });
// // //       navigate("/");
// // //     } catch (err) {
// // //       console.error(err);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="add-post page-wrapper">
// // //       <h1>Create Post</h1>

// // //       {/* 📤 UPLOAD */}
// // //       {!croppedImage ? (
// // //         <label className="upload-box">
// // //           Select Image
// // //           <input type="file" accept="image/*" hidden onChange={handleFile} />
// // //         </label>
// // //       ) : (
// // //         <>
// // //           {/* 📸 INSTAGRAM STYLE PREVIEW */}
// // //           <div className="post-preview-card">
// // //             <div className="post-preview-header">
// // //               <div className="avatar"></div>
// // //               <span className="username">devil_wolf</span>
// // //             </div>

// // //             <img
// // //               src={previewURL}
// // //               className="post-preview-image"
// // //               alt="preview"
// // //             />

// // //             {caption && (
// // //               <div className="post-preview-caption">
// // //                 <strong>devil_wolf</strong> {caption}
// // //               </div>
// // //             )}
// // //           </div>

// // //           {/* ✏️ CAPTION */}
// // //           <textarea
// // //             placeholder="Write a caption..."
// // //             value={caption}
// // //             onChange={(e) => setCaption(e.target.value)}
// // //           />

// // //           {/* 🚀 POST */}
// // //           <button onClick={submitPost} disabled={loading}>
// // //             {loading ? "Posting..." : "Post"}
// // //           </button>
// // //         </>
// // //       )}

// // //       {/* ✂️ CROPPER */}
// // //       {showCropper && (
// // //         <PostImageCropper
// // //           image={rawImage}
// // //           onCropDone={onCropDone}
// // //           onCancel={() => setShowCropper(false)}
// // //         />
// // //       )}
// // //     </div>
// // //   );
// // // }
// // import { useState } from "react";
// // import API from "../api/axios";
// // import PostImageCropper from "../components/PostImageCropper";
// // import getCroppedImg from "../utils/cropImage";
// // import { useNavigate } from "react-router-dom";

// // export default function AddPost() {
// //   const navigate = useNavigate();

// //   const [rawImages, setRawImages] = useState([]);      // 🔥 queue
// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const [croppedImages, setCroppedImages] = useState([]);
// //   const [previewURLs, setPreviewURLs] = useState([]);
// //   const [showCropper, setShowCropper] = useState(false);
// //   const [caption, setCaption] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   // 📁 PICK MULTIPLE FILES
// //   const handleFiles = (e) => {
// //     const files = Array.from(e.target.files);
// //     if (!files.length) return;

// //     Promise.all(
// //       files.map(
// //         (file) =>
// //           new Promise((resolve) => {
// //             const reader = new FileReader();
// //             reader.onload = () => resolve(reader.result);
// //             reader.readAsDataURL(file);
// //           })
// //       )
// //     ).then((images) => {
// //       setRawImages(images);
// //       setCurrentIndex(0);
// //       setShowCropper(true);
// //     });
// //   };

// //   // ✂️ CROP EACH IMAGE
// //   const onCropDone = async (cropPixels) => {
// //     const blob = await getCroppedImg(rawImages[currentIndex], cropPixels);

// //     setCroppedImages((prev) => [...prev, blob]);
// //     setPreviewURLs((prev) => [...prev, URL.createObjectURL(blob)]);

// //     if (currentIndex + 1 < rawImages.length) {
// //       setCurrentIndex(currentIndex + 1);
// //     } else {
// //       setShowCropper(false);
// //     }
// //   };

// //   // 🚀 SUBMIT POST
// //   const submitPost = async () => {
// //     if (!croppedImages.length) return;

// //     setLoading(true);
// //     const formData = new FormData();

// //     croppedImages.forEach((img) => {
// //       formData.append("images", img);
// //     });

// //     formData.append("caption", caption);

// //     try {
// //       await API.post("/posts", formData, { withCredentials: true });
// //       navigate("/");
// //     } catch (err) {
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="add-post page-wrapper">
// //       <h1>Create Post</h1>

// //       {!croppedImages.length ? (
// //         <label className="upload-box">
// //           Select Images
// //           <input
// //             type="file"
// //             accept="image/*"
// //             multiple
// //             hidden
// //             onChange={handleFiles}
// //           />
// //         </label>
// //       ) : (
// //         <>
// //           {/* 📸 PREVIEW CAROUSEL */}
// //           <div className="post-preview-carousel">
// //             {previewURLs.map((url, i) => (
// //               <img key={i} src={url} className="post-preview-image" />
// //             ))}
// //           </div>

// //           <textarea
// //             placeholder="Write a caption..."
// //             value={caption}
// //             onChange={(e) => setCaption(e.target.value)}
// //           />

// //           <button onClick={submitPost} disabled={loading}>
// //             {loading ? "Posting..." : "Post"}
// //           </button>
// //         </>
// //       )}

// //       {showCropper && (
// //         <PostImageCropper
// //           image={rawImages[currentIndex]}
// //           onCropDone={onCropDone}
// //           onCancel={() => setShowCropper(false)}
// //         />
// //       )}
// //     </div>
// //   );
// // }
// import { useState, useRef } from "react";
// import API from "../api/axios";
// import PostImageCropper from "../components/PostImageCropper";
// import getCroppedImg from "../utils/cropImage";
// import { useNavigate } from "react-router-dom";

// export default function AddPost() {
//   const navigate = useNavigate();
//   const fileInputRef = useRef(null);

//   const [rawImages, setRawImages] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [croppedImages, setCroppedImages] = useState([]);
//   const [previewURLs, setPreviewURLs] = useState([]);
//   const [showCropper, setShowCropper] = useState(false);
//   const [caption, setCaption] = useState("");
//   const [loading, setLoading] = useState(false);

//   // 📁 PICK FILES (INITIAL + ADD MORE)
//   const handleFiles = (e) => {
//     const files = Array.from(e.target.files);
//     if (!files.length) return;

//     Promise.all(
//       files.map(
//         (file) =>
//           new Promise((resolve) => {
//             const reader = new FileReader();
//             reader.onload = () => resolve(reader.result);
//             reader.readAsDataURL(file);
//           })
//       )
//     ).then((images) => {
//       setRawImages((prev) => [...prev, ...images]);
//       setShowCropper(true);
//     });
//   };

//   // ✂️ CROP EACH IMAGE
//   const onCropDone = async (cropPixels) => {
//     const blob = await getCroppedImg(rawImages[currentIndex], cropPixels);

//     setCroppedImages((prev) => [...prev, blob]);
//     setPreviewURLs((prev) => [...prev, URL.createObjectURL(blob)]);

//     if (currentIndex + 1 < rawImages.length) {
//       setCurrentIndex((i) => i + 1);
//     } else {
//       setShowCropper(false);
//     }
//   };

//   // 🚀 SUBMIT POST
//   const submitPost = async () => {
//     if (!croppedImages.length) return;

//     setLoading(true);
//     const formData = new FormData();
//     croppedImages.forEach((img) => formData.append("images", img));
//     formData.append("caption", caption);

//     try {
//       await API.post("/posts", formData, { withCredentials: true });
//       navigate("/");
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="add-post page-wrapper">
//       <h1>Create Post</h1>

//       {!croppedImages.length ? (
//         <label className="upload-box">
//           Select Images
//           <input
//             type="file"
//             accept="image/*"
//             multiple
//             hidden
//             onChange={handleFiles}
//           />
//         </label>
//       ) : (
//         <>
//           {/* 📸 PREVIEW */}
//           <div className="post-preview-carousel">
//             {previewURLs.map((url, i) => (
//               <img key={i} src={url} className="post-preview-image" />
//             ))}
//           </div>

//           {/* ➕ ADD MORE PHOTOS */}
//           <button
//             className="add-more-btn"
//             onClick={() => fileInputRef.current.click()}
//           >
//             ➕ Add more photos
//           </button>

//           <input
//             type="file"
//             accept="image/*"
//             multiple
//             hidden
//             ref={fileInputRef}
//             onChange={handleFiles}
//           />

//           <textarea
//             placeholder="Write a caption..."
//             value={caption}
//             onChange={(e) => setCaption(e.target.value)}
//           />

//           <button onClick={submitPost} disabled={loading}>
//             {loading ? "Posting..." : "Post"}
//           </button>
//         </>
//       )}

//       {showCropper && (
//         <PostImageCropper
//           image={rawImages[currentIndex]}
//           onCropDone={onCropDone}
//           onCancel={() => setShowCropper(false)}
//         />
//       )}
//     </div>
//   );
// }
import { useState, useRef } from "react";
import API from "../api/axios";
import PostImageCropper from "../components/PostImageCropper";
import getCroppedImg from "../utils/cropImage";
import { useNavigate } from "react-router-dom";

export default function AddPost() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const [rawImages, setRawImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]); // ✅ { id, blob, preview }
  const [showCropper, setShowCropper] = useState(false);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  // 📁 PICK FILES
  const handleFiles = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    Promise.all(
      files.map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(file);
          })
      )
    ).then((images) => {
      setRawImages((prev) => [...prev, ...images]);
      setShowCropper(true);
    });
  };

  // ✂️ CROP
  const onCropDone = async (cropPixels) => {
    const blob = await getCroppedImg(rawImages[currentIndex], cropPixels);

    setImages((prev) => [
      ...prev,
      {
        id: Date.now(),
        blob,
        preview: URL.createObjectURL(blob)
      }
    ]);

    if (currentIndex + 1 < rawImages.length) {
      setCurrentIndex((i) => i + 1);
    } else {
      setShowCropper(false);
      setRawImages([]);
      setCurrentIndex(0);
    }
  };

  // ❌ REMOVE IMAGE
  const removeImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  // 🔀 DRAG REORDER
  const handleSort = () => {
    const items = [...images];
    const dragged = items.splice(dragItem.current, 1)[0];
    items.splice(dragOverItem.current, 0, dragged);
    dragItem.current = null;
    dragOverItem.current = null;
    setImages(items);
  };

  // 🚀 SUBMIT
  const submitPost = async () => {
    if (!images.length) return;

    setLoading(true);
    const formData = new FormData();
    images.forEach((img) => formData.append("images", img.blob));
    formData.append("caption", caption);

    try {
      await API.post("/posts", formData, { withCredentials: true });
      navigate("/");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-post page-wrapper">
      <h1>Create Post</h1>

      {!images.length ? (
        <label className="upload-box">
          Select Images
          <input
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={handleFiles}
          />
        </label>
      ) : (
        <>
          {/* ▶️ SWIPE + DRAG PREVIEW */}
          <div className="post-preview-carousel">
            {images.map((img, index) => (
              <div
                key={img.id}
                className="post-preview-item"
                draggable
                onDragStart={() => (dragItem.current = index)}
                onDragEnter={() => (dragOverItem.current = index)}
                onDragEnd={handleSort}
                onDragOver={(e) => e.preventDefault()}
              >
                <img src={img.preview} alt="preview" />
                <button
                  className="remove-btn"
                  onClick={() => removeImage(img.id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* ➕ ADD MORE */}
          <button
            className="add-more-btn"
            onClick={() => fileInputRef.current.click()}
          >
            ➕ Add more photos
          </button>

          <input
            type="file"
            accept="image/*"
            multiple
            hidden
            ref={fileInputRef}
            onChange={handleFiles}
          />

          <textarea
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />

          <button onClick={submitPost} disabled={loading}>
            {loading ? "Posting..." : "Post"}
          </button>
        </>
      )}

      {showCropper && (
        <PostImageCropper
          image={rawImages[currentIndex]}
          onCropDone={onCropDone}
          onCancel={() => setShowCropper(false)}
        />
      )}
    </div>
  );
}
