import { useState } from "react"
import useSignup from "../../hooks/useSignup";
import styles from "./signup.module.css"

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { error, isPending, signup } = useSignup();

  const handleData = (e) => {
    if (e.target.type === "email") {
      setEmail(e.target.value)
    } else if (e.target.type === "password") {
      setPassword(e.target.value)
    } else if (e.target.type === "text") {
      setDisplayName(e.target.value)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName)
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>회원가입</legend>
        <label htmlFor="myEmail">email : </label>
        <input type="email" id="myEmail" value={email} onChange={handleData} required/>

        <label htmlFor="myPw">비밀번호 : </label>
        <input type="password" id="myPw" value={password} onChange={handleData} required/>

        <label htmlFor="myName">닉네임 : </label>
        <input type="text" id="myName" value={displayName} onChange={handleData} required/>

        <button>회원가입</button>
      </fieldset>
    </form>
  )
}
