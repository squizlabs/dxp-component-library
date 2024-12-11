# Single Column Component

## Description

The Single Column component allows users to create a layout with an image and a content. The component offers two variants: one with the image on the left and the content on the right, and another with the image on the right and the content on the left.

## Editing

Users can customize the Single Column component by configuring its content and layout. The content includes an image, heading, text content, and link. The layout can be adjusted to place the image either on the left or the right side.

## Properties Example:

```json
{
  "title": "Section Title",
  "image": {
    "alt": "Sample Image",
    "imageVariations": {
      "original": {
        "url": "https://picsum.photos/800/600",
        "width": 800,
        "height": 600
      }
    }
  },
  "heading": "Main Heading Title",
  "textContent": "Short paragraph",
  "link": {
    "text": "Read more",
    "url": "https://squiz.net",
    "target": "_blank"
  },
  "contentType": "Content Type"
},
"componentConfiguration": {
  "variant": "text-left"
}
```

## Component Properties

| Property    |   Property Description    |           Property Type            | Is Required |  Default  |
| :---------- | :-----------------------: | :--------------------------------: | :---------: | :-------: |
| title       |     The section title     |               string               |             |           |
| image       |   The image to display    |        object (SquizImage)         |      ✓      |           |
| heading     |   Text for the heading    |               string               |      ✓      |           |
| textContent |       Text content        |       string (FormattedText)       |      ✓      |           |
| link        |    The link to display    |         object (SquizLink)         |      ✓      |           |
| contentType | Text for the content type |               string               |      ✓      |           |
| variant     |      One of variants      | one of ('text-left', 'text-right') |      ✓      | text-left |
