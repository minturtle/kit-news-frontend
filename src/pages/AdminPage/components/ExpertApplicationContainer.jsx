import React, { useEffect, useState } from "react";
import "./styles/ExpertApplicationContainer.css";
import ExpertApplication from "./components/ExpertApplication";
import axios from "axios";

const ExpertApplicationContainer = () => {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("accessToken")}`;
  const [requested, setRequested] = useState([]);
  const headers = {
    "Content-Type": "application/json",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/admin/requested`,
          { headers: headers }
        );
        console.log(response.data);
        setRequested(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="ExpertApplicationContainer">
      {requested.map((value, index) => (
        <ExpertApplication
          userName={value.userName}
          job={value.job}
          company={value.company}
          education={value.education}
          uid={value.uid}
        />
      ))}
      {/* 페이지네이션 구현 하기 */}
    </div>
  );
};

export default ExpertApplicationContainer;
