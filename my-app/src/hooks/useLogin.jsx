import { signInWithEmailAndPassword } from "firebase/auth";
import { appAuth } from "../firebase/config"
import { useState } from "react"
import useAuthContext from "./useAuthContext";

export default function useLogin() {
    // 에러정보 저장
    const [error, setError] = useState(null);

    // 서버와의 통신 상태를 저장.
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const login = (email, password) => {
        setError(null);
        setIsPending(true);

        // 로그인을 집행하는 함수
        signInWithEmailAndPassword (appAuth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;

                setError(null);
                setIsPending(false);

                dispatch({type: "login", payload: user});

                if (!user) {
                    throw new Error("로그인 실패")
                };
            })
            .catch((error) => {
                console.log(error.messsage);
                setError(error.message);
                setIsPending(false);
            });
    }

    return {error, isPending, login}
}
