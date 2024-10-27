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
      filmes: ['Free Guy - Assumindo o Controle', 'Pixels', 'Anjos da Lei'],
    },
    {
      nome: 'Ação/Ficção',
      filmes: ['2012'],
    },
    {
      nome: 'Ação/Suspense',
      filmes: ['Clube da Luta', 'Matador de Aluguel', 'Truque de Mestre'],
    },
    {
      nome: 'Animações',
      filmes: ['Viva – A Vida é uma Festa', 'Up: Altas Aventuras','Divertida Mente', 'Soul', 'Os Incríveis', 'Toy Story 1'],
    },
    {
      nome: 'Comédia',
      filmes: ['As Branquelas', 'Gente Grande', 'Se Beber, Não Case!','Caindo na Estrada', 'American Pie — A Primeira Vez é Inesquecível', 'Eurotrip: Passaporte para a Confusão', 'O Ditador'],
    },
    {
      nome: 'Comédia/Ação',
      filmes: ['O Pequenino', 'Golpe Baixo'],
    },
    {
      nome: 'Drama',
      filmes: ['Um Sonho de Liberdade', 'Até o Último Homem', 'Gênio Indomável', 'O Menino Que Descobriu o Vento', 'À Procura da Felicidade', 'Clube de Compras Dallas'],
    },
    {
      nome: 'Fantasia/Thriller',
      filmes: ['A Cabana '],
    },
    {
      nome: 'Ficção científica',
      filmes: ['Interestelar', 'Efeito Borboleta', 'Perdido em Marte', 'A origem'],
    },
    {
      nome: 'Ficção/Comédia/Fantasia',
      filmes: ['Click', 'O Homem do Futuro', 'O Show de Truman - O Show da Vida', 'Todo Poderoso'],
    },
    {
      nome: 'Musical/Romance',
      filmes: ['La La Land: Cantando Estações', ],
    },
    {
      nome: 'Natal/Comédia',
      filmes: ['Esqueceram de mim'],
    },
    {
      nome: 'Natal/Drama',
      filmes: ['Tudo Bem no Natal Que Vem'],
    },
    {
      nome: 'Natal/Romance',
      filmes: ['Amor com Data Marcada', 'Sintonizados no Amor' ],
    },
    {
      nome: 'Romance/Comédia',
      filmes: ['Como Perder um Homem em 10 Dias', 'Como Se Fosse a Primeira Vez', 'Na Sua Casa ou na Minha?'],
    },
    {
      nome: 'Romance/Drama',
      filmes: ['À Prova de Fogo', 'Como Eu Era Antes de Você', 'Diário de uma Paixão','Simplesmente Acontece','Para sempre',  'É Assim Que Acaba', 'Amor de Redenção', '(500) Dias com Ela'],
    },
    {
      nome: 'Romance/Ficção',
      filmes: ['Questão de Tempo', 'A Incrível História de Adaline', 'Te Amarei para Sempre', 'Encontro Marcado', 'Her 2013', 'Meia-Noite em Paris'],
    },
    {
      nome: 'Sessão da tarde',
      filmes: ['O Resgate de Ruby'],
    },
    {
      nome: 'Suspense',
      filmes: ['Os Suspeitos', 'Um Olhar do Paraíso'],
    },
  
   
  ];
  
  export const filmesFavoritos = ['Interstellar', 'Click', 'Efeito Borboleta'];
  