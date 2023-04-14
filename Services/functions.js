import axios from "axios";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Cookies from "js-cookie";
import { db } from "../Firebase";

// FETCH SESSION /USER DETAILS API CALL
export const getSessionUser = async (router) => {
  const token = Cookies.get("JWTtoken");
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
