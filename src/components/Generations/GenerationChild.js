import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router";
import {PARAMETERS} from "../../constants/parameters";
import PokemonThumb from "../PokemonThumb";

const GenerationChild = () => {
    const {id} = useParams();
    const [generationName, setGenerationName] = useState();
    const [pokemonGeneration, setPokemonGeneration] = useState([]);
    const [allPokemonIsLoading, setAllPokemonIsLoading] = useState(true);
    const navigate = useNavigate();


    const getPokemonsByGeneration = async () => {
        setPokemonGeneration([]);
        fetch(`https://pokeapi.co/api/v2/generation/${id}`)
            .then(response => response.json())
            .then(response => {
                setGenerationName(response.names[2].name);
                setAllPokemonIsLoading(false);
                function createPokemonObject(results){
                    results.forEach(async pokemon => {
                        const idPokemons = String(pokemon.url).slice(0, -1).split("/").pop();
                        fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemons}`)
                            .then(res => res.json())
                            .then(res => {
                                setPokemonGeneration( currentList => [...currentList, res].sort((a, b) => a.id - b.id))
                            })
                    })
                }
                createPokemonObject(response['pokemon_species']);
            });
    }

    useEffect(() => {
        getPokemonsByGeneration()
    }, []);

    const backGenerations = () => {
        navigate(PARAMETERS.BACK_ROUTE_GENERATION);
    }

    return (
        <div>
            <p onClick={backGenerations}>Retour</p>
            <p>{generationName}</p>
            <div className="all-container">
                {!allPokemonIsLoading && pokemonGeneration?.map((pokemonStats, index) =>
                    <PokemonThumb
                        key={index}
                        id={pokemonStats.id}
                        image={pokemonStats.sprites.other['official-artwork'].front_default}
                        name={pokemonStats.name}
                        type={pokemonStats.types}
                    />
                )}
            </div>
        </div>
    )
}

export default GenerationChild