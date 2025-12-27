"use client";

import { OrganizedProductPlaceholder } from "@/data/PlaceholderProduct";
import ProductPageClient from "./ProductPageClient";


const loading = () => {

    return <ProductPageClient productData={OrganizedProductPlaceholder} />;

};

export default loading;