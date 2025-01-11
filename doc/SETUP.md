# How to setup Wishlist
## Prerequisites
- A server with Docker and Docker Compose installed
- A Notion account

## Setting up Notion
### Cloning the Template
- To get started, clone [the Notion template](https://alexciao.notion.site/Wishlist-16b684a97162805a9a77e5a913f5dd3b?pvs=74) to your workspace.
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

## Building the App
- To get started, clone the repo to your server.
### Customizing the Strings
You can optionally customize the strings that appear in the app.
To do so, you can edit the `frontend/app/strings.json` file.
### Building the Images
There isn't a prebuilt Docker image at this time, but building it is very easy.

```
$ docker build . -t wishlist-frontend
```

## Getting the App Running
- Copy the `docker-compose.example.yml` file, and rename it to `docker-compose.yml`.
### Set-up
- Set the `NOTION_TOKEN` variable and the `NOTION_DATABASE_ID` variables to the ones we got in Step 1.
### Running
- Run the app with
```
$ docker compose up -d
```
- and check the logs with
```
$ docker compose logs -f
```
- If you've done everything correctly, congratulations! Wishlist is now set up and updated live with data from your Notion database.
- To visit Wishlist, you can just go to `http://your-local-ip:9099`.
