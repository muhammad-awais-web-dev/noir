"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [menuOpen, setmenuOpen] = useState(false);

  const menuitems = [
    { name: "Home", link: "/" },
    { name: "Zero Earbuds", link: "/zbuds" },
    { name: "Headphones", link: "/headphones" },
    { name: "Smartwatches", link: "/smartwatches" },
    { name: "Support", link: "/support" },
  ];

  const HandleMenuClick = () => {
    const tl = gsap.timeline();

    if (!menuOpen) {
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
      setmenuOpen(true);
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
      setmenuOpen(false);
    }
  };
  return (
    <nav className="w-full py-6 text-white px-8 flex justify-between items-center bg-white-50 dark:bg-black/50 backdrop-blur-3xl fixed top-0 left-0 z-100">
      <div className="w-fit h-fit relative  justify-center leading-tight gap-5 items-center font-thin text-5xl flex ">
        <img src="/zerologo.svg" className=" h-12 " />
      </div>
      <div className=" menu-container  absolute h-fit top-0 right-0  flex flex-col items-end">
        <div
          onClick={HandleMenuClick}
          className="relative cursor-pointer group border-l-2 h-20 w-fit border-b-2 p-5  menu flex justify-center items-center flex-col gap-3"
        >
          <div className="absolute right-0 menu-bg group-hover:w-full transition-all z-0 duration-300 w-0  h-full bg-white"></div>
          <div className=" w-15 h-1 -mt-1 group-hover:bg-black relative z-10 bg-white menu-bar first-bar"></div>
          <div className=" w-15 h-1 -mt-1 group-hover:bg-black relative z-10 bg-white menu-bar"></div>
          <div className=" w-15 h-1 -mt-1 group-hover:bg-black relative z-10 bg-white menu-bar"></div>
        </div>
        <div>
          <ul>
            {menuitems.map((item, idx) => (
              <li
                key={idx}
                className="text-3xl hidden menu-item font-bold border-white border-2 "
              >
                <Link href={item.link}>
                  <div onClick={HandleMenuClick} className=" w-full h-full relative group px-5 py-2 bg-black hover:text-black  ">
                    <div className=" absolute top-0 z-0 transition-all right-0 w-0 group-hover:w-full h-full bg-white text-white "></div>
                    <span className=" relative z-10 ">{item.name}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
