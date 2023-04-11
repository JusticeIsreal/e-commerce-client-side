import React, { useState, useEffect } from "react";
// import  useForm  from "react-hook-form";
// import axios from "axios";
import Topbar from "../../Components/AdminPageComponents/Topbar";
import Sidebar from "../../Components/AdminPageComponents/Sidebar";
// import Loader from "../../Components/Loader";
import { useParams, useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";

function EditProduct() {
  // FETCH SINGLE ITEM
  // const { _id } = useParams();
  // const [item, setItem] = useState(null);

  // FETCH SINGLE PRODUCT BY ID VIA API ENDPOINT

  // useFORM CONGIF
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm();

  // IMAGE PREVIEW
  // const [previewImg, setPreviewImg] = useState(null);
  // uploadImage
  // const [imageBase64, setImageBase64] = useState("");

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

  // CONVERTING BASE64 IMAGE STRING TO IMAGE FILE
  const convertBase64 = (file) => {
    // return new Promise((resolve, reject) => {
    //   const fileReader = new FileReader();
    //   fileReader.readAsDataURL(file);
    //   fileReader.onload = () => {
    //     resolve(fileReader.result);
    //   };
    //   fileReader.onerror = () => reject(Error);
    // });
  };

  // UPDATE SINGLE PRODUCT
  const onSubmit = (data) => {
    const productDetails = { ...data, productimage: imageBase64 };

    // axios
    //   .patch(
    //     `http://localhost:1234/api/v1/products/updateproduct/${_id}`,
    //     productDetails
    //   )
    //   .then((resp) => {
    //     singleProduct();
    //     setFormShow(false);
    //   })
    //   .catch((error) => console.log(error));
  };

  // display form on and of
  // const [formShow, setFormShow] = useState(false);
  // NAVIGATE PAGE BACK
  // const history = useNavigate();
  return (
    <div>
      {" "}
      <Topbar />
      <Sidebar />
      <div className="store-main-con">
        <div id="content">
          <main>
            <div className="head-title">
              <div className="left">
                <h1>Update Product</h1>

                <ul className="breadcrumb">
                  <li>
                    <a href="">Dashboard</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>
                  </li>
                  <li>
                    <a href="">Store</a>
                  </li>
                  <li onClick={() => history(-1)}>
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
                <a href="#updateform" style={{ color: "white" }}>
                  <b className="bx bxs-cloud-download"> + </b>
                  <span className="text">Update Product</span>
                </a>
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <div style={{ width: "300px", margin: "10px" }}>
                <img
                  // src={item.productimage}
                  alt=""
                  style={{ objectFit: "contain", width: "300px" }}
                />
              </div>
              <div
                style={{
                  width: "100%",
                  maxWidth: "600px",
                  margin: "10px",
                }}
              >
                <p>
                  <span style={{ fontWeight: "bolder", color: "#3d91e6" }}>
                    Product Name :
                  </span>{" "}
                  {/* {item.productname} */}
                </p>
                <p>
                  <span style={{ fontWeight: "bolder", color: "#3d91e6" }}>
                    Price :
                  </span>{" "}
                  {/* {item.productprice} */}
                </p>
                <p>
                  <span style={{ fontWeight: "bolder", color: "#3d91e6" }}>
                    Old Price :
                  </span>{" "}
                  {/* {item.productoldprice} */}
                </p>
                <p>
                  <span style={{ fontWeight: "bolder", color: "#3d91e6" }}>
                    Number :
                  </span>{" "}
                  {/* {item.productnumber} */}
                </p>
                <p>
                  <span style={{ fontWeight: "bolder", color: "#3d91e6" }}>
                    Category :
                  </span>{" "}
                  {/* {item.productcategory} */}
                </p>
                <p>
                  <span style={{ fontWeight: "bolder", color: "#3d91e6" }}>
                    Class :
                  </span>{" "}
                  {/* {item.productclass} */}
                </p>
                <p>
                  <span style={{ fontWeight: "bolder", color: "#3d91e6" }}>
                    Description :
                  </span>{" "}
                  {/* {item.productdescription} */}
                </p>
              </div>
            </div>

            <div className="store-form-container" id="updateform">
             
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

EditProduct.requireAuth = true;
export default EditProduct;
