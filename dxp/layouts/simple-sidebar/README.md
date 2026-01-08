# Simple Sidebar Layout

## Overview

The **Simple Sidebar Layout** includes a full-width banner, a main content area, and a sidebar. It supports flexible positioning of the sidebar and is ideal for content-driven pages such as articles or landing pages.

- **Name:** `simple-sidebar-layout`
- **Display name:** Simple Sidebar Layout
- **Description:** Layout with full-width banner, main content and a sidebar.
- **Template file:** `markup.hbs`
- **Config file:** `manifest.json`

## Options

| Option key        | Display name     | Description                                              | Values          |
| ----------------- | ---------------- | -------------------------------------------------------- | --------------- |
| `sidebarPosition` | Sidebar Position | Choose whether the sidebar appears on the left or right. | `left`, `right` |

## Local Development

Run the local server with mock HTML files for each zone and a sidebar position option:

```
dxp-next page layouts dev --config ./manifest.json --zones=banner=./banner.html --zones=main=./main.html --zones=sidebar=./sidebar.html --properties=sidebarPosition=right --stylesheet ../../../dist/main.css
```
