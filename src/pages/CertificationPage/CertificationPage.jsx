import React, { useEffect, useState } from 'react';
import Header from '../../common/Header';
import "./CertificationPage.css";
import CertificateForm from './components/CertificateForm';
import axios from 'axios';

const CertificationPage = () => {
    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/user-info`)
            .then((res) => {
                console.log(res.data);
                setUserInfo(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    return (
        <div className="CertificationPage">
            <Header />
            {
                (userInfo.expertState === "APPROVED") ?
                    "이미 전문가 입니다." : (userInfo.expertState === "PENDING") ?
                        "전문가 승인 대기중입니다." :
                        <CertificateForm />
            }
        </div>
    );
};

export default CertificationPage;