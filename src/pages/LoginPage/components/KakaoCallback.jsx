import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainPage from "../../MainPage/MainPage";

const KakaoCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const CODE = location.search.split("=")[1];
  localStorage.setItem("accessToken", CODE);
  useEffect(() => {
    if (!localStorage.getItem("accessToken") !== null) {
      console.log("확인완료");
      navigate("/main");
    } else {
      console.log("확인 실패");
    }
  });

  return (
    <>
      <div>
        <MainPage />
      </div>
    </>
  );
};

export default KakaoCallback;
