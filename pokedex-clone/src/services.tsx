const baseApi = "https://pokeapi.co/api/v2/";

export const getAllPokemons = async () => {
  const response = await fetch(`${baseApi}pokemon?offset=0&limit=10000`, {
    method: "GET",
  });
  return await response.json();
};

export const getPokemonDetails = async (pokemonId: string) => {
  const response = await fetch(`${baseApi}pokemon/${pokemonId}/`, {
    method: "GET",
  });
  return await response.json();
};

export const getAllTypes = async () => {
  const response = await fetch(`${baseApi}type`, {
    method: "GET",
  });
  return await response.json();
};

export const getAllAbilities = async () => {
  const response = await fetch(`${baseApi}ability?limit=1000`, {
    method: "GET",
  });
  return await response.json();
};

export const getAllItems = async () => {
  const response = await fetch(`${baseApi}item?limit=10000`, {
    method: "GET",
  });
  return await response.json();
};

export const queryStringToObject = (url: string) => {
  const splitedUrl = url.split("?");

  if (splitedUrl.length > 1) {
    const splitedQueryParams = splitedUrl[1].split("&");
    const queryParamsParsed: { offset: number; limit: number } = {
      offset: 0,
      limit: 0,
    };

    splitedQueryParams.forEach(queryParam => {
      const keyValue = queryParam.split("=");
      if (keyValue[0] === "offset") {
        queryParamsParsed.offset = parseInt(keyValue[1]);
      }
      if (keyValue[0] === "limit") {
        queryParamsParsed.limit = parseInt(keyValue[1]);
      }
    });

    return queryParamsParsed;
  }

  return {};
};
