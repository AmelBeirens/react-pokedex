import React from "react";
import {Link} from "react-router-dom"

const Navbar = () => {
    return (
        <div className="navbar">
            <Link to="/">Pokédex</Link>
            <Link to="/type-pokemon">Type pokémon</Link>
            <Link to="/generations">Générations</Link>
        </div>
    )
}

export default Navbar