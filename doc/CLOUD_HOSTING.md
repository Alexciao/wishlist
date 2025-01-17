# How to setup Wishlist
## Prerequisites
- A GitHub account
- A Notion account

## Setting up Notion
### Cloning the Template
- To get started, clone [the Notion template](https://alexciao.notion.site/Wishlist-16b684a97162805a9a77e5a913f5dd3b?pvs=74) to your workspace.
- It is **IMPERATIVE** that you don't change the names of properties in the database or delete them.
### Creating the Integration
- Go to the [My Integrations page](https://www.notion.so/profile/integrations), and create a new integration.
- Choose whatever name you want, and select the workspace in which you cloned the template.
- Make sure that the type is **Internal**.
- Click **Save**, and a modal will open. Click **Configure integration settings**.
- Click **Show** and take note of the **Internal Integration Secret**.
### Adding the Integration
- Go to the page you cloned earlier.
- In the 3 dot menu, scroll all the way to the bottom until you find **Connections**.
- Click on it, then search for your integration and add it.
### Copying the Database ID
- Hover over the database in the page, and click **Copy link to [x]** (where x is the view you have selected).
- Take note of the part that is _after your username/_ and _before the question mark (?)_. That's the Database ID.

## Running the App
- Firstly, fork this repo to your GitHub -- it may also be private if you wish.
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
