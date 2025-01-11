import { getDatabase } from "@/lib/notion";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const wishlist = await getDatabase();
        const categories = new Set<string>();

        for (const item of Object.values(wishlist)) {
            if (item.Category) {
                categories.add(item.Category);
            }
        }

        return NextResponse.json({ categories: Array.from(categories) });
    } catch (error) {
        console.error("Error fetching categories:", error);
        return NextResponse.json(
            { error: "Failed to fetch categories" },
            { status: 500 }
        );
    }
}