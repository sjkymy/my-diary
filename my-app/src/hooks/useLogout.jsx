import { useState } from 'react'
import useAuthContext from './useAuthContext';
import { appAuth } from '../firebase/config';
import { signOut } from 'firebase/auth';

export default function useLogout() {
    // 에러정보 저장
    const [error, setError] = useState(null)

    // 서버와의 통신 상태를 저장.
    const [isPending, setIsPending] = useState(false);
    
    // 유저정보를 전역에서 활용할 수 있도록 dispatch 함수를 통해 업데이트.
    const { dispatch } = useAuthContext();

    const logout = () => {
        setError(null);
        setIsPending(true);

        signOut(appAuth).then(() => {
            // 로그아웃 성공
            dispatch({type: "logout"});
            setError(null);
            setIsPending(false);
        }).catch((error) => {
            setError(error.message);
            setIsPending(false);
            console.log(error.message);
        })
    }

    return {error, isPending, logout}
}
