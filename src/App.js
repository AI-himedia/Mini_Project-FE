import { Route, Routes } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import { LoadingProvider, useLoading } from "./contexts/LoadingContext";
import { ScaleLoader } from "react-spinners";

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

export default function App() {
    return (
        <LoadingProvider>
            <div className="App">
                <LoadingOverlay />
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </div>
        </LoadingProvider>
    );
}
