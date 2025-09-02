import './PresenteCard.css';

interface Presente {
  id: number;
  nome: string;
  preco: number;
  presenteado: boolean;
  categoria: string;
  descricao: string;
  imagem: string;
}

interface PresenteCardProps {
  presente: Presente;
}

export default function PresenteCard({ presente }: PresenteCardProps) {
  const handleClick = () => {
    // Redireciona para a loja com o nome do presente na busca
    const searchTerm = encodeURIComponent(presente.nome);
    window.open(`https://loja.infinitepay.io/theguicosta?search=${searchTerm}`, '_blank');
  };

  return (
    <div className="presente-card" onClick={handleClick}>
      
      <div className={presente.presenteado ? "statusGiftTrue" : "statusGiftFalse"}>
        <div className="statusGiftContainer">
          <p>{presente.presenteado ? "Presenteado" : "Disponível"}</p>
        </div>
      </div>

      <div className="imgGift">
        <img 
          src={presente.imagem} 
          alt={presente.nome}
        />
      </div>

      <h1>{presente.nome}</h1>
      
      <div className="preco">R$ {presente.preco.toFixed(2)}</div>
      
      
    </div>
  );
} 