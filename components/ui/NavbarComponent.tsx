import { Button, Spacer, Text, useTheme } from "@nextui-org/react";
import Image from "next/image";
import Logo from "../../public/pokeball.svg";

import React from "react";
import Link from "next/link";

const NavbarComponent = () => {
  const { theme } = useTheme();
  return (
    <nav
      style={{
        backgroundColor: theme?.colors.gray300.value,
        color: theme?.colors.white.value,
        padding: "0 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Link
        href={"/"}
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Image
          src={Logo}
          alt="Logo"
          height={50}
          width={50}
          style={{ paddingRight: "15px" }}
        />
        <Text h1>P</Text>
        <Text h2>ókemon</Text>
      </Link>

      <Spacer css={{ flex: "1" }} />
      <Link href={"/favorites"} passHref>
        <Button ghost shadow color="gradient" auto>
          <Text h3> Favoritos</Text>
        </Button>
      </Link>
    </nav>
  );
};

export default NavbarComponent;
