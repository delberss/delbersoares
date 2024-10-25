interface Categoria {
    nome: string;
    filmes: string[];
  }
  
  export interface Filme {
    nome: string;
    imagem: string;
  }
  
  export const categorias: Categoria[] = [
    {
      nome: 'Ação/Comédia',
      filmes: ['Free Guy - Assumindo o Controle', 'Pixels'],
    },
    {
      nome: 'Animações',
      filmes: ['Viva – A Vida é uma Festa', 'Up: Altas Aventuras','Divertidamente', 'Soul'],
    },
    {
      nome: 'Comédia',
      filmes: ['As Branquelas', 'Caindo na Estrada', 'American Pie', 'Eurotrip: Passaporte para a Confusão'],
    },
    {
      nome: 'Comédia/Ficção',
      filmes: ['Click', 'O Homem do Futuro'],
    },
    {
      nome: 'Drama',
      filmes: ['Um Sonho de Liberdade', 'Até o Último Homem', 'Gênio Indomável', 'O Menino Que Descobriu o Vento', 'À Procura da Felicidade'],
    },
    {
      nome: 'Ficção científica',
      filmes: ['Interstellar', 'Efeito Borboleta', 'Perdido em Marte', 'Inception '],
    },
    {
      nome: 'Romance/Drama',
      filmes: ['À Prova de Fogo', 'The Vow', 'Como Eu Era Antes de Você', 'Diário de uma Paixão','Simplesmente Acontece', ],
    },
    {
      nome: 'Musical/Romance',
      filmes: ['La La Land: Cantando Estações', ],
    },
    {
      nome: 'Romance/Ficção',
      filmes: ['Questão de Tempo', 'A Incrível História de Adaline', 'Te Amarei para Sempre', 'Encontro Marcado', 'Her'],
    },
  ];
  
  export const filmesFavoritos = ['Interstellar', 'Click', 'Efeito Borboleta'];
  