import { NextRequest } from "next/server";
import Product from "../../../../types/productType";
import OrganizedProductOutput from "@/types/OrganizedProductOutput";

// Enable caching for this route
export const revalidate = 3600; // Revalidate every hour

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ product_handler: string }> }
) {
  try {
    const { product_handler } = await params;
    const res = await fetch(
      `https://zerolifestyle.co/products/${product_handler}.json`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "force-cache",
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch products" }),
        { status: 500 }
      );
    }
    const data: any = await res.json();
    const productData: Product = data.product;
    let variantsData: {
      id: number;
      name: string;
      price: string;
      compare_at_price?: string;
      mainImage: string;
      gallery: string[];
    }[] = [];
    productData.variants.map((variant) => {
      variantsData.push({
        id: variant.id,
        name: variant.title,
        price: variant.price,
        compare_at_price: variant.compare_at_price,
        mainImage: "",
        gallery: [],
      });
    });
    productData.images.forEach((image, index) => {
      if (image.variant_ids.length > 0) {
        const variantIndex = variantsData.findIndex(
          (variant) => variant.id === image.variant_ids[0]
        );
        if (variantIndex !== -1) {
          if (variantsData[variantIndex].mainImage === "") {
            variantsData[variantIndex].mainImage = image.src;
          } else {
            variantsData[variantIndex].gallery.push(image.src);
          }
        }
      } else if (image.alt) {
        variantsData.forEach((variant) => {
          if (
            image.alt &&
            image.alt.slice(7) == variant.name &&
            image.src !== variant.mainImage
          ) {
            variant.gallery.push(image.src);
          }
        });
      }
    });

    const OrganizedOutput: OrganizedProductOutput = {
      id: productData.id,
      title: productData.title,
      body_html: productData.body_html,
      vendor: productData.vendor,
      product_type: productData.product_type,
      handle: productData.handle,
      variants: variantsData,
    };

    return new Response(JSON.stringify(OrganizedOutput), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
    });
  }
}
