import React, { useState } from "react";
import Header from "./../../common/Header";
import Nav from "./components/navigation/Nav";

const MainPage = () => {
  const [data, setData] = useState([]);
  return (
    <div>
      <Header setData={setData} />
      <Nav data={data} />
    </div>
  );
};

export default MainPage;
