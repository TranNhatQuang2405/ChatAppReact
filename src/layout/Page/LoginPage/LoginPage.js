import React, { useEffect } from "react";
import { app, uiConfig } from "configs/firebase/config";
import { getAuth } from "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

function LoginPage() {
    const auth = getAuth(app);
    useEffect(() => {
        const unmountAuth = auth.onAuthStateChanged((result) =>
            console.log(result)
        );
        return unmountAuth();
    }, []);
    return (
        <div>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
        </div>
    );
}

export default LoginPage;