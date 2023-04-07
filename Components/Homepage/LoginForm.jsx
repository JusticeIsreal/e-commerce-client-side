import { useRef, useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import axios from "axios";

import { AiFillEye, AiFillEyeInvisible, AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";

import testing from "../../services";

function LoginForm({ flipLogin }) {
    console.log(testing);
    console.log("object")
  // function to flip te login page to registration page
  const flipLoginPage = () => {
    flipLogin.current.style.transform = "rotateY(180deg)";
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
  const onLogin = async (data, e) => {
    console.log(data);
  };

  return (
    <form className="front" onSubmit={handleSubmit(onLogin)}>
      <p className="sign-in-header">Sign in to your account</p>
      <div className="input-main-con">
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
            type="password"
            placeholder="Password"
            {...register("userpassword", { required: true })}
          />
          <AiFillEye className="input-icon eye" />
        </div>
        {errors.userpassword && (
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
          <Link href="/RegistrationLogin/ForgetPassword">
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
