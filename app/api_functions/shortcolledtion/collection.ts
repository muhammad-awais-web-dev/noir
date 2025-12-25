import Product from "@/types/productType";

/**
 * Fetches products from a collection (short version without collection metadata)
 * @param collection - The collection handle/slug
 * @returns Promise with products data or null if error
 */
export async function getShortCollection(collection: string): Promise<any | null> {
    try {
        const res = await fetch(`https://zerolifestyle.co/collections/${collection}/products.json`,{
            headers: {
                'Content-Type': 'application/json'
            },
            next: { revalidate: 3600 }
        });
        if (!res.ok) {
            console.error(`Failed to fetch products for collection ${collection}, status: ${res.status}`);
            return null;
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(`Error fetching short collection ${collection}:`, error);
        return null;
    }
}