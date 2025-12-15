'use client'

import { useEffect, useState } from "react"

// Color mapping for variants
const colorMap: { [key: string]: string } = {
  'black': '#000000',
  'white': '#FFFFFF',
  'silver': '#C0C0C0',
  'gold': '#FFD700',
  'green': '#22C55E',
  'blue': '#3B82F6',
  'red': '#EF4444',
  'pink': '#EC4899',
  'purple': '#A855F7',
  'yellow': '#EAB308',
  'orange': '#F97316',
  'gray': '#6B7280',
  'grey': '#6B7280',
};

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

    const getColorFromTitle = (title: string): string => {
        const lowerTitle = title.toLowerCase();
        for (const [colorName, colorCode] of Object.entries(colorMap)) {
            if (lowerTitle.includes(colorName)) {
                return colorCode;
            }
        }
        return '#9CA3AF'; // default gray color
    };

    const handleVariantSelect = (productId: number, variantIndex: number) => {
        setSelectedVariants(prev => ({ ...prev, [productId]: variantIndex }));
    };

    if (loading) {
        return (
            <section className="secert-500-products-section text-white p-10">
                <p>Loading products...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="secert-500-products-section text-white p-10">
                <p>Error: {error}</p>
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
                    const selectedIndex = selectedVariants[product.id] || 0;
                    const selectedVariant = product.variants[selectedIndex];
                    const displayImage = selectedVariant?.featured_image?.src || product.images?.[0]?.src;
                    
                    return (
                        <div key={product.id || index} className="product-card bg-gray-50 dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-lg">
                            {/* Product Badge */}
                            <div className="relative">
                                <div className="absolute top-4 right-4 z-10 bg-white text-black rounded-full px-2 py-1 flex items-center gap-1">
                                    <span className="text-yellow-500">⭐</span>
                                    <span className="text-sm font-semibold">4.88</span>
                                </div>
                                
                                {/* Product Image */}
                                <div className="bg-gray-100 dark:bg-zinc-800 h-80 flex items-center justify-center">
                                    {displayImage ? (
                                        <img src={displayImage} alt={product.title} className="w-full h-full object-contain" />
                                    ) : (
                                        <div className="text-gray-400">No image</div>
                                    )}
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="p-4">
                                {/* Discount Badge */}
                                {selectedVariant?.compare_at_price && (
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-xl font-bold">{product.title}</h3>
                                        <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                                            {Math.round((1 - parseFloat(selectedVariant.price) / parseFloat(selectedVariant.compare_at_price)) * 100)}% OFF
                                        </span>
                                    </div>
                                )}
                                
                                <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{product.product_type}</p>

                                {/* Color Swatches */}
                                {product.variants.length > 1 && (
                                    <div className="flex items-center gap-2 mb-4">
                                        {product.variants.slice(0, 3).map((variant: any, variantIndex: number) => {
                                            const color = getColorFromTitle(variant.title);
                                            const isSelected = selectedIndex === variantIndex;
                                            
                                            return (
                                                <button
                                                    key={variant.id}
                                                    onClick={() => handleVariantSelect(product.id, variantIndex)}
                                                    className={`w-6 h-6 rounded-full border-2 transition-all ${
                                                        isSelected ? 'border-black dark:border-white scale-110' : 'border-gray-300 dark:border-gray-600'
                                                    }`}
                                                    style={{ backgroundColor: color }}
                                                    title={variant.title}
                                                />
                                            );
                                        })}
                                        {product.variants.length > 3 && (
                                            <span className="text-sm text-gray-500 dark:text-gray-400">+{product.variants.length - 3}</span>
                                        )}
                                    </div>
                                )}

                                {/* Pricing */}
                                <div className="mb-4">
                                    {selectedVariant?.compare_at_price && (
                                        <p className="text-gray-400 line-through text-sm">
                                            Rs.{parseFloat(selectedVariant.compare_at_price).toLocaleString()}
                                        </p>
                                    )}
                                    <p className="text-2xl font-bold">
                                        Rs.{selectedVariant?.price ? parseFloat(selectedVariant.price).toLocaleString() : 'N/A'}
                                    </p>
                                </div>

                                {/* Buy Now Button */}
                                <button className="w-full bg-red-800 hover:bg-red-900 text-white font-bold py-3 px-6 rounded-full transition-colors">
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    )
}

export default ProductSection
