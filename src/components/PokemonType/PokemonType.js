import React, {useEffect, useState} from "react";
import {Link, NavLink, Outlet} from "react-router-dom";

const PokemonType = () => {
    const [types, setTypes] = useState();

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/type`)
            .then(response => response.json())
            .then(response => {
                setTypes(response.results)
            });
    }, []);


    return (
        <div>
            <h1>Types de pokémon</h1>
            <div className="container_all_types">
                {types?.map((type, index) => {
                    return (
                        <NavLink key={index} to={`/type-pokemon/${type.name}`}>
                            <div className={`container_type`}>
                                <div className={`round_type color--${type.name}`}>
                                    <p>{type.name.charAt(0).toUpperCase() + type.name.slice(1)}</p>
                                </div>
                            </div>
                        </NavLink>
                    )
                })}
            </div>
        </div>
    )
}

export default PokemonType