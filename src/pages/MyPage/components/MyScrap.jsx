import React from 'react';
import "./styles/MyScrap.css";
import ScrapData from './components/ScrapData';

const MyScrap = () => {
    return (
        <div className="MyScrap">
            <section id="MyScarpTitle">
                저장한 기사
            </section>
            <ScrapData/>
        </div>
    );
};

export default MyScrap;