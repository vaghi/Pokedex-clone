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
  }>();

  const [customPokemonList, setCustomPokemonList] = useState<PokemonProps[]>(
    [],
  );
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [customPokemonId, setCustomPokemonId] = useState<string>();

  useEffect(() => {
    if (!pokemonList) {
      getAllPokemons().then(res => setPokemonList(res));
    }
  }, [pokemonList]);

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

  const { results } = pokemonList;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PokemonList
            pokemonList={[...customPokemonList, ...results]}
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
