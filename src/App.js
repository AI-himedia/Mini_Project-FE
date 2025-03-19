// App.js

// React Router 관련 import
import { Route, Routes } from "react-router-dom";

// 스타일 관련 import
import "./App.css";

// 페이지 컴포넌트 import
import Home from "./pages/Home";
import ImageDisplay from "./pages/ImageDisplay";

// Context 관련 import
import { LoadingProvider, useLoading } from "./contexts/LoadingContext";

// 로딩 스피너 컴포넌트 관련 import
import { ScaleLoader } from "react-spinners";

/**
 * LoadingOverlay 컴포넌트
 * 로딩 중일 때 스피너를 화면에 표시
 */
const LoadingOverlay = () => {
    const { isLoading } = useLoading();

    return (
        isLoading && (
            <div className="Spinner_Overlay">
                <ScaleLoader />
            </div>
        )
    );
};

/**
 * App 컴포넌트
 * LoadingProvider로 감싸고, 라우팅을 설정하여 Home과 ImageDisplay 페이지를 연결
 */
export default function App() {
    return (
        <LoadingProvider>
            <div className="App">
                <LoadingOverlay />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/result" element={<ImageDisplay />} />
                </Routes>
            </div>
        </LoadingProvider>
    );
}