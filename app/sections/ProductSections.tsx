"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { UnOrganizedProductPlaceholder } from "@/data/PlaceholderProduct";
import { UnOrganized404ProductPlaceholder } from "@/data/Product404";
import Link from "next/link";

interface ProductSectionProps {
  route?: String;
  heading: String;
  limit?: number;
}

const ProductSection = (props: ProductSectionProps) => {
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
  const [products, setProducts] = useState<any[]>([...placeholderProductValue]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "/api/shortcolledtion/" + (props.route || "secret-500")
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      setProducts(data.products || data || []);
      if (limit > 0) {
        setProducts((data.products || data || []).slice(0, limit));
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts(placeholder404ProductValue);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
