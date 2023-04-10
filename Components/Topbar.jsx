import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// ICONS
import { SiCoinmarketcap } from "react-icons/si";
import { FaCartArrowDown } from "react-icons/fa";
import { BsShop } from "react-icons/bs";
import { FiGrid, FiTruck } from "react-icons/fi";
import { MdContactSupport } from "react-icons/md";
import { getSessionUser } from "../Services/functions";
function Topbar() {
  // SET NAV LIST  COLOR WITH PAGE PATH NAME
  const [active, setActive] = useState(0);
  const router = useRouter();
  useEffect(() => {
    if (router.asPath === "/homepage") {
      setActive(1);
      return;
    }
    if (router.asPath === "/productspage") {
      setActive(2);
      return;
    }
    if (router.asPath === "/orders") {
      setActive(3);
      return;
    }
  }, [router.pathname]);

  // FETCHING SESSION USER NAME AND CART LENGTH
  const [name, setName] = useState();
  const [cartLength, setCartLength] = useState([]);
  useEffect(() => {
    const userName = async () => {
      const userData = await getSessionUser();
      setName(userData.user.username);
      setCartLength(userData.user.cart);
    };
    userName();
  }, [name]);

  return (
    <div className="topbar-main-con">
      {/* TOPBAR  */}

      <div className="topbar-top-con">
        {/* logo side */}
        <div className="topbar-top-con-left">
          <Link href="/homepage">
            <SiCoinmarketcap className="icon" />
          </Link>
          <p style={{ marginLeft: "5px", color: "#3c91e6" }}>
            {name && "Hello! " + name}
          </p>
        </div>

        {/* cart and user icon */}
        <div className="topbar-top-con-right">
          <div className="cart-icon-con">
            <p>{cartLength.length}</p>
            <FaCartArrowDown className="icon" />
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <div className="navbar-main-con">
        <nav>
          <ul>
            <Link href="/homepage">
              <li
                className={`${active === 1 ? "listactive" : ""}`}
                onClick={() => setActive(1)}
              >
                {active == 1 ? <div className="nav-active"></div> : ""}
                <span>
                  <BsShop className="menu-icon" />
                </span>
                <p> Home</p>
              </li>
            </Link>
            <Link href="/productspage">
              <li
                className={`${active === 2 ? "listactive" : ""}`}
                onClick={() => setActive(2)}
              >
                {active == 2 ? <div className="nav-active"></div> : ""}
                <span>
                  <FiGrid className="menu-icon" />
                </span>
                <p> Products</p>
              </li>
            </Link>
            <Link href="/orders">
              <li
                className={`${active === 2 ? "listactive" : ""}`}
                onClick={() => setActive(2)}
              >
                {active == 3 ? <div className="nav-active"></div> : ""}
                <span>
                  <FiTruck className="menu-icon" />
                </span>
                <p> Order</p>
              </li>
            </Link>

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
