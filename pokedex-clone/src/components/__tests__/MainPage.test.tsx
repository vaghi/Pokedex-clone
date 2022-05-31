import React from "react";
import { render } from "@testing-library/react";
import MainPage from "../MainPage";
import { BrowserRouter } from "react-router-dom";
import * as services from "../../services";

jest.mock("../../services", () => ({
  __esModule: true,
  getAllPokemons: async () => ({
    count: 0,
    results: [],
  }),
}));

describe("Main Page", () => {
  const renderMainPage = () =>
    render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>,
    );

  test("render header and empty content with no pokemons", () => {
    const { getByTestId, getByText } = renderMainPage();

    getByText("Pokemons");
    getByTestId("pokemon-list-container");
    getByText("Sorry, we don't have any Pokemon to show");
  });

  test("render content, header but not empty pokemon message with api pokemons", async () => {
    services.getAllPokemons = async () => ({
      count: 2,
      results: [{ name: "Pikachu" }, { name: "Chorizard" }],
    });

    const { getByTestId, getByText, findByText } = renderMainPage();

    getByText("Pokemons");
    getByTestId("pokemon-list-container");

    await findByText("Pikachu");
    await findByText("Chorizard");
  });
});
