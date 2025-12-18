import Image from "next/image";
import { MagicCard } from "@/components/ui/magic-card";
import { FaArrowRight } from "react-icons/fa";
import policyData from "@/data/PolicyData";

const page = () => {
  return (
    <section className="text-black dark:text-white bg-white p-5 pt-24 dark:bg-black relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
      <div className=" max-w-7xl flex flex-col items-center justify-center w-full ">
        <h1 className=" text-5xl  capitalize w-full text-left ">
          No questions <br /> asked exchange*
        </h1>
        <div className=" grid grid-cols-2 lg:grid-cols-4 w-full gap-10 py-10">
          <MagicCard
            className=" col-span-1  rounded-3xl overflow-hidden cursor-default"
            gradientSize={100}
          >
            <div className="flex flex-col lg:flex-row text-center lg:text-left h-full justify-start items-center dark:bg-white/10 bg-black/10  p-5 gap-5">
              <Image src="/images/calender.png" alt="" width={60} height={60} />
              <h2 className=" text-xl font-bold ">7 Days Replacement</h2>
            </div>
          </MagicCard>
          <MagicCard
            className=" col-span-1  rounded-3xl overflow-hidden cursor-default"
            gradientSize={100}
          >
            <div className="flex flex-col lg:flex-row text-center lg:text-left h-full justify-start items-center dark:bg-white/10 bg-black/10  p-5 gap-5">
              <Image src="/images/medal.png" alt="" width={60} height={60} />
              <h2 className=" text-xl font-bold ">7 Days Replacement</h2>
            </div>
          </MagicCard>
          <MagicCard
            className=" col-span-1  rounded-3xl overflow-hidden cursor-default"
            gradientSize={100}
          >
            <div className="flex flex-col lg:flex-row text-center lg:text-left h-full justify-start items-center dark:bg-white/10 bg-black/10  p-5 gap-5">
              <Image src="/images/money.png" alt="" width={60} height={60} />
              <h2 className=" text-xl font-bold ">7 Days Replacement</h2>
            </div>
          </MagicCard>
          <MagicCard
            className=" col-span-1  rounded-3xl overflow-hidden cursor-default"
            gradientSize={100}
          >
            <div className="flex flex-col lg:flex-row text-center lg:text-left h-full justify-start items-center dark:bg-white/10 bg-black/10  p-5 gap-5">
              <Image src="/images/thumb-up.png" alt="" width={60} height={60} />
              <h2 className=" text-xl font-bold ">7 Days Replacement</h2>
            </div>
          </MagicCard>

          {policyData.map((policy) => {
            return (
              <MagicCard
                className=" col-span-2  rounded-3xl overflow-hidden cursor-default"
                gradientSize={100}
                key={policy.id}
              >
                <div className="flex h-full flex-col justify-start items-start dark:bg-white/10 bg-black/10  p-5 gap-5">
                  <span className=" text-white text-5xl font-bold ">
                    {policy.icon}
                  </span>
                  <h2 className=" text-white text-3xl font-bold ">
                    {policy.title}
                  </h2>
                  <ul className=" pl-5 font-medium text-lg marker:text-white marker: list-disc ">
                    {policy.points.map((point, idx) => (
                      <li key={idx} className=" mb-2 ">
                        {point}
                      </li>
                    ))}
                  </ul>
                  {policy.button && (
                    <a
                      href={policy.button.url}
                      className=" flex justify-center group/inner items-center text-black  hover:text-white bg-white hover:bg-black py-1 pr-1 pl-4 rounded-full font-bold mt-2 cursor-pointer hover:scale-110 transition-all duration-300 "
                    >
                      {policy.button.text}
                      <div className=" inline-block ml-2 p-4 rounded-full bg-black group-hover/inner:bg-white  text-white group-hover/inner:text-black transition-colors duration-300 ">
                        <FaArrowRight />
                      </div>
                    </a>
                  )}
                </div>
              </MagicCard>
            );
          })}
        </div>
        <h2 className=" text-white text-3xl font-bold w-full text-center">
          Need more assistance?
        </h2>
        <p className="text-center">Visit our comprehensive policies</p>
        <a
          href="https://zerolifestyle.co/pages/support"
          className=" flex justify-center w-fit border-2 self-center group/inner items-center text-black  hover:text-white bg-white hover:bg-black py-1 pr-1 pl-4 rounded-full font-bold mt-2 cursor-pointer hover:scale-110 transition-all duration-300 "
        >
          Start Reading
          <div className="  inline-block ml-2 p-4 rounded-full bg-black group-hover/inner:bg-white  text-white group-hover/inner:text-black transition-colors duration-300 ">
            <FaArrowRight />
          </div>
        </a>
      </div>
    </section>
  );
};

export default page;
