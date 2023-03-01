import styled from "styled-components"

export const LoginForm = styled.form `
    width: 90%;
    max-width: 500px;
    margin: 50px auto;

    & fieldset {
        height: 400px;
        display: flex;
        flex-direction: column;
        padding: 0 40px;
        border: none;
        @media (max-width: 760px) {
            padding: 0 10px;
        }
    }
    & legend {
        font-size: 1.5rem;
        margin-bottom: 30px;
        text-align: center;
        margin-bottom: 50px;
        font-weight: bold;
    }
`

export const InpLogin = styled.input `
    margin: 20px 0 40px;
    padding: 0 0 5px;
    border: none;
    border-bottom: 1px solid rgb(219, 219, 219);
    &:focus {
        border-bottom: 2px solid teal;
        outline: none;
    }
`

export const BtnLogin = styled.button `
    width: 80%;
    margin: 30px auto 0;
    background-color: teal;
    border: none;
    border-radius: 30px;
    padding: 15px 0;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    &:disabled {
        opacity: 0.4;
    }
`