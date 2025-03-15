// src/components/SummaryModal.js

import "../styles/components/SummaryModal.css";

const SummaryModal = ({ isOpen, onClose, summary }) => {
    if (!isOpen) return null;

    // 모달 바깥을 클릭하면 닫히도록 설정
    const handleOverlayClick = (e) => {
        if (e.target.classList.contains("modal-overlay")) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <h3>📌 요약 결과</h3>
                <div className="modal-summary">
                    <p>{summary}</p>
                </div>
                <button className="modal-close-button" onClick={onClose}>
                    닫기
                </button>
            </div>
        </div>
    );
};

export default SummaryModal;
