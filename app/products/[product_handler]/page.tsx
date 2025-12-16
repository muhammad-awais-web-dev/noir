'use client'

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const Page = () => {
    const params = useParams();
    const product = params.product_handler as string;
    const [data, setData] = useState<any>(null);
    
    useEffect(() => {
        if (product) {
            fetch(`/api/products/${product}`)
                .then(res => res.json())
                .then(setData)
                .catch(console.error);
            console.log(data)
        }
    }, [product]);

    return (
        <section className='h-screen w-screen bg-white dark:bg-black flex justify-center items-center text-black dark:text-white overflow-hidden'>
            {data ? 
            <div className="flex lg:flex-row-reverse flex-col h-screen gap-2 w-full pt-24 p-5">
                <div className="lg:w-1/2 w-full bg-amber-300 lg:overflow-y-auto overflow-x-auto lg:h-full h-75 shrink-0">
                    <div className="lg:h-[200vh] flex md:flex-col lg:w-auto w-[200vw]">
                        <div className=" w-full h-fit" >
                            <img src={data.mainImage } alt={data.title} />
                        </div>
                    </div>
                </div>
                <div className="lg:w-1/2 w-full bg-amber-900 overflow-y-auto lg:h-full flex-1">
                    <div className="h-[200vh]">is it scrolling</div>
                </div>
            </div>
             : <span className=" font-extralight " >///LOADING</span>}
        </section>
    )
}

export default Page