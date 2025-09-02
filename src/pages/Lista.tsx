import PresenteCard from "../components/PresenteCard";
import Header from "../components/Header";
import "./Lista.css";
import { usePresentes } from "../context/PresenteContext";

export default function Lista() {
  const { presentes, loading } = usePresentes();

  if (loading) {
    return (
      <div className="lista-container">
        <div className="loading">Carregando lista de presentes...</div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <p className= 'observacao'>(Imagens Meramente Ilustrativas)</p>
      <div className="lista-container">
        <div className="presentes-grid">
          {presentes.map((presente) => (
            <PresenteCard key={presente.id} presente={presente} />
          ))}
        </div>
        <div className="lista-footer">
          <p>Obrigado por fazer parte do nosso momento especial!</p>
        </div>
      </div>
    </div>
  );
}
