// src/api/FestApi.js
import axiosInstance from "./AxiosInstance";

// AI Model - OCR (Python FestAPI)
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

// AI Model - Save Text (Python FastAPI)
export const saveText = async (text) => {
    try {
        const response = await axiosInstance.post("/save_text", { text });
        console.log("save_text 응답:", response.data);
        return response.data;
    } catch (error) {
        console.error("save_text 요청 중 오류 발생:", error);
        throw error;
    }
};

// AI Model - Generate Image (Python FastAPI)
export const generateImage = async (modelName) => {
    try {
        const response = await axiosInstance.post(
            `/image/generate?model_name=${modelName}`
        );
        console.log("image/generate 응답:", response.data);
        return response.data;
    } catch (error) {
        console.error("image/generate 요청 중 오류 발생:", error);
        throw error;
    }
};