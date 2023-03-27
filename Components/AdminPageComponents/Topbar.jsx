import React from "react";
import { AiFillBell } from "react-icons/ai";
const img =
  "https://res.cloudinary.com/isreal/image/upload/v1675285922/My%20portfolio%20Project/1671744344371-removebg-preview_dxwbbb.png";

// ICONS
import { GiBookCover } from "react-icons/gi";
function Topbar() {
  return (
    <div id="content">
      <nav>
        <span className="top-title">
          <GiBookCover />
          <h1>TOP MINDS</h1>
        </span>

        <div className="dark-mode-con">
          <div className="notification">
            <AiFillBell className="bx bxs-bell" />
            <span className="num">8</span>
          </div>
          <a href="" className="profile">
            <img src={img} alt="" />
          </a>
        </div>
      </nav>
    </div>
  );
}

export default Topbar;
