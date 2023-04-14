import React, { useEffect, useState } from "react";
import Topbar from "../Components/Topbar";
import Orders from "../Components/OrderPage/Orders";
import Footer from "../Components/Footer";
import { useRouter } from "next/router";
import { getSessionUser } from "../Services/functions";

function orders() {
  const router = useRouter();
  const [userTransaction, setUserTransaction] = useState([]);
  useEffect(() => {
    const userName = async () => {
      const userData = await getSessionUser();
      setUserTransaction(userData?.user?.transaction);
      console.log(userData);
    };
    userName();
  }, [router]);

  return (
    <div className="order-page-main-con">
      <Topbar />
      {userTransaction ? (
        <Orders userTransaction={userTransaction} />
      ) : (
        "sign in"
      )}

      {/* <Footer /> */}
    </div>
  );
}
// orders.requireAuth = true;
export default orders;
