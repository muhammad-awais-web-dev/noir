import { getProduct } from "@/app/api_functions/products/product";
import { Organized404ProductPlaceholder } from "@/data/Product404";
import ProductPageClient from "./ProductPageClient";

interface PageProps {
  params: Promise<{ product_handler: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { product_handler } = await params;
  
  const data = await getProduct(product_handler);

  if (!data) {
    return <ProductPageClient productData={Organized404ProductPlaceholder} />;
  }

  return <ProductPageClient productData={data} />;
};

export default Page;
