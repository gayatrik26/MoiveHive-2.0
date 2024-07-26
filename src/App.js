import { Container } from '@mui/system';
import { Route , Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import SimpleBottomNavigation from './components/SimpleBottomNavigation';
import Movies from './Pages/Movies/Movies';
import Search from './Pages/Search/Search';
import Series from './Pages/Series/Series';
import Trending from './Pages/Trending/Trending';

function App() {
  return (
    <div>
      <Header />
      <div className="app">
      <Container>
          <Routes>
            <Route exact path="/" element={<Trending/>}/>
            <Route path="/movies" element={<Movies/>} />
            <Route path="/series" element={<Series/>} />
            <Route path="/search" element={<Search/>} />
          </Routes>
      </Container>
      </div>
      <SimpleBottomNavigation />
    </div>
  );
}

export default App;