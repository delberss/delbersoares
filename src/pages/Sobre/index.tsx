import React from 'react';
import './index.css'

const Sobre = () => {
    return (
        <div className='sobre-container'>
            <img
                src='https://avatars.githubusercontent.com/u/71342302?v=4'
                alt='Delberss'
                className='sobre-imagem'
            />
            <div className='sobre-descricao'>
                <h1>Olá, sou Delber Soares</h1>

                <p>Tenho 25 anos e sou graduado em Sistemas de Informação pela Universidade Federal de Juiz de Fora. Atualmente, atuo na área de Análise de Sistemas. Estou comprometido em aprimorar minhas <i>hard skills</i>, especialmente no uso das <a className='direciona-tecnologias' href='/tecnologias'>ferramentas que utilizo</a>, assim como minhas <i>soft skills</i>, que incluem a interação eficaz com colegas de trabalho.</p>
            </div>
        </div>
    );
};

export default Sobre;