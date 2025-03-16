// src/api/CLOVAApi.js

import axiosInstance from "./AxiosInstance";

// Naver CLOVA OCR
export const getCLOVA = async (imageFile) => {
    try {
        const formData = new FormData();
        const message = {
            version: "V2",
            requestId: "string",
            timestamp: Date.now(),
            images: [{ format: "png", name: "string" }],
        };
        formData.append("message", JSON.stringify(message));
        formData.append("file", imageFile);
        const response = await axiosInstance.post(
            `https://ehbgjflqfc.apigw.ntruss.com/custom/v1/39277/${process.env.REACT_APP_CLOVA_URL}/general`,
            formData,
            {
                headers: {
                    "X-OCR-SECRET": process.env.REACT_APP_CLOVA_OCR,
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: false,
            }
        );
        return response.data;
    } catch (error) {
        return null;
    }
};
