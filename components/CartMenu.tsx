"use client";

import { useCart } from "@/provider/CartProvider";
import { useGSAP } from "@gsap/react";
import gsap, { Observer } from "gsap/all";
import { MinusIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import DeliveryForm from "./DeliveryForm";

gsap.registerPlugin(Observer);

const PromoCodes: {
  [key: string]: {
    name: string;
    discount: number;
    type: "Cut" | "percentage";
    max?: number;
  };
} = {
  NEWYEAR2025: { name: "New Year Discount", discount: 500, type: "Cut" },
  WINTER2025: { name: "Winter Sale", discount: 300, type: "Cut" },
  FESTIVE2025: { name: "Festive Offer", discount: 250, type: "Cut" },
  TENPERCENT2025: {
    name: "10% OFF UpTo Rs.2000",
    discount: 10,
    type: "percentage",
    max: 2000,
  },
};

const CartMenu = (props: {
  cartOpen: boolean;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const {
    cartItems,
    cartItemsBundled,
    addProductToCart,
    removeItemFromCart,
    cartTotal,
    clearCart,
  } = useCart();
  const { cartOpen, setCartOpen } = props;
  const cartRef = useRef<HTMLDivElement>(null);
  const [deliveryFormValid, setDeliveryFormValid] = useState<boolean>(false);
  const [promoCode, setPromoCode] = useState<string>("");
  const [promoCodeSet, setPromoCodeSet] = useState<string>("");
  const [promoCodeReduction, setPromoCodeReduction] = useState<number>(0);
  const [mobilestep, setmobilestep] = useState<1 | 2>(1);

  useEffect(() => {
    if (promoCodeSet !== "" && promoCodeSet in PromoCodes) {
      if (PromoCodes[promoCodeSet].type === "Cut") {
        setPromoCodeReduction(PromoCodes[promoCodeSet].discount);
      } else {
        setPromoCodeReduction(
          Math.min(
            Math.floor(
              (cartTotal + (formData?.shipingCost || 0)) *
                (PromoCodes[promoCodeSet].discount / 100)
            ),
            PromoCodes[promoCodeSet].max || Infinity
          )
        );
      }
    }
  }, [promoCodeSet]);

  const [formData, setFormData] = useState<{
    firstName: string;
    province: string;
    city: string;
    shipingCost: number;
    street: string;
    home: string;
  }>({
    firstName: "",
    province: "",
    city: "",
    shipingCost: 0,
    street: "",
    home: "",
  });

  const validatePromoCode = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (promoCode in PromoCodes) {
      setPromoCodeSet(promoCode);
    } else {
      setPromoCodeSet("");
    }
  };

  const handlePlaceOrder = () => {
    clearCart();
    setCartOpen(false);
    router.push("/thankyou");
  };

  const finalTotal =
    cartTotal + (formData?.shipingCost || 0) - promoCodeReduction;

  useEffect(() => {
    if (cartItems.length < 1) setTimeout(() => setCartOpen(false), 500);
  }, [cartItems, cartOpen]);

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
      className={` fixed grid grid-cols-2 lg:grid-cols-6 overflow-y-hidden -top-full pt-16 right-0 w-[200%] ${
        mobilestep === 1 ? "translate-x-1/2" : ""
      } lg:translate-x-0 lg:w-full h-full bg-white text-black dark:bg-black dark:text-white backdrop-blur-lg transition-all duration-300 z-40 `}
    >
      <button
        className=" col-span-1 border text-2xl font-extrabold p-5 text-bold lg:hidden"
        onClick={() => setmobilestep(2)}
      >
        Continue To Checkout
      </button>
      <button
        className=" col-span-1 border text-2xl font-extrabold p-5 text-bold lg:hidden"
        onClick={() => setmobilestep(1)}
      >
        Back To Cart
      </button>
      <div className="select-none col-span-1 lg:col-span-4  overflow-y-auto border">
        {cartItemsBundled.map((item, idx) => {
          return (
            <div
              key={idx}
              className="h-fit w-full p-2 md:p-5 border dark:border-white border-black "
            >
              <h2 className="dark:text-white text-black text-3xl font-bold ">
                {item.name}
              </h2>
              {item.variation.map((variation, vIdx) => {
                return (
                  <div key={vIdx} className="flex p-1 md:p-5 w-full h-48 ">
                    <div className=" grid dark:bg-black/50 bg-transparent border-black dark:border-white border-2 rounded-3xl overflow-hidden grid-cols-5 relative justify-between items-center h-full w-full p-5 ">
                      <div className="col-span-1  flex  overflow-hidden rounded-xl w-full md:w-fit md:h-full aspect-square">
                        <img
                          loading="lazy"
                          src={variation.image.src}
                          alt={variation.image.alt}
                          className=" w-full h-full object-contain "
                        />
                      </div>
                      <div className="col-span-1 ">
                        <p className="text-md md:text-md font-semibold ">
                          Variation: {variation.name}
                        </p>
                        <p className=" text-sm md:text-md ">
                          {" "}
                          Price: Rs.{variation.price}{" "}
                        </p>
                      </div>
                      <div className="col-span-1 flex justify-center items-center gap-5">
                        <span className=" text-sm md:text-2xl ">
                          {variation.quantity}
                        </span>
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
      <div className="select-none col-span-1 lg:col-span-2 flex flex-col justify-stretch overflow-y-auto p-5 h-full border ">
        <div>
          <h2 className="dark:text-white text-black text-3xl font-bold ">
            Delivery Details
          </h2>
          <div className=" flex flex-col gap-5 my-2 ">
            <DeliveryForm
              setFormData={setFormData}
              formData={formData}
              setDeliveryFormValid={setDeliveryFormValid}
              deliveryFormValid={deliveryFormValid}
            />
          </div>
        </div>
        <div className=" w-full">
          <h2 className="dark:text-white text-black text-3xl font-bold ">
            Order Summary:
          </h2>
          <div className=" flex h-full flex-col gap-5 mt-10 ">
            <span className="select-text text-xs ">
              *Try Codes: TENPERCENT2025, FESTIVE2025, WINTER2025, NEWYEAR2025
            </span>
            <form className=" flex gap-3 " onSubmit={validatePromoCode}>
              <input
                type="text"
                placeholder="Promo Code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className=" w-full p-3 border dark:border-white border-black rounded-md "
              />
              <button
                type="submit"
                onClick={(e) => validatePromoCode}
                className=" p-3 px-5 bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white rounded-md hover:bg-black hover:dark:bg-white hover:text-white hover:dark:text-black transition-colors duration-300"
              >
                Apply
              </button>
            </form>
            <div className=" flex justify-between ">
              <span className=" text-xl font-semibold ">Subtotal:</span>
              <span className=" text-xl font-semibold ">
                Rs.{cartTotal.toLocaleString("en-US")}{" "}
              </span>
            </div>
            <div className=" flex justify-between ">
              <span className=" text-xl font-semibold ">Shipping:</span>
              <span className=" text-xl font-semibold ">
                Rs.{formData?.shipingCost.toLocaleString("en-US") || 0}{" "}
              </span>
            </div>
            {promoCodeSet !== "" && promoCodeSet in PromoCodes && (
              <div className=" flex justify-between ">
                <span className=" text-xl font-semibold ">
                  {PromoCodes[promoCodeSet].name}:
                </span>
                <span className=" text-xl font-semibold ">
                  Rs.-{promoCodeReduction.toLocaleString("en-US")}
                </span>
              </div>
            )}
            <div className=" border-t border-black dark:border-white my-5 pt-5 ">
              <div className=" flex justify-between ">
                <span className=" text-2xl font-bold ">Total:</span>
                <span className=" text-2xl font-bold ">
                  Rs.{finalTotal.toLocaleString("en-US")}
                </span>
              </div>
            </div>
            <button
              disabled={!deliveryFormValid}
              onClick={handlePlaceOrder}
              className=" w-full p-4 bg-black dark:bg-white text-white dark:text-black font-semibold text-lg rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 disabled:bg-gray-400 disabled:dark:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-300 "
            >
              Place Order
            </button>
          </div>
          <div className=""></div>
        </div>
      </div>
    </div>
  );
};

export default CartMenu;
