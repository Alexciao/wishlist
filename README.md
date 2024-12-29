# Wishlist
An app to store things you wish to have. For when someone asks you "what would you like?" and you don't have an answer.

> For setup instructions, go [here](https://github.com/Alexciao/wishlist/blob/main/doc/SETUP.md).

## FAQ
- What's the usecase for this app?
  - If someone asks you what they should gift you, but you don't have an answer, you can just give them your Wishlist link, or generate a random gift yourself. Anytime you see something that you like, but that you don't wanna buy right away, you can just add it to your Notion database and it'll automatically get updated in Wishlist.
- How does Wishlist work?
  - It's quite simple, really. Once you set the app up, you can just add things to the Notion database, and Wishlist will automatically read them.
- Why are there a backend and a frontend if this is a Next app?
  - I don't know enough JavaScript to build anything in it. The Next app is held together by hopes & dreams, and the backend is too simple to mess up (even though I probably did).
- Tech stack?
  - **Backend**: Python, FastAPI, Uvicorn
  - **Frontend**: NextJS, Tailwind, shadcn-ui

## Known Issues
- If there's an empty page on Notion (all props empty), the API will return 500 and the app won't work. In the meantime you can just delete empty pages.
