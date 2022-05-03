import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "layout/Page/MainPage/MainPage";
import LoginPage from "layout/Page/LoginPage/LoginPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />}></Route>
                <Route path="MainPage" element={<MainPage />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;