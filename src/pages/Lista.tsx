import React, { useState } from "react";

const presentesIniciais = [
  { id: 1, nome: "Jogo de pratos", preco: 150, presenteado: false },
  { id: 2, nome: "Conjunto de talheres", preco: 120, presenteado: true },
  { id: 3, nome: "Toalha de mesa", preco: 80, presenteado: false },
];

export default function Lista() {
  const [presentes, setPresentes] = useState(presentesIniciais);

  return (
    <div style={{ padding: 20 }}>
      <h2>Lista de Presentes</h2>
      <ul>
        {presentes.map((item) => (
          <li key={item.id} style={{ marginBottom: 10 }}>
            <b>{item.nome}</b> - R$ {item.preco} -{" "}
            {item.presenteado ? "🎁 Presentedo" : "Disponível"}
          </li>
        ))}
      </ul>
      <p>Convidados podem escolher e presentear! (Botão de pagamento será implementado depois)</p>
    </div>
  );
}
