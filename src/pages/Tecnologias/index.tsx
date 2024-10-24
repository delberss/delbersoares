import './index.css'; 

const Tecnologias: React.FC = () => {
    const tecnologiasConhecimento = [
        {
            nome: 'HTML',
            imagem: 'https://logospng.org/download/html-5/logo-html-5-256.png',
        },
        {
            nome: 'CSS',
            imagem: 'https://logospng.org/download/css-3/logo-css-3-256.png',
        },
        {
            nome: 'JavaScript',
            imagem: 'https://logospng.org/download/javascript/logo-javascript-256.png',
        },
        {
            nome: 'Node.js',
            imagem: 'https://logospng.org/download/node-js/logo-node-js-256.png',
        },
        {
            nome: 'PostgreSQL',
            imagem: 'https://logospng.org/download/postgresql/postgresql-256.png',
        },
    ];

    const tecnologiasTrabalhadas = [
        {
            nome: 'Python',
            imagem: 'https://logospng.org/download/python/logo-python-256.png', 
        },
        {
            nome: 'Java',
            imagem: 'https://logospng.org/download/java/logo-java-256.png', 
        },
        {
            nome: 'C++',
            imagem: 'https://logospng.org/download/c-plus-plus/c-plus-plus-256.png', 
        },
    ];

    return (
        <div className="tecnologias-container">
            <h3>Tecnologias de maior conhecimento</h3>
            <div className="tecnologias-grid">
                {tecnologiasConhecimento.map((tecnologia, index) => (
                    <div className="tecnologia" key={index}>
                        <img src={tecnologia.imagem} alt={tecnologia.nome} className="tecnologia-imagem" />
                        <p>{tecnologia.nome}</p>
                    </div>
                ))}
            </div>

            <h3>Tecnologias que já trabalhei</h3>
            <div className="tecnologias-grid">
                {tecnologiasTrabalhadas.map((tecnologia, index) => (
                    <div className="tecnologia" key={index}>
                        <img src={tecnologia.imagem} alt={tecnologia.nome} className="tecnologia-imagem" />
                        <p>{tecnologia.nome}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tecnologias;
