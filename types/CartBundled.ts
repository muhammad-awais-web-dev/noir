interface CartItemBundled {
    id: number;
    name: string;
    handle: string;
    variation: {
        name:string;
        image: {
            src: string;
            alt: string;
        };
        quantity: number;
        price: number;
        compare_at_price?: number;
    }[];
}

export type { CartItemBundled };