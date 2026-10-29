export type Despesa = {
  id: string;
  descricao: string;
  valor: number;
  categoria: string;
  paga: boolean;
};
export type NovaDespesa = Omit<Despesa, 'id' | 'paga'>;
