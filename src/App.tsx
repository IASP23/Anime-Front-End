import { Routes, Route, Link } from "react-router-dom";
//import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./components/Home";
import {AnimeList}  from "./components/Anime/AnimeList";
import AnimeForm from "./components/Anime/AnimeForm";
import {AnimeCard} from "../src/components/Anime/AnimeCard";

const title = "Anime World!";
const description = "Descripcion de los mejores animes";

const App: React.FC = () => {
  return (
    <div  className="container p-4">
      <nav className="navbar navbar-expand navbar-dark bg-dark">        
        <Link to={"/"}  className="navbar-brand">
          AnimeWorld!
        </Link>
        <div className="navbar-nav">
          <li className="nav-item ml-auto">
            <Link to={"/animes"} className="nav-link">
              Animes
            </Link>
          </li>          
        </div>

        <div className="navbar-nav">
          <li className="nav-item ml-auto">
            <Link to={"/animes/create"} className="nav-link">
              Agregar
            </Link>
          </li>          
        </div>

      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home title={title} description={description} />} /> 
          <Route path="/animes" element={<AnimeList />} />          
          <Route path="/animes/create" element={<AnimeForm />} />    
          <Route path="/animes/retrieve/:id" element={<AnimeCard />} />    
          <Route path="/animes/update/:id" element={<AnimeForm />} />          
        </Routes>
      </div>
    </div>
  );
}
export default App;
