import React, { useEffect, useState } from "react";
import Topbar from "../Components/Topbar";
import Modal from "../Components/Modal";
import Orders from "../Components/OrderPage/Orders";
import Footer from "../Components/Footer";
import { useRouter } from "next/router";
import { getSessionUser, transactionStatus } from "../Services/functions";
import Loader from "../Components/Loader";
import Pagination from "../Components/Pagination";
import { paginate } from "../paginate";

function orders() {
  const router = useRouter();
  const [userTransaction, setUserTransaction] = useState([]);

  // get user
  // const storedRefID = localStorage.getItem("refID");
  // const refID = JSON.parse(storedRefID);
  useEffect(() => {
    const userName = async () => {
      const userData = await getSessionUser();
      // console.log(refID.userData, refID.transactID);
      // await transactionStatus(refID.userData, refID.transactID);

      setUserTransaction(userData?.user?.transaction);
      // console.log(userData);

      if (userData?.user.block === true) {
        router.push("/Login");
      }
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

  // ...................................
  // const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const pageOfCountries = paginate(userTransaction, currentPage, pageSize);

  const handlePageChange = (pageNumber, totalPages) => {
    if (pageNumber !== "prev" && pageNumber !== "next")
      setCurrentPage(pageNumber);
    else if (pageNumber === "prev" && currentPage > 1)
      setCurrentPage(currentPage - 1);
    else if (pageNumber === "next" && currentPage < totalPages)
      setCurrentPage(currentPage + 1);
  };

  // ..................................

  return (
    <div className="order-page-main-con">
      <Topbar />
      {userTransaction ? (
        <Orders userTransaction={pageOfCountries} />
      ) : (
        <>
          <Loader />
          <div style={{ textAlign: "center" }}>
            <h3>SEARCH FOR TRANSACTIONS ...</h3>
          </div>
          {loginTriger && <Modal setLoginTriger={setLoginTriger} />}
        </>
      )}
      <Pagination
        itemsCount={userTransaction?.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        className="pagination-order-page"
      />
      {/* <Footer /> */}
    </div>
  );
}
// orders.requireAuth = true;
export default orders;
