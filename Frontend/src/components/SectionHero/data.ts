import Image, { StaticImageData } from "next/image";
import { Route } from "@/routers/types";
import imageRightPng from "@/images/hero-1.png";
import imageRightPng2 from "@/images/hero-2.png";
import imageRightPng3 from "@/images/hero-3.png";
import banner1 from "@/images/banner1.png";
import banner2 from "@/images/banner2.png";
import banner3 from "@/images/banner3.png";

interface Hero2DataType {
  image: StaticImageData | string;
  heading: string;
  subHeading: string;
  btnText: string;
  btnLink: Route;
}

export const HERO2_DEMO_DATA: Hero2DataType[] = [
  {
    image: banner1,
    heading: "Temukan keajaiban dunia teknologi yang tak terbatas, jelajahi sepuasmu.",
    subHeading: "",
    btnText: "Shop now",
    btnLink: "/collection",
  },
  {
    image: banner2,
    heading: "Temukan keajaiban dunia teknologi yang tak terbatas, jelajahi sepuasmu.",
    subHeading: "",
    btnText: "Shop now",
    btnLink: "/collection",
  },
  {
    image: banner3,
    heading: "Temukan keajaiban dunia teknologi yang tak terbatas, jelajahi sepuasmu.",
    subHeading: "",
    btnText: "Shop now",
    btnLink: "/collection",
  },
];
