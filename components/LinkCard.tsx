import React from "react";

interface LinkCardProps {
  sectionlink: {
    title: string;
    imgLink: string;
    link: string;
  };
  index: number;
}

const LinkCard = ({ sectionlink, index }: LinkCardProps) => {
  return (
    <a
      href={sectionlink.link}
      key={index}
      className="text-black dark:text-white group dark:shadow-white/40 shadow-[0px_0px_15px_rgba(225,225,225,225.9)] hover:shadow-[0px_0px_0px_rgba(225,225,225,0.5)]  relative col-span-1 row-span-1 h-full flex justify-center items-center transition-all duration-300 rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-gray-700"
    >
      <div className=" w-full h-full group-hover:shadow-[inset_0px_0px_15px_rgba(225,225,225,0.5)] shadow-[inset_0px_0px_0px_rgba(225,225,225,0.5)] transition-shadow duration-300 p-5 ">
        <h3 className="text-left absolute w-1/2 h-fit top-0 left-0 text-[4vw] md:text-xl lg:text-[1vw] font-extralight m-2">
          {sectionlink.title}
        </h3>
        <img
          loading="lazy"
          src={sectionlink.imgLink}
          alt={sectionlink.title}
          className="w-full h-auto object-cover"
        />
      </div>
    </a>
  );
};

export default LinkCard;
