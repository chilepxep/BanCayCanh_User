import styled from "styled-components";
import Button, { ButtonStyle } from "./Button";
import { primary } from "@/lib/color";
import FlyingButtonOriginal from 'react-flying-item';
import { CartContext } from "./CartContext";
import { useContext, useEffect, useRef } from "react";

const FlyingButtonWrapper = styled.div`
  button {
    ${ButtonStyle};

    &:hover {
      background-color: #FFE194;
      color: #212121;
      border-color: #E8F6EF;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Chút shadow */
    }

    ${props => props.main ? `
      background-color:  ${primary};
      color: white;
    ` : `
      background-color: transparent;
      border: 1px solid ${primary};
      color: ${primary};
    `}

    ${props => props.white && `
      &:hover {
        background-color: #FFE194;
        border-color: #E8F6EF;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }
    `}
  }

  @keyframes fly {
    100% {
      top: 0;
      left: 60%;
      opacity: 0;
      display: none;
      max-width: 50px;
      max-height: 50px;
    }
  }

  img {
    display: none;
    max-width: 100px;
    max-height: 100px;
    opacity: 1;
    position: fixed;
    z-index: 5;
    animation: fly 1s;
    border-radius: 5px;
  }
`;

export default function FlyingButton(props) {
    const { addProduct } = useContext(CartContext);
    const imgRef = useRef();

    function sendImageToCart(ev) {
        imgRef.current.style.display = 'inline-block';
        imgRef.current.style.left = (ev.clientX - 50) + 'px';
        imgRef.current.style.top = (ev.clientY - 50) + 'px';
        setTimeout(() => {
            imgRef.current.style.display = 'none';
        }, 700);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const reveal = imgRef.current.closest('div[data-sr-id]');
            if (reveal?.style.opacity === '1') {
                reveal.style.transform = 'none';
            }
        }, 100);
        return () => clearInterval(interval);
    }, [imgRef.current]);

    return (
        <>
            <FlyingButtonWrapper
                white={props.white}
                main={props.main}
                onClick={() => addProduct(props._id)}
            >
                <img src={props.src} alt="" ref={imgRef}></img>
                <Button onClick={ev => sendImageToCart(ev)} {...props}></Button>
            </FlyingButtonWrapper>
        </>
    );
}
