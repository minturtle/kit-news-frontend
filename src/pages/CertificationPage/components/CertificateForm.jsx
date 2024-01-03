import React, { useState } from "react";
import "./styles/CertificateForm.css";
import axios from "axios";

const BACKEND_SERVER = process.env.REACT_APP_BACKEND_SERVER;
const CertificateForm = () => {
  const [showImages, setShowImages] = useState([]);
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("accessToken")}`;
  const [data, setData] = useState({
    job: "",
    company: "",
    businessType: "",
  });
  const headers = {
    "Content-Type": "multipart/form-data",
  };

  // 이미지 업로드 input의 onChange
  const handleAddImages = (e) => {
    const imageLists = e.target.files;
    let imageUrlLists = [...showImages];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 10) {
      imageUrlLists = imageUrlLists.slice(0, 10);
    }

    setShowImages(imageUrlLists);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("job", data.job);
    formData.append("company", data.company);
    formData.append("businessType", data.businessType);
    formData.append("education", null);

    //axios통신
    axios
      .post(`${BACKEND_SERVER}/api/register/expert`, formData, headers)
      .then((res) => {
        console.log(res.data);
        alert("전문가 신청 완료");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((preData) => ({
      ...preData,
      [name]: value,
    }));
    console.log(data);
  };

  return (
    <div className="CertificateForm">
      <section id="formTitle">전문가 신청</section>
      <section className="formInfor formUnberLine">
        <div className="formLabel">직업</div>
        <input
          type="text"
          className="formData"
          name="job"
          onChange={handleChange}
        />
      </section>
      <section className="formInfor formUnberLine">
        <div className="formLabel">소속</div>
        <input
          type="text"
          className="formData"
          name="company"
          onChange={handleChange}
        />
      </section>
      <section className="formInfor formUnberLine">
        <div className="formLabel">직급</div>
        <input
          type="text"
          className="formData"
          name="businessType"
          onChange={handleChange}
        />
      </section>
      <section className="formInfor formUnberLine">
        <div className="formLabel">증빙서류</div>
        <section type="text" className="formMsg">
          최대한 많이 첨부해주세요 !
        </section>
      </section>
      <section className="formInfor">
        <input type="file" onChange={handleAddImages} />
        <div id="imgFileDiv">
          {showImages.map((image, id) => (
            <div className="imgMapDiv" key={id}>
              <img className="imgFile" src={image} alt={`${image}-${id}`} />
            </div>
          ))}
        </div>
      </section>

      <button type="button" id="certificateSubmit" onClick={clickSubmit}>
        제출
      </button>
    </div>
  );
};

export default CertificateForm;
