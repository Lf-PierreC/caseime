import React, { createContext, useContext, useEffect, useState } from "react";
import { API_ENDPOINTS } from "../config/api";

export interface Presente {
  id: number;
  nome: string;
  preco: number;
  presenteado: boolean;
  categoria: string;
  descricao: string;
  imagem: string;
}

interface PresenteContextType {
  presentes: Presente[];
  loading: boolean;
  togglePresenteado: (id: number) => Promise<void>;
}

const PresenteContext = createContext<PresenteContextType | undefined>(undefined);

export const usePresentes = () => {
  const context = useContext(PresenteContext);
  if (!context) throw new Error("usePresentes deve ser usado dentro de PresenteProvider");
  return context;
};

export const PresenteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [presentes, setPresentes] = useState<Presente[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregar = async () => {
      try {
        // Tenta primeiro a API do backend
        const res = await fetch(API_ENDPOINTS.PRESENTES);
        if (res.ok) {
          const data = await res.json();
          setPresentes(data);
        } else {
          // Fallback para o arquivo local se a API não estiver disponível
          const localRes = await fetch("/data/presentes.json");
          const localData = await localRes.json();
          setPresentes(localData);
        }
      } catch (e) {
        console.error("Erro ao carregar presentes", e);
        // Fallback para o arquivo local em caso de erro
        try {
          const localRes = await fetch("/data/presentes.json");
          const localData = await localRes.json();
          setPresentes(localData);
        } catch (localError) {
          console.error("Erro ao carregar presentes localmente", localError);
        }
      } finally {
        setLoading(false);
      }
    };
    carregar();
  }, []);

  const togglePresenteado = async (id: number) => {
    // Encontra o presente atual para saber o status
    const presente = presentes.find(p => p.id === id);
    if (!presente) return;

    const novoStatus = !presente.presenteado;

    try {
      // Tenta atualizar via API
      const res = await fetch(API_ENDPOINTS.UPDATE_PRESENTE(id), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ presenteado: novoStatus })
      });

      if (res.ok) {
        // Se a API funcionou, atualiza o estado
        setPresentes((prev) =>
          prev.map((p) => (p.id === id ? { ...p, presenteado: novoStatus } : p))
        );
      } else {
        console.error('Erro ao atualizar presente na API');
        // Mesmo assim atualiza localmente como fallback
        setPresentes((prev) =>
          prev.map((p) => (p.id === id ? { ...p, presenteado: novoStatus } : p))
        );
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      // Atualiza localmente como fallback
      setPresentes((prev) =>
        prev.map((p) => (p.id === id ? { ...p, presenteado: novoStatus } : p))
      );
    }
  };

  return (
    <PresenteContext.Provider value={{ presentes, loading, togglePresenteado }}>
      {children}
    </PresenteContext.Provider>
  );
};
