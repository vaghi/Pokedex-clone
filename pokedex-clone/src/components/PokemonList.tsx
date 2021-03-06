import React from "react";
import ListItem from "./ListItem";
import "./PokemonList.css";
import AddImage from "../assets/add.png";
import NextPageImage from "../assets/next.png";
import PreviusPageImage from "../assets/previous.png";
import { useNavigate } from "react-router-dom";
import { PokemonProps } from "../types";
import { EMPTY_POKEMON_LIST_MESSAGE, RESULTS_PER_PAGE } from "../constants";

export type PokemonListProps = {
  count: number;
  pokemonList: PokemonProps[];
  customPokemonList: PokemonProps[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  setCustomPokemonId: (customPokemonId: string) => void;
};

const PokemonList = ({
  count,
  pokemonList,
  customPokemonList,
  currentPage,
  setCurrentPage,
  setCustomPokemonId,
}: PokemonListProps) => {
  const navigate = useNavigate();

  const startIndexPage = RESULTS_PER_PAGE * currentPage;
  const endIndexPage = RESULTS_PER_PAGE * (currentPage + 1);

  return (
    <div className="PokemonList">
      <header className="PokemonListHeader">
        <h1>Pokemons</h1>
      </header>
      <div
        className="PokemonListContainer"
        data-testid="pokemon-list-container"
      >
        <div className="PokemonListPanel">
          <div className="PreviousPageButton PageButton">
            {currentPage > 0 && (
              <img
                width="32"
                src={PreviusPageImage}
                onClick={() => {
                  setCurrentPage(currentPage - 1);
                }}
                data-testid="previous-page-button"
              />
            )}
          </div>
          <div className="AddPokemonButton PageButton">
            <img
              width="32"
              src={AddImage}
              onClick={() => navigate("/add/")}
              data-testid="add-new-pokemon-button"
            />
          </div>
          <div className="NextPageButton PageButton">
            {currentPage <
              Math.floor(
                (count + customPokemonList.length) / RESULTS_PER_PAGE,
              ) && (
              <img
                width="32"
                src={NextPageImage}
                onClick={() => {
                  setCurrentPage(currentPage + 1);
                }}
                data-testid="next-page-button"
              />
            )}
          </div>
        </div>
        <>
          {customPokemonList.length > startIndexPage &&
            customPokemonList
              .slice(
                startIndexPage,
                Math.min(endIndexPage, customPokemonList.length),
              )
              .map(pokemon => (
                <ListItem
                  key={pokemon.name}
                  name={pokemon.name}
                  custom={pokemon.custom}
                  setCustomPokemonId={setCustomPokemonId}
                />
              ))}
          {(!customPokemonList.length ||
            customPokemonList.length % RESULTS_PER_PAGE !== 0) &&
            pokemonList.map(pokemon => (
              <ListItem
                key={pokemon.name}
                name={pokemon.name}
                custom={pokemon.custom}
                setCustomPokemonId={setCustomPokemonId}
              />
            ))}
          {pokemonList.length === 0 && customPokemonList.length === 0 && (
            <div className="NoPokemonMessage">{EMPTY_POKEMON_LIST_MESSAGE}</div>
          )}
        </>
      </div>
    </div>
  );
};

export default PokemonList;
