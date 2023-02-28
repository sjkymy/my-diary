import styled from "styled-components";

export const Main = styled.main `
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: 960px;
    margin: 30px auto;
    padding: 0 30px;

    @media (max-width: 760px) {
        grid-template-columns: none;
        padding: 0 10px
    }
`

export const ContentList = styled.ul `
    margin: 0;

    & li+li {
        margin: 30px auto;
    }

    @media (max-width: 760px) {
        padding: 0;
        margin-top: 30px;
    }
`

export const ContentListTit = styled.h2 `
    @media (max-width: 760px) {
        margin-left: 35px;
    }
`