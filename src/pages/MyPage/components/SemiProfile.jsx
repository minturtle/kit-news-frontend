import React, { useState, useEffect } from "react";
import "./styles/SemiProfile.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SemiProfile = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("accessToken")}`;

    const goCertification = () => {
        axios.delete(`http://localhost:8080/api/register/expert`, null)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
        navigate("/certificate");
    };
    useEffect(() => {
        axios.get(`http://localhost:8080/api/user-info`)
            .then((res) => {
                console.log(res.data);
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    return (
        <div className="SemiProfile">

            {/* 추후 통신 이후 통신 데이터로 변경 */}
            <img src={process.env.PUBLIC_URL + '/assets/dummyProfile.png'} alt="dummyProfile" />
            <div id="nameEmail">
                <h2>{data.name}</h2>
                <p>{data.email}</p>
            </div>

            {
                (data.expertState) === "NONE" ?
                    <div className="professorState4">
                        일반 사용자
                    </div> : (data.expertState) === "PENDING" ?
                        <div className="professorState1">
                            전문가 승인 대기
                        </div> : (data.expertState) === "APPROVED" ?
                            <div className="professorState2">
                                전문가 인증
                            </div> :
                            <div className="professorState3" onClick={goCertification}>
                                전문가 승인 거부
                            </div>
            }
            {/* 추후 통신 이후 통신 데이터로 변경 */}

        </div>
    );
};

export default SemiProfile;