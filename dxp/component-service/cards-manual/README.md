# Cards

## Description

The cards component displays a row of cards. The cards have text that overlays an optional background image.

## Editing

Editors can choose a title and link to appear above the row of cards. Each card will be entered manually by an editor and can have a content type, heading, supporting text and an image and link. A solid colour background is displayed if no image is provided. A minimum of 1 card is required, with a maximum of 8.

## Properties Example:

```
{
  "title": "Cards",
  "link": {
    "text": "CTA text link",
    "url": "https://squiz.net",
    "target": "_blank"
  },
  "cards": [
    {
      "contentType": "Content type",
      "heading": "Card One",
      "supportingText": "Preview text",
      "link": {
        "text": "CTA text link",
        "url": "https://squiz.net",
        "target": "_blank"
      },
      "image": {
        "name": "My Image",
        "alt": "This is the image alt text",
        "imageVariations": {
          "original": {
            "url": "https://picsum.photos/800/600",
            "width": 1500,
            "height": 500,
            "byteSize": 1000,
            "mimeType": "image/jpeg",
            "aspectRatio": "1:1",
            "sha1Hash": "1234567890abcdef1234567890abcdef12345678"
          }
        }
      }
    },
    {
      "contentType": "Content type",
      "heading": "Card Two",
      "supportingText": "Preview text",
      "link": {
        "text": "CTA text link",
        "url": "https://squiz.net",
        "target": "_blank"
      },
      "image": {
        "name": "My Image",
        "alt": "This is the image alt text",
        "imageVariations": {
          "original": {
            "url": "https://picsum.photos/800/600",
            "width": 1500,
            "height": 500,
            "byteSize": 1000,
            "mimeType": "image/jpeg",
            "aspectRatio": "1:1",
            "sha1Hash": "1234567890abcdef1234567890abcdef12345678"
          }
        }
      }
    },
    {
      "contentType": "Content type",
      "heading": "Card Three",
      "supportingText": "Preview text",
      "link": {
        "text": "CTA text link",
        "url": "https://squiz.net",
        "target": "_blank"
      },
      "image": {
        "name": "My Image",
        "alt": "This is the image alt text",
        "imageVariations": {
          "original": {
            "url": "https://picsum.photos/800/600",
            "width": 1500,
            "height": 500,
            "byteSize": 1000,
            "mimeType": "image/jpeg",
            "aspectRatio": "1:1",
            "sha1Hash": "1234567890abcdef1234567890abcdef12345678"
          }
        }
      }
    },
    {
      "contentType": "Content type",
      "heading": "Card Four",
      "supportingText": "Preview text, no image bg",
      "link": {
        "text": "CTA text link",
        "url": "https://squiz.net",
        "target": "_blank"
      }
    }
  ]
}
```

## Component Properties

| Property       |        Property Description         |    Property Type    | Is Required | Default |
| :------------- | :---------------------------------: | :-----------------: | :---------: | :-----: |
| title          |    The title above the card grid    |       string        |             |         |
| link           |       Link next to the title        | string (SquizLink)  |             |         |
| cards          |        Array of card objects        |       string        |      ✓      |         |
| contentType    |        Text above the title         |       string        |             |         |
| heading        |           The card title            |       string        |      ✓      |         |
| supportingText |        Text below the title         |       string        |             |         |
| link           |       Where the card links to       |       string        |      ✓      |         |
| image          | Image in the background of the card | object (SquizImage) |             |         |
