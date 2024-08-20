interface RentalMachine {
    id: number; // ID is a number
    images: string[]; // Images is an array of strings
    title: string; // Title is a string
    description: string; // Description is a string
    starting_time: string; // Starting time in "HH:MM:SS" format
    ending_time: string; // Ending time in "HH:MM:SS" format
    is_active: boolean; // Is active is a boolean
    created_at: string; // Created at is an ISO 8601 string
    modified_at: string; // Modified at is an ISO 8601 string
    artisan: number; // Artisan is a number (likely an ID)
    rate: number;
}
