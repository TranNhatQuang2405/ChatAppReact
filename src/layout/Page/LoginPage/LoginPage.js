import React, { useEffect } from "react";
import { auth } from "configs/firebase/config";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    signInWithRedirect,
    getRedirectResult,
    GoogleAuthProvider,
    FacebookAuthProvider,
} from "firebase/auth";
import { addRecord, updateRecord } from "configs/firebase/service";

const GoogleProvider = new GoogleAuthProvider();
const FacebookProvider = new FacebookAuthProvider();

function LoginPage() {
    const currentUser = useSelector((state) => state.UserInfo.user);
    // console.log("Login");
    const handleSignIn = async (provider) => {
        signInWithRedirect(auth, provider);
    };
    useEffect(() => {
        const getResult = async () => {
            const result = await getRedirectResult(auth);
            if (result !== null) {
                const { _tokenResponse, user } = result;
                if (_tokenResponse?.isNewUser) {
                    addRecord("users/", {
                        displayName: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL,
                        uid: user.uid,
                        listFriend: null,
                        listGroup: null,
                        listChat: null,
                        listInvite: null,
                        IsOnline: true,
                        providerId: _tokenResponse.providerId,
                    });
                } else {
                    updateRecord("users/", "uid", user.uid, { IsOnline: true });
                }
            }
        };

        return () => {
            getResult();
        };
    }, []);

    if (currentUser === null)
        return (
            <div>
                <button onClick={() => handleSignIn(GoogleProvider)}>
                    Google
                </button>
                <button onClick={() => handleSignIn(FacebookProvider)}>
                    Facebook
                </button>
            </div>
        );
    else return <Navigate to="/MainPage" />;
}

export default React.memo(LoginPage);