import React from "react";

import { Container, Grid, Image, Text } from "@nextui-org/react";

const NoPokemon = () => {
  return (
    <Grid
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "calc(100vh - 138px)",
        justifyContent: "center",
      }}
    >
      <Text h1>No hay Favoritos</Text>
      <Image src="/pokeball.png" height={200} width={200} alt="Pokeball" />
    </Grid>
  );
};

export default NoPokemon;
