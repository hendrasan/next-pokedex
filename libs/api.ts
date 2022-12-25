import axios from "axios";
import {
  PokemonDetail,
  PokemonCardAndModal,
  PokemonMinimal,
} from "@/types/Pokemon";
import { capitalize, getLastUrlSegment } from "./helpers";

const axiosInstance = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  // headers: { "Accept-Encoding": "gzip,deflate,compress" }, // fix for axios 1.2.1, but introduces another error, so revert back to version 1.1.3
});

type PokemonsListParams = {
  limit?: number;
  offset?: number;
};

export const getPokemons = async ({
  limit = 9,
  offset = 0,
}: PokemonsListParams) => {
  // use axios
  const response = await axiosInstance.get(
    `/pokemon?limit=${limit}&offset=${offset}`
  );

  const pokemons = await Promise.all(
    response.data.results.map(async (pokemon: PokemonMinimal) => {
      const id = getLastUrlSegment(pokemon.url);

      if (!id) {
        return;
      }

      const pokemonDetail = await getPokemon(id);

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
  const response = await axiosInstance.get(`/pokemon/${id}`);

  const pokemon = response.data;

  const item: PokemonDetail = {
    id: pokemon.id,
    name: pokemon.name,
    abilities: pokemon.abilities,
    weight: pokemon.weight,
    height: pokemon.height,
    types: pokemon.types,
    stats: pokemon.stats,
    sprites: pokemon.sprites,
    formattedName: capitalize(pokemon.name),
    sprite: id ? getPokemonDefaultImage(id) : "",
  };

  return item;
};

export const getPokemonEvolution = async (id: string) => {
  const response = await axiosInstance.get(`/pokemon-species/${id}`);

  const species = response.data;

  const evoChainUrl = species.evolution_chain.url;

  let evoChain = [];

  const { data } = await axiosInstance.get(evoChainUrl);

  let evoData = data.chain;

  do {
    let numberOfEvolutions = evoData.evolves_to.length;

    evoChain.push({
      name: evoData.species.name,
      url: evoData.species.url,
    });

    if (numberOfEvolutions > 1) {
      for (let i = 1; i < numberOfEvolutions; i++) {
        evoChain.push({
          name: evoData.species.name,
          url: evoData.species.url,
        });
      }
    }

    evoData = evoData.evolves_to[0];
  } while (!!evoData && evoData.hasOwnProperty("evolves_to"));

  evoChain = evoChain.map((pokemon: PokemonMinimal) => {
    const id = getLastUrlSegment(pokemon.url);

    if (!id) {
      return;
    }

    return {
      ...pokemon,
      id,
      formattedName: capitalize(pokemon.name),
      sprite: id ? getPokemonDefaultImage(id) : "",
    };
  });

  return evoChain;
};

export const getPokemonId = (url: string) => {
  const urlParts = url.split("/");
  const id = urlParts[urlParts.length - 2];
  return id;
};

export const getPokemonDefaultImage = (id: string) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
};
