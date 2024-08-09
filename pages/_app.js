import { CartContextProvider } from "@/components/CartContext";
import { createGlobalStyle } from "styled-components"
import { SessionProvider } from "next-auth/react"

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=Roboto:wght@400;500;600;700;900&display=swap');
body {
  //màu nền của phần featured
  background-color:#fff;
  padding:0;
  margin:0;
  font-family: 'Poppins', sans-serif;
}
hr{
  display: block;
  border: 0;
  border-top: 1px soild #ccc
}
`;
export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <GlobalStyles></GlobalStyles>
      <SessionProvider session={session}>
        <CartContextProvider>
          <Component {...pageProps} />
        </CartContextProvider>
      </SessionProvider>


    </>
  )
}
