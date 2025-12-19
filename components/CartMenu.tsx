"use client";

import { useCart } from "@/provider/CartProvider";
import { useGSAP } from "@gsap/react";
import gsap, { Observer } from "gsap/all";
import { MinusIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(Observer);

const CartMenu = (props: {
  cartOpen: boolean;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { cartItems, cartItemsBundled, addProductToCart, removeItemFromCart } =
    useCart();
  const { cartOpen, setCartOpen } = props;
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cartItems.length < 1) setTimeout(() => setCartOpen(false), 500);
  }, [cartItems,cartOpen]);

  useGSAP(() => {
    //MenuRef

    if (cartRef.current === null) return;
    const menu = cartRef.current;
    const tl = gsap.timeline();
    if (cartOpen) {
      tl.to(menu, {
        top: 0,
        duration: 0.3,
      });
    } else {
      tl.to(menu, {
        top: -100 + "%",
        duration: 0.3,
      });
    }
  }, [cartOpen]);

  return (
    <div
      ref={cartRef}
      className={` fixed grid grid-cols-2 overflow-y-hidden -top-full pt-16 right-0 w-full h-full bg-white text-black dark:bg-black dark:text-white backdrop-blur-lg transition-all duration-300 z-40 `}
    >
      <div className=" col-1  overflow-y-auto ">
        {cartItemsBundled.map((item, idx) => {
          return (
            <div
              key={idx}
              className="h-fit w-full p-5 border dark:border-white border-black "
            >
              <h2 className="dark:text-white text-black text-3xl font-bold ">
                {item.name}
              </h2>
              {item.variation.map((variation, vIdx) => {
                return (
                  <div key={vIdx} className="flex p-5 w-full h-48 ">
                    <div className=" grid dark:bg-black/50 bg-transparent border-black dark:border-white border-2 rounded-3xl overflow-hidden grid-cols-5 relative justify-between items-center h-full w-full p-5 ">
                      <div className="col-span-1  flex  overflow-hidden rounded-xl h-full aspect-square">
                        <img
                          src={variation.image.src}
                          alt={variation.image.alt}
                          className=" w-full h-full object-contain "
                        />
                      </div>
                      <div className="col-span-1 ">
                        <p className=" text-xl font-semibold ">
                          Variation: {variation.name}
                        </p>
                        <p> Price: Rs.{variation.price} </p>
                      </div>
                      <div className="col-span-1 flex justify-center items-center gap-5">
                        <span className=" text-2xl ">{variation.quantity}</span>
                        <div className=" flex flex-col gap-2">
                          <div
                            className="border-black dark:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors duration-300 cursor-pointer border-2 rounded-full text-md text-black dark:text-white aspect-square h-fit  flex justify-center items-center "
                            onClick={() =>
                              addProductToCart(
                                cartItems.find(
                                  (cartItem) => cartItem.handle === item.handle
                                ) || cartItems[0],
                                1
                              )
                            }
                          >
                            <PlusIcon />
                          </div>
                          <div
                            className="border-black dark:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors duration-300 cursor-pointer border-2 rounded-full text-md text-black dark:text-white aspect-square h-fit  flex justify-center items-center "
                            onClick={() =>
                              removeItemFromCart(
                                cartItems.find(
                                  (cartItem) => cartItem.handle === item.handle
                                ) || cartItems[0],
                                1
                              )
                            }
                          >
                            <MinusIcon />
                          </div>
                        </div>
                      </div>
                      <p className="col-span-1 text-center text-lg font-semibold ">
                        Rs.
                        {variation.price * variation.quantity}
                      </p>
                      <div className="col-span-1 "></div>
                      <div
                        className="h-full w-fit dark:bg-white bg-black border absolute top-0 right-0 flex justify-center items-center dark:text-black text-white cursor-pointer "
                        onClick={() =>
                          removeItemFromCart(
                            cartItems.find(
                              (cartItem) => cartItem.handle === item.handle
                            ) || cartItems[0],
                            -1
                          )
                        }
                      >
                        <div className=" w-full h-full flex justify-center p-5 items-center relative group ">
                          <div className=" absolute top-0 right-0 bg-red-800 h-full w-0 group-hover:w-full transition-all duration-300"></div>
                          <span className=" relative group-hover:text-white transition-colors duration-300">
                            Delete
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CartMenu;
