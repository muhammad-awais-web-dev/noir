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
    <section className="min-h-screen lg:h-screen w-full bg-white dark:bg-black flex justify-center items-center text-black dark:text-white lg:overflow-hidden">
      <div className="flex lg:flex-row-reverse flex-col h-full lg:h-screen gap-2 w-full pt-24 p-5">
        <div className="lg:w-2/5 w-full  lg:overflow-y-auto overflow-x-auto h-fit lg:h-full shrink-0 border-2 border-black dark:border-white">
          <div className="flex flex-col lg:w-auto">
            <div className="relative w-full h-full lg:h-fit p-5 flex items-center justify-center border-2 transition-all duration-300 cursor-pointer border-black dark:border-white">
              <span className=" absolute top-0 left-0 text-sm p-5 ">IMG [1]</span>
              <img
                src={data.variants[SelectedVarient].mainImage}
                className=" max-w-150 h-80 object-contain lg:h-9/12 w-9/12 "
                alt={data.title}
              />
            </div>
            <div className=" flex h-50 overflow-x-auto  lg:h-fit lg:grid lg:grid-cols-2">
              {data.variants[SelectedVarient].gallery.map((img, idx) => (
                <div key={idx} className="relative min-w-fit lg:w-full aspect-square flex items-center justify-center border-2 transition-all duration-300 cursor-pointer border-black dark:border-white overflow-hidden">
                  <span className="absolute top-0 left-0 text-sm p-5 mix-blend-exclusion">
                    IMG [{idx + 2}]
                  </span>
                  <img
                    src={img}
                    className="w-auto lg:w-full aspect-square h-full object-contain"
                    alt={data.title}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:w-3/5 w-full lg:overflow-y-auto h-fit lg:h-full flex-1 border-2 border-black dark:border-white">
          <div className="p-3 h-fit border-2 border-black dark:border-white">
            <h1 className=" text-7xl font-bold ">{data.title} </h1>
            <p className=" text-3xl font-semibold my-5 ">
              ${data.variants[SelectedVarient].price}{" "}
            </p>
            <div className="w-fit p-3 gap-3 flex flex-col">
              <div className=" inline-flex flex-wrap full gap-3 ">
                {data.variants.map((variant, idx) => {
                  return (
                    <div
                        key={idx}
                      onClick={() => setSelectedVarient(idx)}
                      className={`group border-2 px-2 py-4 ${
                        SelectedVarient === idx
                          ? "text-white dark:text-black"
                          : "text-black dark:text-white"
                      }  border-black dark:border-white flex-1 font-bold hover:text-white dark:hover:text-black transition-colors duration-300 cursor-pointer relative`}
                    >
                      <div
                        className={`h-full ${
                          SelectedVarient === idx ? "w-full" : "w-0"
                        } absolute top-0 right-0  bg-black dark:bg-white group-hover:w-full transition-all duration-300 `}
                      ></div>
                      <span className="relative text-nowrap">{variant.name}</span>
                    </div>
                  );
                })}
              </div>
              <div className="w-full h-1 bg-gray-500 my-5" ></div>
              {data.product_type === "Null" ? null : (
                <>
                <div className="group border-2 px-2 py-4 border-black dark:border-white font-bold text-black dark:text-white hover:text-white dark:hover:text-black transition-colors duration-300 cursor-pointer relative">
                  <div className=" h-full w-0 absolute top-0 right-0  bg-black dark:bg-white group-hover:w-full transition-all duration-300 "></div>
                  <span className="relative">Buy Now</span>
                </div>
                <a href={`https://zerolifestyle.co/products/${data.handle}`} className="group border-2 px-2 py-4 border-black dark:border-white font-bold text-black dark:text-white hover:text-white dark:hover:text-black transition-colors duration-300 cursor-pointer relative">
                  <div className=" h-full w-0 absolute top-0 right-0  bg-black dark:bg-white group-hover:w-full transition-all duration-300 "></div>
                  <span className="relative">Visit On zerolifestyle.co</span>
                </a>
                </>
              )}
            </div>
            <div
              ref={bodyHTMLRef}
              className="ProductPageBodyHtml prose dark:prose-invert max-w-none"
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
