import React, { useEffect, useState } from 'react';
import './index.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { categorias, filmesFavoritos, Filme } from '../../assets/filmes/index';
import ModalFilme from '../../components/modal';

interface FilmeDetalhado extends Filme {
    descricao: string;
}

const Filmes: React.FC = () => {
    const [favoritos, setFavoritos] = useState<FilmeDetalhado[]>([]);
    const [categoriasComFilmes, setCategoriasComFilmes] = useState<Record<string, FilmeDetalhado[]>>({});
    const [filmeSelecionado, setFilmeSelecionado] = useState<FilmeDetalhado | null>(null);
    const [modalAberto, setModalAberto] = useState<boolean>(false);
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    const calcularSimilaridade = (titulo1: string, titulo2: string): number => {
        const palavras1 = titulo1.toLowerCase().split(' ');
        const palavras2 = titulo2.toLowerCase().split(' ');
        const palavrasComuns = palavras1.filter((palavra) => palavras2.includes(palavra));
        return palavrasComuns.length / Math.max(palavras1.length, palavras2.length);
    };

    useEffect(() => {
        const fetchFavoritos = async () => {
            const fetchedFavoritos = await Promise.all(
                filmesFavoritos.map(async (filme) => {
                    const response = await fetch(
                        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(filme)}&language=pt-BR`
                    );
                    const data = await response.json();
                    console.log(data)

                    if (data.results.length > 0) {
                        return {
                            nome: data.results[0].title,
                            imagem: `https://image.tmdb.org/t/p/w500${data.results[0].poster_path}`,
                            descricao: data.results[0].overview,
                        };
                    }
                    return null;
                })
            );
            setFavoritos(fetchedFavoritos.filter(Boolean) as FilmeDetalhado[]);
        };


        const fetchFilmesPorCategoria = async () => {
            const categoriasComFilmes: Record<string, FilmeDetalhado[]> = {};
            for (const categoria of categorias) {
                const filmesDaCategoria = await Promise.all(
                    categoria.filmes.map(async (filme) => {
                        const response = await fetch(
                            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(filme)}&language=pt-BR`
                        );
                        const data = await response.json();
        
                        // Primeiro tenta uma correspondência exata
                        let filmeCorreto = data.results.find((result: any) => result.title.toLowerCase() === filme.toLowerCase());
        
                        // Se não encontrar, tenta buscar uma correspondência aproximada com base em similaridade
                        if (!filmeCorreto && data.results.length > 0) {
                            filmeCorreto = data.results.reduce((maisSimilar: any, result: any) => {
                                return calcularSimilaridade(result.title, filme) > calcularSimilaridade(maisSimilar.title, filme)
                                    ? result
                                    : maisSimilar;
                            }, data.results[0]);
                        }
        
                        if (filmeCorreto) {
                            return {
                                nome: filmeCorreto.title,
                                imagem: `https://image.tmdb.org/t/p/w500${filmeCorreto.poster_path}`,
                                descricao: filmeCorreto.overview,
                            };
                        }
                        return null;
                    })
                );
                categoriasComFilmes[categoria.nome] = filmesDaCategoria.filter(Boolean) as FilmeDetalhado[];
            }
            setCategoriasComFilmes(categoriasComFilmes);
        };


        fetchFavoritos();
        fetchFilmesPorCategoria();
    }, [API_KEY]);

    const [categoriasAbertas, setCategoriasAbertas] = useState<Record<string, boolean>>({});
    const [top3Aberto, setTop3Aberto] = useState<boolean>(true);

    const toggleCategoria = (nome: string) => {
        setCategoriasAbertas((prev) => ({
            ...prev,
            [nome]: !prev[nome],
        }));
    };

    const toggleTop3 = () => {
        setTop3Aberto((prev) => !prev);
    };

    const abrirModal = (filme: FilmeDetalhado) => {
        setFilmeSelecionado(filme);
        setModalAberto(true);
    };

    const fecharModal = () => {
        setModalAberto(false);
        setFilmeSelecionado(null);
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
                            <div className="favorito" key={index} onClick={() => abrirModal(filme)} style={{ cursor: 'pointer' }}>
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
                        {categoria.nome} {categoriasAbertas[categoria.nome] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </h2>
                    {categoriasAbertas[categoria.nome] && (
                        <div className="categoria-filmes">
                            {categoriasComFilmes[categoria.nome]?.map((filme, i) => (
                                <div key={i} className="filme-card" onClick={() => abrirModal(filme)} style={{ cursor: 'pointer' }}>
                                    <img src={filme.imagem} alt={filme.nome} className="filme-imagem" />
                                    <p>{filme.nome}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}

            <ModalFilme open={modalAberto} onClose={fecharModal} filmeSelecionado={filmeSelecionado} />
        </div>
    );
};

export default Filmes;
