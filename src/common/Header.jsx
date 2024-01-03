import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import Menu from "./Menu";
import axios from "axios";

const BACKEND_SERVER = process.env.REACT_APP_BACKEND_SERVER;

const Header = ({ setData }) => {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("accessToken")}`;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState({
    title: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearch((data) => ({
      ...data,
      [name]: value,
    }));
    console.log(search.title);
  };

  const clickSearch = () => {
    axios
      .get(`http://${BACKEND_SERVER}/api/news/search/title/${search.title}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  function enterKey(e) {
    if (e.keyCode == 13) {
      clickSearch();
    }
  }

  return (
    <div>
      <div className="Header">
        <img
          src={process.env.PUBLIC_URL + "/assets/logo.png"}
          style={{ width: "30%", cursor: "pointer" }}
          alt="logo"
          onClick={() => navigate("/main")}
        />
        <input
          type="text"
          id="title"
          onChange={handleChange}
          name="title"
          placeholder="제목을 입력하세요"
          onKeyUp={enterKey}
        />
        <button id="submit" type="submit">
          <img
            src={process.env.PUBLIC_URL + "/assets/search.png"}
            style={{ width: "120%", cursor: "pointer" }}
            alt="submitBtn"
          />
        </button>
        <img
          id="menu"
          src={process.env.PUBLIC_URL + "/assets/menu.png"}
          alt="menu"
          onClick={handleOpen}
        />
      </div>
      {open && <Menu open={open} setOpen={setOpen} />}
    </div>
  );
};

export default Header;
