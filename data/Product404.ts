import OrganizedProductOutput from "@/types/OrganizedProductOutput"
import Product from "@/types/productType"

const Organized404ProductPlaceholder: OrganizedProductOutput = {
    id:0,
    title:"Not Found",
    body_html:"<p>The Requested Product Not Found</p>",
    vendor:"Placeholder Vendor",
    product_type:"Null",
    handle:"not_found",
    variants: [{
        id:0,
        name:"404not_found",
        price:"000.00",
        mainImage:"/images/404.png",
        gallery:[],
    }]
}

const UnOrganized404ProductPlaceholder:Product = {
    id:1,
    title:"Not Found",
    handle:"not_found",
    body_html:"<p>The Requested Product Not Found</p>",
    vendor:"Placeholder Vendor",
    product_type:"Null",
    variants:[{
        id:1,
        title:"404not_found",
        price:"000.00",
        compare_at_price:"000.00",
        available:false,
        featured_image:{
            src:"/images/404.png",
            alt:"#color_404not_found"
        }
    }],
    images:[{
        alt:"#color_404not_found",
        variant_ids:[1],
        src:"/images/404.png",
        width:400,
        height:400
    }]
}


export {UnOrganized404ProductPlaceholder, Organized404ProductPlaceholder}