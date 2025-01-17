import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import FlyingButton from "@/components/FlyingButton";
import Header from "@/components/Header";
import ProductImages from "@/components/ProductImages";
import ProductReviews from "@/components/ProductReviews";
import Title from "@/components/Title";
import WhiteBox from "@/components/WhiteBox";
import CartIcon from "@/components/icons/CartIcon";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useContext } from "react";
import styled from "styled-components";

const ColWrapper = styled.div`
display: grid;
grid-template-columns: 1fr;
@media screen and (min-width: 768px) {
    grid-template-columns: .8fr 1.2fr;
}
gap: 40px;
margin: 40px 0px;
`
const PriceRow = styled.div`
display: flex;
gap: 20px;
align-items: center;
`

const Price = styled.span`
font-size: 1.6rem;`

export default function ProductPage({ product }) {

    return (
        <>
            <Header></Header>

            <Center>

                <ColWrapper>
                    <WhiteBox>
                        <ProductImages images={product.images} />
                    </WhiteBox>
                    <div>
                        <Title>{product.title}</Title>
                        <p style={{ lineHeight: '1.5rem' }}>{product.description}</p>
                        <PriceRow>
                            <div>
                                <Price>
                                    {product.price.toLocaleString('vi', {
                                        style: 'currency',
                                        currency: 'VND',
                                        currencyDisplay: 'code', // Sử dụng mã tiền tệ thay vì ký hiệu
                                    })}
                                </Price>
                            </div>
                            <div>
                                <FlyingButton main _id={product._id} src={product.images?.[0]}>
                                    <CartIcon></CartIcon>Thêm vào giỏ hàng
                                </FlyingButton>
                            </div>
                        </PriceRow>
                    </div>
                </ColWrapper>
                <ProductReviews product={product}>

                </ProductReviews>
            </Center>
        </>
    )
}

export async function getServerSideProps(context) {
    await mongooseConnect();
    const { id } = context.query;
    const product = await Product.findById(id);
    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
        }
    }
}