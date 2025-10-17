# Three Columns Layout

## Overview

The **Three Columns Layout** displays three content zones side by side in equal width columns. It is fully responsive and can be used to organize content such as text, images, or components in a balanced grid structure.

- **Name:** `three-columns-layout`
- **Display name:** Three Columns Layout
- **Description:** Three columns side by side, responsive.
- **Template file:** `markup.hbs`
- **Config file:** `page-layout.yaml`

## Local Development

Run the local server with mock HTML files for each zone:

```
export ENABLE_PAGE_LAYOUTS=true
dxp-next page layouts dev --config ./page-layout.yaml --zones=col1=./column.1.html --zones=col2=./column.2.html --zones=col3=./column.3.html --stylesheet ../../../dist/main.css
```
