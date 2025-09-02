import React, { useState } from "react";
import "./Carrossel.css"

function Carrossel() {
    const imagens = [
        "/images/carrossel/Foto1.jpeg",
        "/images/carrossel/Foto2.jpeg",
        "/images/carrossel/Foto3.jpeg",
        "/images/carrossel/Foto4.jpeg",
        "/images/carrossel/Foto5.jpeg",
        "/images/carrossel/Foto6.jpeg",
        "/images/carrossel/Foto7.jpeg",
        "/images/carrossel/Foto8.jpeg",
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