import React, { useEffect, useState, } from "react";
import ArticleItem from "../article-item/ArticleItem";
import axios from "axios";
import { SyncLoader } from "react-spinners";
import { useInView } from 'react-intersection-observer';



const BACKEND_SERVER = process.env.REACT_APP_BACKEND_SERVER;
const headers = {
  "Content-Type": "application/json",
};
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "accessToken"
)}`;

const ArticleContainer = ({ category, deleteView, scrapView, data }) => {
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(false);
  const [from, setFrom] = useState(10);
  const [ref, inView] = useInView();

  const fetchMoreData = () => {


    // 추가 데이터 요청
    axios.get(`${BACKEND_SERVER}/api/news/list/${category.valueEng}?from=${from}&size=10`, headers)
      .then((res) => {
        setArticle(article => [...article, ...res.data.data]);
        setFrom(from => from + 10);

      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    // inView가 true 일때만 실행한다.
    if (inView) {
      fetchMoreData();
    }

  }, [inView]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BACKEND_SERVER}/api/news/list/${category.valueEng}`, headers)
      .then((res) => {
        console.log(res.data.data);
        setArticle(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    setFrom(10);
  }, [category]);

  useEffect(() => {
    setArticle(data);
  }, [data]);

  return (loading ? (<div className="loading">
    <SyncLoader
      color="#325F95"
      loading
      margin={5}
      size={10}
      speedMultiplier={1}
    />
  </div>) : (article.map((item) => {
    return (<>
      <div style={{ marginBottom: "1em" }}>
        <ArticleItem
          content={item}
          deleteView={deleteView}
          scrapView={scrapView}
        />
      </div>
      <div ref={ref}></div>
    </>

    );
  })))




};

export default ArticleContainer;
