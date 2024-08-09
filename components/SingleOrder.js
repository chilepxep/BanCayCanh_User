
import styled from "styled-components";

const StyledOrder = styled.div`
background-color: #aaa
margin: 10px 0;
padding: 10px 0;
border-bottom: 1px solid #ddd;
display: flex;
gap: 20px;
frid-template-columns: 1fr 1fr;
align-items: center;
time {
    font-size: .9rem;
    font-weight: bold;
    color: #777;
}
`

const ProductRow = styled.div`
span{
    color: #aaa;
}
`;

const Address = styled.div`
font-size: .8rem;
line-height: 1rem;
margin-top: 8px;
color: #aaa;
`

export default function SingleOrder({ line_items, createdAt, ...rest }) {
    return (
        <StyledOrder>
            <div>
                <time>{(new Date(createdAt)).toLocaleDateString('sv-SE')}</time>
            </div>
            <Address>
                {rest.name} <br></br>
                {rest.phone}<br></br>
                {rest.address}<br></br>
            </Address>
            <div>
                {line_items.map((item, index) => (
                    <ProductRow key={index}>
                        <span>{item.quantity} x </span>  {item.price_data.product_data.name}
                    </ProductRow>
                ))}
            </div>


        </StyledOrder>
    );
}