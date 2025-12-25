import Product from "../../../types/productType";
import OrganizedProductOutput from "@/types/OrganizedProductOutput";

/**
 * Fetches and organizes product data by product handle
 * @param product_handler - The product handle/slug
 * @returns Promise with organized product data or null if error
 */
export async function getProduct(product_handler: string): Promise<OrganizedProductOutput | null> {
  try {
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
      console.error(`Failed to fetch product ${product_handler}, status: ${res.status}`);
      return null;
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

    return OrganizedOutput;
  } catch (error) {
    console.error(`Error fetching product ${product_handler}:`, error);
    return null;
  }
}
