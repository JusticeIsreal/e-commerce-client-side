import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { TiArrowBack } from "react-icons/ti";
import { checkOut } from "../Services/functions";
import { useRouter } from "next/router";

function PayForm({
  product,
  count,
  priceNumber,
  setPayModal,
  productsArray,
  totalAmount,
}) {
  // useform config
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  //   console.log(productsArray);
  const addressRef = useRef("");
  const [productData, setProductData] = useState({});
  const [confirmDetails, setConfirmDetails] = useState({});
  const [showConfirmDetails, setShowConfirmDetails] = useState(false);

  const cartFinalProducts = [];
  useEffect(() => {
    if (!product) {
      for (const p of productsArray) {
        // calculate the total cost
        const newProduct = {
          productname: p.productname,
          productprice: p.productprice / p.quantity,
          quantity: p.quantity,
        };
        cartFinalProducts.push(newProduct);
        // add the total cost to the totalAmount variable
      }
    }
  }, []);

  const onSubmitBanner = async (data, e) => {
    e.preventDefault();
    setConfirmDetails(data);

    if (product) {
      const dynamicItemDetails = {
        deliveryfee: parseInt(data.state.split(",")[1]),
        homedelivery: parseInt(data.homedelivery),
        anyinfo: data.anyinfo,
        deliveryaddress: `${data.street}, ${data.lga}, ${
          data.state.split(",")[0] + " " + "State"
        }`,
        product: [
          {
            productname: product.productname,
            productprice: parseInt(product.productprice),
            quantity: count,
            clientnote: data.anyinfo,
          },
        ],
      };
      setProductData(dynamicItemDetails);
    } else {
      const cartItemDetails = {
        deliveryfee: parseInt(data.state.split(",")[1]),
        homedelivery: parseInt(data.homedelivery),
        anyinfo: data.anyinfo,
        deliveryaddress: `${data.street}, ${data.lga}, ${
          data.state.split(",")[0] + " " + "State"
        }`,
        product: cartFinalProducts,
      };
      setProductData(cartItemDetails);
    }

    // console.log(cartItemDetails);
    //

    setShowConfirmDetails(true);
  };
  //   console.log(showConfirmDetails);
  // DYNAMIC PAGE ITEM TOTAL
  const total =
    parseInt(confirmDetails?.state?.split(",")[1]) +
    parseInt(confirmDetails.homedelivery) +
    priceNumber;

  // CHECKOUT
  const router = useRouter();
  const checkOutpayment = async () => {
    const userData = await checkOut(productData, router);
    if (userData) {
      console.log(userData.data);
    }
  };

  return (
    <div className="modal-main-con">
      <div className="modal-relative">
        <div className="modal-card">
          <button className="go-back" onClick={() => setPayModal(false)}>
            <TiArrowBack />
            Back
          </button>
          {showConfirmDetails && (
            <div className="confirm-form-info">
              <button
                className="go-back"
                onClick={() => setShowConfirmDetails(!showConfirmDetails)}
              >
                <TiArrowBack />
                Back
              </button>
              <h3>Confirm details</h3>
              {product ? (
                <>
                  {" "}
                  <p>
                    Product Name: <span>{product.productname}</span>
                  </p>
                  <p>
                    Product Price:{" "}
                    <span>
                      ₦ {Number(product?.productprice).toLocaleString()}
                    </span>{" "}
                  </p>
                  <p>
                    Quantity: <span>{count}</span>
                  </p>
                  <p>
                    Total: <span> ₦ {total.toLocaleString()}</span>
                  </p>
                </>
              ) : (
                <>
                  {productsArray.map((item) => (
                    <div key={item.productname + item.productprice}>
                      <p>
                        Product Name: <span>{item.productname}</span>
                      </p>
                      <p>
                        Product Price:{" "}
                        <span>
                          ₦{" "}
                          {Number(
                            item?.productprice / item.quantity
                          ).toLocaleString()}
                        </span>{" "}
                      </p>
                      <p>
                        Quantity: <span>{item.quantity}</span>
                      </p>

                      <p>
                        Total:{" "}
                        <span>
                          {" "}
                          ₦{" "}
                          {Number(item?.productprice / item.quantity) *
                            item.quantity}
                        </span>
                      </p>
                    </div>
                  ))}
                  <p>
                    Delivery fee:
                    <span>
                      {" "}
                      ₦
                      {(
                        parseInt(confirmDetails?.state?.split(",")[1]) +
                        parseInt(confirmDetails.homedelivery)
                      ).toLocaleString()}{" "}
                      <i>
                        {confirmDetails.homedelivery > 0
                          ? "( Including home delivery service )"
                          : "( No home delivery service )"}
                      </i>
                    </span>
                  </p>
                  <p>
                    Delivery address:{" "}
                    <span>
                      {confirmDetails?.street}, {confirmDetails?.lga},
                      {confirmDetails?.state?.split(",")[0] + " " + "State"}
                    </span>
                  </p>
                  <p>
                    Adiitional info:{" "}
                    <span>
                      {confirmDetails.anyinfo
                        ? `${confirmDetails.anyinfo}`
                        : "No"}
                    </span>
                  </p>
                </>
              )}

              <div className="checkout-btn" onClick={() => checkOutpayment()}>
                <button>
                  CHECK OUT ( ₦
                  {(
                    parseInt(totalAmount) +
                    parseInt(confirmDetails?.state?.split(",")[1]) +
                    parseInt(confirmDetails.homedelivery)
                  ).toLocaleString()}
                  )
                </button>
              </div>
            </div>
          )}{" "}
          {/* PAYMENT FORM*/}
          <form onSubmit={handleSubmit(onSubmitBanner)}>
            {/* ADDRESS */}

            <label ref={addressRef}>Enter your delivery address details</label>
            {/* STREET */}
            <div>
              <input
                type="text"
                placeholder="House number / street"
                {...register("street", { required: true })}
              />
              {errors.street && (
                <span
                  className="errror-msg"
                  style={{
                    fontSize: "12px",
                    fontStyle: "italic",
                    color: "red",
                  }}
                >
                  Kindly Enter house number and street
                </span>
              )}
            </div>
            {/* LGA */}
            <div>
              <input
                type="text"
                placeholder="Enter your LGA"
                {...register("lga", { required: true })}
              />
              {errors.lga && (
                <span
                  className="errror-msg"
                  style={{
                    fontSize: "12px",
                    fontStyle: "italic",
                    color: "red",
                  }}
                >
                  Kindly Enter Local Government Area
                </span>
              )}
            </div>
            {/* STATE */}

            <div>
              <select {...register("state", { required: true })}>
                <option value="">Select State</option>
                <option value="Abuja,2000">Abuja</option>
                <option value="Abia,2000">Abia</option>
                <option value="Adamawa,2000">Adamawa</option>
                <option value="AkwaIbom,2000">Akwa Ibom</option>
                <option value="Anambra,2000">Anambra</option>
                <option value="Bauchi,2000">Bauchi</option>
                <option value="Bayelsa,2000">Bayelsa</option>
                <option value="Benue,2000">Benue</option>
                <option value="Borno,2000">Borno</option>
                <option value="CrossRiver,2000">Cross River</option>
                <option value="Delta,2000">Delta</option>
                <option value="Ebonyi,2000">Ebonyi</option>
                <option value="Edo,2000">Edo</option>
                <option value="Ekiti,2000">Ekiti</option>
                <option value="Enugu,2000">Enugu</option>
                <option value="Gombe,2000">Gombe</option>
                <option value="Imo,2000">Imo</option>
                <option value="Jigawa,2000">Jigawa</option>
                <option value="Kaduna,2000">Kaduna</option>
                <option value="Kano,2000">Kano</option>
                <option value="Katsina,2000">Katsina</option>
                <option value="Kebbi,2000">Kebbi</option>
                <option value="Kogi,2000">Kogi</option>
                <option value="Kwara,2000">Kwara</option>
                <option value="Lagos,2000">Lagos</option>
                <option value="Niger,2000">Niger</option>
                <option value="Ogun,2000">Ogun</option>
                <option value="Ondo,2000">Ondo</option>
                <option value="2000">Osun</option>
                <option value="Osun,2000">Oyo</option>
                <option value="Plateau,2000">Plateau</option>
                <option value="Sokoto,2000">Sokoto</option>
                <option value="River,2000">River</option>
                <option value="Taraba,2000">Taraba</option>
                <option value="Yobe,2000">Yobe</option>
                <option value="Zamfara,2000">Zamfara</option>
              </select>
              {errors.state && (
                <span
                  className="errror-msg"
                  style={{
                    fontSize: "12px",
                    fontStyle: "italic",
                    color: "red",
                  }}
                >
                  Kindly Enter Delivery state
                </span>
              )}
            </div>

            {/* home delivery */}
            <div>
              <select {...register("homedelivery", { required: true })}>
                <option value="">Home delivery ?</option>
                <option value="2000">YES, bring it to my house</option>
                <option value="0">NO, I will come pick it up</option>
              </select>
              {errors.homedelivery && (
                <span
                  className="errror-msg"
                  style={{
                    fontSize: "12px",
                    fontStyle: "italic",
                    color: "red",
                  }}
                >
                  Kindly Enter Delivery state
                </span>
              )}
            </div>
            <div>
              <textarea
                // type="text"
                placeholder="Enter any other OPTIONAL information."
                {...register("anyinfo")}
              />
            </div>

            <input
              type="submit"
              className="submit-btn"
              //   value={loadingBanner ? "Uploading..." : "Upload Banner"}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default PayForm;
