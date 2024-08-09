import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Table from "@/components/Table";
import Input from "@/components/Input";
import { RevealWrapper } from "next-reveal";
import { useSession } from "next-auth/react";

const ColumnsWrapper = styled.div`
display: grid;
grid-template-columns: 1fr;
@media screen and (min-width: 768px) {
  grid-template-columns: 1.2fr .8fr;
}
gap: 40px;
margin-top: 40px;
margin-bottom: 40px;
table thead tr th:nth-child(3),
table tbody tr td:nth-child(3),
table tbody tr.subtotal td: nth-child(2)
 {
    text-align: right;
}
table tr.subtotal td {
    padding: 15px 0;
}
table tbody tr.subtotal td: nth-child(2) {
    font-size:1.4rem;

}
tr.total td {
    font-weight: bold;
}
`;

const Box = styled.div`
background-color: #F6F6F6;
border-radius: 10px;
padding: 30px;
`;

const ProductInfoCell = styled.td`
Padding: 16px 0;
`;

const ProductImageBox = styled.div`
width: 70px;
height: 100px;
padding: 2px;
border: 1px solid rgba(0, 0, 0, 0.1);
display: flex;
align-items: center;
justify-content: center;
border-radius: 10px;
img {
    max-width: 60px;
    max-height: 60px;

}
@media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img {
        max-width: 90px;
        max-height: 90px;
        
    
    }
}
`;

const ProductTitleWrapper = styled.div`
  padding-top: 13px;
  font-size: 1.1rem;

`;

const QuantityLabel = styled.span`
padding:0 15px;
display: block;
@media screen and (min-width: 768px) {
    display: inline-block;   
    padding:0 8px;
}
`;

const CityHolder = styled.div`
display: flex;
gap: 5px;
`;

export default function CartPage() {
    const { cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext);
    const { data: session } = useSession();
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [note, setNote] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [shippingFee, setShippingFee] = useState(null);
    useEffect(() => {
        if (cartProducts.length > 0) {
            axios.post('/api/cart', { ids: cartProducts })
                .then(response => {
                    setProducts(response.data);
                })
        }
        else {
            setProducts([]);
        }
    }, [cartProducts]);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        if (window?.location.href.includes('success')) {
            setIsSuccess(true);
            clearCart();
        }
        axios.get('/api/setting?name=shippingFree').then(res => {
            setShippingFee(res.data.value);
        })
    }, []);
    useEffect(() => {
        if (!session) {
            return;
        }
        axios.get('/api/address').then(response => {
            setName(response.data.name);
            setAddress(response.data.address);
            setEmail(response.data.email);
            setPhone(response.data.phone);
        })
    }, [session])
    function moreOfThisProduct(id) {
        addProduct(id);
    }
    function lessOfThisProduct(id) {
        removeProduct(id);
    }
    let productsTotal = 0;
    for (const productId of cartProducts) {
        const price = products.find(p => p._id === productId)?.price || 0;
        productsTotal += price;
    }

    function formatMoney(value) {
        return value.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
            currencyDisplay: 'code',
        });
    }

    async function goToPayment() {
        const response = await axios.post('/api/checkout', {
            name, address, phone, email, note,
            cartProducts,
        });
        if (response.data.url) {
            window.location = response.data.url;
        }
    }
    if (isSuccess) {
        return (
            <>
                <Header></Header>
                <center>
                    <ColumnsWrapper>
                        <Box>
                            <h1>Thanh toán thành công!</h1>
                            <p>Cảm ơn bạn đã tin tưởng và ủng hộ chúng tôi!</p>
                            <p>Chúng tôi sẽ phản hồi thông tin đơn hàng thông qua email của bạn!</p>
                        </Box>
                    </ColumnsWrapper>
                </center>
            </>
        )
    }

    return (
        <>
            <Header></Header>

            <Center>
                <ColumnsWrapper>
                    <RevealWrapper delay={0}>
                        <Box>
                            <h2>Giỏ hàng</h2>
                            {!cartProducts?.length && (
                                <div>Giỏ hàng của bạn rỗng</div>
                            )}
                            {products?.length > 0 && (
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Sản phẩm</th>
                                            <th>Số lượng</th>
                                            <th>Giá</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map(product => (
                                            <tr key={product._id}>
                                                <ProductInfoCell>
                                                    <ProductImageBox>
                                                        <img src={product.images[0]} alt=""></img>
                                                    </ProductImageBox>
                                                    <ProductTitleWrapper>
                                                        {product.title}
                                                    </ProductTitleWrapper>
                                                </ProductInfoCell>
                                                <td>
                                                    <Button onClick={() => lessOfThisProduct(product._id)}>-</Button>
                                                    <QuantityLabel>
                                                        {cartProducts.filter(id => id == product._id).length}
                                                    </QuantityLabel>

                                                    <Button onClick={() => moreOfThisProduct(product._id)}>+</Button>
                                                </td>
                                                <td>
                                                    {formatMoney(cartProducts.filter(id => id === product._id).length * product.price)}
                                                </td>

                                            </tr>
                                        ))}
                                        <tr className="subtotal">

                                            <td colSpan={2} style={{ fontWeight: 'bold', padding: '10px', color: '#1B9C85', fontSize: '19px' }}>Tổng thanh toán:</td>
                                            <td style={{ padding: '10px', }}>{formatMoney(productsTotal)}</td>
                                        </tr>
                                        <tr className="subtotal">

                                            <td colSpan={2} style={{ fontWeight: 'bold', padding: '10px', color: '#1B9C85', fontSize: '19px' }}>Phí vận chuyển:</td>
                                            <td style={{ padding: '10px', }}>{formatMoney(parseInt(shippingFee))}</td>
                                        </tr>
                                        <tr className="subtotal total">
                                            <td colSpan={2}>
                                                Tổng tiền
                                            </td>
                                            <td>
                                                {formatMoney(productsTotal + parseInt(shippingFee || 0))}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            )}
                        </Box>
                    </RevealWrapper>

                    {!!cartProducts?.length && (
                        <RevealWrapper delay={150}>
                            <Box>
                                <h2>Thông tin đơn hàng</h2>

                                <Input
                                    type="text"
                                    placeholder="Họ và tên"
                                    value={name}
                                    onChange={ev => setName(ev.target.value)}
                                    name="name"
                                ></Input>

                                <Input
                                    type="text"
                                    placeholder="Địa chỉ"
                                    value={address}
                                    onChange={ev => setAddress(ev.target.value)}
                                    name="address"
                                ></Input>
                                <CityHolder>
                                    <Input
                                        type="text"
                                        placeholder="Emaill"
                                        value={email}
                                        onChange={ev => setEmail(ev.target.value)}
                                        name="email"
                                    ></Input>
                                    <Input
                                        type="text"
                                        placeholder="Số điện thoại"
                                        value={phone}
                                        onChange={ev => setPhone(ev.target.value)}
                                        name="phone"
                                    ></Input>
                                </CityHolder>
                                <Input
                                    autocomplete="off"
                                    type="text"
                                    placeholder="Ghi chú"
                                    value={note}
                                    onChange={ev => setNote(ev.target.value)}
                                    name="note"
                                ></Input>

                                <Button black block
                                    onClick={goToPayment}>
                                    Thanh toán
                                </Button>

                            </Box>
                        </RevealWrapper>
                    )}

                </ColumnsWrapper>
            </Center>
        </>
    )
}

