import { css } from "styled-components";
import styled from "styled-components";
import { primary } from "@/lib/color";

export const ButtonStyle = css`
background-color:${primary};
border: 0;
color: #F6F6F6;
padding: 10px 16px;
border-radius: 5px;
cursor: pointer;
display: inline-flex;
align-items: center;
text-decoration: none;
font-family: 'Poppins', sans-serif;
font-weight: 500;
font-size: 15px;
svg{
    height:16px;
    margin-right:5px;
}

${props => props.block && css`
display: block;
width: 100%;
padding: 16px;
`}


${props => props.white && !props.outline && css`
background-color:#F6F6F6;
color: #212121;
`};
${props => props.white && props.outline && css`
background-color: transparent;
color: #F6F6F6;
border: 1px solid #F6F6F6;
`};

${props => props.black && !props.outline && css`
background-color:#FFE194;
color: #212121;
`};
${props => props.black && props.outline && css`
background-color: transparent;
color: #FFE194;
border: 1px solid #FFE194;
`};

${props => props.primary && !props.outline && css`
//màu nút
background-color: ${primary};
border: 1px solid ${primary};
color: #F6F6F6;
` };

${props => props.primary && props.outline && css`
background-color: transparent;
border: 1px solid ${primary};
color: ${primary};
` };

${props => props.size === 'l' && css`
font-size:15px;
padding: 10px 20px;
svg {
    height:20px;
}
`}
`;

export const StyledButton = styled.button`
${ButtonStyle}
`;

export default function Button({ children, ...rest }) {
    return (
        <StyledButton {...rest}>{children}</StyledButton>
    );
}