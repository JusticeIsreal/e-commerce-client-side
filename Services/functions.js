import axios from "axios";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Cookies from "js-cookie";
import { db } from "../Firebase";

// FETCH SESSION /USER DETAILS API CALL
export const getSessionUser = async () => {
  const token = Cookies.get("JWTtoken");
  // const storedCart = JSON.parse(localStorage.getItem("localCart")) || [];
  if (token) {
    try {
      const response = await axios.get(
        "http://localhost:1234/api/v1/userverification/getSessionUser",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const user = response.data.data;
      const userTransaction = response.data.data.transaction;
      const userCart = response.data.data.cart;

      return {
        user,
        userTransaction,
        userCart,
      };
    } catch (error) {
      console.log(error);
      // return null; // or you can throw the error here
    }
  } else {
    return; // or you can throw the
  }
};

// CHANGE PASSWORD API CALL
export const changePassword = async (password, router) => {
  const userId = localStorage.getItem("userId") || [];
  axios
    .post("http://localhost:1234/api/v1/userverification/resetpassword", {
      password,
      userId,
    })
    .then((resp) => {
      console.log(resp.data);

      localStorage.removeItem("userId");
      alert("passord Reset Successful, Proceed to Login");
      router.push("/");
    })
    .catch((error) => {
      console.log(error.response);
    });
};

// LOG IN API CALL
export const logIN = async (setLoading, router, setErrMsg, data) => {
  axios
    .post("http://localhost:1234/api/v1/userverification/loginuser", data)
    .then((resp) => {
      setLoading(false);
      const token = resp.data.data;
      Cookies.set("JWTtoken", token);
      router.push("/");
      setErrMsg("");
      setLoading(true);
    })
    .catch((error) => {
      setErrMsg(error?.response?.data?.message);
      setLoading(true);
    });
};
// LOG IN API CALL
const singleTransaction = async (transactID) => {
  const token = Cookies.get("JWTtoken");
  const { data } = await axios.get(
    `http://localhost:1234/api/v1/transaction/getsingletransaction/${transactID}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  // console.log(data);
  return data.data;
};
export const singleTransactionFetcher = (transactID) =>
  singleTransaction(transactID);

// UPDATE TRANACTION STATUS
const updateTransaction = async (transactID, transactionStatus) => {
  const token = Cookies.get("JWTtoken");
  await axios
    .patch(
      "http://localhost:1234/api/v1/transaction/updatetransaction/" +
        `${transactID}`,
      {
        transactionstatus: transactionStatus,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    )

    .then((resp) => {
      console.log(resp);
    })
    .catch((err) => {
      throw err;
    });
};

// CHECK TRANSACTION STATUS
export const transactionStatus = async (userData, transactID) => {
  axios
    .get(
      `https://api.paystack.co/transaction/verify/${userData?.paystackRef}`,
      {
        headers: {
          Authorization: `Bearer sk_test_3f383f1af75a39537da652b48d2325b2a0c4ba26`,
        },
      }
    )
    .then((response) => {
      const transactionStatus = response.data.data.status;
      updateTransaction(transactID, transactionStatus);
    })
    .catch((error) => {
      console.log(error);
      console.log(userData);
    });
};

// ADD TO CART
export const addToCart = async (productData, productID) => {
  const token = Cookies.get("JWTtoken");
  // console.log(productData);
  const product = {
    image: productData.image,
    productcategory: productData.productcategory,
    productclass: productData.productclass,
    productdescription: productData.productdescription,
    productname: productData.productname,
    productnumber: productData.productnumber,
    productoldprice: productData.productoldprice,
    productprice: productData.productprice,
    quantity: productData.quantity,
    // user: user._id,
    productID: productID,
  };
  try {
    const { data } = await axios.post(
      "http://localhost:1234/api/v1/cart/addtocart",
      product,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
  
    return data.status;
  } catch (error) {
    console.log(error);
  }
};

// ALL  CART
export const allCartItem = async () => {
  const token = Cookies.get("JWTtoken");

  if (token) {
    try {
      const response = await axios.get(
        "http://localhost:1234/api/v1/cart/allcart",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const Cart = response.data.data;
      return {
        Cart,
      };
    } catch (error) {
      console.log(error);
      // return null; // or you can throw the error here
    }
  } else {
    return; // or you can throw the
  }
};

// DELETE TO CART
export const deleteCartItem = async (_id) => {
  const token = Cookies.get("JWTtoken");
  try {
    const { data } = await axios.delete(
      `http://localhost:1234/api/v1/cart/deletecart/${_id}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (data && data.status === "CART DELETED SUCCESSFUL") return true;
    else return false;
  } catch (error) {
    console.log(error);
  }
};

// CheckOUT
export const checkOut = async (productData, router) => {
  const token = Cookies.get("JWTtoken");
  axios
    .post(
      "http://localhost:1234/api/v1/transaction/posttransaction",
      productData,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    )
    .then((resp) => {
      console.log(resp.data.data.authorization_url);
      window.location.href = resp.data.data.authorization_url;
    })
    .catch((error) => {
      console.log(error);
    });
};
