# How to setup Wishlist
## Prerequisites
- A server with Docker and Docker Compose installed
- Having done the [Notion setup](https://github.com/Alexciao/wishlist/blob/master/doc/NOTION.md)

## Building the App
- To get started, clone the repo to your server.
### Customizing the Strings
You can optionally customize the strings that appear in the app.
To do so, you can edit the `frontend/app/strings.json` file.

## Getting the App Running
- Copy the `docker-compose.example.yml` file, and rename it to `docker-compose.yml`.

### Building the Images
There isn't a prebuilt Docker image at this time, but building it is very easy.

```
$ docker compose build
```

### Set-up
- Set the `NOTION_TOKEN` variable and the `NOTION_DATABASE_ID` variables to the ones we got in Step 1.
- You can also optionally set the `ITEMS_ORDER` variable to choose how the items appear in the frontend:
  - `unset` (default): Leave the order of the items as it is in Notion.
  - `random`: Randomize the order of the items on each fetch.
  - `alphabetical`: Sort the items alphabetically. May cause slowdowns.
  - `price`: Sort the items by price.
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
