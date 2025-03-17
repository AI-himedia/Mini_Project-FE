import { useEffect, useRef } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const PaymentSuccessModal = ({ isOpen, onClose, onProcessOCR }) => {
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            Swal.fire({
                title: "결제가 완료되었습니다!",
                html: `<div id="drag-drop-area" style="padding: 20px; border: 2px dashed #ccc; border-radius:10px; cursor: pointer;">
                          <span style="cursor: pointer;">프리미엄 OCR이 활성화되었습니다.<br/>
                          파일을 드래그 앤 드롭하거나 클릭하여 업로드하세요.</span>
                       </div>`,
                icon: "success",
                showConfirmButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                didOpen: () => {
                    const modalPopup = Swal.getPopup();
                    const dragArea = Swal.getHtmlContainer().querySelector("#drag-drop-area");

                    dragArea.addEventListener("dragover", handleDragOver);
                    dragArea.addEventListener("dragleave", handleDragLeave);
                    dragArea.addEventListener("drop", handleDrop);
                    dragArea.addEventListener("click", handleClick);

                    // 모달 전체 클릭 가능 영역
                    // modalPopup.addEventListener("click", handleClick);
                },
                willClose: () => {
                    onClose();
                },
            });
        }
    }, [isOpen]);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.currentTarget.style.borderColor = "#4CAF50";
        e.currentTarget.style.backgroundColor = "#f0fff4";
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.currentTarget.style.borderColor = "#ccc";
        e.currentTarget.style.backgroundColor = "transparent";
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.style.borderColor = "#ccc";
        e.currentTarget.style.backgroundColor = "transparent";

        const file = e.dataTransfer.files[0];
        if (file) {
            handleFileUpload(file);
        }
    };

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileUpload = (file) => {
        onProcessOCR(file);
        Swal.close();
    };

    return (
        <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={(e) => handleFileUpload(e.target.files[0])}
        />
    );
};

export default PaymentSuccessModal;
