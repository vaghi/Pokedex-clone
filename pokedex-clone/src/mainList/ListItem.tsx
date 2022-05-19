import * as React from "react";
import "./ListItem.css";
import { capitalize } from "../utils";
import { useNavigate } from "react-router-dom";

type ListItemProps = {
  name: string;
  custom?: boolean;
  setCustomPokemonId?: (customPokemonId: string) => void;
};

const ListItem = ({ name, custom, setCustomPokemonId }: ListItemProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (custom && setCustomPokemonId) {
      setCustomPokemonId(name);
      navigate(`/custom/`);
    } else {
      navigate(`/${name}/`);
    }
  };

  return (
    <div className="ListItem" onClick={handleClick}>
      {capitalize(name)}
    </div>
  );
};

export default ListItem;
