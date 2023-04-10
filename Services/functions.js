import axios from "axios";
import Cookies from "js-cookie";

export const getSessionUser = async (router) => {
  const token = Cookies.get("JWTtoken");
  // if (!token) {
  //   router.push("/");
  //   return null;
  // }
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
};
