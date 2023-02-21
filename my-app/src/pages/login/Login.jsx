import { useState } from "react"
import useLogin from "../../hooks/useLogin";
import styles from "./login.module.css"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, isPending, login } = useLogin();

  const handleData = (e) => {
    if (e.target.type === "email") {
      setEmail(e.target.value)
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
        <label htmlFor="myEmail">이메일 : </label>
        <input type="email" id="myEmail" value={email} onChange={handleData} required/>

        <label htmlFor="myPw">비밀번호 : </label>
        <input type="password" id="myPw" value={password} onChange={handleData} required/>

        {!isPending && <button type="submit" className={styles.btn}>로그인</button>}
        {isPending && <strong>로그인이 진행중입니다...</strong>}
        {error && <strong>{error}</strong>}
      </fieldset>
    </form>
  )
}
