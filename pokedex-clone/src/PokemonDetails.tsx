import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPokemonDetails } from "./services";
import { PokemonDetailsProps } from "./types";

const PokemonDetails = () => {
  const { pokemonId } = useParams();

  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetailsProps>();

  useEffect(() => {
    if (pokemonId) {
      getPokemonDetails(pokemonId).then(res => setPokemonDetails(res));
    }
  }, [pokemonId]);

  if (!pokemonDetails) {
    return null;
  }

  const { name, height, weight, abilities } = pokemonDetails;

  return (
    <>
      <h1>{name}</h1>
      <span>Height: {height}</span>
      <span>Weight: {weight}</span>
      <span>Abilities: </span>
      <ul>
        {abilities.map(({ ability }) => (
          <li key={ability.name}>{ability.name}</li>
        ))}
      </ul>
      <a href="/">Back</a>
    </>
  );
};

export default PokemonDetails;
