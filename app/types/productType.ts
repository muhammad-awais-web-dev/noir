export default interface Product {
  id: number;
  title: string;
  handle: string;
  body_html: string;
  vendor: string;
  product_type: string;
  variants: Array<{
    id: number;
    title: string;
    price: string;
    compare_at_price: string;
    available: boolean;
    featured_image?: {
      src: string;
      alt: string | null;
    };
  }>;
  images: Array<{
    alt: string | null;
    variant_ids: number[];
    src: string;
    width: number;
    height: number;
  }>;
}