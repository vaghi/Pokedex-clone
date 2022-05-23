import React from "react";
import { render } from "@testing-library/react";
import MainPage from "../MainPage";

jest.mock("../services", () => ({
  getAllPokemons: () => {
    results: [];
  },
}));

test("renders learn react link", () => {
  const { getByText } = render(<MainPage />);

  expect(getByText("Pokemons")).toBeInTheDocument();
});
