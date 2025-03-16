// src/api/FestApi.js
import axiosInstance from "./AxiosInstance";

// AI Model OCR (Python FestAPI)
export const getOCR = async (imageFile) => {
    try {
        const formData = new FormData();
        formData.append("image", imageFile);

        console.log("OCR 요청:", formData);

        const response = await axiosInstance.post("/img_ocr", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: false,
        });

        console.log("OCR 응답:", response.data);

        // 응답이 문자열일 경우 객체로 변환
        if (typeof response.data === "string") {
            return { text: response.data.trim() };
        }

        return response.data;
    } catch (error) {
        console.error("OCR 요청 중 오류 발생:", error);
        return { text: "" };
    }
};

// 2. 요약
