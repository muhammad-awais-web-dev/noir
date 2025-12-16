import React from "react";
import productType from "../types/productType";
import Link from "next/link";
import { useState } from "react";

const colorMap: { [key: string]: string } = {
  black: "#000000",
  white: "#FFFFFF",
  silver: "#C0C0C0",
  gold: "#FFD700",
  green: "#22C55E",
  blue: "#3B82F6",
  red: "#EF4444",
  pink: "#EC4899",
  purple: "#A855F7",
  yellow: "#EAB308",
  orange: "#F97316",
  gray: "#6B7280",
  grey: "#6B7280",
};

const ProductCard = (props: { product: productType; index: number }) => {
  const product: productType = props.product;
  const index: number = props.index;

  const [selectedVariants, setSelectedVariants] = useState<{
    [key: number]: number;
  }>({});

  const selectedIndex = selectedVariants[product.id] || 0;
  const selectedVariant = product.variants[selectedIndex];
  const displayImage =
    selectedVariant?.featured_image?.src || product.images?.[0]?.src;
  const getColorFromTitle = (title: string): string => {
    const lowerTitle = title.toLowerCase();
    for (const [colorName, colorCode] of Object.entries(colorMap)) {
      if (lowerTitle.includes(colorName)) {
        return colorCode;
      }
    }
    return "#9CA3AF"; // default gray color
  };

  const handleVariantSelect = (productId: number, variantIndex: number) => {
    setSelectedVariants((prev) => ({ ...prev, [productId]: variantIndex }));
  };
  return (
    <div
      key={product.id || index}
      className="product-card bg-gray-50 dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-lg"
    >
      {/* Product Badge */}
      <div className="relative">

        {/* Product Image */}
        <Link
          key={product.id || index}
          href={`/products/${product.handle}`}
          className="no-underline"
        >
          <div className="bg-gray-100 dark:bg-zinc-800 h-80 flex items-center justify-center">
            {displayImage ? (
              <img
                src={displayImage}
                alt={product.title}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="text-gray-400">No image</div>
            )}
          </div>
        </Link>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Discount Badge */}
        {selectedVariant?.compare_at_price && (
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold">
              {product.title === "Not Found" ?
                ["¯\\_(ツ)_/¯","o_O","☉_☉","(╯°□°）","╯︵","┻━┻","(•_•)","(ಠ_ಠ)"][index % 6]
                : product.title
            }
            
            </h3>
            <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
              {Math.round(
                (1 -
                  parseFloat(selectedVariant.price) /
                    parseFloat(selectedVariant.compare_at_price)) *
                  100
              )}
              % OFF
            </span>
          </div>
        )}

        <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
          {product.product_type}
        </p>

        {/* Color Swatches */}
        {product.variants.length > 1 && (
          <div className="flex items-center gap-2 mb-4">
            {product.variants
              .slice(0, 3)
              .map((variant: any, variantIndex: number) => {
                const color = getColorFromTitle(variant.title);
                const isSelected = selectedIndex === variantIndex;

                return (
                  <button
                    key={variant.id}
                    onClick={() =>
                      handleVariantSelect(product.id, variantIndex)
                    }
                    className={`w-6 h-6 rounded-full border-2 transition-all cursor-pointer ${
                      isSelected
                        ? "border-black dark:border-white scale-110"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                    style={{ backgroundColor: color }}
                    title={variant.title}
                  />
                );
              })}
            {product.variants.length > 3 && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                +{product.variants.length - 3}
              </span>
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
            Rs.
            {selectedVariant?.price
              ? parseFloat(selectedVariant.price).toLocaleString()
              : "N/A"}
          </p>
        </div>

        {/* Buy Now Button */}
        {
          product.product_type === "Null" ? null :
        <Link
          key={product.id || index}
          href={`/products/${product.handle}`}
          className="w-full dark:bg-white bg-black hover:bg-black/80 dark:hover:bg-gray-300 text-white dark:text-black mt-2 font-bold py-3 px-6 rounded-full transition-colors"
        >
          Buy Now
        </Link>
        }
      </div>
    </div>
  );
};

export default ProductCard;
