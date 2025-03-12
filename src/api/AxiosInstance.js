// src/api/AxiosInstance.js

import axios from "axios";

import { API_SERVER_HOST } from "../config/ApiConfig";

// axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: `${API_SERVER_HOST}/api`,
    withCredentials: true, // 쿠키 허용
});

export default axiosInstance;
