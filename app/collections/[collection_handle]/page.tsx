import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import Image from "next/image";
import { getCollection } from "@/app/api_functions/collections/collection";

interface PageProps {
  params: Promise<{ collection_handle: string }>;
  searchParams: Promise<{ page?: string }>;
}

const page = async ({ params, searchParams }: PageProps) => {
  const { collection_handle } = await params;
  const { page = '1' } = await searchParams;
  
  const data = await getCollection(collection_handle, page);

  if (!data) {
    return (
      <section className="bg-white dark:bg-black pt-30 min-h-screen w-full flex flex-col items-center justify-center text-black dark:text-white">
        <h1 className="text-3xl">Collection not found</h1>
      </section>
    );
  }

  return (
    <section className="bg-white dark:bg-black pt-30 min-h-screen w-full flex flex-col text-black dark:text-white">
      <Image
        src={data.image.src}
        alt={data.image.alt || data.title}
        key={data.id}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        unoptimized
      />
      <h1 className="text-5xl font-bold text-center my-5">{data.title}</h1>
      <div className="products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full p-5">
        {data.products.map((product, index) => (
          <ProductCard key={index} product={product} index={index} />
        ))}
      </div>
      <div className="bg-blue flex justify-center items-center gap-10">
        <Link
          href={
            page && parseInt(page) > 1
              ? `/collections/${collection_handle}?page=${parseInt(page) - 1}`
              : "#"
          }
          className={` ${
            page && parseInt(page) > 1
              ? "text-black dark:text-white"
              : "text-gray-500 cursor-not-allowed"
          }  border-2 border-black dark:border-white px-5 py-2 `}
        >
          Previous
        </Link>
        <Link
          href={
            page && data.products.length === 20
              ? `/collections/${collection_handle}?page=${parseInt(page) + 1}`
              : "#"
          }
          className={` ${
            page && parseInt(page) * 30 < data.products_count
              ? "text-black dark:text-white"
              : "text-gray-500 cursor-not-allowed"
          }  border-2 border-black dark:border-white px-5 py-2 `}
        >
          Next
        </Link>
      </div>
    </section>
  );
};

export default page;
