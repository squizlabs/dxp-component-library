# Accordion

## Description

An accordion displays a list of headings with hidden related content on the page. Users can show and hide related content by clicking on the heading.

## Editing

To customize and configure the component, you can pass different properties to modify its behavior or appearance. Specifically, you can change the heading and content for each accordion item. There is a minimum of 1 item and a maximum of 20 items.

## Properties Example:

```
{
  "accordion": [
    {
      "heading": "Accordion One",
      "content": "<p>This is accordion one!</p>"
    },
    {
      "heading": "Accordion Two",
      "content": "<p>This is accordion two!</p>"
    },
    {
      "heading": "Accordion Three",
      "content": "<p>This is accordion three!</p>"
    }
  ]
}
```

## Component Properties

| Property  |      Property Description       | Property Type | Is Required | Default |
| :-------- | :-----------------------------: | :-----------: | :---------: | :-----: |
| title     |        The section title        |    string     |             |         |
| accordion |       The accordion items       |     array     |      ✓      |         |
| heading   | The accordion item heading text |    string     |      ✓      |         |
| content   |   The accordion item content    | FormattedText |      ✓      |         |
