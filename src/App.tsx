import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header/index';
import Sobre from './pages/Sobre';
import Filmes from './pages/Filmes';
import Series from './pages/Series';
import Tecnologias from './pages/Tecnologias';

function App() {
  return (
    <Router>
      <Header />
      <div className='app-content'>
        <Routes>
          <Route path='/' element={<Sobre />} />
          <Route path='/futebol' element={<h1>Futebol</h1>} />
          <Route path='/filmes' element={<Filmes />} />
          <Route path='/series' element={<Series />} />
          <Route path='/tecnologias' element={<Tecnologias />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
