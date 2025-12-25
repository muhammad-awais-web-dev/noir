import Product from "@/types/productType";
import  { OrganizedCollectionData, UnOrganizedCollectionData } from "@/types/OrganizedCollectionData";

/**
 * Fetches collection data with products from the API
 * @param collection_handler - The collection handle/slug
 * @param page - Page number for pagination (default: '1')
 * @returns Promise with organized collection data or null if error
 */
export async function getCollection(collection_handler: string, page: string = '1'): Promise<OrganizedCollectionData | null> {
    try {
        const res = await fetch(`https://zerolifestyle.co/collections/${collection_handler}/products.json?limit=20${page === '1' ? '' : `&page=${page}`}`,{
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'force-cache',
            next: { revalidate: 3600 }
        });
        if (!res.ok) {
            console.error(`Failed to fetch products for ${collection_handler}, status: ${res.status}`);
            return null;
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
            return null;
        }
        const collectionsResponse = await res2.json();
        const collectionData: UnOrganizedCollectionData = collectionsResponse.collection || null;
        
        if (!collectionData) {
            console.error(`Collection data is null for ${collection_handler}`);
            return null;
        }
        
        const OrganizedOutput: OrganizedCollectionData = {
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
        return OrganizedOutput;
    } catch (error) {
        console.error('Error in collections API:', error);
        return null;
    }
}
