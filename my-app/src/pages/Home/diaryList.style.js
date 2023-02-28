import styled from "styled-components";

export const List = styled.li `
    border: 1px solid #f2f2f2;
    box-shadow: 3px 3px 5px rgba(50, 50, 50, 0.1);
    padding: 30px;
    position: relative;
    overflow: hidden;
    border-left: 4px solid teal;
`

export const ListTit = styled.strong `
    flex-shrink: 0;
    margin-right: 20px;
    color: #777;
    font-size: 1.3em;
`

export const ListTxt = styled.p `
    margin-right: 40px;
    color: #777;
    font-size: 1.1em;
    word-break: break-all;
`

export const DeleteBtn = styled.button `
    position: absolute;
    top: 0;
    right: 0;
    background: teal;
    color: #fff;
    border: none;
    padding: 12px 8px;
    line-height: 0;
    cursor: pointer;
`