import React, { useEffect, useState } from 'react';
import './index.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface Categoria {
    nome: string;
    filmes: string[];
}

interface Filme {
    nome: string;
    imagem: string;
}

const Filmes: React.FC = () => {
    const categorias: Categoria[] = [
        {
            nome: 'Ação',
            filmes: ['Vingadores: Ultimato'],
        },
        {
            nome: 'Ação/Comédia',
            filmes: ['Free Guy - Assumindo o Controle'],
        },
        {
            nome: 'Comédia',
            filmes: ['As Branquelas', 'Superbad'],
        },
        {
            nome: 'Drama',
            filmes: ['Um Sonho de Liberdade', 'Até o Último Homem'],
        },
        {
            nome: 'Ficção científica',
            filmes: ['Interstellar', 'Perdido em Marte'],
        },
        {
            nome: 'Romance/Drama',
            filmes: ['Gênio Indomável'],
        },
        {
            nome: 'Romance/Ficção',
            filmes: ['Questão de Tempo', 'A Incrível História de Adaline'],
        },
    ];

    const [favoritos, setFavoritos] = useState<Filme[]>([]);
    const [categoriasComFilmes, setCategoriasComFilmes] = useState<Record<string, Filme[]>>({});
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    useEffect(() => {
        const fetchFavoritos = async () => {
            const filmesFavoritos = ['Interstellar', 'Vingadores: Ultimato', 'As Branquelas'];
            const fetchedFavoritos = await Promise.all(
                filmesFavoritos.map(async (filme) => {
                    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(filme)}&language=pt-BR`);
                    const data = await response.json();
                    if (data.results.length > 0) {
                        return {
                            nome: data.results[0].title,
                            imagem: `https://image.tmdb.org/t/p/w500${data.results[0].poster_path}`,
                        };
                    }
                    return null;
                })
            );
            setFavoritos(fetchedFavoritos.filter(Boolean) as Filme[]);
        };

        const fetchFilmesPorCategoria = async () => {
            const categoriasComFilmes: Record<string, Filme[]> = {};
            for (const categoria of categorias) {
                const filmesDaCategoria = await Promise.all(
                    categoria.filmes.map(async (filme) => {
                        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(filme)}&language=pt-BR`);
                        const data = await response.json();
                        if (data.results.length > 0) {
                            return {
                                nome: data.results[0].title,
                                imagem: `https://image.tmdb.org/t/p/w500${data.results[0].poster_path}`,
                            };
                        }
                        return null;
                    })
                );
                categoriasComFilmes[categoria.nome] = filmesDaCategoria.filter(Boolean) as Filme[];
            }
            setCategoriasComFilmes(categoriasComFilmes);
        };

        fetchFavoritos();
        fetchFilmesPorCategoria();
    }, [API_KEY]);

    const [categoriasAbertas, setCategoriasAbertas] = useState<Record<string, boolean>>({});
    const [top3Aberto, setTop3Aberto] = useState<boolean>(true); // Controla se "Meu Top 3" está aberto

    const toggleCategoria = (nome: string) => {
        setCategoriasAbertas((prev) => ({
            ...prev,
            [nome]: !prev[nome],
        }));
    };

    const toggleTop3 = () => {
        setTop3Aberto((prev) => !prev);
    };

    return (
        <div className="filmes-container">
            <div className="favoritos">
                <h2 onClick={toggleTop3} style={{ cursor: 'pointer' }}>
                    Meu Top 3 {top3Aberto ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </h2>
                {top3Aberto && (
                    <div className="favoritos-grid">
                        {favoritos.map((filme, index) => (
                            <div className="favorito" key={index}>
                                <img src={filme.imagem} alt={filme.nome} className="favorito-imagem" />
                                <p>{filme.nome}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {categorias.map((categoria, index) => (
                <div key={index}>
                    <h2 onClick={() => toggleCategoria(categoria.nome)} style={{ cursor: 'pointer' }}>
                        {categoria.nome}{' '}
                        {categoriasAbertas[categoria.nome] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </h2>
                    {categoriasAbertas[categoria.nome] && (
                        <div className="categoria-filmes">
                            {categoriasComFilmes[categoria.nome]?.map((filme, i) => (
                                <div key={i} className="filme-card">
                                    <img
                                        src={filme.imagem}
                                        alt={filme.nome}
                                        className="filme-imagem"
                                    />
                                    <p>{filme.nome}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Filmes;
