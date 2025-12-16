import OrganizedProductOutput from "@/types/OrganizedProductOutput"
import Product from "@/types/productType"

const OrganizedProductPlaceholder: OrganizedProductOutput = {
    id:0,
    title:"///Loading",
    body_html:"\u003Cdiv style=\"text-align: center; padding: 40px 20px;\"\u003E\n\u003Ch2\u003E(•_•) Loading Product Details...\u003C/h2\u003E\n\u003Cp\u003EHang tight! We're fetching all the amazing specs and features for you. ☉_☉\u003C/p\u003E\n\u003Cp\u003EOur digital hamsters are running at full speed to bring you the product info...\u003C/p\u003E\n\u003Cp style=\"font-size: 48px; margin: 20px 0;\"\u003E⌛\u003C/p\u003E\n\u003Cp\u003E\u003Cem\u003EThis usually takes just a moment. If it's taking longer, our hamsters might need a coffee break! ☕\u003C/em\u003E\u003C/p\u003E\n\u003C/div\u003E",
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
    body_html:"\u003Cdiv style=\"text-align: center; padding: 40px 20px;\"\u003E\n\u003Ch2\u003E(•_•) Loading Product Details...\u003C/h2\u003E\n\u003Cp\u003EHang tight! We're fetching all the amazing specs and features for you. ☉_☉\u003C/p\u003E\n\u003Cp\u003EOur digital hamsters are running at full speed to bring you the product info...\u003C/p\u003E\n\u003Cp style=\"font-size: 48px; margin: 20px 0;\"\u003E⌛\u003C/p\u003E\n\u003Cp\u003E\u003Cem\u003EThis usually takes just a moment. If it's taking longer, our hamsters might need a coffee break! ☕\u003C/em\u003E\u003C/p\u003E\n\u003C/div\u003E",
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