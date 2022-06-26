import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*{
    margin: 0%;
    padding: 0;
    box-sizing: border-box;
}

body{
    background: white;
    color: black;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}
`

export default GlobalStyle;