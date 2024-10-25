import React, { useEffect, useState } from 'react';
import './index.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { categorias, filmesFavoritos, Filme } from '../../assets/filmes/index';
import Modal from '@mui/material/Modal'; // Biblioteca para o modal
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

interface FilmeDetalhado extends Filme {
    descricao: string;
}

const Filmes: React.FC = () => {
    const [favoritos, setFavoritos] = useState<FilmeDetalhado[]>([]);
    const [categoriasComFilmes, setCategoriasComFilmes] = useState<Record<string, FilmeDetalhado[]>>({});
    const [filmeSelecionado, setFilmeSelecionado] = useState<FilmeDetalhado | null>(null);
    const [modalAberto, setModalAberto] = useState<boolean>(false);
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

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

            {/* Modal para exibir a descrição do filme */}
            <Modal open={modalAberto} onClose={fecharModal} className="modal-filme">
                <div className="modal-content">
                    <IconButton
                        aria-label="close"
                        onClick={fecharModal}
                        style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            color: 'white',
                            border: '1px solid white'
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    {filmeSelecionado && (
                        <>
                            <h2>{filmeSelecionado.nome}</h2>
                            <img src={filmeSelecionado.imagem} alt={filmeSelecionado.nome} className="modal-imagem" />
                            <p>{filmeSelecionado.descricao}</p>
                        </>
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default Filmes;
