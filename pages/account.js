import Button from "@/components/Button";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import WhiteBox from "@/components/WhiteBox";
import { signIn, signOut, useSession } from "next-auth/react"
import { RevealWrapper } from "next-reveal";
import styled from "styled-components";
import Input from "@/components/Input";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";
import ProductBox from "@/components/ProductBox";
import Tabs from "@/components/Tabs";
import SingleOrder from "@/components/SingleOrder";



const ColsWrapper = styled.div`
display: grid;
grid-template-columns: 1.2fr .8fr;
gap: 40px;
margin: 40px 0;
p{
    margin:;
}
`
const CityHolder = styled.div`
display: flex;
gap: 5px;
`;

const WishedProductsGrid = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
gap: 40px
`

export default function AccountPage() {
    const { data: session } = useSession();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [day, setDay] = useState('');
    const [addressLoaded, setAddressLoaded] = useState(true);
    const [WishlistLoaded, setWishlistLoaded] = useState(true);
    const [orderLoaded, setOrderLoaded] = useState(true);
    const [wishedProducts, setWishedProducts] = useState([]);
    const [activeTab, setActiveTab] = useState('Orders');
    const [orders, setOrders] = useState([])
    async function logout() {
        await signOut({
            callbackUrl: process.env.NEXT_PUBLIC_URL,
        });
    }
    async function login() {
        await signIn('google');
    }
    function saveAddress() {
        const data = { name, address, email, phone, day };
        axios.put('/api/address', data)
    }
    useEffect(() => {
        if (!session) {
            return;
        }
        setAddressLoaded(false);
        setWishlistLoaded(false);
        setOrderLoaded(false);
        axios.get('/api/address').then(response => {
            setName(response.data.name);
            setAddress(response.data.address);
            setEmail(response.data.email);
            setPhone(response.data.phone);
            setDay(response.data.day);
            setAddressLoaded(true);
        });
        axios.get('/api/wishlist').then(response => {
            setWishedProducts(response.data.map(wp => wp.product));
            setWishlistLoaded(true);
        })
        axios.get('/api/orders').then(response => {
            setOrders(response.data);
            setOrderLoaded(true);
        });
    }, [session]);
    function productRemovedFromWishlist(idToRemove) {
        setWishedProducts(products => {
            return [...products.filter(p => p._id.toString() !== idToRemove)]
        });
    }
    return (
        <>
            <Header></Header>
            <Center>
                <ColsWrapper>
                    <div>
                        <RevealWrapper delay={0}>
                            <WhiteBox>
                                <Tabs tabs={['Lịch sử mua hàng', ' | ', 'Danh sách yêu thích']} active={activeTab} onChange={setActiveTab}></Tabs>
                                {activeTab === 'Lịch sử mua hàng' && (
                                    <>
                                        {!orderLoaded && (
                                            <Spinner fullWidth={true} />
                                        )}
                                        {orderLoaded && (
                                            <div>
                                                {orders.length === 0 && (
                                                    <p>Login to see your orders</p>
                                                )}
                                                {orders.length > 0 && orders.map(o => (
                                                    <SingleOrder key={o._id} {...o} />
                                                ))}
                                            </div>
                                        )}
                                    </>
                                )}
                                {activeTab === 'Danh sách yêu thích' && (
                                    <>
                                        {!WishlistLoaded && (
                                            <Spinner fullWidth={true}></Spinner>
                                        )}
                                        {WishlistLoaded && (
                                            <>
                                                <WishedProductsGrid>
                                                    {wishedProducts.length > 0 && wishedProducts.map(wp => (
                                                        // eslint-disable-next-line react/jsx-key
                                                        <ProductBox {...wp} wished={true} onRemoveFromWishlist={productRemovedFromWishlist} />
                                                    ))}

                                                </WishedProductsGrid>
                                                {wishedProducts.length === 0 && (
                                                    <>
                                                        {session && (
                                                            <p>Danh sách rỗng</p>
                                                        )}
                                                        {!session && (
                                                            <p>Đăng nhập để thêm sản phẩm yêu thích!</p>
                                                        )}
                                                    </>
                                                )}
                                            </>

                                        )}
                                    </>
                                )}

                            </WhiteBox>
                        </RevealWrapper>
                    </div>
                    <div>
                        <RevealWrapper delay={100}>
                            <WhiteBox>
                                <h2>{session ? 'Thông tin tài khoản' : 'Đăng nhập'}</h2>
                                {!addressLoaded && (
                                    <Spinner fullWidth={true}></Spinner>
                                )}
                                {addressLoaded && session && (
                                    <>
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
                                            type="text"
                                            placeholder="Ngày/Tháng/Năm"
                                            value={day}
                                            onChange={ev => setDay(ev.target.value)}
                                            name="day"
                                        ></Input>

                                        <Button black block onClick={saveAddress}>
                                            Cập nhật
                                        </Button>
                                    </>
                                )}
                                <div style={{ paddingTop: '20px' }}>
                                    {session && (
                                        <Button primary onClick={logout}>Đăng xuất</Button>
                                    )}
                                    {!session && (
                                        <Button primary onClick={login}>Đăng nhập với Google</Button>
                                    )}
                                </div>


                            </WhiteBox>
                        </RevealWrapper>
                    </div>
                </ColsWrapper>

            </Center>
        </>
    )
}