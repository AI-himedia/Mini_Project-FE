// src/pages.Home.js

// Css
import "../styles/pages/Home.css";

// React
import { useState, useRef } from "react";

import ImageDisplay from "./ImageDisplay";

// Components
import FileOptionModal from "../components/FileOptionModal";

// OCR API 요청
import { getOCR } from "../api/FestApi";

// Router
import { Link, useNavigate } from "react-router-dom";

// Spinner
import { useLoading } from "../contexts/LoadingContext";

// API
import { saveText, generateImage } from "../api/FestApi";

// SDK
import { loadTossPayments } from "@tosspayments/payment-sdk";
import PaymentSuccessModal from "../components/PaymentSuccessModal";
import { getCLOVA } from "../api/CLOVAApi";
import showFileOptionModal from "../components/FileOptionModal";


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
    const [error, setError] = useState(null);
    const [isSummarizing, setIsSummarizing] = useState(false);
    const [isFileOptionModalOpen, setIsFileOptionModalOpen] = useState(false);

    const [isPaymentSuccessModalOpen, setIsPaymentSuccessModalOpen] = useState(false);
    const [isPremiumOCR, setIsPremiumOCR] = useState(false);

    const [imageData, setImageData] = useState(null);
    const navigate = useNavigate();

    // 요약 요청 핸들러
    const handleSummarize = async () => {
        if (!diaryText.trim()) {
            setError("일기 내용을 입력해주세요.");
            return;
        }

        setIsSummarizing(true);
        setIsLoading(true);
        try {
            console.log("save_text 요청 시작...");
            await saveText(diaryText);

            console.log("image/generate 요청 시작...");
            const result = await generateImage("etri-vilab/koala-700m-llava-cap");

            if (result && result.images) {
                console.log("이미지 생성 완료!", result.images);
                navigate("/result", { state: { images: result.images } });
            }
        } catch (error) {
            console.error("이미지 생성 중 오류 발생:", error);
            setError("이미지 생성 중 오류가 발생했습니다.");
        } finally {
            setIsSummarizing(false);
            setIsLoading(false);
        }
    };

    const handlePayment = async () => {
        try {
            const tossPayments = await loadTossPayments(process.env.REACT_APP_PAYMENT_API_KEY);

            await tossPayments.requestPayment("카드", {
                orderId: `ocr-${new Date().getTime()}`,
                amount: 100,
                orderName: "OCR 프리미엄 서비스",
                customerName: "고객 이름",
            });

            // 결제 성공 시 모달 표시
            setIsPremiumOCR(true);
            setIsPaymentSuccessModalOpen(true);
        } catch (error) {
            console.error("결제 오류:", error);
            alert(`결제 실패: ${error.message}`);
        }
    };

    // 정확한 Home.js 수정예시
    const handleProcessOCR = async (file) => {
        setIsPaymentSuccessModalOpen(false);
        setIsLoading(true);

        try {
            const ocrResult = await getCLOVA(file);
            if (ocrResult?.images?.[0]?.inferResult === "SUCCESS") {
                const texts = ocrResult.images[0].fields.map((field) => field.inferText).join(" ");
                setDiaryText((prev) => prev + (prev ? "\n" : "") + texts);
            } else {
                setError("유료 OCR 결과를 받아오지 못했습니다.");
            }
        } catch (error) {
            setError("유료 OCR 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
        } finally {
            setIsLoading(false);
        }
    };

    // 파일 선택 버튼 클릭 시 모달 먼저 띄우기
    const handleOpenFileOptionModal = () => {
        showFileOptionModal(handleSelectOption);
    };

    // 모달에서 옵션 선택 후 파일 선택 창 열기
    const handleSelectOption = (isPremium) => {
        setIsFileOptionModalOpen(false);

        if (isPremium) {
            // 유료 결제 후 OCR 실행 (파일 선택 후 handlePremiumOCR 실행)
            handlePayment(() => {
                setIsPremiumOCR(true);
                setIsPaymentSuccessModalOpen(true);
            });
        } else {
            // 무료 OCR 선택 시 바로 파일 선택 창 열기
            setIsPremiumOCR(false);
            if (fileInputRef.current) {
                fileInputRef.current.click();
            }
        }
    };

    // 무료 OCR 처리 함수
    const handleFreeOCR = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setIsLoading(true);

        try {
            const ocrResult = await getOCR(file, "free");
            console.log("무료 OCR 결과 확인:", ocrResult);

            if (ocrResult?.text) {
                setDiaryText((prevText) => prevText + (prevText ? "\n" : "") + ocrResult.text);
            } else {
                setError("무료 OCR 결과를 받아오지 못했습니다.");
            }
        } catch (error) {
            setError("무료 OCR 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
        } finally {
            setIsLoading(false);
        }
    };

    // 유료 OCR 처리 함수
    const handlePremiumOCR = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setIsLoading(true);

        try {
            const ocrResult = await getCLOVA(file);
            console.log("유료 OCR 결과 확인:", ocrResult);

            if (ocrResult?.images?.[0]?.inferResult === "SUCCESS") {
                const texts = ocrResult.images[0].fields.map((field) => field.inferText).join(" ");
                setDiaryText((prevText) => prevText + (prevText ? "\n" : "") + texts);
            } else {
                setError("유료 OCR 결과를 받아오지 못했습니다.");
            }
        } catch (error) {
            console.error(error);
            setError("유료 OCR 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
        } finally {
            setIsLoading(false);
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

            {error && <div className="error">{error}</div>}

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
                    <button className="File_Button" onClick={handleOpenFileOptionModal}>
                        사진 선택하기
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={isPremiumOCR ? handlePremiumOCR : handleFreeOCR}
                        className="File_Input"
                        style={{ display: "none" }}
                    />

                    <span className="File_Divider">|</span>
                    <span className="File_Empty">지원하는 이미지 파일 형식: *.jpg, *.png, *.pdf, *.tiff</span>
                </div>
                {/* 무료/유료 선택 모달 */}
                {isFileOptionModalOpen && (
                    <FileOptionModal
                        isOpen={isFileOptionModalOpen}
                        onClose={() => setIsFileOptionModalOpen(false)}
                        onSelectOption={handleSelectOption}
                    />
                )}
                <PaymentSuccessModal
                    isOpen={isPaymentSuccessModalOpen}
                    onClose={() => setIsPaymentSuccessModalOpen(false)}
                    isPremium={isPremiumOCR}
                    onProcessOCR={handleProcessOCR}
                />
                {/* 그림받기 버튼 */}
                <button
                    className="Request_Button"
                    onClick={handleSummarize}
                    disabled={diaryText.length === 0 || isSummarizing}
                >
                    {isSummarizing ? "요약 중..." : "AI 그림 받기"}
                </button>
            </div>
        </div>
    );
};

export default Home;
