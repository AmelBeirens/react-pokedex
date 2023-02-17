import {Routes, Route} from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import PokemonType from "./components/PokemonType/PokemonType";
import PokemonDetail from "./components/PokemonDetail/PokemonDetail";
import PokemonTypeChild from "./components/PokemonType/PokemonTypeChild";
import Generation from "./components/Generations/Generations";
import GenerationChild from "./components/Generations/GenerationChild";
import Header from "./components/Header";

const App = () => {
  return (
    <div className='App'>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokemon/:id" element={<PokemonDetail />} />
            <Route path="/type-pokemon" element={<PokemonType />} />
            <Route path="/type-pokemon/:id" element={<PokemonTypeChild />} />
            <Route path="/generations" element={<Generation />} />
            <Route path="/generations/:id" element={<GenerationChild />} />
        </Routes>
    </div>
  );
};

export default App;
