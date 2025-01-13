import { getDatabase } from "@/lib/notion";
import { NextResponse } from "next/server";
import { RequestBody, NotionItem } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = await request.json() as RequestBody;
    const { category, budget } = body;

    const wishlist = await getDatabase();
    const suggestions: NotionItem[] = [];

    for (const item of Object.values(wishlist)) {
      if (category && category !== item.Category) {
        continue;
      }
      if (budget && budget < item.Price) {
        continue;
      }

      const { Owned, PageBanner, ...rest } = item;
      suggestions.push({ ...rest, PageBanner: PageBanner ?? null });
    }

    return NextResponse.json({ gifts: suggestions });
  } catch (error) {
    console.error("Error suggesting gifts:", error);
    return NextResponse.json(
      { error: "Failed to suggest gifts" },
      { status: 500 }
    );
  }
}