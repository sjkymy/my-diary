import { useReducer } from "react"
import { appFireStore, timeStamp } from "../firebase/config"
import { addDoc, collection } from "firebase/firestore"

const initState = {
    document: null,
    isPending: false,
    error: null,
    success: false
}

const storeReducer = (state, action) => {
    switch (action.type) {
        case 'isPending':
            return { isPending: true, document: null, success: false, error: null }
        case 'addDoc':
            return { isPending: false, document: action.payload, success: true, error: null }
        case 'error':
            return { isPending: false, document: null, success: false, error: action.payload }
        default:
            return state
    }
}

export default function useFirestore( transaction ) {
  const [response, dispatch] = useReducer(storeReducer, initState);

  const colRef = collection(appFireStore, transaction);

    // payload는 데이터를 관리할 때 바꿔줄 값을 의미한다.
    // dispatch는 2가지 method를 보낸다. type과 payload
    // type은 사용자가 지정한 action의 type
    // payload는 우리가 관리할 데이터가 들어간다.
  const addDocument = async (doc) => {
    dispatch({type: "isPending"})
    try {
        const createdTime = timeStamp.fromDate(new Date());
        const docRef = await addDoc(colRef, {...doc, createdTime});
        dispatch({type: "addDoc", payload: docRef});
    } catch (e) {
        dispatch({type: "error", payload: e.message})
    }
  };
    
  const deleteDocument = (id) => {

  };

  return (
    addDocument, deleteDocument, response
  )
}
