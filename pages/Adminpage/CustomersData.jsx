import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
import axios from "axios";
import html2canvas from "html2canvas";
// import { useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import Topbar from "../../Components/AdminPageComponents/Topbar";
import Sidebar from "../../Components/AdminPageComponents/Sidebar";
// import Loader from "../../Components/Loader";
// ICON
import { HiRefresh, HiCloudDownload } from "react-icons/hi";
import { GrUserWorker, GrUserAdmin } from "react-icons/gr";
import { FaUsers } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { useRouter } from "next/router";
import { allUsers, getSessionUser } from "../../Services/functions";
import { GoVerified } from "react-icons/go";
import Link from "next/link";
import { FcCancel } from "react-icons/fc";
import { BsSearch } from "react-icons/bs";
import Pagination from "../../Components/Pagination";
import { paginate } from "../../paginate";

function CustomersData() {
  const router = useRouter();
  // FETCH ALL TRANSACTIONS
  const [pageLoader, setPageLoader] = useState();
  // const [getTransactions, setGetTransactions] = useState();
  const [getAdmin, setGetAdmin] = useState([]);
  const [getStaff, setGetStaff] = useState([]);
  const [getClient, setGetClient] = useState([]);
  useEffect(() => {
    const ftchAllTransactions = async () => {
      // const transactions = await allTransactions();
      const users = await allUsers();
      setPageLoader(users);
      // await transactionStatus();
      if (users) {
        setGetAdmin(users?.users.filter((user) => user.position === "admin"));
        setGetStaff(users?.users.filter((user) => user.position === "staff"));
        setGetClient(users?.users.filter((user) => user.position === "client"));
      }
    };

    ftchAllTransactions();
  }, [router]);

  // save pae as image
  const saveAsImage = (element) => {
    html2canvas(element).then((canvas) => {
      const link = document.createElement("a");
      link.download = "screenshot.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  // ALLOW ONLY ADMI AND STAFF ACCESS
  const [userPosition, setUserPosituon] = useState("");

  useEffect(() => {
    const userInfo = async () => {
      const userData = await getSessionUser();
      setUserPosituon(userData?.user.position);

      if (userPosition === "client") {
        router.push("/");
      }
    };
    userInfo();
  }, [userPosition, router]);

  // search by input value
  const [search, setSearch] = useState("");

  // ...................................
  // const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const pageOfCountries = paginate(getClient, currentPage, pageSize);

  const handlePageChange = (pageNumber, totalPages) => {
    if (pageNumber !== "prev" && pageNumber !== "next")
      setCurrentPage(pageNumber);
    else if (pageNumber === "prev" && currentPage > 1)
      setCurrentPage(currentPage - 1);
    else if (pageNumber === "next" && currentPage < totalPages)
      setCurrentPage(currentPage + 1);
  };

  // ..................................
  return (
    <>
      {userPosition === "admin" || userPosition === "staff" ? (
        <>
          {" "}
          <Topbar />
          <Sidebar />
          <div id="content">
            <main>
              <div
                className="head-title"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    className="left"
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <h1>Users</h1>

                    <ul className="breadcrumb">
                      <li>
                        <a href="">Dashboard</a>
                      </li>
                      <li>
                        <i className="bx bx-chevron-right"></i>
                      </li>
                      <li onClick={() => history(-1)}>
                        <a
                          className="active"
                          href=""
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          | Users
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div
                    className="btn-download"
                    onClick={() => saveAsImage(document.body)}
                  >
                    <b className="bx bxs-cloud-download">
                      <HiCloudDownload />{" "}
                    </b>
                    <span className="text">Download PDF</span>
                  </div>
                </div>

                <div className="user-ul">
                  <ul
                    className="box-info"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "start",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <li>
                      <FaUsers className="bx bxs-group" />
                      <span className="text">
                        <h3>{getClient?.length}</h3>
                        <p>Users</p>
                      </span>
                    </li>
                    <li>
                      <GrUserWorker className="bx bxs-calendar-check" />
                      <span className="text">
                        <h3>{getStaff?.length}</h3>
                        <p>Staff</p>
                      </span>
                    </li>
                    <li>
                      <GrUserAdmin className="bx bxs-calendar-check" />
                      <span className="text">
                        <h3>{getAdmin?.length}</h3>
                        <p>Admin</p>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="table-data">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "60px",
                    paddingTop: "50px",
                    overflow: "hidden",
                  }}
                >
                  <div className="head">
                    <h3>Admin List</h3>
                  </div>
                </div>
              </div>
              <div className="user-main-con">
                {getAdmin.length > 0 && (
                  <>
                    {getAdmin?.map((admin) => (
                      <GetAdmin key={admin._id} {...admin} />
                    ))}
                  </>
                )}
              </div>
              <div className="table-data">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "60px",
                    paddingTop: "50px",
                    overflow: "hidden",
                  }}
                >
                  <div className="head">
                    <h3>Staff List</h3>
                  </div>
                </div>
              </div>
              <div className="user-main-con">
                {getStaff.length > 0 && (
                  <>
                    {getStaff?.map((staff) => (
                      <GetAdmin key={staff._id} {...staff} />
                    ))}
                  </>
                )}
              </div>
              <div className="table-data">
                <div
                  style={{
                    display:"flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "60px",
                    paddingTop: "50px",
                    overflow: "hidden",
                  }}
                >
                  <div className="head head-client">
                    <h3>Client List</h3>
                    <form className="admin-transaction-search-form">
                      <BsSearch />
                      <input
                        type="text"
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by username"
                      />
                    </form>
                  </div>
                </div>
              </div>
              <div className="user-main-con">
                {getClient.length > 0 && (
                  <>
                    {pageOfCountries
                      ?.filter((item) => {
                        if (item?.username === " ") {
                          return item;
                        } else if (
                          item?.username
                            .toLowerCase()
                            .includes(search?.toLowerCase())
                        ) {
                          return item;
                        }
                      })
                      ?.map((client) => (
                        <GetAdmin key={client._id} {...client} />
                      ))}
                  </>
                )}
              </div>
              <Pagination
                itemsCount={getClient.length}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </main>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}

CustomersData.requireAuth = true;
export default CustomersData;

function GetAdmin({
  _id,
  useremail,
  username,
  userphonenumber,
  verified,
  position,
  block,
}) {
  return (
    <Link href={`/Adminpage/customer/${_id}`} className="admin-card">
      <div className="card">
        {block === true && <FcCancel className="cancel" />}
        {position === "admin" && <div className="admin-red-dot"></div>}
        {position === "staff" && <div className="admin-yellow-dot"></div>}
        {position === "client" && <div className="admin-blue-dot"></div>}
        <div className="avatar">
          {verified && (
            <div className="verified">
              <GoVerified />
            </div>
          )}
          <RxAvatar />
        </div>
        <div className="user-details">
          <h4>{username}</h4>
          <p>{userphonenumber}</p>
          <p>{useremail}</p>
        </div>
      </div>
    </Link>
  );
}
