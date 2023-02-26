import { useRef, useState, useEffect } from "react"
import useLogin from "../../hooks/useLogin";
import styles from "./login.module.css"

export default function Login() {
  const emailInp = useRef(null);
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [password, setPassword] = useState("");
  const [isBtnDisable, setIsBtnDisable] = useState(true);
  const { error, isPending, login } = useLogin();

  useEffect(() => {
    emailValid ? setIsBtnDisable(false) : setIsBtnDisable(true);
  }, [emailValid])

  const handleData = (e) => {
    if (e.target.type === "email") {
      setEmail(e.target.value)
      !e.currentTarget.validity.typeMismatch ? setEmailValid(true) : setEmailValid(false);
    } else if (e.target.type === "password") {
      setPassword(e.target.value)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  }

  return (
    <form className={styles.login_form} onSubmit={handleSubmit}>
      <fieldset>
        <legend>로그인</legend>
        <label htmlFor="myEmail">이메일</label>
        <input type="email" id="myEmail" ref={emailInp} value={email} onChange={handleData} required/>

        <label htmlFor="myPw">비밀번호</label>
        <input type="password" id="myPw" value={password} onChange={handleData} required/>

        {isPending && <strong>로그인이 진행중입니다...</strong>}
        {error && <strong className={styles.errMsg}>* 이메일 또는 비밀번호가 일치하지 않습니다.</strong>}

        {!isPending && <button disabled={isBtnDisable} type="submit" className={styles.btn}>로그인</button>}
      </fieldset>
    </form>
  )
}
