import { useEffect, useState } from "react";
import { Grid, Text } from "@nextui-org/react";

import Layout from "../components/layouts/layout";
import { MetaContent } from "../models/nexts";

import { PokemonItem } from "../models";
import CardPokemon from "../components/pokemons/CardPokemon";
import { localFavorites } from "../utils";
import { NoPokemon } from "../components/ui";
import { pokeApi } from "../api";
import { GetStaticProps } from "next";

interface Props {
  origin: string;
}
const FavoritesPage = ({ origin }: Props) => {
  const title = "Favoritos";
  const [localPokemon, setlocalPokemon] = useState<number[]>([]);
  const [pokemons, setPokemons] = useState<any[] | PokemonItem[]>([]);
  const metaDescription: MetaContent = {
    description: "Este es la descripción del La pagina de favoritos",
    image: `${origin}/pokeball.png`,
    icon: `${origin}/pokeball.png`,
    type: "List",
    url: `${origin}/favorites`,
  };
  const getPokemon = async (id: number) => {
    const { data } = await pokeApi.get(`/pokemon/${id}`);
    const { name, sprites } = data;
    const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
    return { name, sprites, id, img };
  };
  useEffect(() => {
    setlocalPokemon(localFavorites.readFavorites().sort((a, b) => a - b));
  }, []);
  useEffect(() => {
    localPokemon.forEach((id) => {
      getPokemon(id).then((res) =>
        setPokemons((pokemons) => [...pokemons, res])
      );
    });
  }, [localPokemon.length]);
  return (
    <>
      <Layout title={title} meta={metaDescription}>
        {localPokemon.length === 0 ? (
          <NoPokemon />
        ) : (
          <>
            <Text
              h1
              size={50}
              css={{
                textGradient: "45deg, $blue600 -20%, $pink600 50%",
                textAlign: "center",
              }}
              weight="bold"
              transform="full-size-kana"
            >
              {title}
            </Text>
            <Grid.Container gap={2}>
              {pokemons.map((pokemon) => {
                //const {id} =pokemon
                return (
                  <Grid
                    justify="center"
                    alignItems="center"
                    xs={6}
                    sm={5}
                    md={4}
                    lg={3}
                    xl={2}
                    key={pokemon.id}
                  >
                    <CardPokemon pokemon={pokemon} />
                  </Grid>
                );
              })}
            </Grid.Container>
          </>
        )}
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const origin =
    process.env.NODE_ENV == "development"
      ? process.env.LOCAL_URL
      : process.env.URL;
  return {
    props: { origin }, // will be passed to the page component as props
  };
};

export default FavoritesPage;
