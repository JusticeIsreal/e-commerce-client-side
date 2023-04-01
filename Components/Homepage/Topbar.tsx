import React from "react";
import Link from "next/link";
// ICONS
import { SiCoinmarketcap } from "react-icons/si";
import { FaCartArrowDown } from "react-icons/fa";
import { BsShop } from "react-icons/bs";
import { FiGrid, FiTruck } from "react-icons/fi";
import { MdContactSupport } from "react-icons/md";

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
            <Link href="/">
              <li className="listactive">
                <div className="nav-active"></div>
                <span>
                  <BsShop className="menu-icon" />
                </span>
                <p> Home</p>
              </li>
            </Link>
            <Link href="/ProductsPage">
              <li>
                <span>
                  <FiGrid className="menu-icon" />
                </span>
                <p> Products</p>
              </li>
            </Link>
            <li>
              <span>
                <FiTruck className="menu-icon" />
              </span>
              Order
            </li>
            <li>
              <span>
                <MdContactSupport className="menu-icon" />
              </span>
              Support
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Topbar;
