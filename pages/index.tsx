import { Button, Grid, Row, Text } from "@nextui-org/react";
import { Inter } from "@next/font/google";
import Layout from "../components/layouts/layout";
import { MetaContent } from "../models/nexts";
import { GetStaticProps } from "next";
import { pokeApi } from "../api";
import { PokeResponse, PokemonItem } from "../models";
import CardPokemon from "../components/pokemons/CardPokemon";
import getUrl from "../api/getUrl";

const inter = Inter({ subsets: ["latin"] });
interface Props {
  pokemons: PokemonItem[];
  origin: string;
}
const origin = "";
const Home = ({ pokemons, origin }: Props) => {
  const metaDescription: MetaContent = {
    description:
      "Este sitio es una pagina que muestra un listado completo de todos los pokemons",
    image: `${origin}/pokeball.png`,
    icon: `${origin}/pokeball.png`,
    type: "List",
    url: `${origin}`,
  };
  return (
    <>
      <Layout title="Home" meta={metaDescription}>
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
          Atrapalos a todos!!
        </Text>

        <Grid.Container gap={2} justify="center">
          {pokemons.map((pokemon) => {
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
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { data } = await pokeApi.get<PokeResponse>(
    "/pokemon?offset=0&limit=156"
  );
  const pokemons: PokemonItem[] = data.results.map((pokemonData, index) => ({
    ...pokemonData,
    //"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
    id: index + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
      index + 1
    }.svg`,
  }));
  const origin =
    process.env.NODE_ENV == "development"
      ? process.env.LOCAL_URL
      : process.env.URL;
  return {
    props: { pokemons, origin }, // will be passed to the page component as props
  };
};
export default Home;
