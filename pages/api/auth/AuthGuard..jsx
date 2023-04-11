import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { getSessionUser } from "../../../Services/functions";

export function AuthGuard({ children }) {
  const router = useRouter();
  const token = Cookies.get("JWTtoken");

  // const [userPosition, setUserPosituon] = useState("");

  // useEffect(() => {
  //   const userInfo = async () => {
  //     const userData = await getSessionUser();
  //     setUserPosituon(userData.user.position);
  //   };
  //   userInfo();
  // }, [token, router]);

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, []); // empty dependency array ensures this only runs on the client-side

  // if (userPosition === "client" || userPosition === "" || !userPosition) {
  //   if (
  //     router.asPath === "/Adminpage/AdminDashboard" ||
  //     router.asPath === "/Adminpage/CustomersData" ||
  //     router.asPath === "/Adminpage/EditProduct" ||
  //     router.asPath === "/Adminpage/EditTransaction" ||
  //     router.asPath === "/Adminpage/Store" ||
  //     router.asPath === "/Adminpage/Transaction"
  //   ) {
  //     return router.push("/");
  //   }

  //   return <>{children}</>;
  // }
  if (token) {
    return <>{children}</>;
  }

  return null;
}
