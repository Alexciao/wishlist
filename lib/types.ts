export interface RequestBody {
    category?: string;     // Main category name
    subcategory?: string; // Optional subcategory
    budget?: number;
}

export interface Category {
    name: string;
    subcategories?: string[]; // Optional array of subcategories
}

export interface DatabaseResponse {
    [key: string]: NotionItem;
}

export interface NotionProperty {
    type: string;
    [key: string]: any;
}

export interface NotionItem {
    Name: string;
    Brand: string;
    Category: string;
    Price: number;
    'Purchase Link': string;
    Owned?: boolean;
    Color?: string;
    Size?: string;
    PageBanner?: string;
    [key: string]: any;
}