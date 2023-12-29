import React, { useState, useEffect } from "react";
import Header from "./../../common/Header";
import ExpertApplicationContainer from "./components/ExpertApplicationContainer";

import ArticleContainer from "../../common/article-container/ArticleContainer";
import axios from "axios";

const text = {
  expert: true, // 전문가 여부
  articleList: [
    {
      title: "강릉 해수욕장 인근서 ‘청새리상어’ 발견",
      text: "낚싯줄에 걸린 상어가 보트 주변을 헤엄칩니다. 등 지느러미가 선명하고 몸이 길쭉한 '청새리상어'입니다. 백상아리와 함께 사람을 공격하기도 하는 상어로 알려져 있는데요. 낚싯대를 강하게 잡고 상어를 통제하려고 하지만, 상어가 이곳저곳 움직입니다. 몸길이 2미터가 넘는 것으로 추정되는 상어는 이후 낚싯줄을 끊고 사라졌습니다. 청새리상어는 1일 오전 10시 20분쯤 강원도 강릉 안목 해수욕장에서 600 미터 가량 떨어진 방파제 인근 해상에서 레저 보트를 타고 있던 낚시인이 발견했습니다. 당시 상어를 목격했던 김도형 씨는 '처음에는 너무 무거워가지고 쓰레기인 줄 알았습니다.' 라면서 '정말 깜짝 놀랐습니다.'라고 말했습니다.",
      link: "https://www.kumoh.ac.kr/",
      emotion: {
        excited: 14,
        angry: 10,
        dizzy: 15,
        smile: 5,
      },
      trust: {
        yes: 30,
        no: 20,
      },
      comment: [
        {
          name: "금오공과대학교 총장",
          text: "good",
          thumbs: 162,
        },
        {
          name: "금오공과대학교 총장",
          text: "good",
          thumbs: 162,
        },
        {
          name: "금오공과대학교 총장",
          text: "good",
          thumbs: 162,
        },
        {
          name: "금오공과대학교 총장",
          text: "good",
          thumbs: 162,
        },
        {
          name: "금오공과대학교 총장",
          text: "good",
          thumbs: 162,
        },
      ],
    },
    {
      title: "부산 해수욕장 인근서 ‘참치’ 발견",
      text: "낚싯줄에 걸린 참치가 보트 주변을 헤엄칩니다. 등 지느러미가 선명하고 몸이 길쭉한 '청새리상어'입니다. 백상아리와 함께 사람을 공격하기도 하는 상어로 알려져 있는데요. 낚싯대를 강하게 잡고 상어를 통제하려고 하지만, 상어가 이곳저곳 움직입니다. 몸길이 2미터가 넘는 것으로 추정되는 상어는 이후 낚싯줄을 끊고 사라졌습니다. 청새리상어는 1일 오전 10시 20분쯤 강원도 강릉 안목 해수욕장에서 600 미터 가량 떨어진 방파제 인근 해상에서 레저 보트를 타고 있던 낚시인이 발견했습니다. 당시 상어를 목격했던 김도형 씨는 '처음에는 너무 무거워가지고 쓰레기인 줄 알았습니다.' 라면서 '정말 깜짝 놀랐습니다.'라고 말했습니다.",
      link: "https://www.kumoh.ac.kr/",
      emotion: {
        excited: 114,
        angry: 100,
        dizzy: 150,
        smile: 50,
      },
      trust: {
        yes: 10,
        no: 50,
      },
      comment: [
        {
          name: "금오공과대학교 총장",
          text: "good",
          thumbs: 162,
        },
      ],
    },
    {
      title: "포항 해수욕장 인근서 ‘고래’ 발견",
      text: "낚싯줄에 걸린 고래가 보트 주변을 헤엄칩니다. 등 지느러미가 선명하고 몸이 길쭉한 '청새리상어'입니다. 백상아리와 함께 사람을 공격하기도 하는 상어로 알려져 있는데요. 낚싯대를 강하게 잡고 상어를 통제하려고 하지만, 상어가 이곳저곳 움직입니다. 몸길이 2미터가 넘는 것으로 추정되는 상어는 이후 낚싯줄을 끊고 사라졌습니다. 청새리상어는 1일 오전 10시 20분쯤 강원도 강릉 안목 해수욕장에서 600 미터 가량 떨어진 방파제 인근 해상에서 레저 보트를 타고 있던 낚시인이 발견했습니다. 당시 상어를 목격했던 김도형 씨는 '처음에는 너무 무거워가지고 쓰레기인 줄 알았습니다.' 라면서 '정말 깜짝 놀랐습니다.'라고 말했습니다.",
      link: "https://www.kumoh.ac.kr/",
      emotion: {
        excited: 14,
        angry: 10,
        dizzy: 15,
        smile: 5,
      },
      trust: {
        yes: 30,
        no: 20,
      },
      comment: [
        {
          name: "금오공과대학교 총장",
          text: "good",
          thumbs: 162,
        },
        {
          name: "금오공과대학교 총장",
          text: "good",
          thumbs: 162,
        },
      ],
    },
  ],
};

const AdminPage = () => {
  const [data, setData] = useState([]);
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("accessToken")}`;

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/news/list/ALL`)
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="AdminPage">
      <Header />
      <ExpertApplicationContainer />
      <ArticleContainer article={data} deleteView="block" scrapView="none" />
    </div>
  );
};

export default AdminPage;
