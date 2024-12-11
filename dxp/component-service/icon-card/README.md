# Icon Cards

## Description

Icon Cards is a component that displays a collection of cards, each featuring an icon, a heading, text content, and an optional link. This component allows users to configure the number of columns (2, 3 or 4).

## Editing

Users can customize the Icon Cards component by manually providing a card content and configuration option. The content array includes the set of predefined icons, heading, text content, and an optional link for each card. The configuration allows setting the number of columns to either 2, 3 or 4.

## Properties Example:

```
{
  "componentContent": [
    {
      "icon": "alarm",
      "heading": "First heading",
      "textContent": "Text Content"
    },
    {
      "icon": "confused",
      "heading": "Second heading",
      "textContent": "Text Content"
    }
  ],
  "componentConfiguration": {
    "numberOfColumns": 2
  }
}
```

## Component Properties

| Property        | Property Description          | Property Type | Is Required | Default |
| --------------- | ----------------------------- | ------------- | ----------- | ------- |
| title           | Main title of the section     | string        | ✓           |         |
| icon            | The class name for the icon   | string        |             |         |
| heading         | Text for the card heading     | string        | ✓           |         |
| textContent     | Text content for the card     | FormattedText | ✓           |         |
| link            | The link for the card         | SquizLink     |             |         |
| numberOfColumns | Number of columns (2, 3 or 4) | number        | ✓           | 2       |
