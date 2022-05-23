import React from "react";
import ListItem from "./ListItem";
import AddImage from "../assets/add.png";
import NextPageImage from "../assets/next.png";
import PreviusPageImage from "../assets/previous.png";
import { useNavigate } from "react-router-dom";
import { PokemonProps } from "../types";
import { resultsPerPage } from "./MainPage";

type PokemonListProps = {
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

  const startIndexPage = resultsPerPage * currentPage;
  const endIndexPage = resultsPerPage * (currentPage + 1);

  return (
    <div className="MainPage">
      <header className="MainPage-header">
        <h1>Pokemons</h1>
      </header>
      <div className="MainPageContainer">
        <div className="MainPagePanel">
          <div className="PreviousPageButton PageButton">
            {currentPage > 0 && (
              <img
                width="32"
                src={PreviusPageImage}
                onClick={() => {
                  setCurrentPage(currentPage - 1);
                }}
              />
            )}
          </div>
          <div className="AddPokemonButton PageButton">
            <img width="32" src={AddImage} onClick={() => navigate("/add/")} />
          </div>
          <div className="NextPageButton PageButton">
            {currentPage <
              (count + customPokemonList.length) / resultsPerPage && (
              <img
                width="32"
                src={NextPageImage}
                onClick={() => {
                  setCurrentPage(currentPage + 1);
                }}
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
            customPokemonList.length % resultsPerPage !== 0) &&
            pokemonList.map(pokemon => (
              <ListItem
                key={pokemon.name}
                name={pokemon.name}
                custom={pokemon.custom}
                setCustomPokemonId={setCustomPokemonId}
              />
            ))}
        </>
      </div>
    </div>
  );
};

export default PokemonList;
