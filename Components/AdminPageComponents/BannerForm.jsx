import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
// firebase imports
import { db, storage } from "../../Firebase";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
function BannerForm() {
  // UPLOAD FORM DETAILS TO FIREBASE
  // useform config
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  // BANNER POST
  const bannerFilePickerRef1 = useRef();
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [imageBase64Banner, setImageBase64Banner] = useState("");
  const [loadingBanner, setLoadingBannr] = useState(false);
  // image 1
  const uploadBannerImg = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ajis_store");

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/isreal/image/upload`,
        formData
      );

      return response.data.secure_url;
    } catch (error) {
      console.error("File upload failed:", error);
    }
  };
  const addImageToBanner = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = await uploadBannerImg(file);
      setImageBase64Banner(imageUrl);

      const reader = new FileReader();

      reader.onload = (readerEvent) => {
        const selectedFile = readerEvent.target.result;
        setSelectedBanner(selectedFile);
      };

      reader.readAsDataURL(file);
    }
  };

  const onSubmitBanner = async (data, e) => {
    e.preventDefault();
    if (loadingBanner) return;
    setLoadingBannr(true);

    const bannerDetails = {
      ...data,
      timestamp: serverTimestamp(),
      bannerimage: imageBase64Banner,
    };

    try {
      const colRef = collection(db, "banneritems");
      await addDoc(colRef, { ...bannerDetails });
      alert("Banner added successfully!");
    } catch (error) {
      console.error(error);
    }

    reset();
    setLoadingBannr(false);
    setSelectedBanner(null);
  };
  return (
    <div className="store-form-container">
      {" "}
      {/* BANNER POST */}
      <form onSubmit={handleSubmit(onSubmitBanner)}>
        {/* BANNER NAME */}
        <label>Banner Name</label>
        <input
          type="text"
          placeholder="Enter Banner Name"
          {...register("bannername", { required: true })}
        />
        {errors.bannername && (
          <span
            className="errror-msg"
            style={{
              fontSize: "12px",
              fontStyle: "italic",
              color: "red",
            }}
          >
            Kindly Enter Product Name
          </span>
        )}

        {/* PRODUCT CATEGORY */}
        <label>Banner Category</label>
        <select {...register("bannercategory", { required: true })}>
          <option value="">Select</option>
          <option value="shoe">Shoe</option>
          <option value="cloth">Cloth</option>
          <option value="phone">Phone</option>
        </select>
        {errors.bannercategory && (
          <span
            className="errror-msg"
            style={{
              fontSize: "12px",
              fontStyle: "italic",
              color: "red",
            }}
          >
            Kindly Enter Product Category
          </span>
        )}

        {/* BANNER DISCRIPTION */}
        <label>Banner Description</label>
        <input
          type="text"
          placeholder="Enter Banner Description"
          {...register("bannerscription", { required: true })}
        />
        {errors.bannerscription && (
          <span
            className="errror-msg"
            style={{
              fontSize: "12px",
              fontStyle: "italic",
              color: "red",
            }}
          >
            Kindly Enter Product Description
          </span>
        )}
        {/* BANNER IMAGE*/}
        <label>Banner Image</label>
        <p style={{ fontSize: "12px", fontStyle: "italic", color: "gray" }}>
          <span style={{ color: "red" }}>Note:</span> This images uploaded
          should be{" "}
          <span style={{ fontWeight: "bolder" }}> LandScape Dimension </span> 
          with product item aligned to the center
        </p>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {/* IMAGE 1 */}
          <input
            className="file-input"
            type="file"
            placeholder="Enter Product Number"
            ref={bannerFilePickerRef1}
            onChange={addImageToBanner}
          />
          <img
            src={selectedBanner}
            onClick={() => setSelectedFile1(null)}
            alt="img"
            style={{ width: "40px", marginBottom: "10px" }}
          />
        </div>
        <input
          type="submit"
          className="submit-btn"
          value={loadingBanner ? "Uploading..." : "Upload Banner"}
        />
      </form>
    </div>
  );
}

export default BannerForm;
