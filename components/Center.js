import styled from "styled-components";

//max-width: 800px;
const StyledDiv = styled.div`
max-width: 1200px;
margin: 0 auto;
padding: 0 20px;
`;

export default function Center({ children }) {
    return (
        <StyledDiv>{children}</StyledDiv>
    );

}