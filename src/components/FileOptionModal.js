import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const showFileOptionModal = (onSelectOption) => {
    Swal.fire({
        title: "옵션을 선택해주세요.",
        html: "작성하신 글씨체에 따라 인식 정확도가 달라질 수 있습니다.",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "유료 (100원)",
        cancelButtonText: "무료",
        reverseButtons: true,
        allowEscapeKey: false,
        allowOutsideClick: false,
    }).then((result) => {
        if (result.isConfirmed) {
            onSelectOption(true);
        } else {
            onSelectOption(false);
        }
    });
};

export default showFileOptionModal;
