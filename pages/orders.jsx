import React, { useEffect, useState } from "react";
import Topbar from "../Components/Topbar";
import Modal from "../Components/Modal";
import Orders from "../Components/OrderPage/Orders";
import Footer from "../Components/Footer";
import { useRouter } from "next/router";
import { getSessionUser } from "../Services/functions";
import Loader from "../Components/Loader";

function orders() {
  const router = useRouter();
  const [userTransaction, setUserTransaction] = useState([]);

  // get user
  useEffect(() => {
    const userName = async () => {
      const userData = await getSessionUser();

      setUserTransaction(userData?.user?.transaction);
      // console.log(userData);
    };
    userName();
  }, [router]);

  //  rerout to login for unregustered users
  const [loginTriger, setLoginTriger] = useState(false);
  useEffect(() => {
    async function fetchSessionUser() {
      const userSession = await getSessionUser(router);
      if (!userSession) {
        return setLoginTriger(true);
      }
    }
    fetchSessionUser();
  }, [router]);
  return (
    <div className="order-page-main-con">
      <Topbar />
      {userTransaction ? (
        <Orders userTransaction={userTransaction} />
      ) : (
        <>
          <Loader />
          <div style={{ textAlign: "center" }}>
            <h3>SEARCH FOR TRANSACTIONS ...</h3>
          </div>
          {loginTriger && <Modal setLoginTriger={setLoginTriger} />}
        </>
      )}

      {/* <Footer /> */}
    </div>
  );
}
// orders.requireAuth = true;
export default orders;
