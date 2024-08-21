interface Workshop {
    id: number;
    images: string[];
    title: string;
    description: string;
    address: string;
    date: string; // ISO 8601 date string
    workshop_level: string;
    tags: string[];
    organized_by: string;
    conducted_by_artisan: boolean;
    price: number;
    created_at: string; // ISO 8601 date string
    modified_at: string; // ISO 8601 date string
    is_active: boolean;
    artisan: Artisan;
}