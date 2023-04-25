import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../../Firebase";
import { useRouter } from "next/router";
import { TiArrowBack } from "react-icons/ti";
import { useForm } from "react-hook-form";
import Image from "next/image";
import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import axios from "axios";
// firebase imports

import { addDoc, serverTimestamp } from "firebase/firestore";
import { getSessionUser } from "../../../Services/functions";

export async function getStaticPaths() {
  const colRef = collection(db, "products");
  const snapshot = await getDocs(colRef);
  const paths = snapshot.docs.map((doc) => ({
    params: { storeID: doc.id },
  }));

  return { paths, fallback: "blocking" };
}

export const getStaticProps = async ({ params }) => {
  const { storeID } = params;
  const productDoc = doc(db, "products", storeID);
  const productSnapshot = await getDoc(productDoc);
  const productData = productSnapshot.data();

  // Convert timestamp to string
  productData.timestamp = productData.timestamp.toDate().toString();

  return {
    props: {
      product: productData,
    },
  };
};
function StoreID() {
  const router = useRouter();
  const { storeID } = router.query;

  // get usersession
  const [session, setSession] = useState();

  useEffect(() => {
    async function fetchSessionUser() {
      const userData = await getSessionUser(router);
      if (userData) {
        setSession(userData);
      }
    }
    fetchSessionUser();
  }, [router]);

  // console.log(session.user.position);
  // GO BACK
  function goBack() {
    router.back();
  }

  // fetch product by id
  const [product, setProduct] = useState();
  async function fetchItemFromFirestore() {
    const itemRef = doc(db, "products", storeID);
    const itemDoc = await getDoc(itemRef);
    if (itemDoc.exists()) {
      // Extract the data from the document and return it
      const itemData = itemDoc.data();
      setProduct(itemData);
    } else {
      // Document does not exist
      return null;
    }
  }

  useEffect(() => {
    fetchItemFromFirestore();
  }, [storeID]);
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

  const [formShow, setFormShow] = useState(false);
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
      const docRef = doc(db, "products", storeID);
      await updateDoc(docRef, { ...productDetails });
      alert("Product updated successfully!");
    } catch (error) {
      console.error(error);
    }

    reset();
    setFormShow(false);
    location.reload();
    setLoading(false);
    setSelectedFile1("");
    setSelectedFile2("");
    setSelectedFile3("");
    setSelectedFile4("");
  };
  return (
    <div className="store-item-dynamic-con">
      {session?.user?.position === "admin" && (
        <div className="edit-product" onClick={() => setFormShow(!formShow)}>
          <p>{formShow ? "Close Form" : "Edit Product"}</p>
        </div>
      )}

      {formShow && (
        <div className="store-item-con">
          {" "}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* PRODUCT NAME */}
            <label>Product Name</label>
            <input
              defaultValue={product?.productname}
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
              defaultValue={product?.productprice}
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
              defaultValue={product?.productoldprice}
              type="Number"
              placeholder="Enter Product Old Price"
              {...register("productoldprice")}
            />
            {/* PRODUCT NUMBER */}
            <label>Product Specs</label>
            <input
              defaultValue={product?.productnumber}
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
              <option defaultValue={product?.productcategory}>
                {product?.productcategory}
              </option>
              <option value="Shoe">Shoe</option>
              <option value="Cloth">Cloth</option>
              <option value="Bag">Bag</option>
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
              <option defaultValue={product?.productclass}>
                {product?.productclass}
              </option>
              <option value="promo">Promo</option>
              <option value="trending">Trending</option>
            </select>
            {/* PRODUCT DISCRIPTION */}
            <label>Product Description</label>
            <textarea
              defaultValue={product?.productdescription}
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
      )}

      <div className="admin-dynamic-product">
        {" "}
        <div className="single-product">
          <div className="top-container">
            {" "}
            <div className="big-display-con">
              <button onClick={goBack} className="go-back">
                <TiArrowBack />
                Back
              </button>
            </div>
            <div className="small-display-img-con">
              {product?.image.map(
                (img, index) =>
                  img && (
                    <div className="small-display-img" key={index}>
                      <Image
                        src={img && img}
                        alt="img"
                        fill
                        sizes="100vw"
                        //   ref={pic}
                        onClick={() => changeIMG(index)}
                      />
                    </div>
                  )
              )}
            </div>
          </div>

          {/* lower part */}
          <div className="lower-details">
            <h1 className="p-name">{product?.productname}</h1>
            <p className="p-number">
              <span>Product spec :</span> {product?.productnumber}
            </p>
            <div>
              <p className="p-desc">
                <span>Product category :</span> {product?.productcategory}
              </p>
              <p className="p-desc">
                <span>Product promo :</span>
                {product?.productoldprice
                  ? " YES :" +
                    " " +
                    "(old price" +
                    " " +
                    "~" +
                    " " +
                    `${Number(product?.productoldprice).toLocaleString()})`
                  : " NO"}
              </p>
            </div>
            <p className="p-desc">
              <span>Product description : </span>
              {product?.productdescription}
            </p>
            <p className="p-desc">
              <span>Product delivery : </span>
              maximum delivery period of 7 days within nigeria.
            </p>
            <p className="p-desc">
              <span>Return Policy : </span>
              Product warrante lasts 48hrs after delievery notice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
StoreID.requireAuth = true;
export default StoreID;
