import "./Admin.css";
import { usePresentes } from "../context/PresenteContext";


export default function Admin() {
  const { presentes, loading, togglePresenteado } = usePresentes();

  if (loading) {
    return <div className="admin-container">Carregando...</div>;
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Gerenciar Presentes</h2>
        <p>Clique em um presente para alterar seu status</p>
      </div>

      <div className="admin-presentes">
        <div className="presentes-list">
          {presentes.map((presente) => (
            <div
              key={presente.id}
              className={`presente-item ${presente.presenteado ? "presenteado" : ""}`}
              onClick={() => togglePresenteado(presente.id)}
            >
              <div className="presente-info">
                <h4>{presente.nome}</h4>
                <p className="preco">R$ {presente.preco.toFixed(2)}</p>
              </div>
              <div
                className={`status ${
                  presente.presenteado ? "presenteado" : "disponivel"
                }`}
              >
                {presente.presenteado ? "🎁 Presenteado" : "📦 Disponível"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
