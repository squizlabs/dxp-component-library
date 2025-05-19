# Key Statistic Component

## Description

The Key Statistics component displays statistics in few cards. Each card shows a value and supporting text.

## Editing

Users can customize the Key Statistics component by providing an array of statistics. Each statistic consists of a numeric value and supporting text. The array can contain between three to five items.

## Properties Example:

```json
{
  "title": "Key Statistics Component",
  "stats": [
    {
      "value": "53$"
    },
    {
      "value": "13",
      "text": "Deployed Components"
    },
    {
      "value": "999",
      "text": "Lines of Code"
    }
  ]
}
```

## Component Properties

| Property | Property Description                  | Property Type | Is Required | Default |
| :------- | :------------------------------------ | :-----------: | :---------: | :-----: |
| title    | Main title of the section             |    string     |      ✓      |         |
| stats    | An array of four key statistics       |     array     |      ✓      |         |
| value    | The numeric value of the statistic    |    string     |      ✓      |         |
| text     | The supporting text for the statistic |    string     |             |         |
