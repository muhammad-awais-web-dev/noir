"use client";

import { useRef, useState } from "react";
import heroVideosData from "./HeroVideosData";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import gsap from "gsap/all";

const Hero = () => {
  const [videoIndex, setVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const videoElement = videoRef.current;
    videoElement?.pause();

    const tl = gsap.timeline();
    tl.to(headingRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
    });
    tl.to(
      descRef.current,
      {
        y: 20,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      },
      "-=0.2"
    );
    tl.call(() => {
      videoRef.current!.src = heroVideosData[videoIndex].videoUrl;
      headingRef.current!.textContent = heroVideosData[videoIndex].heading;
      descRef.current!.textContent = heroVideosData[videoIndex].description;
      if (videoElement) {
        videoElement.currentTime = 0;
        videoElement.play();
      } else {
        console.log("video element not found");
      }
    });
    tl.to(headingRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });
    tl.to(
      descRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      },
      "-=0.2"
    );
  }, [videoIndex]);

  return (
    <section className="flex h-screen bg-black w-full flex-col items-center justify-center text-center ">
      <video
        ref={videoRef}
        autoPlay
        muted
        onEnded={() =>
          setVideoIndex((prev) => (prev + 1) % heroVideosData.length)
        }
        className="absolute top-0 h-full w-full object-cover "
      >
        Video Not supported in the browser
      </video>
      <div className="  absolute h-full w-full bg-black/50 " ></div>
      <div
        id="VideoData"
        className="h-full flex flex-col md:flex-row justify-end items-start md:justify-between p-10 md:items-end text-white w-full mix-blend-exclusion relative z-10"
      >
        <div className=" flex flex-col-reverse justify-start items-start text-left w-full md:w-1/3 ">
          <h2 ref={headingRef} className=" text-7xl font-extrabold "></h2>
          <p ref={descRef} className=" text-lg "></p>
        </div>
          <div ref={buttonRef} className=" flex gap-4 justify-center mt-4 ">
            {heroVideosData[videoIndex].buttons.map((button, idx) => (
              <Link
                key={idx}
                href={button.link}
                className=" px-8 py-4 text-2xl font-extrabold text-white border-2 border-white rounded-md hover:bg-white hover:text-black transition "
              >
                {button.text}
              </Link>
            ))}
          </div>
      </div>
    </section>
  );
};

export default Hero;
