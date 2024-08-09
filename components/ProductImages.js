import { useState } from "react";
import styled from "styled-components"

const Image = styled.img`
max-width:100%;
max-height: 100%;
`;

const BigImage = styled.img`
max-width:100%;
max-height: 200px;
`;

const ImageButtons = styled.div`
    display: flex;
    gap: 10px;
    flex-grow: 0;
    margin-top: 30px;
  `;

const ImageButton = styled.div`
${props => props.active ? `
border-color: #ccc;
border: 1px solid #4C4C6D; 
border-radius: 5px; 
` : `
border-color:transparent;
`
    }
border: 2px soid #FFF;
heigth: 64px;
padding: 2px;
cursor: pointer;
border-radius: 5px;
`

const BigImageWapper = styled.div`
text-align: center;
`;


export default function ProductImages({ images }) {

    const [activeImage, setActiveImage] = useState(images?.[0])
    return (
        <>
            <BigImageWapper>
                <BigImage src={activeImage}></BigImage>
            </BigImageWapper>

            <ImageButtons>
                {images.map(image => (
                    <ImageButton
                        key={image}
                        active={image === activeImage}
                        onClick={() => setActiveImage(image)}>
                        <Image src={image} alt=""></Image>
                    </ImageButton>
                ))}
            </ImageButtons>
        </>
    );
}