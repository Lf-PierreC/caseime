import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const presentesIniciais = [
  { id: 1, nome: "Jogo de pratos", preco: 150, presenteado: false },
  { id: 2, nome: "Conjunto de talheres", preco: 120, presenteado: true },
  { id: 3, nome: "Toalha de mesa", preco: 80, presenteado: false },
];

export default function Admin({ onLogout }) {
  const [presentes, setPresentes] = useState(presentesIniciais);
  const navigate = useNavigate();

  const togglePresenteado = (id) => {
    setPresentes((old) =>
      old.map((item) =>
        item.id === id ? { ...item, presenteado: !item.presenteado } : item
      )
    );
  };

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Área da Noiva - Gerenciar Presentes</h2>
      <button onClick={handleLogout}>Sair</button>
      <ul>
        {presentes.map((item) => (
          <li key={item.id} style={{ marginBottom: 10 }}>
            <b>{item.nome}</b> - R$ {item.preco} - Status:{" "}
            {item.presenteado ? "🎁 Presentedo" : "Disponível"}
            <button
              onClick={() => togglePresenteado(item.id)}
              style={{ marginLeft: 10 }}
            >
              {item.presenteado ? "Desmarcar" : "Marcar como presenteado"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
