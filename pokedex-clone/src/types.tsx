export type PokemonListItemProps = {
  name: string,
  url: string
};

export type PokemonDetailsProps = {
  name: string,
  abilities: { ability: { name: string } }[],
  height: number,
  weight: number,
  types: { type: { name: string } }[]
};