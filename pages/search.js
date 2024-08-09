import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import ProductsGrid from "@/components/ProductsGrid";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { debounce, set } from "lodash";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";


const SearchInput = styled(Input)`
padding: 5px; 10px;
border-radius: 5px; 
font-size: 1.4rem;
`
const InputWrapper = styled.div`
position: sticky;
top: 64px;
padding: 5px 0px;
margin: 25px 0;
`

export default function SreachPage() {
    const [phrase, setPhrase] = useState('');
    const [products, setproducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const debouncedSearch = useCallback(debounce(searchProduct, 500), []);
    useEffect(() => {
        if (phrase.length > 0) {
            setIsLoading(true);
            debouncedSearch(phrase);
        }
        else {
            setproducts([]);
        }
    }, [phrase]);

    function searchProduct(phrase) {
        axios.get('/api/products?phrase=' + encodeURIComponent(phrase)).then(response => {
            setproducts(response.data);
            setIsLoading(false);
        })
    }
    return (
        <>
            <Header></Header>
            <Center>
                <InputWrapper>
                    <SearchInput
                        autoFocus
                        value={phrase}
                        onChange={ev => setPhrase(ev.target.value)}
                        placeholder="Tìm kiếm...">
                    </SearchInput>
                </InputWrapper>
                Số lượng tìm thấy: {products.length}
                {!isLoading && phrase !== '' && products.length === 0 && (
                    <h2>Không tìm thấy sản phẩm {phrase}</h2>
                )}
                {isLoading && (
                    <Spinner fullWidth={true}></Spinner>
                )}
                {!isLoading && products.length > 0 && (
                    <ProductsGrid products={products}>
                    </ProductsGrid>
                )}

            </Center>
        </>
    )
}