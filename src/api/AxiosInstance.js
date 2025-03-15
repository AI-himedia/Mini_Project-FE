// src/api/AxiosInstance.js

import axios from "axios";

import { API_SERVER_HOST } from "../config/ApiConfig";

// axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: `${API_SERVER_HOST}`,
    withCredentials: true,
});

export default axiosInstance;
