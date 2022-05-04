import React, { useEffect } from "react";
import { auth } from "configs/firebase/config";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    signInWithRedirect,
    getRedirectResult,
    GoogleAuthProvider,
    FacebookAuthProvider,
    fetchSignInMethodsForEmail,
} from "firebase/auth";
import { addRecord, updateRecord } from "configs/firebase/service";

// const GoogleProvider = new GoogleAuthProvider();
// const FacebookProvider = new FacebookAuthProvider();

const providers = {
    google: new GoogleAuthProvider(),
    facebook: new FacebookAuthProvider(),
};

function LoginPage() {
    const currentUser = useSelector((state) => state.UserInfo.user);
    const handleSignIn = async (provider) => {
        await signInWithRedirect(auth, provider);
    };

    const handleAuthError = async (error) => {
        if (error.code === "auth/account-exists-with-different-credential") {
            var email = error.customData.email;
            const method = await fetchSignInMethodsForEmail(auth, email);
            const providerKey = method[0].split(".")[0];
            const provider = providers[providerKey];
            const accept = window.confirm(
                "You have sign in with another method with this email !!! Do you want to login with old method"
            );
            if (accept) {
                signInWithRedirect(auth, provider);
            }
        }
    };

    const handleResult = async () => {
        try {
            const result = await getRedirectResult(auth);
            if (result) {
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
                    updateRecord("users/", "uid", user.uid, {
                        IsOnline: true,
                    });
                }
            }
        } catch (error) {
            await handleAuthError(error);
        }
    };

    useEffect(() => {
        handleResult();
        return () => {};
    });

    if (currentUser === null)
        return (
            <div>
                <button onClick={() => handleSignIn(providers["google"])}>
                    Google
                </button>
                <button onClick={() => handleSignIn(providers["facebook"])}>
                    Facebook
                </button>
            </div>
        );
    else return <Navigate to="/MainPage" />;
}

export default React.memo(LoginPage);