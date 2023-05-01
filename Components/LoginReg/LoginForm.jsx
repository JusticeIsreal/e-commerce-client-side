import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";
import { Loader } from "@mantine/core";
// LOGIN API FUNCTION
import { logIN } from "../../Services/functions";

import { AiFillEye, AiFillEyeInvisible, AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";

import { useRouter } from "next/router";

function LoginForm({ flipLogin }) {
  // function to flip te login page to registration page
  const flipLoginPage = () => {
    flipLogin.current.style.transform = "rotateY(180deg)";
  };

  // show and hide password value
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // useform hooks
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // submit form
  const router = useRouter();
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const onLogin = async (data) => {
    setLoading(true);

    const details = {
      useremail: data.useremail.toLowerCase(),
      password: data.password,
    };
    console.log(details);
    logIN(setLoading, router, setErrMsg, details);
  };
// mm
  
  return (
    <div className="login-main-con">
      <div className="login-top-title">
        <h2>Sign In</h2>
        <p>Sign in to access you account</p>
        <p>Home / Signin</p>
      </div>
      <div className="form-con">
        <form className="login-form" onSubmit={handleSubmit(onLogin)}>
          <div className="input-main-con">
            <p>
              {errMsg} <br />
              {errMsg ===
                "Email has not been verified, Kindly Verify you email" && (
                <Link href="/resendotp">Click here</Link>
              )}
            </p>
            <label>Enter Email</label>
            <div className="input-con">
              <AiOutlineMail className="input-icon" />
              <input
                type="email"
                placeholder="Your Email"
                {...register("useremail", { required: true })}
              />
            </div>
            {errors.useremail && (
              <p className="validation-text">Kindly Enter Your Email</p>
            )}
          </div>

          {/* password */}
          <div className="input-main-con">
            <label>Enter Password</label>
            <div className="input-con">
              <RiLockPasswordLine className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", { required: true })}
              />

              {showPassword ? (
                <AiFillEyeInvisible
                  onClick={toggleShowPassword}
                  className="input-icon eye"
                />
              ) : (
                <AiFillEye
                  onClick={toggleShowPassword}
                  className="input-icon eye"
                />
              )}
            </div>
            {errors.password && (
              <p className="validation-text">Kindly Enter Your Password</p>
            )}
          </div>

          <Link href="/forgotpw" className="forgot-pw">
            <span>Forgot Password ?</span>
          </Link>

          <div className="login-btn-link">
            {loading ? (
              <Loader size="sm" className="btn-loader" color="white" />
            ) : (
              ""
            )}
            <input
              type="submit"
              disabled={loading}
              className="login-submit-btn"
              value={loading ? "Loading..." : "Sign in"}
            />
          </div>
          <p className="login-registration-link">
            You dont have an account ?
            <Link href="/registrationpage">
              {" "}
              <span>Sign up</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;

// Email has not been verified, Kindly Verify you email
