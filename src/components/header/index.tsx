import { Link } from 'react-router-dom';
import './index.css';

const Header = () => {
  return (
    <header className='header-container'>
      <nav>
        <ul className='options'>
          <li><Link to='/' className='button-link'>Sobre mim</Link></li>
          <li><Link to='/filmes' className='button-link'>Filmes</Link></li>
          <li><Link to='/tecnologias' className='button-link'>Tecnologias</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
