# Masonry Gallery Layout

## Overview

The **Masonry Gallery Layout** arranges items in a dynamic, Pinterest-style masonry grid. It is suitable for displaying image galleries, cards, or mixed media collections where elements vary in height.

- **Name:** `masonry-gallery-layout`
- **Display name:** Masonry Gallery Layout
- **Description:** Pinterest-style masonry gallery for images/cards.
- **Template file:** `markup.hbs`
- **Config file:** `page-layout.yaml`

## Local Development

Run the local server with mock HTML for the items zone:

```
export ENABLE_PAGE_LAYOUTS=true
dxp-next page layouts dev --config ./page-layout.yaml --zones=items=./image-content.html --stylesheet ../../../dist/main.css
```
