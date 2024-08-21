interface JobPosting {
    id: number;
    title: string;
    description: string;
    vacancy: number;
    prerequisites: string;
    is_active: boolean;
    created_at: string; // ISO 8601 date string, you might use Date type if you're working with actual Date objects
    modified_at: string; // ISO 8601 date string, you might use Date type if you're working with actual Date objects
    artisan: Artisan;
}
