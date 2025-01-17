import { getDatabase } from "@/lib/notion";
import { NextResponse } from "next/server";

export async function GET() {
    try {
      const wishlist = await getDatabase();

      // changed code
      const categoriesMap: Record<string, Set<string>> = {};
        for (const item of Object.values(wishlist)) {
          if (!item.Category) continue;
          const match = item.Category.match(/^\[(.*?)\]\s*(.*)$/);
          if (match) {
            const parent = match[1].trim();
            const subcat = match[2].trim();
            if (!categoriesMap[parent]) {
              categoriesMap[parent] = new Set();
            }
            categoriesMap[parent].add(subcat);
          } else {
            if (!categoriesMap[item.Category]) {
              categoriesMap[item.Category] = new Set();
            }
            }
        }

      const categories = Object.entries(categoriesMap).map(([name, subs]) =>
        subs.size > 0
          ? { name, subcategories: Array.from(subs) }
          : { name }
      );

      return NextResponse.json({ categories });
    } catch (error) {
        console.error("Error fetching categories:", error);
        return NextResponse.json(
            { error: "Failed to fetch categories" },
            { status: 500 }
        );
    }
}