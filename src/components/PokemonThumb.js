import React from 'react'
import {NavLink} from "react-router-dom";

const PokemonThumb = ({id, image, name, type, _callback }) => {
    const style = type + " thumb-container";
    return (
        <NavLink to={`/pokemon/${id}`} key={`pokemon-${id}`}>
            <div className={`thumb ${style}`}>
                <div className={`container_img_pokemon container_img_pokemon-${type[0].type.name}`}>
                    <img className="img_pokemon" src={image} alt={name} />
                </div>
                <div className="number"><span className="id_pokemon">#{id}</span></div>
                <div className="detail-wrapper">
                    <h3>{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
                    <div className="container_type">
                        {type.map(item => <span className={`span-type color--${item.type.name}`}>{item.type.name}</span>)}
                    </div>
                </div>
            </div>
        </NavLink>
    )
}

export default PokemonThumb