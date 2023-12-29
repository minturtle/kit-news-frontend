import React, { useState } from "react";
import {
  RiThumbDownLine,
  RiThumbUpLine,
  RiThumbUpFill,
  RiThumbDownFill,
} from "react-icons/ri";
import "./styles/ArticleTrust.css";
import ConfirmModal from "../../../confirmModal/ConfirmModal";
import axios from "axios";

const localhost = "http://localhost:8080";
const headers = {
  "Content-Type": "application/json",
};
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "accessToken"
)}`;

const ArticleTrust = ({ emotion }) => {
  const [trust, setTrust] = useState({
    trustType: emotion.userNewsTrustEmotionInfo.userClickEmotionType,
    trustClicked: emotion.userNewsTrustEmotionInfo.userClicked,
    trustNum: emotion.trustEmotionCounts.TRUSTWORTHY,
    suspiciousNum: emotion.trustEmotionCounts.SUSPICIOUS,
  });

  const [modal, setModal] = useState(false);
  const handleModal = () => {
    setModal((prev) => !prev);
  };

  const handleSuspicious = (state) => {
    if (!state) {
      setTrust({
        ...trust,
        trustType: null,
        suspiciousNum: trust.suspiciousNum - 1,
      });
      axios
        .delete(
          `${localhost}/api/news/emotion/news/${emotion.newsId}/NEWS_TRUST_EMOTION`,
          headers
        )
        .then((res) => console.log(res))
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (trust.trustType !== null) {
        setModal(true);
      } else {
        setTrust({
          ...trust,
          trustType: "SUSPICIOUS",
          suspiciousNum: trust.suspiciousNum + 1,
        });
        axios
          .post(
            `${localhost}/api/news/emotion/news/${emotion.newsId}/NEWS_TRUST_EMOTION/SUSPICIOUS`,
            null,
            headers
          )
          .then((res) => console.log(res))
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  const handleTrust = (state) => {
    if (!state) {
      setTrust({
        ...trust,
        trustType: null,
        trustNum: trust.trustNum - 1,
      });
      axios
        .delete(
          `${localhost}/api/news/emotion/news/${emotion.newsId}/NEWS_TRUST_EMOTION`,
          headers
        )
        .then((res) => console.log(res))
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (trust.trustType !== null) {
        setModal(true);
      } else {
        setTrust({
          ...trust,
          trustType: "TRUSTWORTHY",
          trustNum: trust.trustNum + 1,
        });
        axios
          .post(
            `${localhost}/api/news/emotion/news/${emotion.newsId}/NEWS_TRUST_EMOTION/TRUSTWORTHY`,
            null,
            headers
          )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  return (
    <div className="trust">
      <div className="suspicious">
        <div className="trust-emoji">
          <span>{trust.suspiciousNum}</span>
          {trust.trustType === "SUSPICIOUS" ? (
            <span onClick={() => handleSuspicious(false)}>
              <RiThumbDownFill size="1.8rem" color="#325F95" />
            </span>
          ) : (
            <span onClick={() => handleSuspicious(true)}>
              <RiThumbDownLine size="1.8rem" color="#325F95" />
            </span>
          )}
        </div>
        <span>신뢰할 수 없어요</span>
      </div>
      <div className="trustworthy">
        <div className="trust-emoji">
          <span>{trust.trustNum}</span>
          {trust.trustType === "TRUSTWORTHY" ? (
            <span onClick={() => handleTrust(false)}>
              <RiThumbUpFill size="1.8rem" color="#325F95" />
            </span>
          ) : (
            <span onClick={() => handleTrust(true)}>
              <RiThumbUpLine size="1.8rem" color="#325F95" />
            </span>
          )}
        </div>
        <span>신뢰할 수 있어요</span>
      </div>
      {modal && (
        <ConfirmModal
          handleModal={handleModal}
          content="이미 공감을 표현하셨습니다."
        />
      )}
    </div>
  );
};

export default ArticleTrust;
