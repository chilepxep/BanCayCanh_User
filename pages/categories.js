import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductBox from "@/components/ProductBox";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import Link from "next/link";
import styled from "styled-components";
import { RevealWrapper } from "next-reveal";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { WishedProduct } from "@/models/WishedProduct";
import { mongooseConnect } from "@/lib/mongoose";

const CategorGrid = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
gap: 20px;
@media screen and (min-width: 768px)
{
    grid-template-columns: 1fr 1fr 1fr 1fr;
}
`

const CategoryTitle = styled.div`
display: flex;
margin-top: 10px;
margin-bottom: 10px;
align-items: center;
gap: 15px;
h2 {
    margin-bottom: 10px;
    margin-top: 10px;
}
a{
    color: #555;
    display: inline-block;
}
`
const CategoryWapper = styled.div`
margin-bottom: 40px;
`

const ShowAllSquare = styled(Link)`
background-color: #ddd;
height:180px;
border-radius: 10px;
align-items: center;
display: flex;
justify-content: center;
color:#555;
text-decoration: none;
`


export default function CategoriesPage({ maincategories, categoriesProducts, wishedProducts = [] }) {
    return (
        <>
            <Header></Header>
            <Center>
                {maincategories.map(cat => (
                    <CategoryWapper key={cat.id}>
                        <CategoryTitle>
                            <h2>{cat.name}</h2>
                            <div>
                                <Link href={'/category/' + cat._id}>Hiển thị</Link>
                            </div>
                        </CategoryTitle>

                        <CategorGrid >
                            {categoriesProducts[cat._id].map((p, index) => (
                                <RevealWrapper delay={index * 70} key={cat.id}>
                                    <ProductBox  {...p} wished={wishedProducts.includes(p._id)}></ProductBox>
                                </RevealWrapper>

                            ))}
                            <RevealWrapper delay={categoriesProducts[cat._id].length * 70}>
                                <ShowAllSquare href={'/category/' + cat._id}> Hiển thị &rarr;</ShowAllSquare>
                            </RevealWrapper>

                        </CategorGrid>
                    </CategoryWapper>
                ))}
            </Center>

        </>
    )
}


export async function getServerSideProps(ctx) {
    await mongooseConnect();
    const categories = await Category.find();
    const maincategories = categories.filter(c => !c.parent)
    const categoriesProducts = {}; //dựa vào id => một mảng các product thuộc id đó
    const allFetchedProductId = [];
    for (const mainCat of maincategories) {
        const mainCatId = mainCat._id.toString();
        const childCatId = categories
            .filter(c => c?.parent?.toString() === mainCatId)
            .map(c => c._id.toString());
        const categoriesIds = [mainCatId, ...childCatId];

        const products = await Product.find({ category: categoriesIds }, null, { limit: 3, sort: { '_id': -1 } })
        allFetchedProductId.push(...products.map(p => p._id.toString()));
        categoriesProducts[mainCat._id] = products;

    }
    const session = await getServerSession(ctx.req, ctx.res, authOptions)
    const wishedProducts = session?.user ? await WishedProduct.find({
        userEmail: session?.user.email,
        product: allFetchedProductId,
    }) : [];
    return {
        props: {
            maincategories: JSON.parse(
                JSON.stringify(maincategories)
            ),
            categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts)),
            wishedProducts: wishedProducts.map(i => i.product.toString())
        }
    }
}