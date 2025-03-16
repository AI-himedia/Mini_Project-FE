import React, { useState, useRef } from "react";
import "../styles/components/PaymentSuccessModal.css";

const PaymentSuccessModal = ({ isOpen, onClose, onProcessOCR }) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef(null);

    if (!isOpen) return null;

    // 드래그 앤 드롭 이벤트 핸들러
    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragOver(false);

        const file = event.dataTransfer.files[0];
        if (file) {
            handleFileUpload(file);
        }
    };

    // 클릭 시 파일 선택 창 열기
    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // 파일 업로드 핸들러
    const handleFileUpload = (file) => {
        console.log("업로드된 파일:", file);
        onProcessOCR(file);
    };

    return (
        <div className="FileOption_Container" onClick={handleClick}>
            <div
                className={`FileOption_Content ${isDragOver ? "PaymentSuccess_DragOver" : ""}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <svg
                    className="FileOption_icon_check"
                    width="35px"
                    height="35px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke-width="1.5"
                >
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM7.53044 11.9697C7.23755 11.6768 6.76268 11.6768 6.46978 11.9697C6.17689 12.2626 6.17689 12.7374 6.46978 13.0303L9.46978 16.0303C9.76268 16.3232 10.2376 16.3232 10.5304 16.0303L17.5304 9.03033C17.8233 8.73744 17.8233 8.26256 17.5304 7.96967C17.2375 7.67678 16.7627 7.67678 16.4698 7.96967L10.0001 14.4393L7.53044 11.9697Z"
                        fill="#9BFF8B"
                    ></path>
                </svg>

                <h3 className="FileOption_Title">결제가 완료되었습니다!</h3>
                <strong className="FileOption_Message">
                    프리미엄 OCR이 활성화되었습니다.
                    <br />
                    파일을 드래그 앤 드롭하거나 여기를 클릭하여 업로드하세요.
                </strong>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => handleFileUpload(e.target.files[0])}
                    style={{ display: "none" }}
                />
                <button className="modal-close" onClick={onClose}>
                    닫기
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccessModal;
