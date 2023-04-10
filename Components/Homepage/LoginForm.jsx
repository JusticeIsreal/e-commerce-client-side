import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";

import { AiFillEye, AiFillEyeInvisible, AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";

import { sty } from "../../Services/functions";
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
  const onLogin = async (data, e) => {
    axios
      .post("http://localhost:1234/api/v1/userverification/loginuser", data)
      .then((resp) => {
        const token = resp.data.data;
        Cookies.set("JWTtoken", token);
        router.push("/homepage");
        setErrMsg("");
      })
      .catch((error) => {
        setErrMsg(error.response.data.message);
      });
  };

  return (
    <form className="front" onSubmit={handleSubmit(onLogin)}>
      <p className="sign-in-header">Sign in to your account</p>
      <p style={{ color: "red" }}>{errMsg}</p>
      <div className="input-main-con">
        <label>Enter Email</label>
        <div className="input-con">
          <AiOutlineMail className="input-icon" />
          <input
            style={{ fontSize: "20px" }}
            type="email"
            placeholder="Your Email"
            {...register("useremail", { required: true })}
          />
        </div>
        {errors.useremail && (
          <p
            className="validation-text"
            style={{
              fontSize: "12px",
              fontStyle: "italic",
              color: "red",
            }}
          >
            Kindly Enter Your Email
          </p>
        )}
      </div>

      {/* password */}
      <div className="input-main-con">
        <label>Enter Password</label>
        <div className="input-con">
          <RiLockPasswordLine className="input-icon" />
          <input
            style={{ fontSize: "20px" }}
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
          <p
            className="validation-text"
            style={{
              fontSize: "12px",
              fontStyle: "italic",
              color: "red",
            }}
          >
            Kindly Enter Your Password
          </p>
        )}
      </div>

      <div className="checkbox-main-con">
        <div className="checkbox-con">
          <Link href="/ForgetPassword">
            <span>Forgot Password ?</span>
          </Link>
        </div>
      </div>

      <div className="login-btn-link">
        <input
          type="submit"
          className="login-submit-btn"
          // value={loading ? "Uploading..." : "Upload Product"}
        />
      </div>
      <p className="login-registration-link">
        You dont have an account ?{" "}
        <span onClick={() => flipLoginPage()}>Sign up</span>
      </p>
    </form>
  );
}

export default LoginForm;
