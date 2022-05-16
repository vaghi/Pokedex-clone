import * as React from "react";
import { PokemonListItemProps } from "../types";

const ListItem = ({ name }: PokemonListItemProps) => {
  return <a href={`/${name}/`}>{name}</a>;
};

export default ListItem;
