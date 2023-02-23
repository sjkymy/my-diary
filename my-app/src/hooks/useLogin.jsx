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

    // console.log(appAuth.currentUser);
    // setInterval(() => {
    //     console.log(appAuth.currentUser);
    // }, 1000)

    const login = (email, password) => {
        setError(null);
        setIsPending(true);

        // 로그인을 집행하는 함수
        signInWithEmailAndPassword (appAuth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;

                dispatch({type: "login", payload: user});
                setError(null);
                setIsPending(false);

                if (!user) {
                    throw new Error("로그인에 실패했습니다.")
                };
            })
            .catch((error) => {
                setError(error.message);
                setIsPending(false);
                console.log(error.messsage);
            });
    }

    return {error, isPending, login}
}
