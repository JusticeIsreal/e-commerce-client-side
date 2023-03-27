import StoreItems from "../../Components/AdminPageComponents/StoreItems";
import React, { useState } from "react";

import Topbar from "../../Components/AdminPageComponents/Topbar";
import Sidebar from "../../Components/AdminPageComponents/Sidebar";

import { MdArrowBackIos } from "react-icons/md";
function Store() {
  // useform config

  // IMAGE PREVIEW
  const [previewImg, setPreviewImg] = useState(null);
  // uploadImage
  const [imageBase64, setImageBase64] = useState("");

  // image preview before uploading
  const uploadImage = async (e) => {
    // const file = e.target.files[0];
    // setPreviewImg(file);
    // const base64 = await convertBase64(file);
    // setImageBase64(base64);
    // // make image review
    // const reader = new FileReader();
    // if (e.target.files[0]) {
    //   reader.readAsDataURL(e.target.files[0]);
    // }
    // reader.onload = (readerEvent) => {
    //   setPreviewImg(readerEvent.target.result);
    // };
  };

  // base 64 conversion
  const convertBase64 = () => {
    // return new Promise((resolve, reject) => {
    //   const fileReader = new FileReader();
    //   fileReader.readAsDataURL(file);
    //   fileReader.onload = () => {
    //     resolve(fileReader.result);
    //   };
    //   fileReader.onerror = () => reject(Error);
    // });
  };

  // POST PRODUCT
  // const postProductAPI = "http://localhost:1234/api/v1/products/addproduct";

  // const onSubmit = () => {
  //   const productDetails = { ...data, productimage: imageBase64 };

  //   // axios
  //   //   .post(postProductAPI, productDetails)
  //   //   .then((resp) => {
  //   //     fetchProducts();
  //   //     e.target.reset();
  //   //     setImageBase64("");
  //   //     setPreviewImg(null);
  //   //   })
  //   //   .catch((error) => {
  //   //     throw new Error(error);
  //   //   });
  // };

  // display form on and of
  // const [formShow, setFormShow] = useState(false);
  // NAVIGATE PAGE BACK
  // const history = useNavigate();
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
                <li >
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
              // onClick={() => setFormShow(!formShow)}
            >
              <b className="bx bxs-cloud-download"> + </b>
              <span className="text">Add Product</span>
            </div>
          </div>

          <div className="store-form-container"></div>

          <StoreItems />
        </main>
      </div>
    </div>
  );
}

export default Store;
