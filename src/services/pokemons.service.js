const URL = 'https://pokeapi.co/api/v2/pokemon';

class PokemonsService {
  getMorePokemons = (limit, offset) => {
    return fetch(`${URL}?limit=${limit}&offset=${offset}`).then((response) =>
        response.json()
    );
  }
}

export const pokemonsService = new PokemonsService();




