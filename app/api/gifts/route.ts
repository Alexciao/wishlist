import { getDatabase } from "@/lib/notion";
import { NextResponse } from "next/server";
import { RequestBody, NotionItem } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = await request.json() as RequestBody;
    const { category, subcategory, budget } = await body;
    const wishlist = await getDatabase();
    const suggestions: NotionItem[] = [];

    for (const item of Object.values(wishlist)) {
      // Parse category using the [MainCategory] Subcategory format
      const match = item.Category.match(/^\[(.*?)\]\s*(.*)$/);
      const itemMainCat = match ? match[1].trim() : item.Category;
      const itemSubCat = match ? match[2].trim() : null;

      // Skip if main category doesn't match (when specified)
      if (category && category !== 'all' && category !== itemMainCat) {
        continue;
      }

      // Skip if subcategory doesn't match (when specified)
      if (subcategory && (!itemSubCat || itemSubCat !== subcategory)) {
        continue;
      }

      // Skip if over budget (when specified)
      if (budget && budget < item.Price) {
        continue;
      }

      const { Owned, PageBanner, ...rest } = item;
      suggestions.push({ ...rest, PageBanner: PageBanner ?? null });
    }

    const itemsOrder = process.env.ITEMS_ORDER;
    if (itemsOrder === "random") {
      suggestions.sort(() => Math.random() - 0.5);
    } else if (itemsOrder === "alphabetical") {
      suggestions.sort((a, b) => a.Name.localeCompare(b.Name));
    } else if (itemsOrder === "price") {
      suggestions.sort((a, b) => a.Price - b.Price);
    }

    return NextResponse.json({ gifts: suggestions });
  } catch (error) {
    console.error('Error processing gifts request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}