import ProductCard from "@/components/ProductCard";
import { UnOrganizedProductPlaceholder } from "@/data/PlaceholderProduct";
import { UnOrganized404ProductPlaceholder } from "@/data/Product404";
import { UnOrganizedCollectionData } from "@/types/OrganizedCollectionData";
import Link from "next/link";
import { getShortCollection } from "../api_functions/shortcolledtion/collection";

interface ProductSectionProps {
  route?: String;
  heading: String;
  limit?: number;
}

const ProductSection = async (props: ProductSectionProps) => {
  const placeholderProductValue = [
    UnOrganizedProductPlaceholder,
    UnOrganizedProductPlaceholder,
    UnOrganizedProductPlaceholder,
    UnOrganizedProductPlaceholder,
  ];
  const placeholder404ProductValue = [
    UnOrganized404ProductPlaceholder,
    UnOrganized404ProductPlaceholder,
    UnOrganized404ProductPlaceholder,
    UnOrganized404ProductPlaceholder,
  ];
  const limit = props.limit || -1;

  const data = await getShortCollection(props.route as string);

  if (!data || !data.products) {
    return (
      <section className="secert-500-products-section gap-10 w-full flex flex-col justify-center items-center text-black dark:text-white p-10 relative  z-10">
        <h2 className=" w-full text-left text-5xl font-bold ">
          {props.heading}{" "}
          <Link
            href={`collection/${props.route}`}
            className=" text-sm hover:underline cursor-pointer  font-extralight pl-5 "
          >
            {" "}
            View All{" "}
          </Link>{" "}
        </h2>
        <div className="products-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {placeholderProductValue.map((product: any, index: number) => {
            return <ProductCard key={index} product={product} index={index} />;
          })}
        </div>
      </section>
    );
  }

  const products = limit > 0 ? data.products.slice(0, limit) : data.products; 
  return (
    <section className="secert-500-products-section gap-10 w-full flex flex-col justify-center items-center text-black dark:text-white p-10 relative  z-10">
      <h2 className=" w-full text-left text-5xl font-bold ">
        {props.heading}{" "}
        <Link
          href={`collection/${props.route}`}
          className=" text-sm hover:underline cursor-pointer  font-extralight pl-5 "
        >
          {" "}
          View All{" "}
        </Link>{" "}
      </h2>
      <div className="products-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {products.map((product: any, index: number) => {
          return <ProductCard key={index} product={product} index={index} />;
        })}
      </div>
    </section>
  );
};

export default ProductSection;
