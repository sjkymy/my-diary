import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { appAuth } from "../firebase/config"
import { useState } from "react"
import useAuthContext from "./useAuthContext";

export default function useSignup() {
    // 에러정보 저장
    const [error, setError] = useState(null);

    // 서버와의 통신 상태를 저장.
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = (email, password, displayName) => {
        setError(null);
        setIsPending(true);

        // 비밀번호 설정으로 유저정보 등록
        createUserWithEmailAndPassword(appAuth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;

                if (!user) {
                    throw new Error("회원가입 실패")
                };

                updateProfile(appAuth.currentUser, {displayName})
                    .then(() => {
                        dispatch({type: "login", payload: user});
                        setError(null);
                        setIsPending(false);
                    }).catch((error) => {
                        console.log(error.messsage);
                        setError(error.message);
                        setIsPending(false);
                    });
            })
            .catch((error) => {
                console.log(error.messsage);
                setError(error.message);
                setIsPending(false);
            });
    }

    return {error, isPending, signup}
}
