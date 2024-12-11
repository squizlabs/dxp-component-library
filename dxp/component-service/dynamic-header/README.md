# Dynamic Header

## Description

The `Dynamic Header` component allows the user to create content with a heading and some text to display on the page. The heading size can be selected by the user (e.g., H1, H2, H3, etc.), making it flexible for various uses like main headers, subheaders, and sections.

## Editing

Users can customize the Header + Paragraph component by providing the text for the heading and the content. The heading level can be chosen from H1 to H6, allowing users to define the importance and size of the heading.

The content is optional and will only be displayed if provided.

## Properties Example:

```json
{
  "title": "Main title",
  "titleLevel": "h1",
  "content": "A Simple paragraph."
}
```

## Component Properties

| Property   |             Property Description              |                 Property Type                 | Is Required | Default |
| :--------- | :-------------------------------------------: | :-------------------------------------------: | :---------: | :-----: |
| title      |            The text of the heading            |                    string                     |      ✓      |         |
| titleLevel |         Determine the level of title          | one of (['h1', 'h2', 'h3', 'h4', 'h5', 'h6']) |      ✓      |   h2    |
| content    | The text content to display below the heading |                    string                     |             |         |
