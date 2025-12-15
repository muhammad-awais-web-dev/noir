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
        }
    }, [product]);

    return (
        <section className='h-screen w-screen bg-white dark:bg-black flex justify-center items-center text-black dark:text-white'>
            {data ? JSON.stringify(data, null, 2) : 'Loading...'}
        </section>
    )
}

export default Page