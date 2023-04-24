import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { getSingleUser } from "../../../Services/functions";
import { useEffect } from "react";
function CustomerID() {
  const router = useRouter();
  const { customerID: userID } = router.query;
  const {
    data: userData,
    isLoading,
    error,
  } = useSWR(userID ? userID : null, getSingleUser);

  useEffect(() => {}, []);
  return <div>customer</div>;
}

export default CustomerID;
