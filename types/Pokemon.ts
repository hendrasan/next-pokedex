export type PokemonMinimal = {
  name: string;
  url: string;
};

export type PokemonCardItem = Pick<Pokemon, "types"> &
  PokemonMinimal & {
    id: string;
    formattedName: string;
    sprite: string;
  };

export type Pokemon = {
  id: number;
  name: string;
  abilities: Ability[];
  weight: number;
  height: number;
  types: Type[];
  stats: Stat[];
  sprites: Sprite[];
};

export type Ability = {
  ability: {
    name: string;
  };
};

export type Type = {
  type: {
    name: string;
  };
};

export type Stat = {
  base_stat: number;
  stat: {
    name: string;
  };
};

export type Sprite = {
  back_default: string;
  front_default: string;
  back_female?: string;
  front_female?: string;
  back_shiny?: string;
  front_shiny?: string;
  back_shiny_female?: string;
  front_shiny_female?: string;
};
