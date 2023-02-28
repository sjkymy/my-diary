import styled from "styled-components"

export const Form = styled.form `
    padding: 20px;
    background: teal;
    border-radius: 10px;

    & fieldset {
        border: none;
    }
    & legend {
        font-size: 1.5em;
        font-weight: bold;
        margin-bottom: 10px;
        color: #fff;
    }
    & label {
        margin: 30px auto 10px;
        display: block;
        color: #fff;
    }
`

export const InpTitle = styled.input `
    display: block;
    width: 100%;
    padding: 10px;
    margin-top: 8px;
    border: 0;
    border-radius: 4px;
    color: #555;
    font-size: 1em;
`

export const Textarea = styled.textarea `
    height: 200px;
    width: 100%;
    border-radius: 4px;
`

export const SaveBtn = styled.button `
    display: block;
    width: 100%;
    border: 2px solid #fff;
    margin-top: 20px;
    padding: 6px 12px;
    color: #fff;
    background-color: transparent;
    font-size: 1em;
    border-radius: 4px;
    cursor: pointer;
`