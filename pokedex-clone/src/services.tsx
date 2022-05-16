const baseApi = "https://pokeapi.co/api/v2/"

type getAllPokemonsProps = {
    limit?: string;
    offset?: string;
};

export const getAllPokemons = async ({ limit = "20", offset="0" }: getAllPokemonsProps) => {
    const response = await fetch(`${baseApi}pokemon?offset=${offset}&limit=${limit}`, {
        method: "GET"
    })
    return await response.json();
};

export const getPokemonDetails = async (pokemonId: string) => {
    const response = await fetch(`${baseApi}pokemon/${pokemonId}/`, {
        method: "GET"
    })
    return await response.json();
};

export const queryStringToObject = (url: string) => {
    const splitedUrl = url.split("?");

    if(splitedUrl.length > 1) {
        const splitedQueryParams = splitedUrl[1].split("&");
        const queryParamsParsed : { offset: number, limit: number } = { offset: 0, limit: 0 };

        splitedQueryParams.forEach(queryParam => {
            const keyValue = queryParam.split("=");
                if(keyValue[0] === "offset") { queryParamsParsed.offset = parseInt(keyValue[1]) };
                if(keyValue[0] === "limit") { queryParamsParsed.limit = parseInt(keyValue[1]) };
        });

        return queryParamsParsed;
    }

    return {};
};