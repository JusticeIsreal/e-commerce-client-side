import React, { useEffect, useState } from "react";
import { Loader } from "@mantine/core";
import { useForm } from "react-hook-form";
import { Group, Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { BiDialpad, BiUserCircle } from "react-icons/bi";
import { AiFillEye, AiFillEyeInvisible, AiOutlineMail } from "react-icons/ai";
import { useRouter } from "next/router";
import Link from "next/link";
import { changePassword } from "../../Services/functions";
function Changepw() {
  // ....................................................

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  // ........................................................

  // show and hide password value
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
      password: "",
      confirmPassword: "",
    },
  });

  // ...............................................
  // ...............................................
  // password and confirm password validaton
  const passwordConfirmValidator = (value) =>
    value === watch("password") || "Passwords do not match";

  // ..................................................
  // ..................................................
  // RIGISTER USER STATE
  const [errMsg, setErrMsg] = useState("");
  const [errMsgServer, setErrMsgServer] = useState("");
  const [notificationModal, setNotificationModal] = useState("");
  const [regBtnLoading, setRegBtnLoading] = useState(false);

  // .....................................................
  // submit user details
  const userId = localStorage.getItem("userId") || [];
  const onSubmit = async (data, event) => {
    event.preventDefault();
    setRegBtnLoading(true);
    const detial = {
      password,
      userId,
    };

    // console.log(password);
    if (password === confirmPassword) {
      await changePassword(
        password,
        userId,
        router,
        setRegBtnLoading,
        setNotificationModal,
        setErrMsgServer
      );
      // or submit form data
    } else {
      setErrMsg("Passwords do not match");
      setTimeout(() => {
        setErrMsg("");
      }, 3000);
    }

    // reset();
  };

  // ......................................................
  // ......................................................
  // show notificatio modal
  useEffect(() => {
    if (notificationModal === "SUCCESS") {
      notifications.show({
        title: "Notification",
        message: "Successful , Proceed to enter OTP",
      });
    }
    if (errMsg) {
      notifications.show({
        title: "Notification",
        message: `${errMsg}`,
        color: "red",
      });
    }
  }, [notificationModal, errMsg]);
  // .....................................................
  return (
    <div className="login-main-con">
      <Group position="center"></Group>
      <div className="login-top-title">
        <h2>Change password</h2>
        <p>Create a new password </p>
        <p>Home / New password</p>
      </div>
      <div className="form-con">
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-main-con">
            <p>{errMsg}</p>
            {/* <p>{errMsgServer}</p> */}
            <label>Enter new password</label>
            <div className="input-con">
              <BiDialpad className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  onClick={toggleShowPassword}
                  style={{
                    position: "absolute",
                    right: "5px",
                    color: "#3c91e6",
                    fontSize: "20px",
                  }}
                />
              ) : (
                <AiFillEye
                  onClick={toggleShowPassword}
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
          </div>

          <div className="input-main-con">
            <label>Confirm new password</label>
            <div className="input-con">
              <BiDialpad className="input-icon" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
              {showConfirmPassword ? (
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
            {errors.confirmPassword && (
              <p className="validation-text">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="login-btn-link">
            {regBtnLoading ? (
              <Loader size="sm" className="btn-loader" color="white" />
            ) : (
              ""
            )}
            <input
              type="submit"
              // disabled={regBtnLoading}
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
  );
}

export default Changepw;
