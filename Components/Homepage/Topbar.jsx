import React from "react";

// ICONS
import { SiCoinmarketcap } from "react-icons/si";
import { FaCartArrowDown } from "react-icons/fa";
import { BsShop } from "react-icons/bs";
import { FiGrid } from "react-icons/fi";
import { RiRefund2Fill } from "react-icons/ri";
import { MdOutlineRateReview } from "react-icons/md";
import { AiOutlinePhone } from "react-icons/ai";
function Topbar() {
  return (
    <div className="topbar-main-con">
      {/* TOPBAR  */}

      <div className="topbar-top-con">
        {/* logo side */}
        <div className="topbar-top-con-left">
          <SiCoinmarketcap className="icon" />
        </div>
        {/* cart and user icon */}
        <div className="topbar-top-con-right">
          <div className="cart-icon-con">
            <p>0</p>
            <FaCartArrowDown className="icon" />
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <div className="navbar-main-con">
        <nav>
          <ul>
            <li className="listactive">
              <div className="nav-active"></div>
              <span>
                <BsShop className="menu-icon" />
              </span>
              <p> Home</p>
            </li>
            <li>
              <span>
                <FiGrid className="menu-icon" />
              </span>
              Products
            </li>
            <li>
              <span>
                <RiRefund2Fill className="menu-icon" />
              </span>
              Promo
            </li>
            <li>
              <span>
                <MdOutlineRateReview className="menu-icon" />
              </span>
              Review
            </li>
            <li>
              <span>
                <AiOutlinePhone className="menu-icon" />
              </span>
              Contact
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Topbar;
