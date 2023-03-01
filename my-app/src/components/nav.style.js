import styled from "styled-components"

export const NavTop = styled.nav `
    background-color: teal;
    padding: 20px 50px;
    @media (max-width: 760px) {
        padding: 20px 10px 10px;
    }
`

export const Title = styled.h1 `
    color: #fff;
    @media (max-width: 760px) {
        font-size: 1.7rem;
        text-align: center;
    }
`

export const SubTitle = styled.p `
    color: #fff;
    @media (max-width: 760px) {
        text-align: center;
    }
`

export const ListNav = styled.ul `
    display: flex;
    justify-content: right;
    gap: 16px;
    list-style: none;
    align-items: center;
    padding: 0;
    @media (max-width: 760px) {
        & .logged {
            font-size: 14px;
        }
    }
    & a {
        text-decoration: none;
        color: #fff;
    }
    & strong {
        color: #fff;
    }
`

export const Button = styled.button `
    font-weight: bold;
    margin-left: 20px;
    padding: 6px 12px;
    border-radius: 10px;
    background-color: #fff;
    border: none;
    color: teal;
    cursor: pointer;
`