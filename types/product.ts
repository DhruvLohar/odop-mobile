interface Dimensions {
    h: number;
    l: number;
}

interface ProductDetails {
    [key: string]: any; // You can replace `any` with more specific types if known
}

interface Artisan {
    id: number;
    name: string;
    phone_number: string;
    profile_image: string | null;
    state: string;
    district: string;
}

interface Product {
    artisan: Artisan;
    back_story: string;
    cancelled_at: string | null;
    category: string;
    created_at: string;
    description: string;
    dimensions: Dimensions;
    id: number;
    images: string[];
    is_customizable: boolean;
    is_verified: boolean;
    modified_at: string;
    price: number;
    product_details: ProductDetails;
    quantity: number;
    raw_material: string;
    restock_date: string | null;
    tax_percent: number;
    title: string;
}
