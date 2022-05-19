import * as React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPokemonDetails } from "./services";
import { PokemonProps } from "./types";
import { capitalize } from "./utils";
import "./PokemonDetails.css";
import "./CommonStyles.css";
import BackButton from "./assets/back.png";

type PokemonDeTailsProps = {
  customPokemon?: PokemonProps;
};

const PokemonDetails = ({ customPokemon }: PokemonDeTailsProps) => {
  const { pokemonId } = useParams();
  const navigate = useNavigate();

  const [pokemonDetails, setPokemonDetails] = useState<PokemonProps>();

  useEffect(() => {
    if (pokemonId && !customPokemon) {
      getPokemonDetails(pokemonId).then(res => setPokemonDetails(res));
    } else if (customPokemon) {
      setPokemonDetails({
        ...customPokemon,
      });
    }
  }, [customPokemon, pokemonId]);

  if (!pokemonDetails) {
    return null;
  }

  const {
    name,
    height,
    weight,
    types,
    abilities,
    held_items: heldItems,
  } = pokemonDetails;

  return (
    <div className="PokemonDetailsContainer">
      <header className="PokemonDetailsHeader">
        <h1>{capitalize(name)}</h1>
      </header>
      <div className="PokemonDetailsCard">
        <span>Height: {height || "-"}</span>
        <br></br>
        <span>Weight: {weight || "-"}</span>
        <br></br>
        <span>Types:</span>
        {types?.length ? (
          <ul>
            {types.map(({ type }) => (
              <li key={type.name}>{type.name}</li>
            ))}
          </ul>
        ) : (
          <div className="NoneLabel">none</div>
        )}
        <br></br>
        <span>Abilities: </span>
        {abilities?.length ? (
          <ul>
            {abilities.map(({ ability }) => (
              <li key={ability.name}>{ability.name}</li>
            ))}
          </ul>
        ) : (
          <div className="NoneLabel">none</div>
        )}
        <br></br>
        <span>Held Items: </span>
        {heldItems?.length ? (
          <ul>
            {heldItems.map(({ item }) => (
              <li key={item.name}>{item.name}</li>
            ))}
          </ul>
        ) : (
          <div className="NoneLabel">none</div>
        )}
      </div>
      <footer className="BackButtonContainer">
        <img
          className="PageButton"
          width={32}
          src={BackButton}
          onClick={() => navigate(-1)}
        />
      </footer>
    </div>
  );
};

export default PokemonDetails;
