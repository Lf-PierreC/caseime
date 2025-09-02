import React, { useState } from "react";
import "./Carrossel.css"

function Carrossel() {
    const imagens = [
        "/imagesCarrossel/Foto1.jpeg",
        "/imagesCarrossel/Foto2.jpeg",
        "/imagesCarrossel/Foto3.jpeg",
        "/imagesCarrossel/Foto4.jpeg",
        "/imagesCarrossel/Foto5.jpeg",
        "/imagesCarrossel/Foto6.jpeg",
        "/imagesCarrossel/Foto7.jpeg",
        "/imagesCarrossel/Foto8.jpeg",
    ];

    const [indice, setIndice] = useState(0);

    const proximaImagem = () => {
        setIndice((indice + 1) % imagens.length);
    };

    const imagemAnterior = () => {
        setIndice((indice - 1 + imagens.length) % imagens.length);
    };

    return (
        <div className="carrossel-container">
            <div className="carrossel">
                <button onClick={imagemAnterior}>{"<"}</button>
                <img src={imagens[indice]} alt={`Slide ${indice + 1}`} />
                <button onClick={proximaImagem}>{">"}</button>
            </div>
        </div>
    )
}

export default Carrossel