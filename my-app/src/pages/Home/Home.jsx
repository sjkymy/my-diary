import DiaryForm from "./DiaryForm";
import useAuthContext from "../../hooks/useAuthContext";
import useCollection from "../../hooks/useCollection";
import DiaryList from "./DiaryList";
import Weather from "../../components/Weather";
import { Main, ContentList, ContentListTit } from "./home.style";

export default function Home() {
  const {user} = useAuthContext();
  const {documents, error} = useCollection("myDiary", ["uid", "==", user.uid]);

  return (
    <>
      <Weather/>
      <Main>
        <aside>
          <DiaryForm uid={user.uid} />
        </aside>
        <ContentList>
          <ContentListTit>일기 목록</ContentListTit>
          {error && <strong>{error}</strong>}
          {documents && <DiaryList diaries={documents} />}
        </ContentList>
      </Main>
    </>
  )
}
