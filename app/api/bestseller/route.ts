import { NextRequest } from "next/server";
import Product from "../../api/productType";

export async function GET(request: NextRequest) {
    try {
        const res = await fetch('https://zerolifestyle.co/collections/azadi-sale/products.json',{
            headers: {
                'Content-Type': 'application/json'
            },
            next: { revalidate: 3600 }
        });
        if (!res.ok) {
            return new Response(JSON.stringify({ error: 'Failed to fetch products' }), { status: 500 });
        }
        const data:Product = await res.json();
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'An error occurred' }), { status: 500 });
    }
}
