import Product from "../types/productType";

const PlaceholderProduct: Product = {
  id: 0,
  title: "Placeholder Product",
  handle: "placeholder-product",
  body_html: "<p>This is a placeholder product description.</p>",
  vendor: "Placeholder Vendor",
  product_type: "Placeholder Type",
  variants: [
    {
      id: 0,
      title: "string",
      price: "string",
      compare_at_price: "string",
      available: false,
      featured_image: {
        src: "string",
        alt: "string",
      },
    },
],
images:[
    {
    src: "string",
    width: 1200,
    height: 1200,
    }
]
};
