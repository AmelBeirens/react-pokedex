import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const PokemonDetail = () => {

    const {id} = useParams();
    const [pokemonInfo, setPokemonInfos] = useState();

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(response => response.json())
            .then(response => {
                setPokemonInfos(response)
            });
    }, []);

    const SimpleSlider = () => {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoPlay: true,
            autoplaySpeed: 3000,
            arrows: false,
        };
        return (
            <Slider {...settings}>
                <div>
                    <img src={pokemonInfo?.sprites.front_default} alt={pokemonInfo?.name}/>
                </div>
                <div>
                    <img src={pokemonInfo?.sprites.back_default} alt={pokemonInfo?.name}/>
                </div>
                <div>
                    <img src={pokemonInfo?.sprites.front_shiny} alt={pokemonInfo?.name}/>
                </div>
                <div>
                    <img src={pokemonInfo?.sprites.back_shiny} alt={pokemonInfo?.name}/>
                </div>
            </Slider>
        );
    }

    return (
        <div className="container_pokemon_detail">
            <div className="basic_infos">
                <div className="basic_infos-header">
                    {pokemonInfo?.name} - N°{pokemonInfo?.id}
                </div>
                <div className="img_pokemon">
                    {SimpleSlider()}
                </div>
                <div className="infos_pokemon">
                    <ul>
                        <li>
                            Taille : {pokemonInfo?.height} cm
                        </li>
                        <li>
                            Poids : {pokemonInfo?.weight} g
                        </li>
                        <li>
                            {pokemonInfo?.types?.map((item, index) => <span key={index} className={`span-type color--${item.type.name}`}>{item.type.name}</span>)}
                        </li>
                    </ul>
                </div>
            </div>
            <div className="stats-pokemon">
                {pokemonInfo?.stats.map(stat => {
                    return (
                        <ul>
                            <li>{stat.stat.name} - {stat.base_stat}</li>
                        </ul>

                    )
                })}
            </div>
        </div>
    )
}

export default PokemonDetail