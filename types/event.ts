
interface EventDetails {
    id: number;
    title: string;
    description: string;
    address: string;
    date: string; // ISO 8601 date string
    tags: string[];
    created_at: string; // ISO 8601 date string
    modified_at: string; // ISO 8601 date string
    is_active: boolean;
}
