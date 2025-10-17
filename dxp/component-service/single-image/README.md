# Single Image Item

## Description

Single Image Item is a component (100% of its grid cell) intended to be embedded inside layouts (e.g. masonry grids). It renders a `<figure>` with an `<img>` and an optional `<figcaption>` derived from the image’s alt. It uses the .single-image-item class to pair with your masonry/grid styles.

## Editing

The component expects a url for the image source and (optionally) an alt string. Inline editing is enabled on the image field via `data-sq-field="componentContent.image"`.

## Properties Example:

```
{
  "componentContent": {
    "image": {
      "name": "My Image",
      "alt": "This is the image alt text",
      "imageVariations": {
        "original": {
          "url": "https://picsum.photos/800/800",
          "width": 1500,
          "height": 500,
          "byteSize": 1000,
          "mimeType": "image/jpeg",
          "aspectRatio": "1:1",
          "sha1Hash": "1234567890abcdef1234567890abcdef12345678"
        }
      }
    }
  }
}

```

## Component Properties

| Property | Property Description                                            | Property Type | Is Required | Default |
| -------- | --------------------------------------------------------------- | ------------- | ----------- | ------- |
| image    | Image object with imageVariations.original.url and optional alt | object        | ✓           |         |
