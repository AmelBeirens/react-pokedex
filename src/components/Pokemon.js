import React, { useState, useEffect } from 'react';
import PokemonThumb from "./PokemonThumb";

const Pokemon = () => {
    const [allPokemons, setAllPokemons] = useState([]);
    const limit = 20;
    const [offset, setOffset] = useState(0);
    const [allPokemonIsLoading, setAllPokemonIsLoading] = useState(true)

    const getAllPokemons = async () => {
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
            .then(response => response.json())
            .then(response => {
                setAllPokemonIsLoading(false)
                function createPokemonObject(results){
                    results.forEach(async pokemon => {
                        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
                            .then(res => res.json())
                            .then(res => {
                                setAllPokemons( currentList => [...currentList, res].sort((a, b) => a.id - b.id))
                            })
                    })
                }
                createPokemonObject(response.results);
            });
        setOffset(offset + limit);
    }

    useEffect(() => {
      getAllPokemons()
    }, []);

    return (
        <div className="app-contaner">
          <div className="pokemon-container">
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
            <button className="load-more" onClick={() => getAllPokemons()}>Voir plus de pokémon</button>
          </div>
        </div>
    )

};

export default Pokemon;
