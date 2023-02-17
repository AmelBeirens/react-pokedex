import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {PARAMETERS} from "../../constants/parameters";
import {Link} from "react-router-dom";
import PokemonThumb from "../PokemonThumb";

const PokemonTypeChild = () => {
    const {id} = useParams();
    const [typeName, setTypeName] = useState()
    const [allPokemons, setAllPokemons] = useState([]);
    const [allPokemonIsLoading, setAllPokemonIsLoading] = useState(true);

    const getAllPokemons = async () => {
        fetch(`https://pokeapi.co/api/v2/type/${id}`)
            .then(response => response.json())
            .then(response => {
                setTypeName(response.names[3].name)
                setAllPokemonIsLoading(false)
                function createPokemonObject(results){
                    results.forEach(async pokemon => {
                        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.pokemon.name}`)
                            .then(res => res.json())
                            .then(res => {
                                setAllPokemons( currentList => [...currentList, res].sort((a, b) => a.id - b.id))
                            })
                    })
                }
                createPokemonObject(response.pokemon);
            });
    }

    useEffect(() => {
        getAllPokemons()
    }, []);

    return (
        <>
            <Link to={PARAMETERS.BACK_TYPE}>Retour</Link>
            <p>Pokémon de type {typeName}</p>
            <div className="all-container">
                {!allPokemonIsLoading && allPokemons?.map((pokemonStats, index) =>
                    <PokemonThumb
                        key={index}
                        id={pokemonStats.id}
                        image={pokemonStats.sprites.other['official-artwork'].front_default}
                        name={pokemonStats.name}
                        type={pokemonStats.types}
                    />
                )}
            </div>
        </>
    )
}

export default PokemonTypeChild