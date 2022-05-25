import * as React from "react";
import { useNavigate } from "react-router-dom";
import "../CommonStyles.css";
import "./AddPokemon.css";
import CancelButton from "../assets/cancel.png";
import ConfirmButton from "../assets/confirm.png";
import { useEffect, useState } from "react";
import {
  getAllAbilities,
  getAllItems,
  getAllTypes,
  getPokemonDetails,
} from "../services";
import { MultiSelect } from "react-multi-select-component";
import { capitalize } from "../utils";
import { Option, PokemonProps } from "../types";
import {
  DUPLICATED_NAME_ERROR,
  HEIGHT_POSITIVE_VALUE_ERROR,
  HEIGHT_REQUIRED_ERROR,
  NAME_REQUIRED_ERROR,
  POKEMON_NOT_FOUND_ERROR,
  WEIGHT_POSITIVE_VALUE_ERROR,
  WEIGHT_REQUIRED_ERROR,
} from "../constants";

type PokemonDetailsProps = {
  onAddNewPokemon: (pokemon: PokemonProps) => void;
  customPokemons: PokemonProps[];
};

const PokemonDetails = ({
  onAddNewPokemon,
  customPokemons,
}: PokemonDetailsProps) => {
  const [types, setTypes] = useState<Option[]>([]);
  const [abilities, setAbilities] = useState<Option[]>([]);
  const [items, setItems] = useState<Option[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<Option[]>([]);
  const [selectedAbilities, setSelectedAbilities] = useState<Option[]>([]);
  const [selectedItems, setSelectedItems] = useState<Option[]>([]);

  useEffect(() => {
    if (!types.length) {
      getAllTypes().then(res => {
        setTypes(
          res.results.map(({ name }: { name: string }) => {
            return { label: capitalize(name), value: name };
          }),
        );
      });
    }

    if (!abilities.length) {
      getAllAbilities().then(res => {
        setAbilities(
          res.results.map(({ name }: { name: string }) => {
            return { label: capitalize(name), value: name };
          }),
        );
      });
    }

    if (!items.length) {
      getAllItems().then(res => {
        setItems(
          res.results.map(({ name }: { name: string }) => {
            return { label: capitalize(name), value: name };
          }),
        );
      });
    }
  }, [abilities.length, items.length, types.length]);

  const navigate = useNavigate();
  const initialValues = { name: "", height: 0, weight: 0 };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    height?: string;
    weight?: string;
  }>({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // eslint-disable-next-line no-unused-vars
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await validate(formValues).then(errors => setFormErrors(errors));
    setIsSubmit(true);
  };

  useEffect(() => {
    const getPokemonValues = () => {
      const { name, height, weight } = formValues;
      const newPokemon: PokemonProps = {
        name,
        height,
        weight,
        types: selectedTypes.map(type => ({ type: { name: type.value } })),
        abilities: selectedAbilities.map(ability => ({
          ability: { name: ability.value },
        })),
        held_items: selectedItems.map(item => ({ item: { name: item.value } })),
        custom: true,
      };
      return newPokemon;
    };

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      onAddNewPokemon(getPokemonValues());
      clearFields();
      navigate("/");
    }
  }, [isSubmit]);

  const validate = async (values: {
    name: string;
    height: number;
    weight: number;
  }) => {
    const errors: { name?: string; height?: string; weight?: string } = {};
    if (!values.name) {
      errors.name = NAME_REQUIRED_ERROR;
    } else if (
      customPokemons.some(
        ({ name }) => values.name.toLowerCase() === name.toLowerCase(),
      )
    ) {
      errors.name = DUPLICATED_NAME_ERROR;
    } else {
      await getPokemonDetails(values.name.toLowerCase()).then(res => {
        if (!(res.error === POKEMON_NOT_FOUND_ERROR)) {
          errors.name = DUPLICATED_NAME_ERROR;
        }
      });
    }

    if (!values.height) {
      errors.height = HEIGHT_REQUIRED_ERROR;
    }
    if (values.height <= 0) {
      errors.height = HEIGHT_POSITIVE_VALUE_ERROR;
    }
    if (!values.weight) {
      errors.weight = WEIGHT_REQUIRED_ERROR;
    }
    if (values.weight <= 0) {
      errors.weight = WEIGHT_POSITIVE_VALUE_ERROR;
    }

    return errors;
  };

  const clearFields = () => {
    setSelectedTypes([]);
    setSelectedItems([]);
    setSelectedAbilities([]);
  };

  const handleCancel = () => {
    clearFields();
    navigate(-1);
  };

  return (
    <div className="AddPokemonContainer">
      <header className="PokemonDetailsHeader">
        <h1>Add New Pokemon</h1>
      </header>
      <div className="AddPokemonFormContainer">
        <form>
          <div className="ui divider"></div>
          <div className="ui form">
            <div className="field">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formValues.name}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.name}</p>
            <div className="field">
              <label>Height</label>
              <input
                type="number"
                name="height"
                placeholder="Height"
                value={formValues.height}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.weight}</p>
            <div className="field">
              <label>Weight</label>
              <input
                type="number"
                name="weight"
                placeholder="Weight"
                value={formValues.weight}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.weight}</p>
            <div className="field">
              <label>Types</label>
              <MultiSelect
                options={types}
                value={selectedTypes}
                onChange={setSelectedTypes}
                labelledBy="Select Types"
              />
            </div>
            <div className="field">
              <label>Abilities</label>
              <MultiSelect
                options={abilities}
                value={selectedAbilities}
                onChange={setSelectedAbilities}
                labelledBy="Select Abilities"
              />
            </div>
            <div className="field">
              <label>Items</label>
              <MultiSelect
                options={items}
                value={selectedItems}
                onChange={setSelectedItems}
                labelledBy="Select Items"
              />
            </div>
          </div>
        </form>
      </div>
      <footer className="FormButtonsContainer">
        <img
          className="PageButton"
          width={32}
          src={CancelButton}
          onClick={handleCancel}
        />
        <img
          className="PageButton"
          width={32}
          src={ConfirmButton}
          onClick={handleSubmit}
        />
      </footer>
    </div>
  );
};

export default PokemonDetails;
