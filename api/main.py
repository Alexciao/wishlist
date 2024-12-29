from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from notion import get_database

class SuggestionBody(BaseModel):
    budget: float = None
    category: str = None

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/gifts")
async def suggest(body: SuggestionBody):
    # Suggest a random gift, based on the category and budget provided
    # Get items from wishlist via Notion
    # If no category or budget is provided, they should not be counted.
    # For example, if the budget is None, then there's no cost limit.
    # And if the category is None, then any category is acceptable.

    wishlist = get_database()
    suggestions: list[dict] = []

    category = body.category
    budget = body.budget

    for item in wishlist:
        if category and category != wishlist[item].get("Category"):
            continue
        if budget and budget < wishlist[item].get("Price"):
            continue

        wishlist[item].pop("Owned")
        suggestions.append(wishlist[item])

    return {"gifts": suggestions}


@app.get("/categories")
async def get_all_categories():
    wishlist = get_database()
    categories = set()
    for item in wishlist:
        categories.add(wishlist[item].get("Category"))
    return {"categories": list(categories)}