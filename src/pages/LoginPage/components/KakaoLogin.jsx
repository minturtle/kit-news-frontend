import React from "react";
import "../components/styles/KakaoLogin.css";

const BACKEND_SERVER = process.env.REACT_APP_BACKEND_SERVER;
const KakaoLogin = () => {
  const KakaoAuothUrl = `${BACKEND_SERVER}/api/login/kakao`;

  const handleLogin = () => {
    window.location.href = KakaoAuothUrl;
  };

  return (
    <div className="KakaoLogin">
      <emoji id="emoji">📰</emoji>
      <header>
        <strong>뉴스재판</strong>
      </header>
      <article>대한민국의 뉴스를 요약해서 보세요!</article>
      <button id="kakaoBtn" onClick={handleLogin}>
        <img src={process.env.PUBLIC_URL + "/assets/kakao.png"} alt="kakao" />
      </button>
    </div>
  );
};

export default KakaoLogin;
