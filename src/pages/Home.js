import "../styles/pages/Home.css";

import { useState } from "react";

const Home = () => {
    // 날짜 관련 변수
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    // 요일 변환 배열
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    const dayOfWeek = daysOfWeek[today.getDay()];

    const formattedDate = `${year} / ${month} / ${day} (${dayOfWeek})`;

    // 다이어리 텍스트 상태
    const [diaryText, setDiaryText] = useState("");

    // 한 줄 이상 입력되었는지 확인하는 함수
    const handleInput = (event) => {
        setDiaryText(event.target.value);
    };

    // 파일 선택 상태 (여러 개 가능)
    const [selectedFiles, setSelectedFiles] = useState([]);

    // 파일 선택 핸들러
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 0) {
            setSelectedFiles((prevFiles) => [...prevFiles, ...files.map((file) => file.name)]);
        }
    };

    // 개별 파일 삭제 핸들러
    const handleFileDelete = (fileName) => {
        setSelectedFiles((prevFiles) => prevFiles.filter((file) => file !== fileName));
    };

    return (
        <div className="Home_Container">
            {/* Header */}
            <div className="Home_Header">
                <div className="Home_Date">{formattedDate}</div>
                <div className="Home_BigTitle">오늘의 일기</div>
                <div className="Home_Description">자신의 하루를 AI에게 맏기며 그림을 받아보세요.</div>
            </div>
            <br />
            {/* Content */}
            <div className="Home_Content">
                <input className="Home_Title" placeholder="제목을 입력하세요" />
            </div>
            <div className="Home_Select">
                <select className="Home_Weather">
                    <option value="">날씨 선택</option>
                    <option value="sunny">맑음 🌈</option>
                    <option value="cloudy">흐림 ☁️</option>
                    <option value="rainy">비 🌧️</option>
                    <option value="snowy">눈 ❄️</option>
                    <option value="stormy">폭풍 ⛈️</option>
                </select>

                <select className="Home_Mood">
                    <option value="">기분 선택</option>
                    <option value="happy">행복 😊</option>
                    <option value="sad">슬픔 😢</option>
                    <option value="angry">화남 😠</option>
                    <option value="excited">신남 🤩</option>
                    <option value="tired">피곤 😴</option>
                </select>
            </div>

            <div className="Home_Diary">
                <textarea className="Home_Diary_Content" placeholder="자신의 하루를 작성해보세요." />
            </div>

            {/* 사진 선택하기 / 삭제하기 */}
            <div className="Home_FileUpload">
                {/* 사진 선택하기 버튼 */}
                <label className="File_Button">
                    사진 선택하기
                    <input type="file" multiple onChange={handleFileChange} className="File_Input" />
                </label>

                {/* 선택된 파일 목록 표시 */}
                {selectedFiles.length > 0 ? (
                    <div className="File_List">
                        {selectedFiles.map((file, index) => (
                            <div key={index} className="File_Item">
                                <span className="File_Name">{file}</span>
                                <button className="Delete_Button" onClick={() => handleFileDelete(file)}>
                                    삭제
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <span className="File_Empty">선택된 파일 없음</span>
                )}
            </div>
        </div>
    );
};

export default Home;
