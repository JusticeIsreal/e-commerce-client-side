import React from "react";
import { useRef } from "react";
import  Link  from "next/link";

// react icons
import { GiBookCover } from "react-icons/gi";
import { MdDashboard, MdGroup, MdSettings } from "react-icons/md";
import { RiMessage2Fill } from "react-icons/ri";
import { BiLogOutCircle } from "react-icons/bi";
import { FaStore, FaMoneyCheckAlt } from "react-icons/fa";
// import AdminDashboard from "../../Pages/Adminpage/AdminDashboard";
function Sidebar() {
  const dashboardRef = useRef();
  const transactionRef = useRef();
  const storeRef = useRef();
  const messageRef = useRef();
  const teamRef = useRef();
  const settingRef = useRef();
  const logoutRef = useRef();

  const addActive = (e) => {
    let dashboard = dashboardRef.current;
    let transaction = transactionRef.current;
    let store = storeRef.current;
    let message = messageRef.current;
    let team = teamRef.current;
    let setting = settingRef.current;
    let logout = logoutRef.current;
    // console.log(thislist);

    if (e.target.innerHTML === "My Store") {
      store.className = "active";
    } else {
      store.className = "";
    }
    if (e.target.innerHTML === "Dashboard") {
      dashboard.className = "active";
    } else {
      dashboard.className = "";
    }
    if (e.target.innerHTML === "Transactions") {
      transaction.className = "active";
    } else {
      transaction.className = "";
    }
    if (e.target.innerHTML === "Notification") {
      message.className = "active";
    } else {
      message.className = "";
    }
    if (e.target.innerHTML === "Users") {
      team.className = "active";
    } else {
      team.className = "";
    }
    if (e.target.innerHTML === "Settings") {
      setting.className = "active";
    } else {
      setting.className = "";
    }
    if (e.target.innerHTML === "Logout") {
      logout.className = "active";
    } else {
      logout.className = "";
    }
  };

  return (
    <div>
      <section id="sidebar" className="sidebar">
        <a className="brand">
          <GiBookCover className="bx" />
          <span className="text">TOP MINDS</span>
        </a>
        <ul className="side-menu top">
          <li ref={dashboardRef} onClick={(e) => addActive(e)}>
            <Link className="list-items" href="/">
              <MdDashboard className="list-icons" />
              <span className="text">Dashboard</span>
            </Link>
          </li>
          <li ref={storeRef} onClick={(e) => addActive(e)}>
            <Link className="list-items" href="/">
              <FaStore className="list-icons" />
              <span className="text">My Store</span>
            </Link>
          </li>

          <li ref={transactionRef} onClick={(e) => addActive(e)}>
            <Link href="/" className="list-items">
              <FaMoneyCheckAlt className="list-icons" />
              <span className="text">Transactions</span>
            </Link>
          </li>
          <li ref={messageRef} onClick={(e) => addActive(e)}>
            <a href="#" className="list-items">
              <RiMessage2Fill className="list-icons" />
              <span className="text">Notification</span>
            </a>
          </li>

          <li ref={teamRef} onClick={(e) => addActive(e)}>
            <Link href="/" className="list-items">
              <MdGroup className="list-icons" />
              <span className="text">Users</span>
            </Link>
          </li>
        </ul>
        <ul className="side-menu down">
          <li ref={settingRef} onClick={(e) => addActive(e)}>
            <a href="#" className="list-items">
              <MdSettings className="list-icons" />
              <span className="text">Settings</span>
            </a>
          </li>
          <li ref={logoutRef} onClick={(e) => addActive(e)}>
            <a href="#" className="logout">
              <BiLogOutCircle className="list-icons" />
              <span className="text">Logout</span>
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default Sidebar;
