import axios from "axios";
import { Pokemon, PokemonMinimal } from "@/types/Pokemon";
import { capitalize, getLastUrlSegment } from "./helpers";

type PokemonsListParams = {
  limit?: number;
  offset?: number;
};

export const getPokemons = async ({
  limit = 9,
  offset = 0,
}: PokemonsListParams) => {
  // use axios
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
    {
      headers: { "Accept-Encoding": "gzip,deflate,compress" }, // fix for axios 1.2.1
    }
  );

  const pokemons = await Promise.all(
    response.data.results.map(async (pokemon: PokemonMinimal) => {
      const id = getLastUrlSegment(pokemon.url);

      if (!id) {
        return;
      }

      const pokemonDetail = await getPokemon(id);
      // console.log(pokemonDetail);
      return {
        ...pokemon,
        ...pokemonDetail,
        id,
        formattedName: capitalize(pokemon.name),
        sprite: id ? getPokemonDefaultImage(id) : "",
      };
    })
  );

  return {
    pokemons,
    count: response.data.count,
    next: response.data.next,
    previous: response.data.previous,
  };
};

export const getPokemon = async (id: string) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`, {
    headers: { "Accept-Encoding": "gzip,deflate,compress" }, // fix for axios 1.2.1
  });

  const pokemon = response.data;

  const item: Pokemon = {
    id: pokemon.id,
    name: pokemon.name,
    abilities: pokemon.abilities,
    weight: pokemon.weight,
    height: pokemon.height,
    types: pokemon.types,
    stats: pokemon.stats,
    sprites: pokemon.sprites,
  };

  return item;
};

export const getPokemonId = (url: string) => {
  const urlParts = url.split("/");
  const id = urlParts[urlParts.length - 2];
  return id;
};

export const getPokemonDefaultImage = (id: string) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
};
