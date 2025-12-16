import OrganizedProductOutput from "@/types/OrganizedProductOutput"
import Product from "@/types/productType"

const OrganizedProductPlaceholder: OrganizedProductOutput = {
    id:0,
    title:"///Loading",
    body_html:"<p>This is a placeholder for loading product</p>",
    vendor:"Placeholder Vendor",
    product_type:"Null",
    handle:"Loading Product",
    variants: [{
        id:0,
        name:"Loading",
        price:"000.00",
        mainImage:"/images/loading.png",
        gallery:[],
    }]
}

const UnOrganizedProductPlaceholder:Product = {
    id:1,
    title:"///Loading",
    handle:"Loading Product",
    body_html:"<p>This is a placeholder for loading product</p>",
    vendor:"Placeholder Vendor",
    product_type:"Null",
    variants:[{
        id:1,
        title:"Loading",
        price:"000.00",
        compare_at_price:"000.00",
        available:false,
        featured_image:{
            src:"/images/loading.png",
            alt:"#color_///Loading"
        }
    }],
    images:[{
        alt:"#color_///Loading",
        variant_ids:[1],
        src:"/images/loading.png",
        width:400,
        height:400
    }]
}


export {UnOrganizedProductPlaceholder, OrganizedProductPlaceholder}