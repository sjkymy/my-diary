import { useFirestore } from "../../hooks/useFirestore"
import { List, ListTit, ListTxt, DeleteBtn } from "./diaryList.style";

export default function DiaryList({diaries}) {
  const {deleteDocument} = useFirestore("myDiary");
  const convertTimestamp = (time) => {
    let dateInMillis = time * 1000
    let date = new Date(dateInMillis)
    let myDate = date.toLocaleDateString()
    let myTime = date.toLocaleTimeString()
    myDate = myDate.replaceAll('/', '-')
    return myDate + " " + myTime
  }

  return (
    <>
      {diaries.map((item) => {
        return (
          <>
            <List key={item.id}>
                <ListTit>{item.title}</ListTit>
                <ListTxt>{item.text}</ListTxt>
                <DeleteBtn type="button" onClick={()=>{deleteDocument(item.id)}}>삭제</DeleteBtn>
                <p>{convertTimestamp(item.createdTime.seconds)}</p>
            </List>
          </>
        )
      })}
    </>
  )
}
