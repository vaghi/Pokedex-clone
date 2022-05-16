import React, { useState, useEffect } from "react";
import "./MainPage.css";
import ListItem from "./mainList/ListItem";
import { getAllPokemons, queryStringToObject } from "./services";
import { PokemonListItemProps } from "./types";
import { useSearchParams } from "react-router-dom";

const MainPage = ({}) => {
  const [pokemonList, setPokemonList] = useState<{
    count: number;
    next: string;
    previous: string;
    results: PokemonListItemProps[];
  }>();

  useEffect(() => {
    if (!pokemonList) {
      getAllPokemons({}).then(res => setPokemonList(res));
    }
  }, [pokemonList]);

  const [searchParams, setSearchParams] = useSearchParams({});

  useEffect(() => {
    const limit = searchParams.get("limit");
    const offset = searchParams.get("offset");

    if (limit && offset) {
      getAllPokemons({ offset, limit }).then(res => setPokemonList(res));
    }
  }, [searchParams]);

  if (!pokemonList) {
    return null;
  }

  const { results, previous: previousPage, next: nextPage } = pokemonList;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pokemons</h1>
      </header>
      <div className="ListItemContainer">
        {results.map(({ name, url }) => (
          <ListItem key={name} name={name} url={url}></ListItem>
        ))}
      </div>
      <div>
        {previousPage && (
          <button
            onClick={() => setSearchParams(queryStringToObject(previousPage))}
          >
            Previus Page
          </button>
        )}
        {nextPage && (
          <button
            onClick={() => setSearchParams(queryStringToObject(nextPage))}
          >
            Next Page
          </button>
        )}
      </div>
    </div>
  );
};

export default MainPage;
