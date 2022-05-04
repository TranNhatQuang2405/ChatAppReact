import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainPage from "layout/Page/MainPage/MainPage";
import LoginPage from "layout/Page/LoginPage/LoginPage";
import { Navigate } from "react-router-dom";
import AuthProvider from "layout/Provider/AuthProvider";

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route
                    path="/Login"
                    element={<LoginPage />}
                ></Route>
                <Route
                    path="/MainPage"
                    element={<MainPage />}
                ></Route>
                <Route
                    path="*"
                    element={<Navigate to="/Login" />}
                />
            </Routes>
        </AuthProvider>
    );
}

export default App;