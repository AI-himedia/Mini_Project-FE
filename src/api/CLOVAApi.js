// src/api/CLOVAApi.js

import axiosInstance from "./AxiosInstance";

// OCR
export const getOCR = async (imageFile) => {
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
            `https://ehbgjflqfc.apigw.ntruss.com/custom/v1/39277/744a0c5c41be6adeaa7d421a76da4f5bd8219f1869aa7a25de3bf51b25700c88/general`,
            formData,
            {
                headers: {
                    "X-OCR-SECRET": "VGFvV2tOSWN0Q09nVUpTUEZTS0t1aEpHdmZTdVpXVkI=",
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
