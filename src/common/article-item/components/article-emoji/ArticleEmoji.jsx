import React, { useState } from "react";
import { BsEmojiAngryFill, BsFillEmojiSmileFill } from "react-icons/bs";
import "./styles/ArticleEmoji.css";
import ConfirmModal from "../../../confirmModal/ConfirmModal";
import axios from "axios";

const BACKEND_SERVER = process.env.REACT_APP_BACKEND_SERVER;
const headers = {
  "Content-Type": "application/json",
};
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "accessToken"
)}`;

const ArticleEmoji = ({ emotion }) => {
  const [emoji, setEmoji] = useState({
    emojiType: emotion.userNewsEmotionInfo.userClickEmotionType,
    emojiClicked: emotion.userNewsEmotionInfo.userClicked,
    emojiLikeNum: emotion.emotionCounts.LIKE,
    emojiDisLikeNum: emotion.emotionCounts.DISLIKE,
  });

  const [modal, setModal] = useState(false);
  const handleModal = () => {
    setModal((prev) => !prev);
  };

  const handleEmotion = (status) => {
    if (status === emoji.emojiType) {
      if (status === "LIKE") {
        setEmoji({
          ...emoji,
          emojiType: null,
          emojiClicked: false,
          emojiLikeNum: emoji.emojiLikeNum - 1,
        });
        axios
          .delete(
            `${BACKEND_SERVER}/api/news/emotion/news/${emotion.newsId}/NEWS_EMOTION`,
            headers
          )
          .then((res) => console.log(res))
          .catch((err) => {
            console.log(err);
          });
      } else {
        setEmoji({
          ...emoji,
          emojiType: null,
          emojiClicked: false,
          emojiDisLikeNum: emoji.emojiDisLikeNum - 1,
        });
        axios
          .delete(
            `${BACKEND_SERVER}/api/news/emotion/news/${emotion.newsId}/NEWS_EMOTION`,
            headers
          )
          .then((res) => console.log(res))
          .catch((err) => {
            console.log(err);
          });
      }
    } else if (emoji.emojiType !== null) {
      setModal(true);
    } else {
      if (status === "LIKE") {
        setEmoji({
          ...emoji,
          emojiType: "LIKE",
          emojiClicked: true,
          emojiLikeNum: emoji.emojiLikeNum + 1,
        });
        axios
          .post(
            `${BACKEND_SERVER}/api/news/emotion/news/${emotion.newsId}/NEWS_EMOTION/LIKE`,
            null,
            headers
          )
          .then((res) => console.log(res))
          .catch((err) => {
            console.log(err);
          });
      } else {
        setEmoji({
          ...emoji,
          emojiType: "DISLIKE",
          emojiClicked: true,
          emojiDisLikeNum: emoji.emojiDisLikeNum + 1,
        });
        axios
          .post(
            `${BACKEND_SERVER}/api/news/emotion/news/${emotion.newsId}/NEWS_EMOTION/DISLIKE`,
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

  return (
    <div className="article-emoji-item">
      <div className="emoji-smile">
        <span onClick={() => handleEmotion("LIKE")}>
          <BsFillEmojiSmileFill size="1.8rem" color="#F9BF29" />
        </span>
        <span>{emoji.emojiLikeNum}</span>
      </div>
      <div className="emoji-angry">
        <span onClick={() => handleEmotion("DISLIKE")}>
          <BsEmojiAngryFill size="1.8rem" color="#FD4949" />
        </span>
        <span>{emoji.emojiDisLikeNum}</span>
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

export default ArticleEmoji;
