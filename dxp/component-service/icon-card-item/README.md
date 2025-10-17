# Icon Cards Item

## Description

Icon Cards Item is a single-card component (100% width) based on the “Icon Cards” component. It displays one card with an icon, a heading, formatted text, and an optional link. It’s intended to be embedded inside layouts and reuses the same classes (.icon-card, .icon-card\_\_wrapper, etc.) and iconMap.

## Editing

You can choose a predefined icon key (from iconMap), set a heading, add formatted text, and optionally make the entire card a link. Inline editing is enabled for heading, textContent, and link.

## Properties Example:

```
{
  "componentContent": {
    "icon": "pen",
    "heading": "First Heading",
    "textContent": "Short Description",
    "link": {
      "text": "Learn more",
      "url": "https://squiz.net",
      "target": "_self"
    }
  }
}
```

## Component Properties

| Property    | Property Description        | Property Type | Is Required | Default |
| ----------- | --------------------------- | ------------- | ----------- | ------- |
| icon        | The class name for the icon | string        |             |         |
| heading     | Text for the card heading   | string        | ✓           |         |
| textContent | Text content for the card   | FormattedText | ✓           |         |
| link        | The link for the card       | SquizLink     |             |         |
