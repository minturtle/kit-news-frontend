import React, { useState } from 'react';
import "./styles/ExpertApplication.css";
import ProfessorCertification from './ProfessorCertification';
import axios from 'axios';

const BACKEND_SERVER = process.env.REACT_APP_BACKEND_SERVER;
//props로 데이터 받아서 map으로 뿌릴 예정
const ExpertApplication = ({ userName, job, company, education, uid }) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("accessToken")}`;
    const [modalShow, setModalShow] = useState(false);
    const headers = {
        'Content-Type': 'application/json',
    };

    const confirmExpert = () => {
        alert("전문가 승인");
        axios.post(`${BACKEND_SERVER}/api/admin/requested/${uid}/approve`, null, headers)
            .then((res) => {
                console.log(res.data);
                window.location.reload();
            }).catch((err) => {
                console.log(err);
            })

    };
    const cancelExpert = () => {
        alert("전문가 거부");
        axios.post(`${BACKEND_SERVER}/api/admin/requested/${uid}/reject`, null, headers)
            .then((res) => {
                console.log(res.data);
                window.location.reload();
            }).catch((err) => {
                console.log(err);
            })
    };

    const openModal = () => {
        setModalShow(true);
    }
    const handleClose = () => setModalShow(false);

    return (
        <div className="ExpertApplication">
            <div id="expertImg" onClick={openModal}>
                <img src={process.env.PUBLIC_URL + '/assets/dummyProfile.png'} alt="dummyProfile" />
            </div>
            <div id="expertProfile">
                <h3>{userName}</h3>
                <p>{company}</p>
                <p>{job}</p>
                <div id="expertBtnDiv">
                    <button type="button" className="expertBtn" onClick={confirmExpert}>수락</button>
                    <button type="button" className="expertBtn" onClick={cancelExpert}>거부</button>
                </div>
            </div>
            <ProfessorCertification show={modalShow} hide={handleClose} userName={userName} job={job} company={company} education={education} uid={uid} />
        </div>
    );
};

export default ExpertApplication;