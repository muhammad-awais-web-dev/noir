interface CartItem {
    id: number;
    name: string;
    variation?: string;
    handle: string;
    image: {
        src: string;
        alt: string;
    };
    quantity: number;
    price: number;
    compare_at_price?: number;
}

export type { CartItem };