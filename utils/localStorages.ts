import { PokemonAPI } from "../models/pokeAPI";
const toggleFavaorites = (id: Number) => {
  let getFavorites: Number[] = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );
  if (getFavorites.includes(id)) {
    getFavorites = getFavorites.filter((pokemon) => pokemon != id);
  } else {
    getFavorites.push(id);
  }
  localStorage.setItem("favorites", JSON.stringify(getFavorites));
};
const getFavorite = (id: number): boolean => {
  if (typeof window == "undefined" || typeof localStorage == "undefined")
    return false;
  let getFavorites: number[] = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );
  return getFavorites.includes(id);
};
const readFavorites = (): number[] => {
  if (typeof window == "undefined" || typeof localStorage == "undefined")
    return [];
  return JSON.parse(localStorage.getItem("favorites") || "[]");
};
export default { toggleFavaorites, getFavorite, readFavorites };
