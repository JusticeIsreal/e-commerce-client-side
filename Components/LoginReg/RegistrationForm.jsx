import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Loader } from "@mantine/core";
import axios from "axios";
import { Group, Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { AiFillEye, AiFillEyeInvisible, AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";
import { BiDialpad, BiUserCircle } from "react-icons/bi";
import { enterOTP, registerUser } from "../../Services/functions";
// import EnterOTP from "./enterOTP";
// import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";

function RegistrationForm() {
  // ....................................................
  // STATE
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ...............................................
  // TOGGLE PASSWORD FORMAT
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // ................................................
  // useform config
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      useremail: "",
      userphonenumber: "",
      password: "",
      confirmPassword: "",
      policy: false,
    },
  });

  // ...............................................
  // password and confirm password validaton
  const passwordConfirmValidator = (value) =>
    value === watch("password") || "Passwords do not match";

  // ..................................................
  // RIGISTER USER STATE
  const [regErrMessage, setRegErrMessage] = useState();
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [showResendOTPForm, setShowResendOTPForm] = useState(false);
  const [showResendOTPLink, setShowResendOTPLink] = useState(false);
  const [notificationModal, setNotificationModal] = useState("");
  const [regBtnLoading, setRegBtnLoading] = useState(false);

  // .....................................................
  // submit user details
  const onSubmit = async (data) => {
    setRegBtnLoading(true);
    const user = {
      username: data.username.toLowerCase(),
      useremail: data.useremail.toLowerCase(),
      policy: data.policy,
      userphonenumber: data.userphonenumber,
      password: data.password,
    };

    await registerUser(
      user,
      setShowOTPForm,
      setShowResendOTPForm,
      setShowResendOTPLink,
      setRegErrMessage,
      setRegBtnLoading,
      setNotificationModal
    );
    // reset();
  };

  // ......................................................
  // show notificatio modal
  useEffect(() => {
    if (notificationModal === "PENDING") {
      notifications.show({
        title: "Notification",
        message: "Successful , Proceed to enter OTP",
      });
    }
    if (regErrMessage) {
      notifications.show({
        title: "Notification",
        message: `${regErrMessage}`,
        color: "red",
      });
    }
  }, [notificationModal, regErrMessage]);
  // .....................................................
  return (
    <>
      {/* ajistechnology@gmail.com */}
      {/* OTP MODAL */}
      {notificationModal === "PENDING" ? (
        <EnterOTP setNotificationModal={setNotificationModal} router={router} />
      ) : (
        ""
      )}
      {/* <EnterOTP setNotificationModal={setNotificationModal} router={router} /> */}
      <div className="login-main-con">
        <Group position="center"></Group>
        <div className="login-top-title">
          <h2>Sign Up</h2>
          <p>Sign up to create a user acount on AJIS</p>
          <p>Home / Signup</p>
        </div>
        <div className="form-con">
          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="input-main-con">
              <p>{regErrMessage}</p>
              <label>Enter Username</label>
              <div className="input-con">
                <BiUserCircle className="input-icon" />
                <input
                  type="text"
                  placeholder="First name"
                  {...register("username", { required: true })}
                />
              </div>
              {errors.username && (
                <p className="validation-text">Kindly enter a username.</p>
              )}
            </div>

            <div className="input-main-con">
              <label>Enter Email</label>
              <div className="input-con">
                <AiOutlineMail className="input-icon" />
                <input
                  type="email"
                  placeholder="Enter Email"
                  {...register("useremail", { required: true })}
                />
              </div>
              {errors.useremail && (
                <p className="validation-text">
                  Kindly enter a valid email address.
                </p>
              )}
            </div>

            <div className="input-main-con">
              <label>Enter Phonenumber</label>
              <div className="input-con">
                <BiDialpad className="input-icon" />
                <input
                  type="number"
                  placeholder="Active / Whatsapp Number"
                  {...register("userphonenumber", { required: true })}
                />
              </div>
              {errors.userphonenumber && (
                <p className="validation-text">
                  Kindly enter a valid phone number.
                </p>
              )}
            </div>

            <div className="input-main-con">
              <label>Enter Password</label>
              <div className="input-con" style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  style={{ fontSize: "15px" }}
                  {...register("password", {
                    required: true,
                    validate: passwordConfirmValidator,
                  })}
                />
                {showPassword ? (
                  <AiFillEyeInvisible
                    onClick={toggleShowPassword}
                    style={{
                      position: "absolute",
                      right: "54%",
                      color: "#3c91e6",
                      fontSize: "20px",
                    }}
                  />
                ) : (
                  <AiFillEye
                    onClick={toggleShowPassword}
                    style={{
                      position: "absolute",
                      right: "54%",
                      color: "#3c91e6",
                      fontSize: "20px",
                    }}
                  />
                )}

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  style={{ fontSize: "15px" }}
                  {...register("confirmPassword", {
                    required: true,
                    validate: passwordConfirmValidator,
                  })}
                />

                {showPassword ? (
                  <AiFillEyeInvisible
                    onClick={toggleShowConfirmPassword}
                    style={{
                      position: "absolute",
                      right: "5px",
                      color: "#3c91e6",
                      fontSize: "20px",
                    }}
                  />
                ) : (
                  <AiFillEye
                    onClick={toggleShowConfirmPassword}
                    style={{
                      position: "absolute",
                      right: "5px",
                      color: "#3c91e6",
                      fontSize: "20px",
                    }}
                  />
                )}
              </div>
              {errors.password && (
                <p className="validation-text">{errors.password.message}</p>
              )}
              {errors.confirmPassword && (
                <p className="validation-text">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div
              className="policy-checkbox-con"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                color: "red",
              }}
            >
              <div className="policy-checkbox">
                {" "}
                <input
                  type="checkbox"
                  {...register("policy", { required: true })}
                />{" "}
                <span>
                  I agree to all <a href="/">Terms & Conditions</a>
                </span>
              </div>

              <div>
                {errors.policy && (
                  <p className="validation-text">
                    Kindly click to accept our terms and conditions
                  </p>
                )}
              </div>
            </div>
            <div className="login-btn-link">
              {regBtnLoading ? (
                <Loader size="sm" className="btn-loader" color="white" />
              ) : (
                ""
              )}
              <input
                type="submit"
                disabled={regBtnLoading}
                className="login-submit-btn"
                value={regBtnLoading ? "Uploading ..." : "Sign up"}
              />
            </div>
            <p className="login-registration-link">
              Already have an account ?{" "}
              <Link href="/loginpage">
                <span>Log in</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegistrationForm;

function EnterOTP({ setNotificationModal, router }) {
  // ..................................................
  // STATE
  const [otp, setOtp] = useState("");
  const [regOTPLoading, setOTPBtnLoading] = useState(false);
  const [regErrMsg, setRegErrMsg] = useState();
  const [otpNotificationModal, setOtpNotificationModal] = useState("");
  // .................................................
  // retrive userID from local storage
  const userId = localStorage.getItem("userId");
  // .....................................................
  // SUBMIT OTP
  const submitOTP = async () => {
    setOTPBtnLoading(true);

    console.log(userId, otp);
    await enterOTP(
      setRegErrMsg,
      userId,
      otp,
      router,
      setOTPBtnLoading,
      setOtpNotificationModal
    );
  };
  // ..................................................
  // Notification modal pop up
  useEffect(() => {
    if (otpNotificationModal === "SUCCESS") {
      router.push("/loginpage");
      notifications.show({
        title: "Notification",
        message: "Registration successful, Proceed to login",
      });
    }
    if (regErrMsg) {
      notifications.show({
        title: "Notification",
        message: `${regErrMsg}`,
        color: "red",
      });
    }
  }, [otpNotificationModal, regErrMsg]);
  // ..................................................
  return (
    <div className="otp-con">
      <div className="login-form">
        <h3>Enter OTP</h3>
        <div className="input-main-co">
          <button onClick={() => setNotificationModal("")} className="go-back">
            <TiArrowBack />
            Back
          </button>
          <p className="otp-text">
            A OTP has been sent to the email address you provided , Enter OTP
            below to verify your email address
          </p>
          <p className="otp-error">{regErrMsg}</p>
          <div className="input-con">
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
          </div>
        </div>
        <button type="button" onClick={() => submitOTP()} className="otp-btn">
          {regOTPLoading ? (
            <Loader size="sm" className="btn-loader" color="white" />
          ) : (
            ""
          )}
          {regOTPLoading ? " Loading..." : "Verify Email"}
        </button>
      </div>
    </div>
  );
}
