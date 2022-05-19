export type PokemonTypeProps = { type: { name: string } };
export type PokemonAbilitiesProps = { ability: { name: string } };
export type PokemonHeldItemsProps = { item: { name: string } };

export type PokemonProps = {
  name: string;
  abilities?: PokemonAbilitiesProps[];
  held_items?: PokemonHeldItemsProps[];
  height?: number;
  weight?: number;
  types?: PokemonTypeProps[];
  custom?: boolean;
};

export type Option = { label: string; value: string };
