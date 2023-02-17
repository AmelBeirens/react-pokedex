import React, {useState} from 'react';
import Navbar from "./Navbar/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
    const [searchValue, setSearchValue] = useState();
    const [pokemonSearch, setPokemonSearch] = useState()
    const [open, setOpen] = useState(false);
    const statsPokemonSearch = pokemonSearch?.stats;
    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const value = searchValue.toLowerCase();

        fetch(`https://pokeapi.co/api/v2/pokemon/${value}`)
            .then(response => response.json())
            .then(response => {
                setPokemonSearch(response)
            });

        setSearchValue("");
        setOpen(true);
    };

    return (
        <>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');
            </style>
            {open &&
                <>
                 <div className="modalOverlay" onClick={() => handleClose()} />
                 <div onClose={handleClose} className="search-modal">
                     <div className="contentModal">
                         <div className="leftSide">
                             <figure>
                                 <img src={pokemonSearch?.sprites.other.home['front_default']} alt=""/>
                             </figure>
                             <p className="idPokemon">#{pokemonSearch?.id}</p>
                             <p className="namePokemon">{pokemonSearch?.name}</p>
                             <div className="container_type">
                                 {pokemonSearch?.types.map(item => <span className={`span-type color--${item.type.name}`}>{item.type.name}</span>)}
                             </div>
                             <ul>
                                 <li>
                                     <p>Taille</p>
                                     <span>{`${pokemonSearch?.height / 10}`} m</span>
                                 </li>
                                 <li>
                                     <p>Poids</p>
                                     <span>{`${pokemonSearch?.weight / 10}`} kg</span>
                                 </li>
                             </ul>
                         </div>
                         <div className="middleSide">
                             <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path d="M28.1478 4.51135C40.5193 4.51135 50.6682 14.0049 51.6974 26.1045H36.983C36.1071 21.9436 32.4176 18.8119 27.9945 18.8119C23.5715 18.8119 19.8819 21.9436 19.0061 26.1045H4.59824C5.63832 14.0049 15.7873 4.51135 28.1478 4.51135ZM33.0635 26.1045C33.2825 26.6958 33.4029 27.3309 33.4029 27.9989H33.4139C33.4139 28.6668 33.2934 29.3019 33.0745 29.8932C32.3081 31.9518 30.3265 33.4081 28.0055 33.4081C25.6845 33.4081 23.7028 31.9408 22.9365 29.8932C22.7175 29.3019 22.5971 28.6668 22.5971 27.9989H22.5861C22.5861 27.3309 22.7065 26.6958 22.9255 26.1045C23.6919 24.0459 25.6735 22.5896 27.9945 22.5896C30.3155 22.5896 32.2972 24.0569 33.0635 26.1045ZM27.8413 51.4973C15.4698 51.4973 5.32082 42.0038 4.29169 29.9041H19.0061C19.8819 34.0651 23.5715 37.1968 27.9945 37.1968C32.4176 37.1968 36.1071 34.0651 36.983 29.9041H51.4018C50.3617 41.9928 40.2127 51.4973 27.8413 51.4973ZM27.9945 0C12.5357 0 0 12.5376 0 27.9989C0 43.4601 12.5357 55.9977 27.9945 55.9977C43.4534 55.9977 56 43.471 56 27.9989C56 12.5267 43.4643 0 27.9945 0Z" fill="white" fill-opacity="0.25"></path>
                             </svg>
                         </div>
                         <div className="rightSide">
                             <h3 className="titleModal">Stats</h3>
                             {statsPokemonSearch?.map((stat, index) => {
                                 return (
                                     <li key={index}>
                                         <span>{stat.stat.name}</span>
                                         <span>{stat.base_stat}</span>
                                         <div className="containerPercent">
                                             <div className="percent"
                                                  style={{'width': stat.base_stat+'%',
                                                      "backgroundColor": stat.base_stat >= 50 ? "#1CD80E" : "#FF364E",
                                                      "box-shadow": "0 0 0.75rem 0.25rem"+ stat.base_stat >= 50 ? "rgba(28, 216, 14, 0.25)" : "rgba(255, 54, 78, 0.25)"}}/>
                                         </div>
                                     </li>
                                 )})}
                         </div>
                     </div>
                 </div>
             </>
            }
            <div className="header-navigation">
                <Navbar />

                <div className={'container-search'}>
                    <input type="text"
                           value={searchValue}
                           onChange={(e) => setSearchValue(e.target.value)}
                           placeholder={"Rechercher"}
                           className="search-input"
                    />
                    <button onClick={handleSubmit} className={'btn-search'}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>

                </div>
            </div>

        </>
    );
}

export default Header;
