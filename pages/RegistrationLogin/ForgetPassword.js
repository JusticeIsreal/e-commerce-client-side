import { useRef } from "react";
import Link from "next/link";
// import "./LoginStyle.css";

import { AiFillEye, AiFillEyeInvisible, AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/router";

function ForgetPassword() {
  let flipPage1 = useRef();
  let showModal = useRef();

  // function to flip te login page to registration page
  const flipChangePw1 = (e) => {
    // e.preventDefault();
    showModal.current.style.transform = "scale(1)";
  };

  const flipChangePwPage = (e) => {
    // e.preventDefault();
    flipPage1.current.style.transform = "rotateY(180deg)";
    showModal.current.style.transform = "scale(0)";
  };

  // page reload

  const refreshPage = () => {
    location.reload();
  };

  // previous page
  const router = useRouter();
  function goBack() {
    router.back();
  }
  return (
    <div className="login-page-con">
      <div className="container">
        <div className="card" ref={flipPage1}>
          <form className="front">
            <div onClick={() => goBack()}>
              <div className="go-back">
                <IoIosArrowBack />
              </div>
            </div>
            <p className="sign-in-header">Forget Password ?</p>
            <p className="session-note">
              Please enter the email associated with your account and we’ll send
              an email with instructions to reset your password.
            </p>

            <div className="input-main-con">
              <label>Enter Email</label>
              <div className="input-con">
                <AiOutlineMail className="input-icon" />
                <input type="email" placeholder="Email" />
              </div>
              {/* <p className="validation-text">Validation test</p> */}
            </div>

            <div className="login-btn-link">
              <div className="login-submit-btn" onClick={() => flipChangePw1()}>
                Send Notification
              </div>
            </div>
          </form>

          {/* notification modal */}
          <form className="email-modal" ref={showModal}>
            <p className="sign-in-header">Email Notification</p>
            <p className="session-note">
              A confirmation email has been sent to the email address you
              provided ekp*******510@gmail.com, click on the link to verify your
              email address
            </p>
            <div onClick={() => refreshPage()}>
              <div className="go-back">
                <IoIosArrowBack />
              </div>
            </div>

            <div className="login-btn-link">
              <div
                className="login-submit-btn"
                onClick={() => flipChangePwPage()}
              >
                Send Email
              </div>
            </div>
          </form>
          {/* back card for registration */}
          <form className="back">
            <p className="sign-in-header">Enter New Password</p>
            <p className="session-note">
              Please enter a new password to reset your password.
            </p>
            <div onClick={() => refreshPage()}>
              <div className="go-back">
                <IoIosArrowBack />
              </div>
            </div>
            <div className="input-main-con">
              <label>Enter Password</label>
              <div className="input-con">
                <RiLockPasswordLine className="input-icon" />
                <input type="password" placeholder="Password" />
                <AiFillEye className="input-icon eye" />
              </div>
              <div className="input-con">
                <RiLockPasswordLine className="input-icon" />
                <input type="password" placeholder="Password" />
                <AiFillEye className="input-icon eye" />
              </div>
              {/* <p className="validation-text">Validation test</p> */}
            </div>
            <div className="login-btn-link">
              <div className="login-submit-btn">Change Password</div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
