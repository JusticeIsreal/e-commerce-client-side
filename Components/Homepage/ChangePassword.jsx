import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/router";

// CHANGE PASSWORD API CALL FROM SERVICE FOLDER
import { changePassword } from "../../Services/functions";

function ChangePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      changePassword(password, router); // or submit form data
    } else {
      setErrMsg("Passwords do not match");
    }
  };

  // show and hide password value
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <form
      className="back forget-pw"
      onSubmit={handleSubmit}
      // style={{ heigth: "700px" }}
    >
      <p className="sign-in-header">Enter New Password</p>
      <p className="session-note">
        Please enter a new password to reset your password.
      </p>
      <p className="session-note" style={{ color: "red" }}>
        {errMsg}
      </p>
      <div onClick={() => router.back()}>
        <div className="go-back">
          <IoIosArrowBack />
        </div>
      </div>
      <div className="input-main-con">
        <label>Enter New Password</label>
        <div className="input-con">
          <RiLockPasswordLine className="input-icon" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <div
            className="eye-icon"
            onClick={toggleShowPassword}
            style={{
              position: "absolute",
              right: "5px",
              color: "#3c91e6",
              fontSize: "20px",
            }}
          >
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </div>
        </div>
        <div className="input-con">
          <RiLockPasswordLine className="input-icon" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          <div
            className="eye-icon"
            onClick={toggleShowConfirmPassword}
            style={{
              position: "absolute",
              right: "5px",
              color: "#3c91e6",
              fontSize: "20px",
            }}
          >
            {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </div>
        </div>
        {password !== confirmPassword && (
          <p className="validation-text">Passwords do not match</p>
        )}
      </div>
      <div className="login-btn-link">
        <input
          type="submit"
          value="Change Password"
          className="login-submit-btn"
          disabled={password !== confirmPassword}
        />
      </div>
    </form>
  );
}

export default ChangePassword;
