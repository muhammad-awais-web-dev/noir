"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/provider/CartProvider";
import { BsCart2 } from "react-icons/bs";
import gsap from "gsap/all";
import NavMenu from "./NavMenu";
import CartMenu from "./CartMenu";
import NavProgress from "./NavProgress";

const Navbar = () => {
  const menuRef = useRef<HTMLDivElement>(null);

  const { cartItems, cartTotalAbrivated, cartBadge } = useCart();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [cartOpen, setCartOpen] = useState<boolean>(false);

  function openMenu() {
    if (cartOpen) {
      setCartOpen(false);
    }
    setMenuOpen(true);
  }
  function openCart() {
    if (menuOpen) {
      setMenuOpen(false);
    }
    setCartOpen(true);
  }

  function toggleMenu() {
    if (menuOpen) {
      setMenuOpen(false);
    } else {
      openMenu();
    }
  }

  function toggleCart() {
    if (cartOpen) {
      setCartOpen(false);
    } else openCart();
  }

  useEffect(() => {
    if (menuOpen || cartOpen) {
      document.querySelector("body")!.style.overflow = "hidden";
    } else {
      document.querySelector("body")!.style.overflow = "auto";
    }
  }, [menuOpen, cartOpen]);

  useEffect(() => {
    if (menuRef.current === null) return;
    const menuPanels: any = gsap.utils.toArray(
      menuRef.current.querySelectorAll(".menu-panel")
    );
    const tl = gsap.timeline();
    if (menuOpen) {
      tl.to(menuRef.current, {
        delay: 0.02,
        gap: 0,
        duration: 0.2,
      });
      tl.to(menuPanels, {
        delay: 0.2,
        duration: 0.2,
        rotate: 45,
      });
      tl.to(menuPanels[1], {
        duration: 0.2,
        rotate: -45,
      });
    } else {
      tl.to(menuPanels[1], {
        duration: 0.2,
        rotate: 45,
      });
      tl.to(menuPanels, {
        duration: 0.2,
        rotate: 0,
      });
      tl.to(menuRef.current, {
        gap: 8,
        duration: 0.2,
      });
    }
  }, [menuOpen]);

  return (
    <>
      <nav className="w-full h-16 flex items-center justify-between fixed top-0 left-0 z-50">
        {/* <NavProgress /> progress bar is here */}
        <Link href="/" className=" h-full ">
          <div className=" group bg-black text-black dark:text-white dark:bg-black/55 backdrop-blur-lg relative border-r-2 border-b-2 h-full overflow-hidden ">
            <div className="rounded-full w-0 h-0 group-hover:w-[200%] group-hover:h-[200%] absolute bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-900 "></div>
            <Image
              src="/zerologo.svg"
              alt="Logo"
              className="relative h-full w-auto p-2 mix-blend-exclusion"
              width={400}
              height={400}
            />
          </div>
        </Link>
        <div className=" w-full h-full bg-black border-b-2 dark:bg-black/55 backdrop-blur-lg flex justify-center items-center text-white ">

        </div>
        <div className=" w-32 bg-black text-white dark:bg-black/55 backdrop-blur-lg overflow-hidden h-full flex ">
          <div
            className=" group w-1/2 relative cursor-pointer h-full border-b-2 border-l-2 flex flex-col justify-center items-center"
            onClick={() => toggleCart()}
          >
            <div className=" absolute top-0 right-0 w-0 group-hover:w-full h-full bg-white transition-all duration-300 "></div>
            <span
              className={` text-xs absolute z-10 w-full text-center bg-white mix-blend-exclusion text-black ${
                cartTotalAbrivated === "0" ? "-top-4" : "top-0"
              } h-4 transition-all duration-300`}
            >
              {cartTotalAbrivated === "0" ? "\u00A0" : `${cartBadge} Items`}
            </span>
            <span
              className={` text-xs absolute z-10 w-full text-center bg-white mix-blend-exclusion text-black ${
                cartTotalAbrivated === "0" ? "-bottom-5" : "bottom-0"
              } h-4 transition-all duration-300`}
            >
              {cartTotalAbrivated === "0"
                ? "\u00A0"
                : `Rs. ${cartTotalAbrivated}`}
            </span>
            <BsCart2 className=" text-2xl relative z-10 mix-blend-exclusion " />
          </div>
          <div className=" relative group w-1/2 h-full border-b-2 border-l-2 flex flex-col justify-center">
            <div className=" absolute h-full w-0 top-0 left-0 group-hover:w-full bg-white transition-all duration-300 "></div>
            <div
              ref={menuRef}
              className={`group w-full relative mix-blend-exclusion h-full flex flex-col justify-center gap-2 p-3 py-4 items-center transition-all duration-300`}
              onClick={() => toggleMenu()}
            >
              <div
                className={`menu-panel w-full h-0.5 -mt-0.5 bg-white `}
              ></div>
              <div
                className={`menu-panel w-full h-0.5 -mt-0.5 bg-white `}
              ></div>
              <div
                className={`menu-panel w-full h-0.5 -mt-0.5 bg-white `}
              ></div>
            </div>
          </div>
        </div>
      </nav>
      <NavMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <CartMenu cartOpen={cartOpen} setCartOpen={setCartOpen} />
    </>
  );
};

export default Navbar;
