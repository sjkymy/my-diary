import { useState } from "react"

export default function DiaryForm() {

    const [title, setTitle] = useState("");
    const [text, setText] = useState("")

    const handleData = (e) => {
        if (e.target.id === "tit") {
            setTitle(e.target.value);
        } else if (e.target.id=== "txt") {
            setText(e.target.value);
        }
    }

    const handlSubmit = (e) => {
        e.preventDefault();
        console.log(title, text);
    }

  return (
    <>
        <form onSubmit={handlSubmit}>
            <fieldset>
                <legend>일기 쓰기</legend>
                <label htmlFor="tit">일기 제목</label>
                <input type="text" id="tit" value={title} required onChange={handleData} />

                <label htmlFor="txt">일기 내용: </label>
                <textarea type="text" id="txt" value={text} required onChange={handleData} />
            </fieldset>
            <button>저장하기</button>
        </form>
    </>
  )
}
