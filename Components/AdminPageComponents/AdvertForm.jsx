import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
// firebase imports
import { db, storage } from "../../Firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import tester from "../AdminPageComponents/StoreItems";
function AdvertForm({ advertDetails }) {
  // GENERATE IMAGE REVIEW
  const filePickerRef1 = useRef("");
  const filePickerRef2 = useRef("");
  const filePickerRef3 = useRef("");
  const filePickerRef4 = useRef("");
  const [selectedFile1, setSelectedFile1] = useState("");
  const [imageBase64File1, setImageBase64File1] = useState("");
  const [selectedFile2, setSelectedFile2] = useState("");
  const [imageBase64File2, setImageBase64File2] = useState("");
  const [selectedFile3, setSelectedFile3] = useState("");
  const [imageBase64File3, setImageBase64File3] = useState("");
  const [selectedFile4, setSelectedFile4] = useState("");
  const [imageBase64File4, setImageBase64File4] = useState("");

  // CONVERT ALL IMAGE FILE TO BASE 64 STRING AND CREATE PREVIEW

  // image 1
  const uploadFile1 = async (file) => {
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
  const addImageToPost1 = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = await uploadFile1(file);
      setImageBase64File1(imageUrl);

      const reader = new FileReader();

      reader.onload = (readerEvent) => {
        const selectedFile = readerEvent.target?.result;
        setSelectedFile1(selectedFile);
      };

      reader.readAsDataURL(file);
    }
  };
  // image 2
  const uploadFile2 = async (file) => {
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
  const addImageToPost2 = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = await uploadFile2(file);
      setImageBase64File2(imageUrl);

      const reader = new FileReader();

      reader.onload = (readerEvent) => {
        const selectedFile = readerEvent.target?.result;
        setSelectedFile2(selectedFile);
      };

      reader.readAsDataURL(file);
    }
  };
  // image 3
  const uploadFile3 = async (file) => {
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
  const addImageToPost3 = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = await uploadFile3(file);
      setImageBase64File3(imageUrl);

      const reader = new FileReader();

      reader.onload = (readerEvent) => {
        const selectedFile = readerEvent.target?.result;
        setSelectedFile3(selectedFile);
      };

      reader.readAsDataURL(file);
    }
  };
  // image 4
  const uploadFile4 = async (file) => {
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
  const addImageToPost4 = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = await uploadFile4(file);
      setImageBase64File4(imageUrl);

      const reader = new FileReader();

      reader.onload = (readerEvent) => {
        const selectedFile = readerEvent.target?.result;
        setSelectedFile4(selectedFile);
      };

      reader.readAsDataURL(file);
    }
  };
  // UPLOAD FORM DETAILS TO FIREBASE
  // useform config
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(true);
  const onSubmit = async (data, e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const productDetails = {
      ...data,
      timestamp: serverTimestamp(),
      image: [
        imageBase64File1,
        imageBase64File2,
        imageBase64File3,
        imageBase64File4,
      ],
    };

    try {
      const colRef = collection(db, "advert");
      await addDoc(colRef, { ...productDetails });
      alert("Advert uploaded successfully!");
    } catch (error) {
      console.error(error);
    }

    reset();
    // setFormShow(false);

    setLoading(false);
    setSelectedFile1("");
    setSelectedFile2("");
    setSelectedFile3("");
    setSelectedFile4("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* AD LINK */}
        <label>Advert Link</label>
        <input
          type="text"
          placeholder="www.example.com"
          {...register("adlink", { required: true })}
        />
        {errors.adlink && (
          <span
            className="errror-msg"
            style={{
              fontSize: "12px",
              fontStyle: "italic",
              color: "red",
            }}
          >
            Kindly Enter the Advert website or social media Link
          </span>
        )}

        {/* PRODUCT IMAGE*/}
        <label>Advert Images</label>
        <p style={{ fontSize: "12px", fontStyle: "italic", color: "gray" }}>
          <span style={{ color: "red" }}>Note:</span> This images uploaded
          should be
          <span style={{ fontWeight: "bolder" }}>Landscape Dimension</span> and
          all Ad image should have same with and height
        </p>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {/* IMAGE 1 */}
          <input
            className="file-input"
            type="file"
            placeholder="Enter Product Number"
            ref={filePickerRef1}
            onChange={addImageToPost1}
          />
          <img
            src={selectedFile1}
            onClick={() => setSelectedFile1("")}
            alt="img"
            style={{ width: "40px", marginBottom: "10px" }}
          />
          {/* IMAGE 2 */}
          <input
            className="file-input"
            type="file"
            placeholder="Enter Product Number"
            ref={filePickerRef2}
            onChange={addImageToPost2}
          />
          <img
            src={selectedFile2}
            onClick={() => setSelectedFile2("")}
            alt="img"
            style={{ width: "40px", marginBottom: "10px" }}
          />
          {/* IMAGE 3 */}
          <input
            className="file-input"
            type="file"
            placeholder="Enter Product Number"
            ref={filePickerRef3}
            onChange={addImageToPost3}
          />
          <img
            src={selectedFile3}
            onClick={() => setSelectedFile3("")}
            alt="img"
            style={{ width: "40px", marginBottom: "10px" }}
          />
          {/* IMAGE 4 */}
          <input
            className="file-input"
            type="file"
            placeholder="Enter Product Number"
            ref={filePickerRef4}
            onChange={addImageToPost4}
          />
          <img
            src={selectedFile4}
            onClick={() => setSelectedFile4("")}
            alt="img"
            style={{ width: "40px", marginBottom: "10px" }}
          />
        </div>
        {advertDetails.length === 1 ? (
          <>
            <p style={{ color: "red", fontStyle: "italic" }}>
              You already have an ad running, Delete add to add new one
            </p>
            <input
              //   type="submit"
              className="submit-btn"
              //   value={}
              disabled={true}
            />
          </>
        ) : (
          <input
            type="submit"
            className="submit-btn"
            value={loading ? "Uploading..." : "Upload Product"}
          />
        )}
      </form>
    </div>
  );
}

export default AdvertForm;
