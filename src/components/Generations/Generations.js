import React, {useEffect, useState} from "react";
import {NavLink, Outlet} from "react-router-dom";

const Generation = () => {

    const [generations, setGenerations] = useState();

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/generation`)
            .then(response => response.json())
            .then(response => {
                setGenerations(response.results)
            });
    }, []);

    return (
        <div>
            <h1>Types de pokémon</h1>
            <div className="container_all_generations">
                {generations?.map((generation, index) => {
                    return (
                        <NavLink key={index} to={`/generations/${index+1}`}>
                            <div className={`container_type`}>
                                <div className="">
                                    <p>{generation.name.charAt(0).toUpperCase() + generation.name.slice(1)}</p>
                                </div>
                            </div>
                        </NavLink>
                    )
                })}
                <Outlet />
            </div>
        </div>
    )
}

export default Generation