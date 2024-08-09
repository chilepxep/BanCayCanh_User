const { default: styled } = require("styled-components");

const StyledTable = styled.table`
width:100%;
th {
    text-align: left;
    text - transform: uppercase;
    color: #1B9C85;
    font-weight: boil;
    font-size: 19px;
}
td {
    border-top: 1px solid rgba(0, 0, 0, .1);
}
`;

export default function Table(props) {
    return <StyledTable {...props}></StyledTable>
}