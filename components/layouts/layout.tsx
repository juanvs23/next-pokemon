import Head from "next/head";
import React from "react";
import { ChildrenComponent } from "../../models/nexts";
import NavbarComponent from "../ui/NavbarComponent";

const Layout: React.FC<ChildrenComponent> = ({ children, title, meta }) => {
  return (
    <>
      <Head>
        <title>{`${title || "index"} - Pokemon`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={meta?.description} />
        <meta property="og:title" content={title} />
        <meta property="og:url" content={`${meta?.url}`} />
        <meta property="og:image" content={`${meta?.image}`} />
        <meta property="og:type" content={`${meta?.type}`} />
        <meta property="og:description" content={`${meta?.description}`} />

        <link
          rel="icon"
          href={meta?.icon || "./pokeball.png"}
          type="image/png"
        />
      </Head>
      <NavbarComponent />
      <main>{children}</main>
    </>
  );
};

export default Layout;
