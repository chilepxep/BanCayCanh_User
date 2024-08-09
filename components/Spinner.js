import { BeatLoader } from "react-spinners";
import styled from "styled-components";

const Wrapper = styled.div`
  ${props => props.fullWidth ? `
    display:block;
    display:flex;
    justify-content:center;
  ` : `
    border: 5xp solid blue;
  `}
`;

export default function Spinner({ fullWidth }) {
    return (
        <Wrapper fullWidth={fullWidth}>
            <BeatLoader speedMultiplier={2} color={'#4C4C6D'}>
            </BeatLoader>
        </Wrapper>

    );
}