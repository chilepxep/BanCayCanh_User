import styled from "styled-components";

const StyleArea = styled.textarea`
width: 100%;
padding: 12px;
margin-bottom: 16px;
border: 1px solid #ccc;
border-radius: 5px;
box-sizing:border-box;
font-family: inherit;
`

export default function Textarea(props) {
    return (
        <StyleArea {...props}></StyleArea>
    )
}