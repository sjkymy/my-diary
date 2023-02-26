import { useReducer } from "react"
import { appFireStore, timeStamp } from "../firebase/config"
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore"

// 기본 상태.
// isPending: 통신 상태
const initState = {
    document: null,
    isPending: false,
    error: null,
    success: false
}

// 전달 받는 action에 따른 state 업데이트
const storeReducer = (state, action) => {
    switch (action.type) {
        case 'isPending':
            return { isPending: true, document: null, success: false, error: null }
        case 'addDoc':
            return { isPending: false, document: action.payload, success: true, error: null }
        case 'deleteDoc':
            return { isPending: false, document: null, success: true, error: null }
        case 'error':
            return { isPending: false, document: null, success: false, error: action.payload }
        default:
            return state
    }
}

export const useFirestore = (transaction) => {
    // response에 firestore의 응답을 저장한다.
    const [response, dispatch] = useReducer(storeReducer, initState);

    // Cloud Firestore에서 collection을 만들지 않고, 자동으로 collection 생성하고, collection에 저장되는 문서에 데이터 저장하기.
    const colRef = collection(appFireStore, transaction);

    // 컬렉션에 문서 추가.
    // doc에는 DiaryFrom의 데이터가 들어간다.
    const addDocument = async (doc) => {
        dispatch({ type: "isPending" });
        try {
            // 현재시각을 timeStamp 객체에 전달.
            const createdTime = timeStamp.fromDate(new Date());

            // docRef : 우리가 만들 문서의 참조.
            // 전개 구문은 어떤 데이터가 들어가든 반영 가능
            // addDoc : collection에 문서를 추가한다.
            const docRef = await addDoc(colRef, { ...doc, createdTime });
            // console.log(docRef);
            dispatch({ type: 'addDoc', payload: docRef });
        } catch (error) {
            dispatch({ type: 'error', payload: error.message });
        }
    }

    // 문서 제거 기능
    const deleteDocument = async (id) => {
        dispatch({ type: "isPending" });
        try {
            const docRef = await deleteDoc(doc(colRef, id));
            dispatch({ type: 'deleteDoc', payload: docRef });
        } catch (e) {
            dispatch({ type: 'error', payload: e.message });
        }
    }

    return { addDocument, deleteDocument, response }
}