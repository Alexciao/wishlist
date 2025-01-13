import { Client } from "@notionhq/client";
import { DatabaseResponse, NotionProperty } from "./types";
import { PageObjectResponse, PartialPageObjectResponse, DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export async function getDatabase(): Promise<DatabaseResponse> {
  const output: DatabaseResponse = {};
  const results = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: "Owned",
      checkbox: {
        equals: false,
      },
    },
  });

  for (const row of results.results) {
    // Type guard to check if this is a full page object
    if (!('properties' in row)) continue;

    const props = (row as PageObjectResponse).properties as Record<string, NotionProperty>;
    const rowOutput = {
      Name: "",
      Brand: "",
      Category: "",
      Price: 0,
      "Purchase Link": "",
      PageBanner: null as string | null,
    };

    // Find title property
    const titleProperty = Object.values(props).find(
      (value) => value.type === "title"
    );
    if (!titleProperty) continue;

    // Extract title
    const pageTitle = titleProperty.title
      .map((text: any) => text.text.content)
      .join("");

    // Get page cover/banner if exists
    const pageCover = (row as PageObjectResponse).cover;
    rowOutput.PageBanner = pageCover?.type === "external"
      ? pageCover.external.url
      : pageCover?.type === "file"
        ? pageCover.file.url
        : null;

    // Process properties
    for (const [key, value] of Object.entries(props)) {
      const type = value.type;
      const propValue = value[type];

      switch (type) {
        case "checkbox":
          rowOutput[key] = propValue as boolean;
          break;
        case "number":
          rowOutput[key] = propValue as number;
          break;
        case "select":
          rowOutput[key] = (propValue as { name: string } | null)?.name ?? null;
          break;
        case "rich_text":
          rowOutput[key] = (propValue as Array<{ text: { content: string } }>)
            .map((text) => text.text.content)
            .join("");
          break;
        case "url":
          rowOutput[key] = propValue as string;
          break;
        case "title":
          rowOutput[key] = (propValue as Array<{ text: { content: string } }>)
            .map((text) => text.text.content)
            .join("");
          break;
        default:
          rowOutput[key] = null;
      }
    }

    output[pageTitle] = rowOutput;
  }

  return output;
}