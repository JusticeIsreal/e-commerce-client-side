import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/AdminPageComponents/Sidebar";
import Topbar from "../../Components/AdminPageComponents/Topbar";
import DashboardMain from "../../Components/AdminPageComponents/DashboardMain";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../Firebase";
function AdminDashboard() {
  // SFETCHIN BANNER SORTED FROM FIREBABSE
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
  return (
    <div>
      <Topbar />
      <Sidebar />
      <DashboardMain
        bannerDetails={bannerDetails}
        productDetails={productDetails}
        // users={users}
      />
    </div>
  );
}

export default AdminDashboard;
