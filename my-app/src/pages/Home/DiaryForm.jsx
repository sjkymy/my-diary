import { useState, useEffect } from 'react'
import { useFirestore } from '../../hooks/useFirestore';
import { Form, InpTitle, Textarea, SaveBtn } from './diaryForm.style';

// uid 는 Home.js 에서 props로 전달받는 유저 아이디.
export default function DiaryForm({ uid }) {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const { addDocument, response } = useFirestore("myDiary");

    const handleData = (e) => {
        e.preventDefault();
        // console.log(title, text);
        addDocument({ uid, title, text })
    };

    useEffect(() => {
        // console.log("통신상태", response.success);
        if (response.success) {
            setTitle("");
            setText("");
        }
    }, [response.success]); // response.success가 바뀔 때만 effect를 재실행합니다.

    return (
        <>
            <Form onSubmit={handleData}>
                <fieldset>
                    <legend>일기 쓰기</legend>
                    <label htmlFor='tit'>일기 제목</label>
                    <InpTitle id="tit" type='text' required onChange={(event) => setTitle(event.target.value)} value={title}></InpTitle>

                    <label htmlFor='tit'>일기 내용</label>
                    <Textarea id="tit" type='text' required onChange={(event) => setText(event.target.value)} value={text}></Textarea>

                    <SaveBtn type='submit'>저장하기</SaveBtn>
                </fieldset>
            </Form>
        </>
    )
}