"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "@/provider/CartProvider";
import { CartItem } from "@/types/Cart";
import OrganizedProductOutput from "@/types/OrganizedProductOutput";

interface ProductPageClientProps {
  productData: OrganizedProductOutput;
}

const ProductPageClient = ({ productData }: ProductPageClientProps) => {
  const [mounted, setMounted] = useState(false);
  const { cartItems, addProductToCart, removeItemFromCart } = useCart();
  const [SelectedVarient, setSelectedVarient] = useState(0);
  const bodyHTMLRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const selectedVariantData = productData.variants[SelectedVarient];
  const variantCartItem: CartItem = {
    id: selectedVariantData.id,
    name: productData.title,
    variation: selectedVariantData.name,
    handle: productData.handle,
    image: {
      src: selectedVariantData.mainImage,
      alt: productData.title,
    },
    quantity: 1,
    price: parseInt(selectedVariantData.price),
    compare_at_price: parseInt(productData.variants[0].price),
  };

  useEffect(() => {
    if (bodyHTMLRef.current && productData.body_html) {
      bodyHTMLRef.current.innerHTML = productData.body_html;
    }
  }, [productData]);

  return (
    <section className="min-h-screen lg:h-screen w-full bg-white dark:bg-black flex justify-center items-center text-black dark:text-white lg:overflow-hidden">
      <div className="flex lg:flex-row-reverse flex-col h-full lg:h-screen gap-2 w-full pt-24 p-5">
        <div className="lg:w-2/5 w-full  lg:overflow-y-auto overflow-x-auto h-fit lg:h-full shrink-0 border-2 border-black dark:border-white">
          <div className="flex flex-col lg:w-auto">
            <div className="relative w-full h-full lg:h-fit p-5 flex items-center justify-center border-2 transition-all duration-300 cursor-pointer border-black dark:border-white">
              <span className=" absolute top-0 left-0 text-sm p-5 ">
                IMG [1]
              </span>
              <img
                src={productData.variants[SelectedVarient].mainImage}
                className=" max-w-150 h-80 object-contain lg:h-9/12 w-9/12 "
                alt={productData.title}
              />
            </div>
            <div className=" flex h-50 overflow-x-auto  lg:h-fit lg:grid lg:grid-cols-2">
              {productData.variants[SelectedVarient].gallery.map((img, idx) => (
                <div
                  key={idx}
                  className="relative min-w-fit lg:w-full aspect-square flex items-center justify-center border-2 transition-all duration-300 cursor-pointer border-black dark:border-white overflow-hidden"
                >
                  <span className="absolute top-0 left-0 text-sm p-5 mix-blend-exclusion">
                    IMG [{idx + 2}]
                  </span>
                  <img
                    src={img}
                    className="w-auto lg:w-full aspect-square h-full object-contain"
                    alt={productData.title}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:w-3/5 w-full lg:overflow-y-auto h-fit lg:h-full flex-1 border-2 border-black dark:border-white">
          <div className="p-3 h-fit border-2 border-black dark:border-white">
            <h1 className=" text-7xl font-bold ">{productData.title} </h1>
            <p className=" text-3xl font-semibold my-5 line-through ">
              Rs.{productData.variants[SelectedVarient].compare_at_price}{" "}
            </p>
            <p className=" text-3xl font-semibold my-5 ">
              Rs.{productData.variants[SelectedVarient].price}{" "}
            </p>
            <div className="w-fit p-3 gap-3 flex flex-col">
              <div className=" inline-flex flex-wrap full gap-3 ">
                {productData.variants.map((variant, idx) => {
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
                      <span className="relative text-nowrap">
                        {variant.name}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="w-full h-1 bg-gray-500 my-5"></div>
              {productData.product_type === "Null" ? null : (
                <>
                  {!mounted ? (
                    <div className="group border-2 px-2 py-4 border-black dark:border-white font-bold text-black dark:text-white transition-colors duration-300 cursor-pointer relative">
                      <span className="relative">Loading...</span>
                    </div>
                  ) : cartItems.findIndex(
                    (item) =>
                      item.handle === productData.handle &&
                      item.variation === selectedVariantData.name
                  ) === -1 ? (
                    <div
                      onClick={() => addProductToCart(variantCartItem, 1)}
                      className="group border-2 px-2 py-4 border-black dark:border-white font-bold text-black dark:text-white hover:text-white dark:hover:text-black transition-colors duration-300 cursor-pointer relative"
                    >
                      <div className=" h-full w-0 absolute top-0 right-0  bg-black dark:bg-white group-hover:w-full transition-all duration-300 "></div>
                      <span className="relative">Add To Cart</span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-7 gap-3">
                      <div
                        onClick={() => removeItemFromCart(variantCartItem, 1)}
                        className="col-span-3 group text-center border-2 px-2 py-4 border-black dark:border-white font-bold text-black dark:text-white hover:text-white dark:hover:text-black transition-colors duration-300 cursor-pointer relative"
                      >
                        <div className=" h-full w-0 absolute top-0 right-0  bg-black dark:bg-white group-hover:w-full transition-all duration-300 "></div>
                        <span className="relative">-</span>
                      </div>
                      <div className="group text-center px-2 py-4 border-black dark:border-white font-bold text-black dark:text-white transition-colors duration-300 cursor-pointer relative">
                        <span className="relative">
                          {cartItems.find(
                            (item) =>
                              item.handle === productData.handle &&
                              item.variation === selectedVariantData.name
                          )?.quantity || 0}{" "}
                        </span>
                      </div>
                      <div
                        onClick={() => addProductToCart(variantCartItem, 1)}
                        className="col-span-3 group text-center border-2 px-2 py-4 border-black dark:border-white font-bold text-black dark:text-white hover:text-white dark:hover:text-black transition-colors duration-300 cursor-pointer relative"
                      >
                        <div className=" h-full w-0 absolute top-0 right-0  bg-black dark:bg-white group-hover:w-full transition-all duration-300 "></div>
                        <span className="relative">+</span>
                      </div>
                    </div>
                  )}
                  <a
                    href={`https://zerolifestyle.co/products/${productData.handle}`}
                    className="group border-2 px-2 py-4 border-black dark:border-white font-bold text-black dark:text-white hover:text-white dark:hover:text-black transition-colors duration-300 cursor-pointer relative"
                  >
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

export default ProductPageClient;
