import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { GrFormClose } from "react-icons/gr";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./Menu.css";
import axios from "axios";

const BACKEND_SERVER = process.env.REACT_APP_BACKEND_SERVER;

const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem("accessToken"),
};

const Menu = ({ open, setOpen }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    nickname: "",
  });
  const handleClose = () => setOpen(false);
  const naviagate = useNavigate();

  useEffect(() => {
    document.body.style.cssText = `
          position: fixed; 
          top: -${window.scrollY}px;
          overflow-y: scroll;
          width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  useEffect(() => {
    axios
      .get(`${BACKEND_SERVER}/api/user-info`, headers)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="menu-container">
      <div className={open ? "menu-bar-fade-in" : "menu-bar-fade-out"}>
        <div>
          <div className="menu-close">
            <span onClick={handleClose}>
              <GrFormClose size="25px" color="red" />
            </span>
          </div>
          <div className="profile">
            <span>
              <MdAccountCircle color="#B1B1B1" size="100px" />
            </span>
            <div className="profile-info">
              <span>{user.name}</span>
              <span>{user.email}</span>
            </div>
          </div>
          <div className="category">
            <span
              onClick={() => {
                naviagate("/my");
              }}
            >
              내 정보
            </span>
            <span
              onClick={() => {
                naviagate("/certificate");
              }}
            >
              전문가 신청
            </span>
            <span>개발자 정보</span>
          </div>
        </div>
        <div className="logout">
          <span
            onClick={() => {
              localStorage.clear();
              naviagate("/login");
            }}
          >
            로그아웃
          </span>
        </div>
      </div>
    </div>
  );
};

export default Menu;
