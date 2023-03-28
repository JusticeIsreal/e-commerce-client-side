import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";

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

// COMPONENTS
import Topbar from "../../Components/AdminPageComponents/Topbar";
import Sidebar from "../../Components/AdminPageComponents/Sidebar";
import StoreItems from "../../Components/AdminPageComponents/StoreItems";

// ICONS
import { MdArrowBackIos } from "react-icons/md";

function Store() {
  // display form on and of
  const [formShow, setFormShow] = useState(false);

  // useform config
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // GENERATE IMAGE REVIEW
  const filePickerRef1 = useRef();
  const filePickerRef2 = useRef();
  const filePickerRef3 = useRef();

  const [selectedFile1, setSelectedFile1] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [selectedFile3, setSelectedFile3] = useState(null);

  const addImageToPost1 = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile1(readerEvent.target.result);
    };
  };
  const addImageToPost2 = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile2(readerEvent.target.result);
    };
  };
  const addImageToPost3 = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile3(readerEvent.target.result);
    };
  };
  const addImageToPost4 = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile4(readerEvent.target.result);
    };
  };

  // UPLOAD FORM DETAILS TO FIREBASE
  const [singleProduct, setSingleProduct] = useState();
  const onSubmit = async (data, e) => {
    const productDetails = {
      ...data,
      timestamp: serverTimestamp(),
    };

    setSingleProduct(productDetails);

    upLoadPost();

    reset();
    setFormShow(false);
  };

  const [loading, setLoading] = useState(false);

  const upLoadPost = async () => {
    if (loading) return;
    setLoading(true);

    try {
      // create a post and add to firestore
      const docRef = await addDoc(collection(db, "products"), {
        ...singleProduct,
      });
      console.log(singleProduct);
      // upload the images to firebase storage
      const uploadedProductImages = [];
      const uploadedProductDetails = [singleProduct];
      if (selectedFile1) {
        const fileRef = ref(storage, `products/${docRef.id}/image1`);
        const snapshot = await uploadString(fileRef, selectedFile1, "data_url");
        const downloadURL = await getDownloadURL(snapshot.ref);
        uploadedProductImages.push(downloadURL);
      }

      if (selectedFile2) {
        const fileRef = ref(storage, `products/${docRef.id}/image2`);
        const snapshot = await uploadString(fileRef, selectedFile2, "data_url");
        const downloadURL = await getDownloadURL(snapshot.ref);
        uploadedProductImages.push(downloadURL);
      }

      if (selectedFile3) {
        const fileRef = ref(storage, `products/${docRef.id}/image3`);
        const snapshot = await uploadString(fileRef, selectedFile3, "data_url");
        const downloadURL = await getDownloadURL(snapshot.ref);
        uploadedProductImages.push(downloadURL);
      }

      // update the original post with images
      await updateDoc(doc(db, "products", docRef.id), {
        ...singleProduct,
        productimages: uploadedProductImages,
      });

      setLoading(false);
      setSelectedFile1(null);
      setSelectedFile2(null);
      setSelectedFile3(null);
      setSelectedFile4(null);
    } catch (error) {
      console.error(error);
    }
  };

  // SERVER SIDE RENDERING OF DATA
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    return onSnapshot(
      query(collection(db, "products"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setProductDetails(snapshot.docs);
      }
    );
  }, [db]);

  return (
    <div className="store-main-con">
      <Topbar />
      <Sidebar />
      <div id="content">
        <main>
          <div className="head-title">
            <div className="left">
              <h1>Store</h1>

              <ul className="breadcrumb">
                <li>
                  <a href="#">Dashboard</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>
                </li>
                <li>
                  <a
                    className="active"
                    href="#"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <MdArrowBackIos /> Back
                  </a>
                </li>
              </ul>
            </div>
            <div
              className="btn-download"
              onClick={() => setFormShow(!formShow)}
            >
              <b className="bx bxs-cloud-download"> + </b>
              <span className="text">Add Product</span>
            </div>
          </div>
          {formShow && (
            <div className="store-form-container">
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
                  {...register("productoldprice", { required: true })}
                />
                {errors.productoldprice && (
                  <span
                    className="errror-msg"
                    style={{
                      fontSize: "12px",
                      fontStyle: "italic",
                      color: "red",
                    }}
                  >
                    Kindly Enter Product Old Price
                  </span>
                )}
                {/* PRODUCT NUMBER */}
                <label>Product Number</label>
                <input
                  type="Number"
                  placeholder="Enter Product Number"
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
                    Kindly Enter Product Number
                  </span>
                )}
                {/* PRODUCT CATEGORY */}
                <label>Product Category</label>
                <select {...register("productcategory", { required: true })}>
                  <option value="">Select</option>
                  <option value="romance">Romance</option>
                  <option value="scifi">Sci-fi</option>
                  <option value="motivation">Motivation</option>
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
                <select {...register("productclass", { required: true })}>
                  <option value="">Select</option>
                  <option value="promo">Promo</option>
                  <option value="newarrival">New</option>
                </select>
                {errors.productclass && (
                  <span
                    className="errror-msg"
                    style={{
                      fontSize: "12px",
                      fontStyle: "italic",
                      color: "red",
                    }}
                  >
                    Kindly Enter Product Class
                  </span>
                )}
                {/* PRODUCT DISCRIPTION */}
                <label>Product Description</label>
                <input
                  type="text"
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
                    onClick={() => setSelectedFile1(null)}
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
                    onClick={() => setSelectedFile2(null)}
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
                    onClick={() => setSelectedFile3(null)}
                    alt="img"
                    style={{ width: "40px", marginBottom: "10px" }}
                  />
                </div>
                <input type="submit" className="submit-btn" />
              </form>
            </div>
          )}
          <StoreItems productDetails={productDetails} />
        </main>
      </div>
    </div>
  );
}

export default Store;
