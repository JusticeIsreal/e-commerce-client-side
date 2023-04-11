import React, { useEffect, useState } from "react";
import { AiFillBell } from "react-icons/ai";
import { getSessionUser } from "../../Services/functions";

// ICONS
import { GiBookCover } from "react-icons/gi";
import { useRouter } from "next/router";
function Topbar() {
  // FETCHING SESSION USER NAME AND CART LENGTH
  const router = useRouter();
  const [name, setName] = useState(null);
  const [userPosition, setUserPosition] = useState("");
  const [transactionNotification, setTransactionNotification] = useState([]);

  useEffect(() => {
    async function fetchSessionUser() {
      const userData = await getSessionUser(router);
      if (userData && userData.user) {
        setName(userData.user.username);
        setUserPosition(userData.user.position);
        setTransactionNotification(userData.user.transaction);
      }
    }
    fetchSessionUser();
  }, []);
  return (
    <div id="content">
      <nav>
        <span className="top-title">
          <GiBookCover />
          <h1>AJIS</h1>
        </span>
        <div style={{ textAlign: "center", color: "#3d91e6" }}>
          {/* <p>{name}</p> */}
          <p style={{ textTransform: "uppercase" }}>{userPosition}</p>
        </div>
        <div className="dark-mode-con">
          <div className="notification">
            <AiFillBell className="bx bxs-bell" />
            <span className="num">{transactionNotification.length}</span>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Topbar;
