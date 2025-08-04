import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function Login({ onLogin, loggedIn }) {
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(false);
  const navigate = useNavigate();

  if (loggedIn) {
    return <Navigate to="/admin" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin(senha)) {
      navigate("/admin");
    } else {
      setErro(true);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login da Noiva</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
      {erro && <p style={{ color: "red" }}>Senha incorreta, tente novamente.</p>}
    </div>
  );
}
