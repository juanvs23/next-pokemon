import { NextPageContext } from "next";
import React from "react";

export interface Context extends NextPageContext {
  id?: string;
}
export interface MetaContent {
  description?: string;
  keyword?: string;
  icon?: string;
  image?: string;
  url?: string;
  type?: string;
}
export interface ChildrenComponent {
  children?: React.ReactNode;
  title?: string;
  meta?: MetaContent;
}
