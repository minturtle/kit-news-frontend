import React, { useState, useEffect } from 'react';
import "./styles/DetailProfile.css";
import axios from 'axios';


const BACKEND_SERVER = process.env.REACT_APP_BACKEND_SERVER;


const DetailProfile = () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("accessToken")}`;
    const [fixNick, setFixNick] = useState(false);
    const [nickname, setNickname] = useState("");
    const [data, setData] = useState([]);
    const headers = {
        'Content-Type': 'application/json'
    };

    const fixNickName = () => {
        setFixNick(true);
    };
    const ConfirmNickName = () => {
        alert("닉네임 변경 통신");

        setFixNick(false);
        axios.post(`${BACKEND_SERVER}/api/nickname?nickname=${nickname}`, null, headers)
            .then((res) => {
                console.log(res.data);
                window.location.reload()
            }).catch((err) => {
                console.log(err);
            })
    }
    const handleNick = (e) => {
        setNickname(e.target.value);
    };

    useEffect(() => {
        axios.get(`${BACKEND_SERVER}/api/user-info`)
            .then((res) => {
                console.log(res.data);
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    return (
        <div className="DetailProfile">
            <section id="detailTitle">
                내 프로필
            </section>
            <section className="detailInfor">
                <div className="detailLabel">
                    이름
                </div>
                <div className="detailData">
                    {data.name}
                </div>
                <button className="hiddenBtn">수정</button>
            </section>
            <section className="detailInfor detailCenter">
                <div className="detailLabel">
                    닉네임
                </div>
                {
                    (fixNick) ?
                        <>
                            <input type="text" id="nickName" name="nickName" onChange={handleNick} placeholder='닉네임 입력' />
                            <button type="button" onClick={ConfirmNickName}>확인</button>
                        </>
                        :
                        <>
                            <div className="detailData">
                                {data.nickname}
                            </div>
                            <button type="button" onClick={fixNickName}>수정</button>
                        </>
                }


            </section>
            <section className="detailInfor">
                <div className="detailLabel">
                    메일
                </div>
                <div className="detailData">
                    {data.email}
                </div>
                <button type="button" className="hiddenBtn">수정</button>
            </section>
        </div>
    );
};

export default DetailProfile;