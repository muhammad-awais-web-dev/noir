import { NavMenuItemsType } from "@/types/NavMenuItesmType";

const NavMenuItems: NavMenuItemsType[] = [
  { text: "Home", link: "/", image1: "/zerologo.svg", image2: "/zerologo.svg" },
  {
    text: "Zero Earbuds",
    link: "/collections/earbuds-zbuds",
    image1: "/images/earbud1.webp",
    image2: "/images/earbud2.webp",
  },
  {
    text: "Headphones",
    link: "/collections/headphones",
    image1: "/images/headphone1.webp",
    image2: "/images/headphone2.webp",
  },
  {
    text: "Smartwatches",
    link: "/collections/smart-watches",
    image1: "/images/watch1.webp",
    image2: "/images/watch2.webp",
  },
  { text: "Support", link: "/support", image1: "/support.svg", image2: "/support.svg" },
];

export default NavMenuItems;
