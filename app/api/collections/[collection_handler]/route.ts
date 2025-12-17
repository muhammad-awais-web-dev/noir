import { NextRequest } from "next/server";
import Product from "@/types/productType";
import  { OrganizedCollectionData, UnOrganizedCollectionData } from "@/types/OrganizedCollectionData";

// Enable caching for this route
export const revalidate = 3600; // Revalidate every hour

export async function GET(request: NextRequest, { params }: { params: Promise<{ collection_handler: string }> }) {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get('page') || '1';
    try {
        const {collection_handler} = await params;
        const res = await fetch(`https://zerolifestyle.co/collections/${collection_handler}/products.json?limit=20${page === '1' ? '' : `&page=${page}`}`,{
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'force-cache',
            next: { revalidate: 3600 }
        });
        if (!res.ok) {
            console.error(`Failed to fetch products for ${collection_handler}, status: ${res.status}`);
            return new Response(JSON.stringify({ 
                error: 'Failed to fetch products', 
                collection: collection_handler,
                status: res.status 
            }), { status: res.status });
        }
        const productsResponse = await res.json();
        const data: Product[] = productsResponse.products || [];
        
        const res2 = await fetch (`https://zerolifestyle.co/collections/${collection_handler}.json`,{
            headers :{
                'Content-Type': 'application/json'
            },
            cache: 'force-cache',
            next: {revalidate: 3600}
        });
        if (!res2.ok){
            console.error(`Failed to fetch collection metadata for ${collection_handler}, status: ${res2.status}`);
            return new Response(JSON.stringify({ 
                error: 'Collection not found', 
                collection: collection_handler 
            }), { status: 404 });
        }
        const collectionsResponse = await res2.json();
        const collectionData: UnOrganizedCollectionData = collectionsResponse.collection || null;
        
        if (!collectionData) {
            return new Response(JSON.stringify({ 
                error: 'Collection data is null', 
                collection: collection_handler 
            }), { status: 404 });
        }
        
        const OrganizedOutput : OrganizedCollectionData = {
            id: collectionData.id,
            title: collectionData.title,
            handle: collectionData.handle,
            description: collectionData.description,
            published_at: collectionData.published_at,
            updated_at: collectionData.updated_at,
            image: collectionData.image ?? {id:0,created_at:"never",src:"/images/Banner.png",alt:"Placeholder"} ,
            products_count: collectionData.products_count,
            products: data
        }
        return new Response(JSON.stringify(OrganizedOutput), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200'
            }
        });
    } catch (error) {
        console.error('Error in collections API:', error);
        return new Response(JSON.stringify({ 
            error: 'An error occurred',
            details: error instanceof Error ? error.message : 'Unknown error'
        }), { status: 500 });
    }
}
