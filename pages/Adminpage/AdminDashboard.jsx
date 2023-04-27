import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/AdminPageComponents/Sidebar";
import Topbar from "../../Components/AdminPageComponents/Topbar";
import DashboardMain from "../../Components/AdminPageComponents/DashboardMain";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../Firebase";
import { getSessionUser } from "../../Services/functions";
import { useRouter } from "next/router";

function AdminDashboard() {
  // FETCHIN BANNER SORTED FROM FIREBABSE
  const [bannerDetails, setBannerDetails] = useState([]);

  useEffect(() => {
    return onSnapshot(
      query(collection(db, "banneritems"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setBannerDetails(snapshot.docs);
      }
    );
  }, [db]);

  // SFETCHIN PRODUCCTS SORTED FROM FIREBABSE
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    return onSnapshot(
      query(collection(db, "products"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setProductDetails(snapshot.docs);
      }
    );
  }, [db]);

  // ALLOW ONLY ADMI AND STAFF ACCESS
  const [userPosition, setUserPosituon] = useState("");
  const router = useRouter();
  useEffect(() => {
    const userInfo = async () => {
      const userData = await getSessionUser();
      setUserPosituon(userData?.user?.position);

      if (userPosition === "client") {
        router.push("/");
      }
    };
    userInfo();
  }, [userPosition, router]);



  
  return (
    <div>
      {userPosition === "admin" || userPosition === "staff" ? (
        <>
          {" "}
          <Topbar />
          <Sidebar />
          <DashboardMain
            bannerDetails={bannerDetails}
            productDetails={productDetails}
            // users={users}
          />
        </>
      ) : (
        ""
      )}
    </div>
  );
}
AdminDashboard.requireAuth = true;
export default AdminDashboard;
