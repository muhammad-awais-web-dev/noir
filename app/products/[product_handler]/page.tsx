"use client";

import { OrganizedProductPlaceholder } from "@/data/PlaceholderProduct";
import { Organized404ProductPlaceholder } from "@/data/Product404";
import OrganizedProductOutput from "@/types/OrganizedProductOutput";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Page = () => {
  const params = useParams();
  const product = params.product_handler as string;
  const [data, setData] = useState<OrganizedProductOutput>(
    OrganizedProductPlaceholder
  );
  const [SelectedVarient, setSelectedVarient] = useState(0);
  const bodyHTMLRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (product) {
      fetch(`/api/products/${product}`)
        .then((res) => {
          if (!res.ok) throw new Error("Product not found");
          return res.json();
        })
        .then((fetchedData) => {
          setData(fetchedData);
        })
        .catch((error) => {
          console.error(error);
          setData(Organized404ProductPlaceholder);
        });
    }
  }, [product]);

  useEffect(() => {
    if (bodyHTMLRef.current && data.body_html) {
      bodyHTMLRef.current.innerHTML = data.body_html;
    }
  }, [data]);

  return (
    <section className="h-screen w-screen bg-white dark:bg-black flex justify-center items-center text-black dark:text-white overflow-hidden">
      <div className="flex lg:flex-row-reverse flex-col h-screen gap-2 w-full pt-24 p-5">
        <div className="lg:w-1/2 w-full  lg:overflow-y-auto overflow-x-auto lg:h-full h-75 shrink-0 border-2 border-black dark:border-white">
          <div className="lg:h-[200vh] flex md:flex-col lg:w-auto w-[200vw]">
            <div className="relative w-full h-fit flex items-center justify-center border-2  grayscale-100 hover:grayscale-0 transition-all duration-300 cursor-pointer border-black dark:border-white">
              <span className=" absolute top-0 left-0 text-sm p-5 ">IMG 1</span>
              <img
                src={data.variants[SelectedVarient].mainImage}
                className=" max-w-150 w-10/12 "
                alt={data.title}
              />
            </div>
            <div className=" grid grid-cols-2 ">
              {data.variants[SelectedVarient].gallery.map((img, idx) => (
                <div className="relative w-full h-fit flex items-center justify-center border-2  grayscale-100 hover:grayscale-0 transition-all duration-300 cursor-pointer border-black dark:border-white">
                  <span className=" absolute top-0 left-0 text-sm p-5 mix-blend-exclusion ">
                    IMG [{idx + 2}]
                  </span>
                  <img
                    src={img}
                    className=" max-w-150 w-10/12 "
                    alt={data.title}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 w-full  overflow-y-auto lg:h-full flex-1 border-2 border-black dark:border-white">
          <div className="h-fit border-2 border-black dark:border-white">
            <h1 className=" text-7xl font-bold ">{data.title} </h1>
            <p className=" text-3xl font-semibold my-5 ">
              ${data.variants[SelectedVarient].price}{" "}
            </p>
            <div className="w-fit p-3 gap-3 flex flex-col">
              <div className=" inline-flex gap-3 w-fit ">
                {data.variants.map((variant, idx) => {
                  return (
                    <div
                      onClick={() => setSelectedVarient(idx)}
                      className={`group border-2 px-2 py-4 ${SelectedVarient === idx? "text-white dark:text-black":"text-black dark:text-white" }  border-black dark:border-white font-bold hover:text-white dark:hover:text-black transition-colors duration-300 cursor-pointer relative`}
                    >
                      <div className={`h-full ${SelectedVarient === idx? "w-full":"w-0" } absolute top-0 right-0  bg-black dark:bg-white group-hover:w-full transition-all duration-300 `}></div>
                      <span className="relative">{variant.name}</span>
                    </div>
                  );
                })}
              </div>
              {data.product_type === "Null"? null:
              <div className="group border-2 px-2 py-4 border-black dark:border-white font-bold text-black dark:text-white hover:text-white dark:hover:text-black transition-colors duration-300 cursor-pointer relative">
                <div className=" h-full w-0 absolute top-0 right-0  bg-black dark:bg-white group-hover:w-full transition-all duration-300 "></div>
                <span className="relative" >Buy Now</span>
              </div>
                }
            </div>
            <div
              ref={bodyHTMLRef}
              className=" ProductPageBodyHtml prose dark:prose-invert max-w-none"
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
