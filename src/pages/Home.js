// Css
import "../styles/pages/Home.css";

// React
import { useState } from "react";

// Router
import { Link } from "react-router-dom";

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
        if (event.target.value.length > 0) {
            setSelectedFiles([]);
            setWarningMessage("📌 사진 선택이 비활성화되었습니다. 텍스트를 지우면 선택할 수 있습니다.");
        } else {
            setWarningMessage("");
        }
    };

    // 파일 선택 상태 (여러 개 가능)
    const [selectedFiles, setSelectedFiles] = useState([]);

    // 파일 선택 핸들러 (선택되면 텍스트 입력 못하도록)
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 0) {
            setSelectedFiles(files.map((file) => file.name));
            setDiaryText("");
            setWarningMessage("📌 텍스트 입력이 비활성화되었습니다. 사진을 삭제하면 작성할 수 있습니다.");
        }
    };

    // 개별 파일 삭제 핸들러
    const handleFileDelete = (fileName) => {
        const updatedFiles = selectedFiles.filter((file) => file !== fileName);
        setSelectedFiles(updatedFiles);

        // 모든 파일이 삭제되었으면 텍스트 입력 가능하게 변경
        if (updatedFiles.length === 0) {
            setWarningMessage("");
        }
    };

    // 비활성화 메시지 변수
    const [warningMessage, setWarningMessage] = useState("");

    return (
        <div className="Home_Container">
            {/* Header */}
            <div className="Home_Header">
                <div className="Home_Header_Container">
                    <div className="Home_Date">{formattedDate}</div>
                    <div className="Home_BigTitle">오늘의 일기</div>
                    <div className="Home_Description">자신의 하루를 AI에게 맏기며 그림을 받아보세요.</div>
                </div>
                <div className="logo">
                    <Link to="/">
                        <img src="https://camo.githubusercontent.com/b948c62e6abae617036421540d11d08df3290c4b5cfb2208af5a4b7dd149441c/68747470733a2f2f76656c6f672e76656c63646e2e636f6d2f696d616765732f6472726f626f743430392f706f73742f62636365346162372d636162392d346435392d383461302d3262353966333064383939642f696d6167652e706e67" />
                    </Link>
                </div>
            </div>
            <br />
            {/* Content */}
            <div className="Home_Content">
                <input className="Home_Title" placeholder="제목을 입력하세요" disabled={selectedFiles.length > 0} />
            </div>
            <div className="Home_Select">
                <select className="Home_Weather" disabled={selectedFiles.length > 0}>
                    <option value="">날씨 선택</option>
                    <option value="sunny">맑음 🌈</option>
                    <option value="cloudy">흐림 ☁️</option>
                    <option value="rainy">비 🌧️</option>
                    <option value="snowy">눈 ❄️</option>
                    <option value="stormy">폭풍 ⛈️</option>
                </select>

                <select className="Home_Mood" disabled={selectedFiles.length > 0}>
                    <option value="">기분 선택</option>
                    <option value="happy">행복 😊</option>
                    <option value="sad">슬픔 😢</option>
                    <option value="angry">화남 😠</option>
                    <option value="excited">신남 🤩</option>
                    <option value="tired">피곤 😴</option>
                </select>
            </div>

            <div className="Home_Diary">
                <textarea
                    className="Home_Diary_Content"
                    placeholder="자신의 하루를 작성해보세요."
                    value={diaryText}
                    onChange={handleInput}
                    disabled={selectedFiles.length > 0}
                />
            </div>

            {/* 사진 선택하기 / 삭제하기 */}
            <div className="Home_FileUpload">
                {/* 사진 선택하기 버튼 */}
                <label className={`File_Button ${diaryText.length > 0 ? "disabled" : ""}`}>
                    사진 선택하기
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="File_Input"
                        disabled={diaryText.length > 0}
                    />
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

            {/* 사용자에게 경고 메시지 표시 */}
            {/* {warningMessage && <div className="Warning_Message">{warningMessage}</div>} */}
        </div>
    );
};

export default Home;
