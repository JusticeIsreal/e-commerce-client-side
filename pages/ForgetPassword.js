import { useRef, useState } from "react";
import Link from "next/link";
import OtpInput from "react-otp-input";
import ChangePasswordForm from "../Components/Homepage/ChangePassword.jsx";
// import "./LoginStyle.css";

import { AiFillEye, AiFillEyeInvisible, AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/router";
import axios from "axios";

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

  // email verification
  const emailRef = useRef();
  const [errMessage, seErrMessage] = useState();
  const [email, seEmail] = useState();

  function handleSubmit(event) {
    event.preventDefault();
    const useremail = emailRef.current.value.toLowerCase();
    seEmail(useremail);

    axios
      .post("http://localhost:1234/api/v1/userverification/forgotPassword", {
        useremail,
      })
      .then((resp) => {
        // console.log(resp.data.data.userId);
        localStorage.setItem("userId", resp.data.data.userId);
        flipChangePw1();
      })
      .catch((error) => {
        // console.log(error);
        seErrMessage(error.response.data.error);
        // setShowResendOTPLink(true);
        setTimeout(() => {
          // setRegErrMessage("");
        }, 3000);
      });
  }
  // email OTP
  // retrive userID from local storage
  //
  const [otp, setOtp] = useState("");
  const enterOTP = async () => {
    const userId = localStorage.getItem("userId") || [];
    axios
      .post("http://localhost:1234/api/v1/userverification/resetpasswordOTP", {
        userId,
        otp,
      })
      .then((resp) => {
        flipChangePwPage();
      })
      .catch((error) => {
        console.log(error);
        seErrMessage(error.response.data.message);
      });
  };

  return (
    <div className="login-page-con">
      <div className="container">
        <div className="card" ref={flipPage1}>
          <form className="front" onSubmit={handleSubmit}>
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
            <p className="session-note" style={{ color: "red" }}>
              {errMessage}
            </p>

            <div className="input-main-con">
              <label>Enter Email</label>
              <div className="input-con">
                <AiOutlineMail className="input-icon" />
                <input
                  type="email"
                  placeholder="Email"
                  ref={emailRef}
                  style={{ fontSize: "20px" }}
                />
              </div>
              {/* <p className="validation-text">Validation test</p> */}
            </div>

            <div className="login-btn-link">
              <button type="submit" className="login-submit-btn">
                Send Notification
              </button>
            </div>
          </form>

          {/* ENTER OTP */}
          <form className="email-modal" ref={showModal}>
            <p className="sign-in-header">Email Notification</p>
            <p className="session-note">
              {` A confirmation email has been sent to the email address you
              provided ${email}, click on the link to verify your email
              address`}
            </p>

            <div
              onClick={() => refreshPage()}
              style={{
                zIndex: "5",
              }}
            >
              <div className="go-back">
                <IoIosArrowBack />
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                top: "0px",
                width: "100%",
                height: "550px",
                // background: "white",
              }}
            >
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  width: "100%",
                  height: "550px",
                  borderRadius: "5px",
                  border: "2px solid #3c91e6",
                }}
              >
                <p className="session-note" style={{ color: "red" }}>
                  {errMessage}
                </p>
                <label
                  style={{
                    fontSize: "20px",
                    color: "#3c91e6",
                    marginBottom: "20px",
                  }}
                >
                  Enter OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={4}
                  renderSeparator={<span>-</span>}
                  renderInput={(props) => <input {...props} />}
                  containerStyle={{
                    width: "250px",
                    height: "50px",
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                  inputStyle={{
                    border: "2px solid #3c91e6",
                    width: "100%",
                    height: "100%",
                    fontSize: "30px",
                  }}
                />
                <button
                  type="button"
                  style={{
                    width: "250px",
                    height: "50px",
                    marginTop: "50px",
                    borderRadius: "5px",
                    fontSize: "20px",
                    color: "white",
                    background: " #3c91e6",
                    border: "2px solid #3c91e6",
                  }}
                  onClick={() => enterOTP()}
                >
                  Verify Email
                </button>
              </div>
            </div>
          </form>
          {/* back card for registration */}
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
