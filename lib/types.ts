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
    [key: string]: any;
}

export interface RequestBody {
    category?: string;
    budget?: number;
}

export interface DatabaseResponse {
    [key: string]: NotionItem;
}