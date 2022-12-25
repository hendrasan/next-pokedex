export type PokemonMinimal = {
  name: string;
  url: string;
};

export type PokemonCardAndModal = Pokemon &
  PokemonMinimal & {
    id: string;
    formattedName: string;
    sprite: string;
  };

export type PokemonEvolution = PokemonMinimal & {
  id: string;
  formattedName: string;
  sprite: string;
};

export type PokemonDetail = Pokemon & {
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
  sprites: Sprite;
};

export type Ability = {
  ability: {
    name: string;
    is_hidden: boolean;
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
  [key: string]: string;
  // back_default: string;
  // front_default: string;
  // back_female?: string;
  // front_female?: string;
  // back_shiny?: string;
  // front_shiny?: string;
  // back_shiny_female?: string;
  // front_shiny_female?: string;
  // other?: object;
  // versions?: object;
};
