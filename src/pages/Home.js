// Css
import "../styles/pages/Home.css";

// React
import { useState, useRef } from "react";

// OCR API 요청
import { getOCR } from "../api/CLOVAApi";

// Router
import { Link } from "react-router-dom";

// Spinner
import { useLoading } from "../contexts/LoadingContext";

const Home = () => {
    const fileInputRef = useRef(null);
    const { setIsLoading } = useLoading();

    // 날짜 관련 변수
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    const dayOfWeek = daysOfWeek[today.getDay()];
    const formattedDate = `${year} / ${month} / ${day} (${dayOfWeek})`;

    // 상태 관리
    const [diaryText, setDiaryText] = useState("");
    const [isFileSelected, setIsFileSelected] = useState(false);
    const [segments, setSegments] = useState([]);

    // 파일 선택 핸들러
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setIsFileSelected(true);
        setIsLoading(true);

        try {
            const ocrResult = await getOCR(file);
            if (ocrResult?.images[0]?.fields.length > 0) {
                const extractedText = ocrResult.images[0].fields.map((field) => field.inferText).join(" ");
                setDiaryText((prevText) => prevText + (prevText ? "\n" : "") + extractedText);
            }
        } catch (error) {
            console.error("OCR 처리 중 오류 발생:", error);
        } finally {
            setIsLoading(false);
            setIsFileSelected(false);
        }
    };

    return (
        <div className="Home_Container">
            {/* Header */}
            <div className="Home_Header">
                <div className="Home_Header_Container">
                    <div className="Home_Date">{formattedDate}</div>
                    <div className="Home_BigTitle">오늘의 일기</div>
                    <div className="Home_Description">자신의 하루를 AI에게 맡기며 그림을 받아보세요.</div>
                </div>
                <div className="logo">
                    <Link to="/">
                        <img src="https://camo.githubusercontent.com/b948c62e6abae617036421540d11d08df3290c4b5cfb2208af5a4b7dd149441c/68747470733a2f2f76656c6f672e76656c63646e2e636f6d2f696d616765732f6472726f626f743430392f706f73742f62636365346162372d636162392d346435392d383461302d3262353966333064383939642f696d6167652e706e67" />
                    </Link>
                </div>
            </div>

            {/* Content */}
            <div className="Home_Content">
                <input className="Home_Title" placeholder="제목을 입력하세요" disabled={isFileSelected} />
            </div>
            <div className="Home_Select">
                <select className="Home_Weather" disabled={isFileSelected}>
                    <option value="">날씨 선택</option>
                    <option value="sunny">맑음 🌈</option>
                    <option value="cloudy">흐림 ☁️</option>
                    <option value="rainy">비 🌧️</option>
                    <option value="snowy">눈 ❄️</option>
                    <option value="stormy">폭풍 ⛈️</option>
                </select>

                <select className="Home_Mood" disabled={isFileSelected}>
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
                    onChange={(event) => setDiaryText(event.target.value)}
                />
                <div className="Character_Count">{diaryText.length}자</div>
            </div>

            {/* 사진 선택하기 */}
            <div className="Home_FileUpload">
                <div className="File_Button_Container">
                    <label className="File_Button">
                        사진 선택하기
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="File_Input" />
                    </label>
                    <span className="File_Divider">|</span>
                    <span className="File_Empty">지원하는 이미지 파일 형식: *.jpg, *.png, *.pdf, *.tiff</span>
                </div>

                {/* 추출하기 버튼 */}
                <button className="Request_Button" disabled={diaryText.length === 0}>
                    추출하기
                </button>
            </div>
        </div>
    );
};

export default Home;
