import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "../styles/pages/ImageDisplay.css"
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const ImageDisplay = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const BASE_URL = process.env.REACT_APP_API_URL;
    const images = location.state?.images || [];

    // 날짜 관련 변수
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    const dayOfWeek = daysOfWeek[today.getDay()];
    const formattedDate = `${year} / ${month} / ${day} (${dayOfWeek})`;

    return (
        <div className="Home_Container">
            {/* Header */}
            <div className="Home_Header">
                <div className="Home_Header_Container">
                    <div className="Home_Date">{formattedDate}</div>
                    <div className="Home_BigTitle">AI가 그려준 그림</div>
                    <div className="Home_Description">
                        그림은 최대 3개까지 만들어주며, 맞춤법이 틀리거나 문장이 어색하면 AI가 안 그려줄 수 있습니다.
                    </div>
                </div>
                <div className="logo">
                    <Link to="/">
                        <img 
                            src="https://camo.githubusercontent.com/b948c62e6abae617036421540d11d08df3290c4b5cfb2208af5a4b7dd149441c/68747470733a2f2f76656c6f672e76656c63646e2e636f6d2f696d616765732f6472726f626f743430392f706f73742f62636365346162372d636162392d346435392d383461302d3262353966333064383939642f696d6167652e706e67" 
                            alt="로고" 
                        />
                    </Link>
                </div>
            </div>

            <hr/>

            <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={2}
                initialSlide={1}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper"
                style={{ width: "100%", marginTop: "20px" }}
            >
                {images.length > 0 ? (
                    images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <div style={{ position: "relative" }}>
                                {/* 이미지 */}
                                <img
                                    src={`${BASE_URL}${img.view_link}`}
                                    alt={`생성된 이미지 ${index + 1}`}
                                    style={{
                                        width: "100%",
                                        height: "42.5rem",
                                        objectFit: "cover",
                                        borderRadius: "10px",
                                    }}
                                />

                                {/* 다운로드 버튼 */}
                                <a 
                                    href={`${BASE_URL}${img.download_link}`} 
                                    download
                                    style={{
                                        position: "absolute",
                                        bottom: "10px",
                                        right: "10px",
                                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                                        color: "white",
                                        padding: "8px 12px",
                                        borderRadius: "5px",
                                        textDecoration: "none",
                                        fontSize: "14px",
                                        zIndex: 9999,
                                    }}
                                >
                                    ⬇ 다운로드
                                </a>
                            </div>
                        </SwiperSlide>
                    ))
                ) : (
                    <p>생성된 이미지가 없습니다.</p>
                )}
            </Swiper>
        </div>
    );
};

export default ImageDisplay;
