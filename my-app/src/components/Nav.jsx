import { Link } from "react-router-dom"
import useLogout from "../hooks/useLogout"
import useAuthContext from "../hooks/useAuthContext";
import { NavTop, Title, ListNav, Button } from "./nav.style";

export default function Nav() {
  const {logout} = useLogout();
  const { user } = useAuthContext();
  
  return (
    <NavTop>
        <Title>나의 하루일기</Title>
        <ListNav>
          {!user &&
            <>
              <li>
                <Link to="/login">로그인</Link>
              </li>
              <li>
                <Link to="/signup">회원가입</Link>
              </li>
            </>
          }
          {user && 
            <li className="logged">
              <strong>환영합니다. {user.displayName}님!</strong>
              <Button type="button" onClick={logout}>로그아웃</Button>
            </li>
          }
          
        </ListNav>
    </NavTop>
  )
}
