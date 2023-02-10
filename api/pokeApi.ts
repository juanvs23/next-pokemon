import axios from "axios";

const pokeApi = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  headers: {
    "Accept-Encoding": "*",
    "Content-Encoding": "gzip",
  },
});
export default pokeApi;
