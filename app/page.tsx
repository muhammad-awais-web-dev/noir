import Image from "next/image";
import Hero from "./sections/Hero";
import ProductSection from "./sections/ProductSections";

const sectionlinks = [
  {
    title: "For Fashion",
    imgLink:
      "https://cdn.shopify.com/s/files/1/0722/8106/3702/files/regal_bg.jpg?v=1739884653",
    link: "/products/regal-smartwatch",
  },
  {
    title: "For Adventure",
    imgLink:
      "https://cdn.shopify.com/s/files/1/0722/8106/3702/files/New-Website-Smartwatch-Category-Banner_02.webp?v=1732355317",
    link: "/collections/adventure",
  },
  {
    title: "For Your Lifestyle",
    imgLink:
      "https://cdn.shopify.com/s/files/1/0722/8106/3702/files/New-Website-Smartwatch-Category-Banner_04.webp?v=1732355316",
    link: "/collections/lifestyle-oriented",
  },
  {
    title: "For Productivity",
    imgLink:
      "https://cdn.shopify.com/s/files/1/0722/8106/3702/files/New-Website-Smartwatch-Category-Banner_03.webp?v=1732355316",
    link: "/collections/productivity",
  },
  {
    title: "For The Gammers",
    imgLink:
      "https://cdn.shopify.com/s/files/1/0722/8106/3702/files/New-Website-Earbuds-Category-Banner_01.webp?v=1732355316",
    link: "/collections/arcade-series",
  },
  {
    title: "For The Productivity Pros",
    imgLink:
      "https://cdn.shopify.com/s/files/1/0722/8106/3702/files/New-Website-Earbuds-Category-Banner_02.webp?v=1732355316",
    link: "/products/wave-earbuds",
  },
  {
    title: "For The Audio Enthusiasts",
    imgLink:
      "https://cdn.shopify.com/s/files/1/0722/8106/3702/files/Robo_bg.jpg?v=1739884654",
    link: "/products/robo-earbuds",
  },
  {
    title: "For The Focused Listners",
    imgLink:
      "https://cdn.shopify.com/s/files/1/0722/8106/3702/files/New-Website-Earbuds-Category-Banner_04.webp?v=1732355316",
    link: "/products/quantum-earbuds",
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <div className=" w-full bg-white p-10 dark:bg-black h-fit relative ">
        {/*need to add link later*/}
        <Image
          width={2048}
          height={651}
          alt="Banner"
          src="/images/banner.png"
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
          {[sectionlinks[0],sectionlinks[1],sectionlinks[2],sectionlinks[3]].map((sectionlink, index) => (
            <a
              href={sectionlink.link}
              key={index}
              className="bg-white text-black dark:shadow-white/40  relative col-span-1 row-span-1 p-5 hover:-translate-y-2 md:hover:-translate-y-5 h-full flex justify-center items-center transition-all duration-300 rounded-2xl overflow-hidden shadow-2xl  border-2 border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-left absolute w-1/2 h-fit top-2 left-2 text-[4vw] md:text-xl lg:text-[1.5vw] font-extralight m-2">
                {sectionlink.title}
              </h3>
              <img
          loading="lazy"
                src={sectionlink.imgLink}
                alt={sectionlink.title}
                className="w-full h-auto object-cover"
              />
            </a>
          ))}
        </section>
                <section className=" grid grid-cols-1 grid-rows-5 md:grid-cols-2 lg:grid-cols-4 md:grid-rows-4 lg:grid-rows-2 gap-2 md:gap-5 lg:gap-10 w-full justify-center items-center text-black dark:text-white p-10 relative  z-10">
          <img
          loading="lazy"
            src="https://cdn.shopify.com/s/files/1/0722/8106/3702/files/tabish.webp?v=1761999059"
            alt="Rethink Possibilities"
            className="lg:hidden md:col-span-2 md:row-span-2 rounded-2xl shadow-2xl  border-2 border-gray-200 dark:border-gray-700 "
          />
          {[sectionlinks[4],sectionlinks[5]].map((sectionlink, index) => (
            <a
              href={sectionlink.link}
              key={index}
              className="bg-white text-black dark:shadow-white/40  relative col-span-1 row-span-1 p-5 hover:-translate-y-2 md:hover:-translate-y-5 h-full flex justify-center items-center transition-all duration-300 rounded-2xl overflow-hidden shadow-2xl  border-2 border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-left absolute w-1/2 h-fit top-2 left-2 text-[4vw] md:text-xl lg:text-[1.5vw] font-extralight m-2">
                {sectionlink.title}
              </h3>
              <img
          loading="lazy"
                src={sectionlink.imgLink}
                alt={sectionlink.title}
                className="w-full h-auto object-cover"
              />
            </a>
          ))}
          <img
          loading="lazy"
            src="https://cdn.shopify.com/s/files/1/0722/8106/3702/files/tabish.webp?v=1761999059"
            alt="Rethink Possibilities"
            className="hidden lg:block md:col-span-2 md:row-span-2 rounded-2xl shadow-2xl  border-2 border-gray-200 dark:border-gray-700 "
          />
                    {[sectionlinks[6],sectionlinks[7]].map((sectionlink, index) => (
            <a
              href={sectionlink.link}
              key={index}
              className="bg-white text-black dark:shadow-white/40  relative col-span-1 row-span-1 p-5 hover:-translate-y-2 md:hover:-translate-y-5 h-full flex justify-center items-center transition-all duration-300 rounded-2xl overflow-hidden shadow-2xl  border-2 border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-left absolute w-1/2 h-fit top-2 left-2 text-[4vw] md:text-xl lg:text-[1.5vw] font-extralight m-2">
                {sectionlink.title}
              </h3>
              <img
          loading="lazy"
                src={sectionlink.imgLink}
                alt={sectionlink.title}
                className="w-full h-auto object-cover"
              />
            </a>
          ))}
        </section>
      </div>
    </>
  );
}
