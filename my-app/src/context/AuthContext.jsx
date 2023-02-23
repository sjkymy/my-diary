import { createContext, useReducer, useEffect } from "react";
import { appAuth } from "../firebase/config";

const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case "login":
            return {...state, user: action.payload}
        
        case "logout":
            return {...state, user: null}

        case "authIsReady":
            return {...state, user: action.payload, isAuthReady: true}

        default:
            return state
    }
}

const AuthContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(authReducer, { user : null,
    isAuthReady: false
    })

    useEffect(() => {
        // onAuthStateChanged : 유저의 인증정보 변화를 관찰하는 함수.
        // onAuthStateChanged 함수는 Unsubscribe 함수를 반환한다. 더 이상 유저의 변화를 관찰하지 않도록 한다.
        const unsubscribe = appAuth.onAuthStateChanged(function (user) {
            dispatch({ type: 'authIsReady', payload: user })
            unsubscribe();
        });
    }, [])

    console.log(state)
    
    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthContextProvider}