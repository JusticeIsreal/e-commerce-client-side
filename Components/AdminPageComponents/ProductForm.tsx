import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
// firebase imports
import { db, storage } from "../../Firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import tester from "../AdminPageComponents/StoreItems";
function ProductForm() {
  
  // GENERATE IMAGE REVIEW
  const filePickerRef1 = useRef<HTMLInputElement>("" || null);
  const filePickerRef2 = useRef<HTMLInputElement>("" || null);
  const filePickerRef3 = useRef<HTMLInputElement>("" || null);
  const filePickerRef4 = useRef<HTMLInputElement>("" || null);
  const [selectedFile1, setSelectedFile1] = useState("");
  const [imageBase64File1, setImageBase64File1] = useState("");
  const [selectedFile2, setSelectedFile2] = useState<string>("");
  const [imageBase64File2, setImageBase64File2] = useState("");
  const [selectedFile3, setSelectedFile3] = useState("");
  const [imageBase64File3, setImageBase64File3] = useState("");
  const [selectedFile4, setSelectedFile4] = useState("");
  const [imageBase64File4, setImageBase64File4] = useState("");

  // CONVERT ALL IMAGE FILE TO BASE 64 STRING AND CREATE PREVIEW

  // image 1
  const uploadFile1 = async (file: any) => {
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
  const addImageToPost1 = async (e: ChangeEvent<any>) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = await uploadFile1(file);
      setImageBase64File1(imageUrl);

      const reader = new FileReader();

      reader.onload = (readerEvent) => {
        const selectedFile = readerEvent.target?.result;
        setSelectedFile1(selectedFile as string);
      };

      reader.readAsDataURL(file);
    }
  };
  // image 2
  const uploadFile2 = async (file: any) => {
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
  const addImageToPost2 = async (e: ChangeEvent<any>) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = await uploadFile2(file);
      setImageBase64File2(imageUrl);

      const reader = new FileReader();

      reader.onload = (readerEvent) => {
        const selectedFile = readerEvent.target?.result;
        setSelectedFile2(selectedFile as string);
      };

      reader.readAsDataURL(file);
    }
  };
  // image 3
  const uploadFile3 = async (file: any) => {
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
  const addImageToPost3 = async (e: ChangeEvent<any>) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = await uploadFile3(file);
      setImageBase64File3(imageUrl);

      const reader = new FileReader();

      reader.onload = (readerEvent) => {
        const selectedFile = readerEvent.target?.result;
        setSelectedFile3(selectedFile as string);
      };

      reader.readAsDataURL(file);
    }
  };
  // image 4
  const uploadFile4 = async (file: any) => {
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
  const addImageToPost4 = async (e: ChangeEvent<any>) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = await uploadFile4(file);
      setImageBase64File4(imageUrl);

      const reader = new FileReader();

      reader.onload = (readerEvent) => {
        const selectedFile = readerEvent.target?.result;
        setSelectedFile4(selectedFile as string);
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

  const onSubmit = async (data: any, e: any) => {
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
      const colRef = collection(db, "foodproducts");
      await addDoc(colRef, { ...productDetails });
      alert("Product added successfully!");
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
        {/* PRODUCT PRICE */}
        <label>Product Name</label>
        <input
          type="text"
          placeholder="Enter Product Name"
          {...register("productname", { required: true })}
        />
        {errors.productname && (
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
        {/* PRODUCT PRICE */}
        <label>Product Price</label>
        <input
          type="Number"
          placeholder="Enter Product Price"
          {...register("productprice", { required: true })}
        />
        {errors.productprice && (
          <span
            className="errror-msg"
            style={{
              fontSize: "12px",
              fontStyle: "italic",
              color: "red",
            }}
          >
            Kindly Enter Product Price
          </span>
        )}
        {/* PRODUCT OLD PRICE */}
        <label>Product Old Price</label>
        <input
          type="Number"
          placeholder="Enter Product Old Price"
          {...register("productoldprice")}
        />
        {/* PRODUCT NUMBER */}
        <label>Product Specs</label>
        <input
          type="text"
          placeholder="Enter Product Specs"
          {...register("productnumber", { required: true })}
        />
        {errors.productnumber && (
          <span
            className="errror-msg"
            style={{
              fontSize: "12px",
              fontStyle: "italic",
              color: "red",
            }}
          >
            Kindly Enter Product Specs
          </span>
        )}
        {/* PRODUCT CATEGORY */}
        <label>Product Category</label>
        <select {...register("productcategory", { required: true })}>
          <option value="">Select</option>
          <option value="Shoe">Shoe</option>
          <option value="Cloth">Cloth</option>
          <option value="Watch">Watch</option>
          <option value="Meal">Meal</option>
          <option value="Drinks">Drinks</option>
          <option value="Pastery">Pastery</option>
        </select>
        {errors.productcategory && (
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
        {/* PRODUCT CLASS */}
        <label>Product Class</label>
        <select {...register("productclass")}>
          <option value="">Select</option>
          <option value="promo">Promo</option>
          <option value="trending">Trending</option>
        </select>
        {/* PRODUCT DISCRIPTION */}
        <label>Product Description</label>
        <textarea
          // type="text"
          placeholder="Enter Product Description"
          {...register("productdescription", { required: true })}
        />
        {errors.productdescription && (
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
        {/* PRODUCT IMAGE*/}
        <label>Product Image</label>
        <p style={{ fontSize: "12px", fontStyle: "italic", color: "gray" }}>
          <span style={{ color: "red" }}>Note:</span> This images uploaded
          should be
          <span style={{ fontWeight: "bolder" }}>
            {" "}
            Potraite Dimension{" "}
          </span>{" "}
          with product item aligned to the center
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
        <input
          type="submit"
          className="submit-btn"
          value={loading ? "Uploading..." : "Upload Product"}
        />
      </form>
    </div>
  );
}

export default ProductForm;
