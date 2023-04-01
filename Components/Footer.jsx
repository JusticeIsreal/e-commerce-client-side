// import React from "react";
import Link from "next/link";

// icopns
import { BsFacebook, BsWhatsapp } from "react-icons/bs";
import { AiFillTwitterCircle, AiTwotoneMail } from "react-icons/ai";
import { FaInstagramSquare } from "react-icons/fa";
function Footer() {
  return (
    <section className="footer">
      <div className="box-container">
        <div className="box">
          <h3>Our Location</h3>
          <a href="">
            <i className="fas fa-map-marker-alt"></i> Nigeria
          </a>
        </div>

        <div className="box">
          <h3>Quick Links</h3>
          <a href="">
            <i></i> home
          </a>
          <a href="">
            <i></i> Products
          </a>
          <a href="">
            <i></i> Transaction
          </a>
          <a href="">
            <i></i> Review
          </a>
        </div>

        <div className="box">
          <h3>Extra links</h3>
          <a href="">
            <i></i> privacy policy
          </a>
          <a href="">
            <i></i> payment method
          </a>
          <a href="">
            <i></i> our serivces
          </a>
          <Link href="/Adminpage/AdminDashboard">
            <i></i>Admin Login
          </Link>
        </div>

        <div
          className="box"
          // style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}
        >
          <h3>contact info</h3>
          <a href="#">
            {" "}
            <i className="fas fa-phone"></i> +234-810-401-5180{" "}
          </a>
          <a href="#">
            {" "}
            <i className="fas fa-envelope"></i>justiceyba@gmail.com
          </a>
          <img
            src="https://res.cloudinary.com/isreal/image/upload/v1679580817/jayflix%20vid%20posters/worldmap_mibrmb.png"
            className="map"
            alt=""
          />
        </div>
      </div>

      <div className="share">
        <a href="#">
          <BsFacebook />
        </a>
        <a href="#">
          <AiFillTwitterCircle />
        </a>
        <a href="#">
          <FaInstagramSquare />
        </a>
        <a href="#">
          <BsWhatsapp />
        </a>
        <a href="#">
          <AiTwotoneMail />
        </a>
      </div>

      <div className="credit">
        {" "}
        created by <span>Justice Isreal Agbonma</span> | copyright &copy;2023 |
        all rights reserved!{" "}
      </div>
    </section>
  );
}

export default Footer;
