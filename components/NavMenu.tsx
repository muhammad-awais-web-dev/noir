"use client";

import NavMenuItems from "@/data/NavMenuItems";
import { useGSAP } from "@gsap/react";
import gsap, { Observer } from "gsap/all";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(Observer);

const NavMenu = (props: {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { menuOpen, setMenuOpen } = props;
  const menuRef = useRef<HTMLDivElement>(null);
  const [cursorDirection, setCursorDirection] = useState<number>(-1);

  useGSAP(
    //Observer
    () => {
      Observer.create({
        target: menuRef.current,
        type: "mouse,pointer,touch",
        onMove: () => {},
        onUp: () => {
          setCursorDirection(1);
        },
        onDown: () => {
          setCursorDirection(-1);
        },
      });
    },
    { scope: menuRef }
  );

  useGSAP(() => {
    //MenuRef
    if (menuRef.current === null) return;
    const menu = menuRef.current;
    const tl = gsap.timeline();
    if (menuOpen) {
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

    const menuItems: HTMLDivElement[] = gsap.utils.toArray(
      menu.querySelectorAll<HTMLDivElement>(".menuItem"));


    menuItems.forEach((item: HTMLDivElement, index) => {
      if (menuOpen) {
        item.onmouseenter = () => {
          const hilight =
            item.querySelector<HTMLDivElement>(".menuItemHilight");
          if (hilight) {
            const tl2 = gsap.timeline();
            tl2.fromTo(
              hilight,
              {
                top: cursorDirection * 100 + "%",
              },
              {
                top: 0,
                duration: 0.3,
              }
            );
          }
        };
        item.onmouseleave = () => {
          const hilight =
            item.querySelector<HTMLDivElement>(".menuItemHilight");
          if (hilight) {
            gsap.to(hilight, {
              top: cursorDirection * -100 + "%",
              duration: 0.3,
            });
          }
        };
      }
    });
  }, [menuOpen, cursorDirection]);

  useGSAP(
    () => {
      if (menuRef.current === null) return;
      const menuHilightContent = gsap.utils.toArray(
        menuRef.current.querySelectorAll(".menuHilightContent")
      );

      gsap.to(menuHilightContent, {
        xPercent: -100,
        duration: 5,
        repeat: -1,
        ease: "none",
      });
    },
    { scope: menuRef }
  );

  return (
    <div
      ref={menuRef}
      className={` fixed  -top-full right-0 w-full h-full bg-white text-black dark:bg-black dark:text-white backdrop-blur-lg transition-all duration-300 z-40 `}
    >
      <div className=" w-full h-full flex flex-col items-center justify-center absolute">
        {NavMenuItems.map((item, index) => {
          return (
            <Link
              href={item.link}
              key={index}
              className="menuItem origin-top w-full flex justify-center items-center h-20 border-y-2 -mt-0.5 relative overflow-hidden"
            >
              <span className=" text-[4vw] font-black  dark:text-white ">
                {item.text}
              </span>
              <div className=" menuItemHilight flex w-full h-full bg-black dark:bg-white absolute top-full">
                {[0, 1].map((index) => {
                  return (
                    // <Link key={index} className="w-full h-full"  href={item.link} >
                    <div
                      key={index}
                      className=" menuHilightContent h-full flex justify-center items-center min-w-full"
                    >
                      <div className=" aspect-square  h-full mx-10 p-2 ">
                        <Image src={item.image1} alt={item.text} width={100} height={100} className={` w-full h-full object-contain ${ item.text==="Home" || item.text === "Support" ? "bg-black rounded-full":"" } `} />
                      </div>
                      <span className=" text-[4vw] font-black text-white dark:text-black ">
                        {item.text}
                      </span>
                      <div className=" aspect-square  h-full mx-10 p-2 ">
                        <Image src={item.image2} alt={item.text} width={100} height={100} className={` w-full h-full object-contain ${ item.text==="Home" || item.text === "Support" ? "bg-black rounded-full":"" } `} />
                      </div>
                    </div>
                    // </Link>
                  );
                })}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NavMenu;
