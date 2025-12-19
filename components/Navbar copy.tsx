"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BsBag, BsBagFill, BsCartFill } from "react-icons/bs";
import { useCart } from "@/provider/CartProvider";
import { CartItem } from "@/types/Cart";
import Image from "next/image";
import PopupData from "@/data/PopupData";

const Navbar = () => {
  const [menuOpen, setmenuOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const [selectedPopupData, setSelectedPopupData] = useState<number>(0);
  const cartButtonRef = useRef<HTMLDivElement>(null);
  const { cartItems, cartBadge, previousCartBadge, cartTotalAbrivated } =
    useCart();
  const [animatingBag, setAnimatingBag] = useState<boolean>(false);

  const menuitems = [
    { name: "Home", link: "/" },
    { name: "Zero Earbuds", link: "/collections/earbuds-zbuds" },
    { name: "Headphones", link: "/collections/headphones" },
    { name: "Smartwatches", link: "/collections/smart-watches" },
    { name: "Support", link: "/support" },
  ];
  useEffect(() => {
    const tl = gsap.timeline();

    if (menuOpen) {
      tl.to(".menu", {
        gap: 0,
        duration: 0.1,
      });
      tl.to(".menu-bar", {
        rotate: 45,
        duration: 0.1,
      });
      tl.to(".first-bar", {
        rotate: -45,
        duration: 0.2,
      });
      tl.set(".menu-bg", {
        backgroundColor: "#FF605C",
      });
      tl.fromTo(
        ".menu-item",
        {
          display: "none",
          x: 50,
          opacity: 0,
        },
        {
          display: "block",
          x: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.1,
        }
      );
    } else {
      tl.to(".menu-item", {
        opacity: 0,
        x: 50,
        duration: 0.3,
        stagger: 0.1,
      });
      tl.set(".menu-item", {
        display: "none",
      });
      tl.to(".first-bar", {
        rotate: 45,
        duration: 0.2,
      });
      tl.to(".menu-bar", {
        rotate: 0,
        duration: 0.1,
      });
      tl.to(".menu", {
        gap: 12,
        duration: 0.1,
      });
      tl.set(".menu-bg", {
        backgroundColor: "white",
      });
    }
  }, [menuOpen]);
  useGSAP(() => {
    if (popupOpen) {
      const tl = gsap.timeline();
      tl.set(".InfoPopup", { display: "flex" });
      tl.set("body", { overflow: "hidden" });
      tl.fromTo(".InfoPopup", { opacity: 0 }, { opacity: 1, duration: 1 });
      tl.fromTo(
        ".InfoPopup > div",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }
      );
    } else {
      const tl = gsap.timeline();
      tl.to(".InfoPopup > div", { y: 50, opacity: 0, duration: 0.5 });
      tl.to(".InfoPopup", { opacity: 0, duration: 0.5 }, "-=0.3");
      tl.set(".InfoPopup", { display: "none" });
      tl.set("body", { overflow: "auto" });
    }
  }, [popupOpen]);

  useGSAP(() => {
    if (!cartButtonRef.current) return;
    if (cartButtonRef.current.style.display === "none") {
      gsap.set(cartButtonRef.current, { yPercent: -100,display: "flex" });
    }
    if (cartItems.length > 0) {
      const tl = gsap.timeline();
      tl.to(cartButtonRef.current, {
        yPercent: 0,
        duration: 1,
        ease: "bounce.out",
      });
    } else if (cartItems.length === 0) {
      const tl = gsap.timeline();
      tl.to(cartButtonRef.current, {
        yPercent: -100,
        duration: 1,
        ease: "bounce.out",
      });
    }
  }, [cartButtonRef, cartItems]);

  useGSAP(() => {
    if (!cartButtonRef.current) return;
    cartButtonRef.current.style.display = "flex";
    const bagFill = cartButtonRef.current.querySelector("#BagFill");
    const addingToCart = cartBadge > previousCartBadge;
    setAnimatingBag(true);
    if (!animatingBag) {
      const tl = gsap.timeline({
        onComplete: () => {
          setAnimatingBag(false);
        },
      });
      if (addingToCart) {
        tl.set(bagFill, { yPercent: 0, scale: 1, opacity: 1 });
        tl.to(bagFill, { yPercent: 150, duration: 0.5, ease: "sine.out" });
        tl.to(bagFill, { scale: 0, duration: 0.5, ease: "sine.in" });
        tl.set(bagFill, { yPercent: 0, scale: 1, opacity: 0 });
      } else {
        tl.set(bagFill, { yPercent: 150, scale: 0, opacity: 1 });
        tl.to(bagFill, { scale: 1, duration: 0.5, ease: "sine.out" });
        tl.to(bagFill, { yPercent: 0, duration: 0.5, ease: "sine.in" });
        tl.set(bagFill, { yPercent: 0, scale: 1, opacity: 0 });
      }
    }
  }, [cartBadge, previousCartBadge]);

  return (
    <>
      <nav className="w-full py-6 text-white px-8 flex justify-between items-center bg-white-50 bg-black/50 fixed top-0 left-0 z-100">
        <div className="w-fit h-fit relative  justify-center leading-tight gap-5 items-center font-thin text-5xl flex ">
          <Link href="/">
            <img src="/zerologo.svg" className=" h-12 " />
          </Link>
        </div>
        <div className=" menu-container  absolute h-fit top-0 right-0  flex flex-col items-end">
          <div
            onClick={() => setmenuOpen((prev) => !prev)}
            className="relative cursor-pointer group border-l-2 h-20 w-fit border-b-2 p-5  menu flex justify-center items-center flex-col gap-3"
          >
            <div className="absolute right-0 menu-bg group-hover:w-full transition-all z-0 duration-300 w-0  h-full bg-white"></div>
            <div className=" w-15 h-1 -mt-1 group-hover:bg-black relative z-10 bg-white menu-bar first-bar"></div>
            <div className=" w-15 h-1 -mt-1 group-hover:bg-black relative z-10 bg-white menu-bar"></div>
            <div className=" w-15 h-1 -mt-1 group-hover:bg-black relative z-10 bg-white menu-bar"></div>
          </div>
          <div
            ref={cartButtonRef}
            className=" Cart-container group  absolute w-25 h-20 border-l-2 border-b-2 border-white right-25  hidden flex-col items-center justify-center "
          >
            <div className="absolute right-0 menu-bg group-hover:w-full transition-all z-0 duration-300 w-0  h-full bg-white"></div>
            <div className=" w-fit flex flex-col gap-1 justify-center items-center h-fit relative ">
              <BsCartFill className=" text-4xl group-hover:text-black transition-colors " />
              <span className=" absolute -top-2 -right-2 text-xs bg-red-500 text-white w-5 h-5 flex justify-center items-center rounded-full ">
                {cartBadge}
              </span>
              <BsBagFill
                id="BagFill"
                className="opacity-0 text-sm mix-blend-exclusion absolute -top-1/3 left-1/2 -translate-x-1/2"
              />
              <span className=" text-xs font-bold p-0.5 px-1.5 rounded-full text-black bg-white mix-blend-exclusion border">{`Rs: ${cartTotalAbrivated}`}</span>
            </div>
          </div>
          <div>
            <ul>
              {menuitems.map((item, idx) => (
                <li
                  key={idx}
                  className="text-3xl hidden menu-item font-bold border-white border-2 "
                >
                  <Link href={item.link}>
                    <div
                      onClick={() => setmenuOpen(false)}
                      className=" w-full h-full relative group px-5 py-2 bg-black hover:text-black  "
                    >
                      <div className=" absolute top-0 z-0 transition-all right-0 w-0 group-hover:w-full h-full bg-white text-white "></div>
                      <span className=" relative z-10 ">{item.name}</span>
                    </div>
                  </Link>
                </li>
              ))}

              <li
                key={-1}
                className="text-3xl hidden menu-item font-bold border-white border-2 "
              >
                <div className=" flex h-fit ">
                  <div
                    onClick={() => {
                      {
                        () => setmenuOpen(false);
                      }
                      setPopupOpen(true);
                      setSelectedPopupData(0);
                    }}
                    className=" cursor-pointer gap-2 w-full flex justify-center items-center flex-col relative group border-r-2 px-5 py-2 bg-black hover:text-black  "
                  >
                    <div className=" absolute top-0 z-0 transition-all right-0 w-0 group-hover:w-full h-full bg-white text-white "></div>
                    <Image
                      src="/images/pfp.png"
                      alt="My Pfp"
                      width={866}
                      height={866}
                      className=" relative z-10 rounded-full w-12 h-12"
                    ></Image>
                    <span className="relative text-xs"> Let's Connect </span>
                  </div>
                  <div
                    onClick={() => {
                      {
                        () => setmenuOpen(false);
                      }
                      setPopupOpen(true);
                      setSelectedPopupData(1);
                    }}
                    className=" cursor-pointer gap-2 w-full flex justify-center items-center flex-col relative group border-r-2 px-5 py-2 bg-black hover:text-black  "
                  >
                    <div className=" absolute top-0 z-0 transition-all right-0 w-0 group-hover:w-full h-full bg-white text-white "></div>
                    <Image
                      src="/zerologo.svg"
                      alt="My Pfp"
                      width={866}
                      height={866}
                      className="mix-blend-exclusion relative z-10 rounded-full w-12 h-12"
                    ></Image>
                    <span className="relative text-xs"> Visit Zero </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div
        ref={popupRef}
        id="Popup"
        className="InfoPopup fixed bg-black/50 backdrop-blur-sm hidden justify-center items-center top-0 left-0 w-screen h-screen z-150 "
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setPopupOpen(false);
          }
        }}
      >
        <div className=" w-1/2 h-fit flex flex-col justify-center text-white  relative">
          {PopupData.length > 0 ? (
            <>
              <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                {/* Top Section: Content & Image */}
                <div className="flex flex-col-reverse lg:flex-row items-center p-8 lg:p-12 gap-8 lg:gap-12">
                  {/* Text Content */}
                  <div className="flex flex-col gap-4 text-center lg:text-left lg:w-2/3">
                    <h2 className="font-extrabold text-3xl lg:text-4xl text-gray-900 tracking-tight">
                      {PopupData[selectedPopupData].title}
                    </h2>
                    <p className="text-gray-600 text-base lg:text-lg leading-relaxed font-normal">
                      {PopupData[selectedPopupData].description}
                    </p>
                  </div>

                  {/* Image Container */}
                  <div className="lg:w-1/3 flex justify-center items-center">
                    <div className="relative w-40 h-40 lg:w-56 lg:h-56 shrink-0">
                      <Image
                        src={PopupData[selectedPopupData].imageUrl}
                        alt={PopupData[selectedPopupData].title}
                        width={866}
                        height={866}
                        className={`rounded-full object-cover w-full h-full ${
                          selectedPopupData === 0 ? "border-4" : ""
                        } border-gray-100 shadow-lg ${
                          selectedPopupData === 1 ? "mix-blend-exclusion" : ""
                        } `}
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Section: Social Links (Styled as interactive pills) */}
                <div className="bg-gray-50 border-t border-gray-100 p-6 flex flex-wrap justify-center items-center gap-3">
                  {PopupData[selectedPopupData].socialLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2.5 rounded-full text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-black hover:text-white hover:border-black transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
                    >
                      {link.platform}
                    </a>
                  ))}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Navbar;
