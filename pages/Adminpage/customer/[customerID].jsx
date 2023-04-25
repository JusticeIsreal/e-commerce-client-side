import { useRouter } from "next/router";
import React, { useState } from "react";
import useSWR from "swr";
import {
  allUsers,
  getSessionUser,
  getSingleUser,
  singleUser,
} from "../../../Services/functions";
import { useEffect } from "react";
import { GoVerified } from "react-icons/go";
import { RxAvatar } from "react-icons/rx";
import { SlCallEnd } from "react-icons/sl";
import { BsWhatsapp } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { TbLock, TbLockOpen } from "react-icons/tb";
import Link from "next/link";
import { TiArrowBack } from "react-icons/ti";
import axios from "axios";
import Cookies from "js-cookie";
function CustomerID() {
  const router = useRouter();
  const { customerID: userID } = router.query;
  const {
    data: userData,
    isLoading,
    error,
  } = useSWR(userID ? userID : null, getSingleUser);

  // FETCH TRANSACTION STATUS
  const [succesStatus, setSuccessStatus] = useState();
  const [pendingStatus, setPendingStatus] = useState();
  const [abandonedStatus, setAbandonedStatus] = useState();
  const [failedStatus, setFailedStatus] = useState();
  useEffect(() => {
    async function fetchSessionUser() {
      if (userData) {
        const success = userData.transaction.filter(
          (order) => order.transactionstatus.toLowerCase() === "success"
        );
        const pending = userData.transaction.filter(
          (order) => order.transactionstatus.toLowerCase() === "pending"
        );
        const abandoned = userData.transaction.filter(
          (order) => order.transactionstatus.toLowerCase() === "abandoned"
        );
        const failed = userData.transaction.filter(
          (order) => order.transactionstatus.toLowerCase() === "failed"
        );

        setSuccessStatus(success);
        setPendingStatus(pending);
        setAbandonedStatus(abandoned);
        setFailedStatus(failed);
      }
    }
    fetchSessionUser();
  }, [userID, router, userData]);

  // console.log(userData);

  // user session
  const [session, setSession] = useState();

  useEffect(() => {
    async function fetchSessionUser() {
      const userData = await getSessionUser(router);
      if (userData) {
        setSession(userData);
      }
      if (session?.user.position === "client") {
        router.push("/");
      }
    }
    fetchSessionUser();
  }, [router, session?.user.position]);

  // conver time stamp
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  const formattedTimestamp = formatDate(userData?.timestamp);

  // goback
  function goBack() {
    router.back();
  }

  const blockUser = async () => {
    const token = Cookies.get("JWTtoken");
    await axios
      .patch(
        "http://localhost:1234/api/v1/userverification/updateuser/" +
          `${userID}`,
        {
          block: true,
          position: "client",
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )

      .then((resp) => {
        // setBtnLoading(false);
        // console.log(resp);
        location.reload();
      })
      .catch((err) => {
        throw err;
      });
  };
  const unBlockUser = async () => {
    const token = Cookies.get("JWTtoken");
    await axios
      .patch(
        "https://api-j.onrender.com/api/v1/userverification/updateuser/" +
          `${userID}`,
        {
          block: false,
          position: "client",
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )

      .then((resp) => {
        // setBtnLoading(false);
        console.log(resp);
        location.reload();
      })
      .catch((err) => {
        throw err;
      });
  };
  return (
    <div className="singleuser-page">
      {session?.user.position === "admin" ||
      session?.user.position === "staff" ? (
        <div className="singleuser-card">
          <button onClick={goBack} className="go-back">
            <TiArrowBack />
            Back
          </button>
          {userData?.position === "admin" && (
            <p className="status-dot">admin</p>
          )}
          {userData?.position === "staff" && (
            <p className="status-dot">staff</p>
          )}
          {userData?.position === "client" && (
            <p className="status-dot">client</p>
          )}
          <div className="top-part">
            <div className="avatar">
              {userData?.verified === true && (
                <GoVerified className="verified" />
              )}
              <RxAvatar />
            </div>
            <h4>{userData?.username}</h4>
            <p>{userData?.userphonenumber}</p>
            <p>{userData?.useremail}</p>
            <div className="contact">
              <a target="_blank" href={`tel:${userData?.userphonenumber}`}>
                <span>
                  <SlCallEnd />
                  <p>Call</p>
                </span>
              </a>
              <a
                target="_blank"
                href={`https://wa.me/${userData?.userphonenumber}?text=Hello, I am a ${session?.user?.username} from AJIS STORES `}
              >
                <span>
                  <BsWhatsapp />
                  <p>Whatsapp</p>
                </span>
              </a>
              <a target="_blank" href={`mailto:${userData?.useremail}`}>
                <span>
                  <AiOutlineMail />
                  <p>Email</p>
                </span>
              </a>
              {session?.user?.position === "admin" && (
                <>
                  {userData?.block === true ? (
                    <p>
                      <span>
                        <TbLock onClick={() => unBlockUser()} />
                      </span>
                      <span>Un-block user</span>
                    </p>
                  ) : (
                    <span>
                      <span>
                        <TbLockOpen onClick={() => blockUser()} />
                      </span>
                      <p>Block user</p>
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="lower-part">
            <p>
              Date of Reg.
              <span>{formattedTimestamp}</span>
            </p>
            <p>
              No of transactions: {userData?.transaction.length}
              <span>how much</span>
            </p>
            <h3>
              Sucessful transaction: <span>{succesStatus?.length}</span>
            </h3>
            <div className="transaction-main-con">
              {succesStatus?.map((order) => (
                <SuccessTransactions key={order._id} {...order} />
              ))}
            </div>
            <h3>
              Pending transaction: <span>{pendingStatus?.length}</span>
            </h3>
            <div className="transaction-main-con">
              {pendingStatus?.map((order) => (
                <PendingTransactions key={order._id} {...order} />
              ))}
            </div>
            <h3>
              Abandoned transaction: <span>{abandonedStatus?.length}</span>
            </h3>
            <div className="transaction-main-con">
              {abandonedStatus?.map((order) => (
                <AbandonedTransactions key={order._id} {...order} />
              ))}
            </div>
            <h3>
              Failed transaction: <span>{failedStatus?.length}</span>
            </h3>
            <div className="transaction-main-con">
              {failedStatus?.map((order) => (
                <Failedransactions key={order._id} {...order} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
CustomerID.requireAuth = true;
export default CustomerID;

// SUCCESSFFUL TRANSACTIONS
function SuccessTransactions({
  transactionstatus,
  _id,
  timestamp,
  totalAmount,
  product,
}) {
  // conver time stamp
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  const formattedTimestamp = formatDate(timestamp);

  return (
    <div className="transaction-card1">
      <Link href={`/Adminpage/transaction/${_id}`} className="transaction-card">
        <p className="product-number">
          Products: <span> {product?.length}</span>
        </p>
        <p>{formattedTimestamp}</p>
        <p>₦ {totalAmount.toLocaleString()}</p>{" "}
      </Link>
    </div>
  );
}

// PENDING TRANSACTION
function PendingTransactions({
  transactionstatus,
  _id,
  timestamp,
  totalAmount,
  product,
}) {
  // conver time stamp
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  const formattedTimestamp = formatDate(timestamp);

  return (
    <div className="transaction-card1">
      <Link href={`/Adminpage/transaction/${_id}`} className="transaction-card">
        <p className="product-number">
          Products: <span> {product?.length}</span>
        </p>
        <p>{formattedTimestamp}</p>
        <p>₦ {totalAmount.toLocaleString()}</p>{" "}
      </Link>
    </div>
  );
}

// ABANDONED TRANSACTION
function AbandonedTransactions({
  transactionstatus,
  _id,
  timestamp,
  totalAmount,
  product,
}) {
  // conver time stamp
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  const formattedTimestamp = formatDate(timestamp);

  return (
    <div className="transaction-card1">
      <Link href={`/Adminpage/transaction/${_id}`} className="transaction-card">
        {transactionstatus.toLowerCase() === "success" && (
          <p className="success-dot"></p>
        )}
        <p className="product-number">
          Products: <span> {product?.length}</span>
        </p>
        <p>{formattedTimestamp}</p>
        <p>₦ {totalAmount.toLocaleString()}</p>{" "}
      </Link>
    </div>
  );
}

// FALIED TRANSACTION
function Failedransactions({
  transactionstatus,
  _id,
  timestamp,
  totalAmount,
  product,
}) {
  // conver time stamp
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  const formattedTimestamp = formatDate(timestamp);

  return (
    <div className="transaction-card1">
      <Link href={`/Adminpage/transaction/${_id}`} className="transaction-card">
        {transactionstatus.toLowerCase() === "success" && (
          <p className="success-dot"></p>
        )}
        <p className="product-number">
          Products: <span> {product?.length}</span>
        </p>
        <p>{formattedTimestamp}</p>
        <p>₦ {totalAmount.toLocaleString()}</p>{" "}
      </Link>
    </div>
  );
}
