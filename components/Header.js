import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import BarsIcon from "./icons/Bars";
import SearchIcon from "./icons/SearchIcon";


const StyledHeader = styled.header`
background-color: #393E46;
position: sticky;
top:0;
z-index:10;
`;
const Logo = styled(Link)`
color: #FFE194; 
text-decoration: none;
position: relative;
z-index: 3;
font-weight: bold;
font-style: boild;
font-size: 1.3rem;
letter-spacing: 1.5px;
`;
const Wrapper = styled.div`
display: flex;
justify-content: space-between;
padding: 20px 0;

`;
const NavLink = styled(Link)`
display: block;
color:#F7F7F7;
text-decoration: none;
min-width: 30px;
padding: 10px 0;
font-size: 1.2rem;
svg {
    height: 20px;
}
@media screen and (min-width: 768px) {
    padding:0;
}
`;
const StyledNav = styled.nav`
${props => props.mobileNavActive ? `
display: block;
` : `
display: none;
`}
gap: 15px;
position: fixed;
top: 0px;
bottom: 0;
left: 0;
right: 0;
padding: 70px 20px 20px;
background-color:  #393E46;
@media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
}
`;

const NavButton = styled.button`
background-color: transparent;
width: 32px;
height: 32px;
border: 0;
color: white;
cursor: pointer;
position: relative;
z-index: 3;
@media screen and (min-width: 768px) {
    display: none;
}
`;


const SideIcon = styled.div`
display: flex;
align-items: center;
a {
    display: inline-block;
    min-width: 20px;
    color: white;
    svg {
        width: 20px;
        height: 20px;
    }
}
`;

export default function Header() {
    const { cartProducts } = useContext(CartContext);
    const [mobileNavActive, setMobileNavActive] = useState(false);
    return (
        <StyledHeader>
            <Center>
                <Wrapper>
                    <Logo href={'/'}>
                        CiTi Garden</Logo>
                    <StyledNav mobileNavActive={mobileNavActive}>
                        <NavLink href={'/'}>Trang chủ</NavLink>
                        <NavLink href={'/products'}>Sản phẩm</NavLink>
                        <NavLink href={'/categories'}>Danh mục</NavLink>
                        <NavLink href={'/account'}>Tài khoản</NavLink>
                        <NavLink href={'/cart'}>Giỏ hàng ({cartProducts.length})</NavLink>
                    </StyledNav>
                    <SideIcon>
                        <Link href={'/search'}><SearchIcon></SearchIcon></Link>
                        <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
                            <BarsIcon></BarsIcon>
                        </NavButton>
                    </SideIcon>
                </Wrapper>
            </Center>
        </StyledHeader>
    )
}