# How to setup Wishlist
## Prerequisites
- A GitHub account
- Having done the [Notion setup](https://github.com/Alexciao/wishlist/blob/master/doc/NOTION.md)

## Running the App
- Firstly, fork this repo to your GitHub -- it may also be private if you wish.
- To change the strings in the app, modify the `app/strings.json` file, then commit it and push it to the master branch.
- To get started, visit [Vercel](https://vercel.com/) and create an account logging in with GitHub.
- In your dashboard, go to **Add New** > **Project**.
- In the **Import Git Repository** card, choose your Wishlist repo and click **Import**.
- If you wish you may change the **Project name**.
- Open the **Environment Variables** accordion.
- Set the `NOTION_TOKEN` variable and the `NOTION_DATABASE_ID` variables to the ones we got in Step 1.
- You can also optionally set the `ITEMS_ORDER` variable to choose how the items appear in the frontend:
  - `unset` (default): Leave the order of the items as it is in Notion.
  - `random`: Randomize the order of the items on each fetch.
  - `alphabetical`: Sort the items alphabetically. May cause slowdowns.
  - `price`: Sort the items by price.
- Hit **Deploy**. In around a minute, the build process should be over.
- You're done! Now your app is live at `some-subdomain.vercel.app`. You can add your custom domain if you have one.
