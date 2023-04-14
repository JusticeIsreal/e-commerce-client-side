import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  singleTransaction,
  singleTransactionFetcher,
} from "../../../Services/functions";
import useSWR from "swr";
const API = "http://localhost:1234/api/v1/transaction/getsingletransaction";
function transactionrecipt() {
  const router = useRouter();
  const { transactID } = router.query;
  const [getTransaction, setGetTransaction] = useState({});
  const {
    data: userData,
    isLoading,
    error,
  } = useSWR(transactID ? transactID : null, singleTransactionFetcher);
  console.log(userData);
  return (
    <div>
      {isLoading ? <div>loading</div> : "DONE"}
      {error && <div>error</div>}
      <div>
        <div>
          <h3>Transaction Receipt</h3>
          <p>Order Ref: {userData?.paystackRef}</p>
          <p>
            {userData?.transactionstatus === "Pending"
              ? "Your transation is been proccesed ,once confirmed your order will be approved"
              : `Your transation has been confirmed and your order is currently ${userData?.status}`}
          </p>
          <h4>YOUR ORDER</h4>
          <div>
            {userData?.product.map((item) => (
              <div key={item._id}>
                <span>{item?.productname}</span>
                <span>₦ {item?.productprice.toLocaleString()}</span>
                <span>₦ {item?.quantity.toLocaleString()}</span>
                <span>₦ {item?.total.toLocaleString()}</span>
              </div>
            ))}

            <div>
              <span>Transaction status:</span>
              <span> {userData?.transactionstatus}</span>
            </div>
            <div>
              <span>Order status:</span>
              <span> {userData?.status}</span>
            </div>
            <div>
              <span>Delivery address:</span>
              <span> {userData?.deliveryaddress}</span>
            </div>
            <div>
              <span>₦ {userData?.totalAmount.toLocaleString()}</span>
            </div>
          </div>

          <div>
            <p>Print page</p>
            <p>Make a report</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default transactionrecipt;
