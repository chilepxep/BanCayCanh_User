import styled from "styled-components";
import Button, { ButtonStyle } from "./Button";
import CartIcon from "./icons/CartIcon";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { primary } from "@/lib/color";
import FlyingButton from "./FlyingButton";
import HeartOutlineIcon from "./icons/HeartOutlineIcon";
import HeartSloidIcon from "./icons/HeartSoildIcon";
import axios from "axios";

const ProductWrapper = styled.div`
button {
    width: 100%;
    text-align: center;
    justify-content: center;
}
`;

const WhiteBox = styled(Link)`
background-color:#F6F6F6;
padding:20px;
height: 120px;
text-align: center;
display: flex;
align-items: center;
justify-content: center;
border-radius: 10px;
position: relative;
img {

    max-width:100%;
    max-height: 100px;
}
`;

const Title = styled(Link)`
font-weight: normal;
font-size: 1.3rem;
margin: 0;
color: inherit;
text-decoration: none;
`;


const ProductInfoBox = styled.div`
margin-top: 5px;
`;

const PriceRow = styled.div`
  display: flex;
  
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  }
  align-items: center;
  justify-content:space-between;
  margin-top:2px;
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight:400;
  text-align: center;
  padding-right: 3px;
  @media screen and (min-width: 768px) {
    font-size: 1.1rem;
    font-weight:600;
    text-align: left;
  }
`;

const WishListButton = styled.button`
border: 0;
width: 40px !important;
height: 40px;
padding: 10px;
position: absolute;
top:0;
right:0;
background: transparent;
cursor: pointer;
${props => props.wished ? `
color: red;
` : `
color:black;
`}
svg{
    width: 24px;
}
`



export default function ProductBox({ _id, title, description, quantity, images, price, wished = false,
    onRemoveFromWishlist = () => { },
}) {

    const url = '/product/' + _id;
    const [isWished, setIsWished] = useState(wished);
    function addToWishlist(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        const nextValue = !isWished;
        if (nextValue === false && onRemoveFromWishlist) {
            onRemoveFromWishlist(_id);
        }
        axios.post('/api/wishlist', {
            product: _id,
        }).then(() => { })
        setIsWished(nextValue);

    }
    function formatMoney(value) {
        return value.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
            currencyDisplay: 'code',
        });
    }
    return (
        <ProductWrapper>
            <WhiteBox href={url}>
                <div>
                    <WishListButton wished={isWished} onClick={addToWishlist}>
                        {isWished ? <HeartSloidIcon></HeartSloidIcon> : <HeartOutlineIcon></HeartOutlineIcon>}
                    </WishListButton>
                    <img src={images?.[0]} alt=""></img>
                </div>

            </WhiteBox>
            <ProductInfoBox>
                <Title href={url}>
                    {title}
                </Title>
                <PriceRow>
                    <Price>
                        {price.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                            currencyDisplay: 'code',
                        })}
                    </Price>
                    <Price
                    >
                    </Price>
                    <FlyingButton _id={_id} src={images?.[0]}>
                        Thêm vào giỏ hàng
                    </FlyingButton>
                </PriceRow>
            </ProductInfoBox>
        </ProductWrapper>
    )
}