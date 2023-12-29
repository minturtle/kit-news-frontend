import React, { useState } from "react";
import {
  RiThumbUpLine,
  RiThumbUpFill,
  RiThumbDownLine,
  RiThumbDownFill,
} from "react-icons/ri";
import "./styles/ArticleComment.css";
import ConfirmModal from "../../../confirmModal/ConfirmModal";
import axios from "axios";

const localhost = "http://localhost:8080";

const ArticleComment = ({ newsId, item, setComment, user }) => {
  const [thumbs, setThumbs] = useState({
    thumbsType: item.userEmotionInfo.userClickEmotionType,
    thumbsClick: item.userEmotionInfo.userClicked,
    thumbsUpNum: item.emotionCounts.LIKE,
    thumbsDownNum: item.emotionCounts.DISLIKE,
  });

  const [update, setUpdate] = useState(false);
  const [commentWrite, setCommentWrite] = useState(item.content);
  const [modal, setModal] = useState(false);
  const handleModal = () => {
    setModal((prev) => !prev);
  };

  const handleLike = (state) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };

    if (!state) {
      setThumbs({
        ...thumbs,
        thumbsType: null,
        thumbsUpNum: thumbs.thumbsUpNum - 1,
      });
      axios
        .delete(
          `${localhost}/api/news/emotion/comment/${item.commentId}`,
          headers
        )
        .then((res) => console.log(res))
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (thumbs.thumbsType !== null) {
        setModal(true);
      } else {
        setThumbs({
          ...thumbs,
          thumbsType: "LIKE",
          thumbsUpNum: thumbs.thumbsUpNum + 1,
        });
        axios
          .post(
            `${localhost}/api/news/emotion/comment/${item.commentId}/LIKE`,
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

  const handleDisLike = (state) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };

    if (!state) {
      setThumbs({
        ...thumbs,
        thumbsType: null,
        thumbsDownNum: thumbs.thumbsDownNum - 1,
      });
      axios
        .delete(
          `${localhost}/api/news/emotion/comment/${item.commentId}`,
          headers
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (thumbs.thumbsType !== null) {
        setModal(true);
      } else {
        setThumbs({
          ...thumbs,
          thumbsType: "DISLIKE",
          thumbsDownNum: thumbs.thumbsDownNum + 1,
        });
        axios
          .post(
            `${localhost}/api/news/emotion/comment/${item.commentId}/DISLIKE`,
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

  const commentUpdate = () => {
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };
    const formData = new FormData();
    formData.append("content", commentWrite);

    axios
      .post(
        `${localhost}/api/news/${newsId}/comment/${item.commentId}`,
        formData,
        headers
      )
      .then(() => {
        axios
          .get(`${localhost}/api/news/${newsId}/comment`, headers)
          .then((res) => {
            setComment(res.data.data);
            setUpdate(false);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const commentDelete = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };

    axios
      .delete(
        `${localhost}/api/news/${newsId}/comment/${item.commentId}`,
        headers
      )
      .then(() =>
        axios
          .get(`${localhost}/api/news/${newsId}/comment`, headers)
          .then((res) => {
            setComment(res.data.data);
          })
          .catch((err) => {
            console.log(err);
          })
      )
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {update ? (
        <div className="comment-item">
          <div className="comment-top">
            <div className="comment-user">
              <div className="profile-commentuser">
                <img
                  className="profile-img"
                  src={item.expertProfileImage}
                  alt="프로필 이미지"
                />
              </div>
              <span>{item.expertNickname}</span>
            </div>
          </div>
          <div className="comment-write" style={{ marginTop: "1em" }}>
            <input
              value={commentWrite}
              onChange={(e) => {
                setCommentWrite(e.target.value);
              }}
            ></input>
            <span
              onClick={() => {
                setUpdate(false);
              }}
            >
              취소
            </span>
            <button onClick={commentUpdate}>수정</button>
          </div>
        </div>
      ) : (
        <div className="comment-item">
          <div className="comment-top">
            <div className="comment-user">
              <div className="profile-commentuser">
                <img
                  className="profile-img"
                  src={item.expertProfileImage}
                  alt="프로필 이미지"
                />
              </div>
              <span>{item.expertNickname}</span>
            </div>
            {user.name === item.expertName && (
              <div className="comment-btn">
                <span
                  onClick={() => {
                    setUpdate(true);
                  }}
                >
                  수정
                </span>
                <span onClick={commentDelete}>삭제</span>
              </div>
            )}
          </div>
          <span>{item.content}</span>
          <div className="comment-thumbs">
            <span>{thumbs.thumbsUpNum}</span>
            <span>
              {thumbs.thumbsType === "LIKE" ? (
                <span onClick={() => handleLike(false)}>
                  <RiThumbUpFill size="1.2rem" color="#325F95" />
                </span>
              ) : (
                <span onClick={() => handleLike(true)}>
                  <RiThumbUpLine size="1.2rem" color="#325F95" />
                </span>
              )}
            </span>
            <span>{thumbs.thumbsDownNum}</span>
            <span>
              {thumbs.thumbsType === "DISLIKE" ? (
                <span onClick={() => handleDisLike(false)}>
                  <RiThumbDownFill size="1.2rem" color="#325F95" />
                </span>
              ) : (
                <span onClick={() => handleDisLike(true)}>
                  <RiThumbDownLine size="1.2rem" color="#325F95" />
                </span>
              )}
            </span>
          </div>
          {modal && (
            <ConfirmModal
              handleModal={handleModal}
              content="이미 공감을 표현하셨습니다."
            />
          )}
        </div>
      )}
    </>
  );
};

export default ArticleComment;
