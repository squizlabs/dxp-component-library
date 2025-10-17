# Header 2 Columns Layout

## Overview

The **Header 2 Columns Layout** displays a section title followed by two equal-width columns. It is designed for flexible header or hero sections and includes an alignment option for text positioning.

- **Name:** `header-2-columns`
- **Display name:** Header 2 Columns
- **Description:** A two column 50/50 layout with vertical alignment.
- **Template file:** `markup.hbs`
- **Config file:** `page-layout.yaml`

## Options

| Option key        | Display name | Description              | Values                    |
| ----------------- | ------------ | ------------------------ | ------------------------- |
| `alignmentOption` | Align text   | Type of alignment to use | `left`, `center`, `right` |

## Local Development

Run the local server with mock HTML files for each zone and an alignment option:

```
export ENABLE_PAGE_LAYOUTS=true dxp-next page layouts dev --config ./page-layout.yaml --zones=sectionTitle=./section-title.html --zones=col1=./column.1.html --zones=col2=./column.2.html --options=alignmentOption=center --stylesheet ../../../dist/main.css
```
