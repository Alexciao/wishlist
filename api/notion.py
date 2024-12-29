import os
from notion_client import Client

notion = Client(auth=os.environ["NOTION_TOKEN"])


def get_database():
    output = {}

    # Query database
    results = notion.databases.query(
        **{
            "database_id": os.environ["NOTION_DATABASE_ID"],
            "filter": {
                "property": "Owned",
                "checkbox": {
                    "equals": False
                }
            }
        }
    )['results']

    # Iterate through rows
    for row in results:
        props = row['properties']
        row_output = {}

        # Extract the title for the key
        title_property = next(
            (value for key, value in props.items() if value['type'] == 'title'), None
        )
        if not title_property:
            continue  # Skip rows without a title property

        # Extract the title's text content
        page_title = ''.join(
            [text['text']['content'] for text in title_property['title']]
        )

        # Process each property dynamically
        for key, value in props.items():
            _type = value['type']  # Get the property type
            prop_value = value[_type]

            # Extract values based on property type
            if _type == "checkbox":
                row_output[key] = prop_value
            elif _type == "number":
                row_output[key] = prop_value
            elif _type == "select":
                row_output[key] = prop_value['name'] if prop_value else None
            elif _type == "rich_text":
                row_output[key] = ''.join([text['text']['content'] for text in prop_value])
            elif _type == "url":
                row_output[key] = prop_value
            elif _type == "title":
                row_output[key] = ''.join([text['text']['content'] for text in prop_value])
            else:
                row_output[key] = None  # Handle unsupported types

        # Add row to output with page title as the key
        output[page_title] = row_output

    print(output)

    return output