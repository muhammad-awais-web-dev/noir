import OrganizedProductOutput from "@/types/OrganizedProductOutput"
import Product from "@/types/productType"

const Organized404ProductPlaceholder: OrganizedProductOutput = {
    id:0,
    title:"Not Found",
    body_html:"\u003Cdiv style=\"text-align: center; padding: 40px 20px;\"\u003E\n\u003Ch2\u003E(╯°□°）╯︵ ┻━┻ Product Not Found!\u003C/h2\u003E\n\u003Cp\u003EWhoops! Looks like this product decided to play hide and seek... and it's winning. ¯\\_(ツ)_/¯\u003C/p\u003E\n\u003Cp\u003EWe searched high and low, but this product seems to have vanished into the digital void. o_O\u003C/p\u003E\n\u003Ch3\u003EWhat happened? (ಠ_ಠ)\u003C/h3\u003E\n\u003Cp\u003EThis product might be:\u003C/p\u003E\n\u003Cul style=\"text-align: left; display: inline-block;\"\u003E\n\u003Cli\u003EOut of stock and taking a vacation 🏖️\u003C/li\u003E\n\u003Cli\u003EDiscontinued (RIP to a real one 🪦)\u003C/li\u003E\n\u003Cli\u003EHiding because the URL is incorrect\u003C/li\u003E\n\u003Cli\u003EAbducted by aliens 👽 (least likely, but you never know)\u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp style=\"margin-top: 30px;\"\u003E\u003Cstrong\u003EWant to explore other awesome products?\u003C/strong\u003E\u003C/p\u003E\n\u003Cp\u003EHead back to our \u003Ca href=\"/\"\u003Ehomepage\u003C/a\u003E or check out our latest \u003Ca href=\"/collections/all\"\u003Ecollection\u003C/a\u003E. We promise they actually exist! (•_•)\u003C/p\u003E\n\u003C/div\u003E",
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
    body_html:"\u003Cdiv style=\"text-align: center; padding: 40px 20px;\"\u003E\n\u003Ch2\u003E(╯°□°）╯︵ ┻━┻ Product Not Found!\u003C/h2\u003E\n\u003Cp\u003EWhoops! Looks like this product decided to play hide and seek... and it's winning. ¯\\_(ツ)_/¯\u003C/p\u003E\n\u003Cp\u003EWe searched high and low, but this product seems to have vanished into the digital void. o_O\u003C/p\u003E\n\u003Ch3\u003EWhat happened? (ಠ_ಠ)\u003C/h3\u003E\n\u003Cp\u003EThis product might be:\u003C/p\u003E\n\u003Cul style=\"text-align: left; display: inline-block;\"\u003E\n\u003Cli\u003EOut of stock and taking a vacation 🏖️\u003C/li\u003E\n\u003Cli\u003EDiscontinued (RIP to a real one 🪦)\u003C/li\u003E\n\u003Cli\u003EHiding because the URL is incorrect\u003C/li\u003E\n\u003Cli\u003EAbducted by aliens 👽 (least likely, but you never know)\u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp style=\"margin-top: 30px;\"\u003E\u003Cstrong\u003EWant to explore other awesome products?\u003C/strong\u003E\u003C/p\u003E\n\u003Cp\u003EHead back to our \u003Ca href=\"/\"\u003Ehomepage\u003C/a\u003E or check out our latest \u003Ca href=\"/collections/all\"\u003Ecollection\u003C/a\u003E. We promise they actually exist! (•_•)\u003C/p\u003E\n\u003C/div\u003E",
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