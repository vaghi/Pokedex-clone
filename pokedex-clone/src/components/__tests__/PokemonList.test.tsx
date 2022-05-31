import React from "react";
import { fireEvent, render } from "@testing-library/react";
import PokemonList from "../PokemonList";
import { BrowserRouter } from "react-router-dom";
import { PokemonProps } from "../../types";
import { EMPTY_POKEMON_LIST_MESSAGE } from "../../constants";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

const getMockedPokemonList = (quantity: number) => {
  const mockedList = [];
  for (let i = 0; i < quantity; i++) {
    mockedList.push({ name: quantity.toString() });
  }
  return mockedList;
};

describe("PokemonList", () => {
  type renderPokemonListProps = {
    count?: number;
    pokemonList?: PokemonProps[];
    customPokemonList?: PokemonProps[];
    currentPage?: number;
  };

  const setCurrentPage = jest.fn();
  const setCustomPokemonId = jest.fn();

  const renderPokemonList = ({
    count = 0,
    currentPage = 0,
    customPokemonList = [],
    pokemonList = [],
  }: renderPokemonListProps) => {
    return render(
      <BrowserRouter>
        <PokemonList
          count={count}
          currentPage={currentPage}
          customPokemonList={customPokemonList}
          pokemonList={pokemonList}
          setCurrentPage={setCurrentPage}
          setCustomPokemonId={setCustomPokemonId}
        />
      </BrowserRouter>,
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("without data renders container, empty list message, no pagination buttons but add new pokemon", () => {
    const { queryAllByTestId, getByTestId, getByText } = renderPokemonList({});

    getByText(EMPTY_POKEMON_LIST_MESSAGE);
    expect(queryAllByTestId("previous-page-button").length).toBe(0);
    expect(queryAllByTestId("next-page-button").length).toBe(0);

    const addNewPokemonButton = getByTestId("add-new-pokemon-button");
    fireEvent.click(addNewPokemonButton);
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/add/");
  });

  test("with first page data, renders container, no empty list message, next pagination and add new pokemon buttons, and no previous pagination button", () => {
    const currentPage = 0;
    const { queryAllByText, getByTestId, queryAllByTestId } = renderPokemonList(
      {
        count: 21,
        currentPage,
        pokemonList: getMockedPokemonList(21),
      },
    );

    expect(queryAllByText(EMPTY_POKEMON_LIST_MESSAGE).length).toBe(0);
    expect(queryAllByTestId("previous-page-button").length).toBe(0);

    const nextPageButton = getByTestId("next-page-button");
    fireEvent.click(nextPageButton);
    expect(setCurrentPage).toHaveBeenCalledWith(currentPage + 1);

    const addNewPokemonButton = getByTestId("add-new-pokemon-button");
    fireEvent.click(addNewPokemonButton);
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/add/");
  });

  test("with last page data, renders container, no empty list message, previous pagination and add new pokemon buttons, and no next pagination button", () => {
    const currentPage = 1;
    const { queryAllByText, getByTestId, queryAllByTestId } = renderPokemonList(
      {
        count: 21,
        currentPage,
        pokemonList: getMockedPokemonList(21),
      },
    );

    expect(queryAllByText(EMPTY_POKEMON_LIST_MESSAGE).length).toBe(0);
    expect(queryAllByTestId("next-page-button").length).toBe(0);

    const previousPageButton = getByTestId("previous-page-button");
    fireEvent.click(previousPageButton);
    expect(setCurrentPage).toHaveBeenCalledWith(currentPage - 1);

    const addNewPokemonButton = getByTestId("add-new-pokemon-button");
    fireEvent.click(addNewPokemonButton);
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/add/");
  });
});
