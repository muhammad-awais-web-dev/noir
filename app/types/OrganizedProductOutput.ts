interface OrganizedProductOutput {
    id:number;
    title:string;
    body_html:string;
    vendor:string;
    product_type:string;
    handle:string;
    variants: Array<{
        id:number;
        name:string;
        price:string;
        mainImage:string;
        gallery:string[];
    }>
}