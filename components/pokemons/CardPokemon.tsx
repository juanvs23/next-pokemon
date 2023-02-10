import React from "react";
import { Card, Row, Text } from "@nextui-org/react";
import Image from "next/image";
import Logo from "../../public/pokeball.svg";
import { PokemonItem } from "../../models";
import { useRouter } from "next/router";

interface CardProps {
  pokemon: PokemonItem;
}
const CardPokemon = (props: CardProps) => {
  const route = useRouter();
  const { pokemon } = props;
  const onClick = () => {
    route.push(`/pokemon/${pokemon.name}`);
  };
  return (
    <Card isPressable onClick={onClick}>
      <Card.Body css={{ p: 0 }}>
        <Image
          src={pokemon.img || Logo}
          style={{ margin: "auto" }}
          width={140}
          height={140}
          alt={pokemon.name}
        />
      </Card.Body>
      <Card.Divider />
      <Card.Footer css={{ justifyItems: "center" }}>
        <Row wrap="wrap" justify="center" align="center">
          <Text css={{ texAlign: "center" }} b>
            {pokemon.name}
          </Text>
        </Row>
      </Card.Footer>
    </Card>
  );
};

export default CardPokemon;
