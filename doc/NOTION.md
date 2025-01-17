# Setting up Notion
## Prerequisites
- A Notion account

## Cloning the Template
- To get started, clone [the Notion template](https://alexciao.notion.site/Wishlist-16b684a97162805a9a77e5a913f5dd3b?pvs=74) to your workspace.
- It is **IMPERATIVE** that you don't change the names of properties in the database or delete them.
## Creating the Integration
- Go to the [My Integrations page](https://www.notion.so/profile/integrations), and create a new integration.
- Choose whatever name you want, and select the workspace in which you cloned the template.
- Make sure that the type is **Internal**.
- Click **Save**, and a modal will open. Click **Configure integration settings**.
- Click **Show** and take note of the **Internal Integration Secret**.
## Adding the Integration
- Go to the page you cloned earlier.
- In the 3 dot menu, scroll all the way to the bottom until you find **Connections**.
- Click on it, then search for your integration and add it.
## Copying the Database ID
- Hover over the database in the page, and click **Copy link to [x]** (where x is the view you have selected).
- Take note of the part that is _after your username/_ and _before the question mark (?)_. That's the Database ID.

## Adding Items
- When adding an item, you must set all its properties to some value except Size and Color.
- The page banner is optional, but highly recommended as it'll show as the product image in Wishlist.
- If you'd like more granular control, you can create subcategories up to 1 level deep, by setting the item category in Notion to this format: `[Main Category] Subcategory`. They'll appear as submenus in Wishlist. **Please note that, once a category has subcategories, the main category isn't selectable anymore. For example, if category A has subcategories B and C, only A>B and A>C will be selectable in the frontend. This is a known issue.**