# Wishlist
An app to store things you wish to have. For when someone asks you "what would you like?" and you don't have an answer.

## [Click here for setup instructions](https://github.com/Alexciao/wishlist/blob/master/doc/SETUP.md)

## FAQ
- What's the usecase for this app?
  - If someone asks you what they should gift you, but you don't have an answer, you can just give them your Wishlist link, or generate a random gift yourself. Anytime you see something that you like, but that you don't wanna buy right away, you can just add it to your Notion database and it'll automatically get updated in Wishlist.
- How does Wishlist work?
  - It's quite simple, really. Once you set the app up, you can just add things to the Notion database, and Wishlist will automatically read them.
- I found a bug!
  - Please, report it in issues attached with logs. Please remember that this app is mainly made for personal use and I won't guarantee fixing everything.
- I'd like to suggest a feature!
  - Open an issue! If I like the feature, I'll try to add it, but I can't guarantee anything as this app is made for personal use, mainly.
- Tech stack?
  - NextJS, Tailwind, shadcn-ui, Notion API

## Known Issues
- If there's an empty page on Notion (all props empty), the API will return 500 and the app won't work.
  - Workaround: Delete all empty pages.
- Max budget currently is 500 of whatever currency you set in strings.json.
  - Workaround: Set slider to 0 for no budget.
- Only one currency at a time supported.
  - Workaround: Set all prices to one single currency and set that same currency in strings.json before building.
- Once a category has subcategories, the main category isn't selectable anymore. For example, if category A has subcategories B and C, only A>B and A>C will be selectable in the frontend.
  - Workaround: Make an "Other" subcategory (example A>Other).