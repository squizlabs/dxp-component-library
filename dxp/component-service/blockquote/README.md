# Block Quote Component

## Description

This component displays a quote along with the author's name. It is designed to be used wherever you want to highlight a specific quotation.

## Editing

To customize and configure the component, you can pass different properties to modify its behavior or appearance. Specifically, you can change the text of the quote and the name of the author.

## Properties Example:

```json
{
  "title": "Blockquote component",
  "quote": "Well begun is half done.",
  "author": "Aristotle"
}
```

## Component Properties

| Property |                Property Description                | Property Type | Is Required | Default |
| :------- | :------------------------------------------------: | :-----------: | :---------: | :-----: |
| title    |                 The section title                  |    string     |             |         |
| quote    |       The text of the quote to be displayed        | FormattedText |      ✓      |         |
| author   | The name of the person who said or wrote the quote |    string     |             |         |
