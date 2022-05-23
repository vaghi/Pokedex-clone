import React, { useState, useEffect } from "react";
import "./MainPage.css";
import "../CommonStyles.css";
import { getAllPokemons } from "../services";
import { PokemonProps } from "../types";
import { Route, Routes } from "react-router-dom";
import PokemonList from "./PokemonList";
import AddPokemon from "./AddPokemon";
import PokemonDetails from "./PokemonDetails";

export const resultsPerPage = 20;

const MainPage = ({}) => {
  const [pokemonList, setPokemonList] = useState<{
    results: PokemonProps[];
    count: number;
  }>({ results: [], count: 0 });

  const [customPokemonList, setCustomPokemonList] = useState<PokemonProps[]>(
    [],
  );
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [customPokemonId, setCustomPokemonId] = useState<string>();

  useEffect(() => {
    let offset: number;
    let limit: number;

    const startIndex = currentPage * resultsPerPage;
    const endIndex = (currentPage + 1) * resultsPerPage;
    if (!customPokemonList.length) {
      offset = startIndex;
      limit = resultsPerPage;
    } else {
      if (
        startIndex <= customPokemonList.length &&
        customPokemonList.length <= endIndex
      ) {
        offset = 0;
        limit = resultsPerPage - (customPokemonList.length % resultsPerPage);
      } else if (
        pokemonList.results.length &&
        customPokemonList.length >= endIndex
      ) {
        return;
      } else {
        const customPages = Math.floor(
          customPokemonList.length / resultsPerPage,
        );
        offset =
          (currentPage - customPages - 1) * resultsPerPage +
          (resultsPerPage - (customPokemonList.length % resultsPerPage));
        limit = 20;
      }
    }

    getAllPokemons({ offset, limit }).then(res => {
      setPokemonList(res);
    });
  }, [currentPage, customPokemonList.length]);

  let customPokemonSelected;

  if (customPokemonId) {
    customPokemonSelected = customPokemonList.find(
      ({ name }) => name === customPokemonId,
    );
  }

  if (!pokemonList) {
    return null;
  }

  const handleAddNewPokemon = (newPokemon: PokemonProps) => {
    setCustomPokemonList([{ ...newPokemon }, ...customPokemonList]);
  };

  const { results, count } = pokemonList;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PokemonList
            pokemonList={results}
            count={count}
            customPokemonList={customPokemonList}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setCustomPokemonId={setCustomPokemonId}
          />
        }
      />
      <Route path="/:pokemonId/" element={<PokemonDetails />} />
      <Route
        path="/custom/"
        element={<PokemonDetails customPokemon={customPokemonSelected} />}
      />
      <Route
        path="/add/"
        element={<AddPokemon onAddNewPokemon={handleAddNewPokemon} />}
      />
    </Routes>
  );
};

export default MainPage;
