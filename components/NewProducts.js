import styled from "styled-components";
import Center from "./Center";
import ProductsGrid from "./ProductsGrid";


const Title = styled.h2`
font-size: 2rem;
margin: 30px 0 20px;
font-weight: bold;
`

export default function NewProducts({ products, wishedProducts }) {
    return (
        <Center>
            <Title>Nổi bật</Title>
            <ProductsGrid products={products} wishedProducts={wishedProducts}></ProductsGrid>
        </Center>
    );
}