# Devnetic

## Notes
 - In the JSON file, for "text" elements, DO use the coloring syntax, ex. [[gray]]<!DOCTYPE>[[/]]
 - In the JSON file, for "code" elements, do NOT use the coloring syntax. Just put the code you want to show up, and it'll automatically highlight it

## Snippets
To create a new snippet, create an element in the flow with type "snippet_unlock" like the below example:
```json
{
    "type": "snippet_unlock",
    "name": "Paragraph Tag (Basic)",
    "code_template": "<p>text</p>",
    "description": "A paragraph tag ([[lightpurple]]<p>[[/]]) is used to display text on the screen.",
    "snippet":
    {
        "name": "Paragraph Tag (Basic)",
        "id": "paragraph-tag-basic",
        "example": "<p>text</p>",
        "html": "<p>{{text}}</p>",
        "attributes":
        [
            {
                "id": "text",
                "label": "Text",
                "type": "input"
            }
        ]
    }
}
``` 
The "attributes" attribute is an array with objects containing all of the snippet's parameters. All of the ID's must be different, and currently, only type "input" is supported