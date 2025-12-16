'use client'

import { useEffect, useState } from "react"
import ProductCard from "@/components/ProductCard";
import { UnOrganizedProductPlaceholder } from "@/data/PlaceholderProduct";
import { UnOrganized404ProductPlaceholder } from "@/data/Product404";


interface ProductSectionProps {
    route?: String;
    heading: String;
}

const ProductSection = (props: ProductSectionProps) => {
    const [products, setProducts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedVariants, setSelectedVariants] = useState<{ [key: number]: number }>({})

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/' + (props.route || 'bestseller'));

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('API Response:', data);

            setProducts(data.products || data || []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError(error instanceof Error ? error.message : 'Failed to fetch products');
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);


    if (loading) {
        return (
                    <section className="secert-500-products-section gap-10 w-full flex flex-col justify-center items-center text-black dark:text-white p-10 relative  z-10">
            <h2 className=" w-full text-left text-5xl font-bold " >{props.heading} <span className=" text-sm hover:underline cursor-pointer  font-extralight pl-5 " > View All </span> </h2>
            <div className="products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                {[UnOrganizedProductPlaceholder,UnOrganizedProductPlaceholder,UnOrganizedProductPlaceholder,UnOrganizedProductPlaceholder].map((product: any, index: number) => {
                    return <ProductCard key={index} product={product} index={index} />
                })}
            </div>
        </section>
        );
    }

    if (error) {
        return (
                    <section className="secert-500-products-section gap-10 w-full flex flex-col justify-center items-center text-black dark:text-white p-10 relative  z-10">
            <h2 className=" w-full text-left text-5xl font-bold " >{props.heading} <span className=" text-sm hover:underline cursor-pointer  font-extralight pl-5 " > View All </span> </h2>
            <div className="products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                {[UnOrganized404ProductPlaceholder,UnOrganized404ProductPlaceholder,UnOrganized404ProductPlaceholder,UnOrganized404ProductPlaceholder].map((product: any, index: number) => {
                    return <ProductCard key={index} product={product} index={index} />
                })}
            </div>
        </section>
        );
    }

    if (products.length === 0) {
        return (
            <section className="secert-500-products-section text-white p-10">
                <p>No products found.</p>
            </section>
        );
    }

    return (
        <section className="secert-500-products-section gap-10 w-full flex flex-col justify-center items-center text-black dark:text-white p-10 relative  z-10">
            <h2 className=" w-full text-left text-5xl font-bold " >{props.heading} <span className=" text-sm hover:underline cursor-pointer  font-extralight pl-5 " > View All </span> </h2>
            <div className="products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                {products.slice(0,4).map((product: any, index: number) => {
                    return <ProductCard key={index} product={product} index={index} />
                })}
            </div>
        </section>
    )
}

export default ProductSection
