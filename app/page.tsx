import Hero from "./sections/Hero";
import ProductSection from "./sections/ProductSections"

export default function Home() {
  return (
    <>
    <Hero />
    <div className=" w-full bg-white p-10 dark:bg-black h-fit relative " >{/*need to add link later*/}
      <img src="/images/banner.png" className=" w-full h-auto object-cover " />
    </div>
    <div className=" bg-white dark:bg-black " >
    <ProductSection route={"secret500"} heading={"11.11 Special: Extra 500 Rs Off"} />
    <ProductSection route={"bestseller"} heading={"Best Seller"} />
    <ProductSection route={"newarrivals"} heading={"New Arrivals"} />
    </div>
    </>
  );
}
