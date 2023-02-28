import { useFirestore } from "../../hooks/useFirestore"
import { List, ListTit, ListTxt, DeleteBtn } from "./diaryList.style";

export default function DiaryList({diaries}) {
  const {deleteDocument} = useFirestore("myDiary");

  return (
    <>
        {diaries.map((item) => {
            return (
              <>
                <List key={item.id}>
                    <ListTit>{item.title}</ListTit>
                    <ListTxt>{item.text}</ListTxt>
                    <DeleteBtn type="button" onClick={()=>{deleteDocument(item.id)}}>삭제</DeleteBtn>
                </List>
              </>
            )
        })}
    </>
  )
}
