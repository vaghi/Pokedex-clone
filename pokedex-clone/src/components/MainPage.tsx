import React, { useState, useEffect } from "react";
import "../CommonStyles.css";
import { getAllPokemons } from "../services";
import { PokemonProps } from "../types";
import { Route, Routes } from "react-router-dom";
import PokemonList from "./PokemonList";
import AddPokemon from "./AddPokemon";
import PokemonDetails from "./PokemonDetails";
import { RESULTS_PER_PAGE } from "../constants";

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

    const startIndex = currentPage * RESULTS_PER_PAGE;
    const endIndex = (currentPage + 1) * RESULTS_PER_PAGE;
    if (!customPokemonList.length) {
      offset = startIndex;
      limit = RESULTS_PER_PAGE;
    } else {
      if (
        startIndex <= customPokemonList.length &&
        customPokemonList.length <= endIndex
      ) {
        offset = 0;
        limit =
          RESULTS_PER_PAGE - (customPokemonList.length % RESULTS_PER_PAGE);
      } else if (
        pokemonList.results.length &&
        customPokemonList.length >= endIndex
      ) {
        return;
      } else {
        const customPages = Math.floor(
          customPokemonList.length / RESULTS_PER_PAGE,
        );
        offset =
          (currentPage - customPages - 1) * RESULTS_PER_PAGE +
          (RESULTS_PER_PAGE - (customPokemonList.length % RESULTS_PER_PAGE));
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
        element={
          <AddPokemon
            onAddNewPokemon={handleAddNewPokemon}
            customPokemons={customPokemonList}
          />
        }
      />
    </Routes>
  );
};

export default MainPage;
