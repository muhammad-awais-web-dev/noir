'use client'

import React from "react";
import productType from "../types/productType";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { CartItem } from "@/types/Cart";
import { useCart } from "@/provider/CartProvider";
import { FaCartPlus, FaPlus } from "react-icons/fa6";
import { ChevronDown, ChevronUp } from "lucide-react";
import { MagicCard } from "./ui/magic-card";

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

  const { cartItems, setCartItems } = useCart();

  return (
    <MagicCard
      gradientTo="#890000"
      gradientFrom="#d8a74b"
      key={product.id || index}
      className="product-card bg-gray-50 p-3 overflow-hidden dark:bg-zinc-900 rounded-2xl shadow-lg"
    >
      {/* Product Badge */}
      <div className="relative">
        {/* Product Image */}
        <Link
          key={product.id || index}
          href={`/products/${product.handle}`}
          className="no-underline"
          prefetch={false}
        >
          <div className="bg-black/10 dark:bg-white/10 backdrop-blur-md rounded-2xl p-5 h-80 flex items-center justify-center">
            {displayImage ? (
              <Image
                src={displayImage}
                alt={product.title}
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-full object-contain"
                unoptimized
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
              {product.title === "Not Found"
                ? [
                    "¯\\_(ツ)_/¯",
                    "o_O",
                    "☉_☉",
                    "(╯°□°）",
                    "╯︵",
                    "┻━┻",
                    "(•_•)",
                    "(ಠ_ಠ)",
                  ][index % 6]
                : product.title}
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
        {product.product_type === "Null" ? null : (
          <div className="flex gap-4">
            <Link
              key={product.id || index}
              href={`/products/${product.handle}`}
              className="w-full flex justify-center items-center border-black dark:border-white border-2 dark:bg-white bg-black hover:bg-white dark:hover:bg-black text-white dark:text-black hover:text-black dark:hover:text-white mt-2 font-bold py-2 px-4 rounded-full transition-colors duration-300 text-center "
            >
              Buy Now
            </Link>
            {cartItems.findIndex(
              (item) =>
                item.handle === product.handle &&
                item.variation === selectedVariant.title
            ) !== -1 ? (
              <div className=" flex  justify-center items-center">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const updatedCartItems = cartItems;
                    updatedCartItems.findIndex(
                      (item) =>
                        item.handle === product.handle &&
                        item.variation === selectedVariant.title
                    );
                    updatedCartItems[
                      updatedCartItems.findIndex(
                        (item) =>
                          item.handle === product.handle &&
                          item.variation === selectedVariant.title
                      )
                    ].quantity += 1;
                    setCartItems([...updatedCartItems]);
                  }}
                  className="cursor-pointer Cart aspect-square w-fit flex justify-center items-center border-black dark:border-white border-2 dark:bg-white bg-black hover:bg-white dark:hover:bg-black text-white dark:text-black hover:text-black dark:hover:text-white mt-2 font-bold py-2 px-4 rounded-full transition-colors duration-300 text-center "
                >
                  <ChevronUp />
                </button>
                <span className="aspect-square w-fit flex justify-center items-center text-black dark:text-white mt-2 font-bold py-2 px-4 rounded-full transition-colors duration-300 text-center ">
                  {
                    cartItems[
                      cartItems.findIndex(
                        (item) =>
                          item.handle === product.handle &&
                          item.variation === selectedVariant.title
                      )
                    ].quantity
                  }{" "}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const updatedCartItems = cartItems;
                    const itemIndex = updatedCartItems.findIndex(
                      (item) =>
                        item.handle === product.handle &&
                        item.variation === selectedVariant.title
                    );
                    if (itemIndex !== -1) {
                      if (updatedCartItems[itemIndex].quantity > 1) {
                        updatedCartItems[itemIndex].quantity -= 1;
                        setCartItems([...updatedCartItems]);
                      } else {
                        // Remove item if quantity would be 0
                        updatedCartItems.splice(itemIndex, 1);
                        setCartItems([...updatedCartItems]);
                      }
                    }
                  }}
                  className="cursor-pointer Cart aspect-square w-fit flex justify-center items-center border-black dark:border-white border-2 dark:bg-white bg-black hover:bg-white dark:hover:bg-black text-white dark:text-black hover:text-black dark:hover:text-white mt-2 font-bold py-2 px-4 rounded-full transition-colors duration-300 text-center "
                >
                  <ChevronDown />
                </button>
              </div>
            ) : (
              <div
                onClick={() =>
                  setCartItems((prev) => {
                    return [
                      ...prev,
                      {
                        id: prev[prev.length - 1]?.id + 1 || 1,
                        name: product.title,
                        variation: selectedVariant.title,
                        handle: product.handle,
                        image: {
                          src: displayImage || "",
                          alt: product.title,
                        },
                        quantity: 1,
                        price: parseFloat(selectedVariant.price),
                        compare_at_price: selectedVariant.compare_at_price
                          ? parseFloat(selectedVariant.compare_at_price)
                          : undefined,
                      },
                    ];
                  })
                }
                className="cursor-pointer Cart aspect-square w-fit flex justify-center items-center border-black dark:border-white border-2 dark:bg-white bg-black hover:bg-white dark:hover:bg-black text-white dark:text-black hover:text-black dark:hover:text-white mt-2 font-bold py-2 px-4 rounded-full transition-colors duration-300 text-center "
              >
                <FaCartPlus />
              </div>
            )}
          </div>
        )}
      </div>
    </MagicCard>
  );
};

export default ProductCard;
