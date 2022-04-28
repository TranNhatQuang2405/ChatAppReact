import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainPage from "layout/Page/MainPage/MainPage";
import LoginPage from "layout/Page/LoginPage/LoginPage";
import { Navigate } from "react-router-dom";
import AuthProvider from "layout/Provider/AuthProvider";
import AppProvider from "layout/Provider/AppProvider";

function App() {
    return (
        <AuthProvider>
            <AppProvider>
                <Routes>
                    <Route path="/Login" element={<LoginPage />}></Route>
                    <Route path="/MainPage" element={<MainPage />}></Route>
                    <Route path="*" element={<Navigate to="/Login" />} />
                </Routes>
            </AppProvider>
        </AuthProvider>
    );
}

export default App;
