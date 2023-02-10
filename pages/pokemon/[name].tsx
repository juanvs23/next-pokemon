import React, { useEffect, useState } from "react";
import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useRouter } from "next/router";
import Layout from "../../components/layouts/layout";
import { MetaContent, PokemonAPI, PokeResponse } from "../../models";
import { pokeApi } from "../../api";
import { Button, Card, Container, Grid, Text } from "@nextui-org/react";
import Logo from "../../public/pokeball.svg";
import Image from "next/image";
import { localFavorites } from "../../utils";
import confetti from "canvas-confetti";

interface Props {
  pokemon: PokemonAPI;
  origin: string;
}
const origin = "";
const PokemonByName: NextPage<Props> = ({ pokemon, origin }) => {
  const route = useRouter();
  const { stats, name, weight, sprites, height, abilities, id } = pokemon;
  const [activeFavorite, setactiveFavorite] = useState(false);
  const pokemonName = name.charAt(0).toUpperCase() + name.slice(1);
  const metaDescription: MetaContent = {
    description: `Haz capturado el pokemon ${name}`,
    icon: sprites.other?.home.front_default || `${origin}/pokeball.png`,
    image: sprites.other?.home.front_default || `${origin}/pokeball.png`,
    type: "Article",
    url: `${origin}/pokemon/${pokemon.name}`,
  };
  const handlerClick = () => {
    localFavorites.toggleFavaorites(id);
    setactiveFavorite((activeFavorite) => !activeFavorite);
    if (activeFavorite) return;
    confetti({
      zIndex: 9999,
      particleCount: 100,
      angle: -160,
      origin: {
        x: 1,
        y: 0,
      },
    });
  };
  useEffect(() => {
    setactiveFavorite(localFavorites.getFavorite(id));
  }, []);
  const getHeart = activeFavorite ? (
    <Button color="gradient" auto onPress={handlerClick}>
      <FaHeart />
    </Button>
  ) : (
    <Button ghost shadow color="gradient" auto onPress={handlerClick}>
      <FaRegHeart />
    </Button>
  );

  return (
    <Layout title={pokemonName || "Detail"} meta={metaDescription}>
      <Grid.Container css={{ display: "flex", justifyContent: "center" }}>
        <Grid xs={12} md={8} justify={"center"}>
          <Grid.Container gap={2}>
            <Grid xs={12} md={5}>
              <Card>
                <Card.Body>
                  <Card.Image
                    src={sprites.other?.home.front_default || Logo}
                    alt={name}
                    width="100%"
                    height={"auto"}
                  />
                </Card.Body>
              </Card>
            </Grid>
            <Grid xs={12} md={7} direction="column">
              <Card>
                <Card.Body>
                  <Card.Header css={{ justifyContent: "space-between" }}>
                    <Text css={{ textAlign: "center" }} h1>
                      {pokemonName}
                    </Text>
                    {getHeart}
                  </Card.Header>
                  <Card.Divider />
                  <Text css={{ fontWeight: 400 }} h3>
                    <b style={{ fontWeight: 700 }}>Peso:</b> {weight}
                  </Text>
                  <Text css={{ fontWeight: 400 }} h3>
                    <b style={{ fontWeight: 700 }}>Altura:</b> {height}
                  </Text>
                  <Text h2>Sprites:</Text>
                  <Container display="flex" direction="row" gap={2}>
                    <Image
                      src={sprites.front_default}
                      height={130}
                      width={130}
                      alt={name}
                    />
                    <Image
                      src={sprites.back_default}
                      height={130}
                      width={130}
                      alt={name}
                    />
                  </Container>
                </Card.Body>
              </Card>
            </Grid>
          </Grid.Container>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await pokeApi.get<PokeResponse>(
    "/pokemon?offset=0&limit=156"
  );

  const pokemons = data.results.map((pokemon, index) => ({
    params: { name: pokemon.name },
  }));
  return {
    paths: pokemons,
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await pokeApi.get<PokemonAPI>(`/pokemon/${params?.name}`);
  const { stats, name, weight, sprites, height, abilities, id } = data;
  const origin =
    process.env.NODE_ENV == "development"
      ? process.env.LOCAL_URL
      : process.env.URL;

  return {
    props: {
      pokemon: { stats, name, weight, sprites, height, abilities, id },
      origin,
    }, // will be passed to the page component as props
  };
};
export default PokemonByName;
