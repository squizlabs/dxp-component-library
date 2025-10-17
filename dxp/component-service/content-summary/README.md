# Content Summary Component

## Description

Content Summary Component is a single content item designed to be embedded inside layouts. It provides the textual part (heading, formatted text, and link) and is intended to be used with the dedicated layout: **`header-2-columns`**.

## Editing

Users can customize the Content Summary component by configuring its content. The content includes a heading, text content, and link.

## Properties Example:

```json
{
  "heading": "Main Heading Title",
  "textContent": "Short paragraph",
  "link": {
    "text": "Read more",
    "url": "https://squiz.net",
    "target": "_blank"
  },
  "contentType": "Content Type"
}
```

## Component Properties

| Property    |   Property Description    |     Property Type      | Is Required | Default |
| :---------- | :-----------------------: | :--------------------: | :---------: | :-----: |
| heading     |   Text for the heading    |         string         |      ✓      |         |
| textContent |       Text content        | string (FormattedText) |      ✓      |         |
| link        |    The link to display    |   object (SquizLink)   |      ✓      |         |
| contentType | Text for the content type |         string         |      ✓      |         |
