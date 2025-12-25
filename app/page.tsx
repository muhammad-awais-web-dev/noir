import Image from "next/image";
import Hero from "./sections/Hero";
import ProductSection from "./sections/ProductSections";
import LinkCard from "@/components/LinkCard";

const sectionlinks = [
  {
    title: "For Fashion",
    imgLink:
      "https://cdn.shopify.com/s/files/1/0722/8106/3702/files/1_ee8ac544-ead9-49a7-84c0-9f8c4a75d15d.webp?v=1756127463",
    link: "/products/regal-smartwatch",
  },
  {
    title: "For Adventure",
    imgLink:
      "https://cdn.shopify.com/s/files/1/0722/8106/3702/files/MAGNETICBLUEORANGE_1.webp?v=1723561195",
    link: "/collections/adventure",
  },
  {
    title: "For Your Lifestyle",
    imgLink:
      "https://cdn.shopify.com/s/files/1/0722/8106/3702/files/Black_4_c986e7b0-a61c-41d3-a8ce-4a469882bade.webp?v=1752432598",
    link: "/collections/lifestyle-oriented",
  },
  {
    title: "For Productivity",
    imgLink:
      "https://cdn.shopify.com/s/files/1/0722/8106/3702/files/1_d8b06a71-8b9c-4564-8344-11b83b4ca7b3.webp?v=1766048642",
    link: "/collections/productivity",
  },
  {
    title: "For The Gammers",
    imgLink:
      "https://cdn.shopify.com/s/files/1/0722/8106/3702/files/Arcade-900-Black-4.webp?v=1730962665",
    link: "/collections/arcade-series",
  },
  {
    title: "For The Productivity Pros",
    imgLink:
      "https://cdn.shopify.com/s/files/1/0722/8106/3702/files/wave_blue.webp?v=1732361974",
    link: "/products/wave-earbuds",
  },
  {
    title: "For The Audio Enthusiasts",
    imgLink:
      "https://cdn.shopify.com/s/files/1/0722/8106/3702/files/Robo_Silver_3.webp?v=1742691968",
    link: "/products/robo-earbuds",
  },
  {
    title: "For The Focused Listners",
    imgLink:
      "https://cdn.shopify.com/s/files/1/0722/8106/3702/files/Zero_Quantum_Blue_03.webp?v=1733836416",
    link: "/products/quantum-earbuds",
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <div className=" w-full bg-white p-10 dark:bg-black h-fit relative ">
        {/*need to add link later*/}
        <img
          width={2048}
          height={651}
          alt="Banner"
          src="/images/defaultbanner.png"
          loading="lazy"
          className=" w-full h-auto object-cover "
        />
      </div>
      <div className=" bg-white dark:bg-black ">
        <ProductSection
          limit={4}
          route={"secret-500"}
          heading={"11.11 Special: Extra 500 Rs Off"}
        />
        <ProductSection
          limit={4}
          route={"azadi-sale"}
          heading={"Best Seller"}
        />
        <ProductSection
          limit={4}
          route={"smartwatches-under-5500"}
          heading={"Smart Watches Under Rs.5,500"}
        />
        <section className=" grid grid-cols-1 grid-rows-5 md:grid-cols-2 lg:grid-cols-4 md:grid-rows-4 lg:grid-rows-2 gap-2 md:gap-5 lg:gap-10 w-full justify-center items-center text-black dark:text-white p-10 relative  z-10">
          <img
            loading="lazy"
            src="https://cdn.shopify.com/s/files/1/0722/8106/3702/files/khanzada.webp?v=1761999042"
            alt="Rethink Possibilities"
            className=" md:col-span-2 md:row-span-2 rounded-2xl shadow-2xl  border-2 border-gray-200 dark:border-gray-700 "
          />
          {[
            sectionlinks[0],
            sectionlinks[1],
            sectionlinks[2],
            sectionlinks[3],
          ].map((sectionlink, index) => (
            <LinkCard sectionlink={sectionlink} index={index} key={index} />
          ))}
        </section>
        <section className=" grid grid-cols-1 grid-rows-5 md:grid-cols-2 lg:grid-cols-4 md:grid-rows-4 lg:grid-rows-2 gap-2 md:gap-5 lg:gap-10 w-full justify-center items-center text-black dark:text-white p-10 relative  z-10">
          <img
            loading="lazy"
            src="https://cdn.shopify.com/s/files/1/0722/8106/3702/files/tabish.webp?v=1761999059"
            alt="Rethink Possibilities"
            className="lg:hidden md:col-span-2 md:row-span-2 rounded-2xl shadow-2xl  border-2 border-gray-200 dark:border-gray-700 "
          />
          {[sectionlinks[4], sectionlinks[5]].map((sectionlink, index) => (
            <LinkCard sectionlink={sectionlink} index={index} key={index} />
          ))}
          <img
            loading="lazy"
            src="https://cdn.shopify.com/s/files/1/0722/8106/3702/files/tabish.webp?v=1761999059"
            alt="Rethink Possibilities"
            className="hidden lg:block md:col-span-2 md:row-span-2 rounded-2xl shadow-2xl  border-2 border-gray-200 dark:border-gray-700 "
          />
          {[sectionlinks[6], sectionlinks[7]].map((sectionlink, index) => (
            <LinkCard sectionlink={sectionlink} index={index} key={index} />
          ))}
        </section>
      </div>
    </>
  );
}
