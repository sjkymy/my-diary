import styles from "./Home.module.css";
import DiaryForm from "./DiaryForm";
import useAuthContext from "../../hooks/useAuthContext";
import useCollection from "../../hooks/useCollection";
import DiaryList from "./DiaryList";
import Weather from "../../components/Weather";

export default function Home() {
  const {user} = useAuthContext();
  const {documents, error} = useCollection("myDiary", ["uid", "==", user.uid]);

  return (
    <>
      <Weather/>
      <main className={styles.cont}>
        <aside className={styles.side_menu}>
          <DiaryForm uid={user.uid} />
        </aside>
        <ul className={styles.content_list}>
          <h2>일기 목록</h2>
          {error && <strong>{error}</strong>}
          {documents && <DiaryList diaries={documents} />}
        </ul>
      </main>
    </>
  )
}
