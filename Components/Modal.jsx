import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { TiArrowBack } from "react-icons/ti";

const emoji =
  "https://res.cloudinary.com/isreal/image/upload/v1681808231/downloai-removebg-preview_qgmagz.png";

function Modal({ setLoginTriger }) {
  // GO BACK
  const router = useRouter();
  function goBack() {
    router.back();
  }

  const closeModal = () => {
    setLoginTriger(false);
    // setPayTriger(false);
  };
  return (
    <div className="modal-main-con">
      <div className="modal-relative">
        <div className="modal-card">
          <button onClick={() => closeModal()} className="go-back">
            <TiArrowBack />
            Back
          </button>
          <div className="modal-img-con">
            {emoji ? (
              <img
                src="/undraw_Access_account_re_8spm (1).png"
                alt=""
              />
            ) : (
              <img src="/downloai.jpeg" alt="" />
            )}
          </div>
          <div className="modal-text">
            <p> To access this Function you need to sign in</p>{" "}
            <Link href="/loginpage" className="modal-link">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
