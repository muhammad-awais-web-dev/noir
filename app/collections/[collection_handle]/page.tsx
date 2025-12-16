"use client";
import { useParams, useSearchParams } from "next/navigation";
import { OrganizedCollectionData } from "@/types/OrganizedCollectionData";
import { useEffect, useRef, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

const page = () => {
  const params = useParams();
  const SearchParams = useSearchParams();
  const page = SearchParams.get('page') || '1';
  const collection_handle = params.collection_handle as string;
  const [data, setData] = useState<OrganizedCollectionData | null>(null);

  useEffect(() => {
    if (collection_handle) {
      fetch(`/api/collections/${collection_handle}?page=${page}`)
        .then((res) => {
          if (!res.ok) throw new Error("Collection not found");
          return res.json();
        })
        .then((data: OrganizedCollectionData) => {
          setData(data);
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [collection_handle]);
  return (
    <section className=" bg-white dark:bg-black pt-30 min-h-screen w-full flex flex-col  text-black dark:text-white ">
      {data ? (
        <>
          <img
            src={data.image.src}
            alt={data.image.alt}
            key={data.id}
            className=" w-full "
          />
          <h1 className=" text-5xl font-bold text-center my-5 ">
            {data.title}
          </h1>
          <div className="products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full p-5">
            {data.products.map((product, index) => (
              <ProductCard key={index} product={product} index={index} />
            ))}
          </div>
          <div className="bg-blue flex justify-center items-center gap-10" >
            <Link href={page && parseInt(page) > 1 ? `/collections/${collection_handle}?page=${parseInt(page)-1}` : '#'} className={` ${page && parseInt(page) > 1 ? 'text-black dark:text-white' : 'text-gray-500 cursor-not-allowed' }  border-2 border-black dark:border-white px-5 py-2 `} >
                Previous
            </Link>
            <Link href={page && parseInt(page)*30 <data.products_count ? `/collections/${collection_handle}?page=${parseInt(page)+1}` : "#" } className={` ${page && parseInt(page)*30 <data.products_count ? 'text-black dark:text-white' : 'text-gray-500 cursor-not-allowed' }  border-2 border-black dark:border-white px-5 py-2 `} >                Next
            </Link>
          </div>
        </>
      ) : (
        "///Loading"
      )}
    </section>
  );
};

export default page;
