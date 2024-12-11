# DXP Component Library

This project provides a library of simple components built on Component Service technology. It demonstrates how to create components using basic technologies like vanilla JS, along with the required files for component creation: `manifest.json`, `preview.html`, and `example.data.json`.

The library is educational, with code comments explaining the behavior and functionality of the components. In the `dxp/component-service/` directory, you'll find ready-to-use and customizable components, ranging from simple to more complex examples, incorporating various data types supported by Component Service.

---

## Getting Started

### Cloning the Repository

Clone the repository and navigate to the project directory:

```
git@github.com:squizlabs/dxp-component-library.git
```

```
cd dxp-component-library
```

### Removing Git Connection

Removing Git Connection

To detach the project from the original Git repository:

```
rm -rf .git
```

### Forking the Repository

Alternatively, you can fork this project to your repository to keep it separate and manage your changes:

1. Fork the repository.
2. Clone the forked repository to your local machine.
3. Navigate to the project directory.

### Installing Dependencies

Install all necessary dependencies:

```
npm install
```

Ensure you are using the correct Node.js version:

```
nvm use
```

### Viewing Components

To preview the components, run:

```
npm run dev
```

And open the port:

1. Development frontend: `http://localhost:4000` - This is the development preview with linked styles and scripts, ideal for active development. It supports Hot Module Replacement (HMR), allowing automatic reloads on code changes.
2. Edge Component development webserver: `http://localhost:5555` - This is a classic Edge Component development webserver with a raw preview of the component, useful for testing its rendering without additional UI layers.
3. UI started on port: `http://localhost:3000` - This port provides a CMS-like preview showing how the component's fields (e.g., string, SquizImage) are displayed in Matrix. It simulates the field setup UI for better context during development.

## Creating New Component

To create a new component, start in the `dxp/component-service` directory and create a new folder with the name of your component. Alternatively, copy an existing one and adjust the names.

Example structure:

```
dxp/
├── component-service/
│   ├── new-component/
│   │   ├── css/
│   │   │   ├── new-component.scss
│   │   ├── js/
│   │   │   ├── frontend.js
│   │   ├── example.data.json
│   │   ├── main.js
│   │   ├── main.test.js
│   │   ├── manifest.json
│   │   ├── preview.html
│   │   ├── README.md
```

All additional scripts and styles will automatically be included in `src/styles/main.scss` and `src/scripts/main.js`. These files are used to build the final output in the /dist directory, which you can connect through GitBridge.

### Project Structure

The project structure is straightforward, centered around the `component-service/` directory. The `src/` directory contains files facilitating development, such as shared scripts, styles, mixins, variables, and fonts.

### Component File Descriptions

- `example.data.json` - Contains example data passed to the component, displayed in previews and DXP.
- `main.js` - Defines the component's structure, including classes and functions for state and appearance changes.
- `manifest.json` - A critical file linking all others, specifying dependencies, defining preview data sources, and setting up input configurations in the CMS. To learn more about the manifest and its individual fields, check the official documentation: [Preview Configuration](https://docs.squiz.net/component-service/latest/preview/preview-configuration.html) and [Edit Manifest File](https://docs.squiz.net/component-service/latest/tutorials/build-a-basic-component/edit-manifest-file.html)
- `preview.html` - A wrapper for the component, usually identical for each component.
- `README.md` - Component description with tips and property examples.

#### Optional files:

- `main.test.json` - Tests for the component written in Vitest.
- `frontend.js` - Custom scripts for the component.
- `name-component.scss` - Component-specific styles. When adding global styles or colorful themes, it's recommended to start with `src/styles/common` and `src/styles/themes`.
- `frontend.test.js` - Tests for custom scripts.

## Linters & Formatters

The project uses Prettier, ESLint, and Stylelint. Review the `package.json` to find commands to run these before pushing changes.

Note: After setting up CI/CD, these commands will run automatically.

## Tests 

The project includes tests written in Vitest. They cover all main.js files and additional scripts related to the components.

To run the tests locally, use:

```
npm run test
```

Note: After setting up CI/CD, these tests will run automatically on each push or merge request.

## Aliases

Within the `/src` folder and styles, you can use aliases defined in vite.config.js. Avoid deep relative paths by using aliases like `@images/logo.svg`.

## Utils

Utility functions for components are stored in `dxp/component-service/utils`:

`xss.js` - Prevents XSS attacks by sanitizing inputs.
`html.js` - Tags template literals for syntax highlighting, readability, and structured HTML generation.

## Previewing Component

To preview a component with styles, display it along with others on the cutup view by adding it to the page. For example, open `homepage.js` and include the component using its namespace and name:

```
<!--@@ cmp edge-dxp-comp-lib/component-name @@-->
```

### Displaying Multiple Versions

To display multiple versions of a component, define additional previews in manifest.json and point to extra `example.data.json` files. For instance:

```
  "previews": {
    "default": {
      "functionData": {
        "main": {
          "inputData": {
            "type": "file",
            "path": "./example-data/example.data.json"
          },
          "wrapper": {
            "path": "preview.html"
          }
        }
      }
    },
    "alternate": {
      "functionData": {
        "main": {
          "inputData": {
            "type": "file",
            "path": "./example-data/example-alt.data.json"
          },
          "wrapper": {
            "path": "preview.html"
          }
        }
      }
    }
```

To view the custom version, use:

```
<!--@@ cmp edge-dxp-comp-lib/component-name alternate @@-->
```

### Global HTML Elements

Global elements like footers or navigation can be created or edited in `src/global_components`. Import them on any page in `src/html`.

```
import { ElementName } from '@global_components/element/elementName';
```

### Environment Variables

To work with environment variables and components that fetch data, create a `.env` file. This file has been added to `.gitignore` to prevent it from being pushed to the repository.

In the `.example.env` file, you will find a sample structure that you can use to create your own environment variables.

If these variables are required for your component to work, don't forget to update this section in the manifest:

```
"environment": [
  {
    "name": "API_IDENTIFIER",
    "required": false
  },
  {
    "name": "BASE_DOMAIN",
    "required": false
  },
  {
    "name": "BASE_PATH",
    "required": false
  }
]
```

Currently, data-fetching components in this project are replaced with mocks, but after adding your environment variables to `.env`, you can remove this if condition:

```
if (API_IDENTIFIER && BASE_DOMAIN && BASE_PATH) {
  // Fetch real data
} else {
  // Fallback to mock data if environment variables are not set
}
```

### Creating a Subpage

To create a new page for components, simply create a file with the desired page name inside the `src/html` directory. If needed, import global elements into the page and export it to render the template.

Import the page into `entry-server.js`:

```
import Subpage from '@pages/subpage.js';
```

Then, add it as a new case:

```
case 'pageName':
  pageTitle = 'PageName';
  htmlContent = await PageName();
  break;
```

If you want the new page to be visible in the navigation, add it as a new child to the navigation list:

```
<li class="navbar__item">
  <a class="navbar__link" href="/pagename">PageName</a>
</li>
```

## Build & Push

To package the project for production, run the following command:

```
npm run build
```

This will generate a `/dist` folder containing `main.js` and `main.css`.

Push your changes to GIT, deploy your component as described in the Deploying a Component section, and update the associated GitBridge connected to the CMS.

## Version Management

This project includes the `vermgmt` library, which helps in versioning and deploying multiple components simultaneously. Although optional, it can significantly streamline your workflow. To check its available options, run:

```
npm run vermgmt
```

## Deploying a Component

To deploy a component, first log in to the appropriate tenant using the following command, replacing {tenant-id} with your tenant's ID:

```
dxp-next auth login --tenant={tenant-id}
```

Ensure the component's version is updated according to semantic versioning (SemVer). Then, deploy the component using:

```
npm run deploy --name=component_name
```

After deployment, add the component to a set. If this is the first deployment, it must be added manually. Subsequent deployments will automatically increment the version in the set.

## Adding Styles to the DXP Console Preview (Optional)

By default, your component will not be styled in the DXP console preview. To add styles, follow these steps:

1. Create an additional `preview-dxp.html` file with the following structure:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DXP preview</title>
    <link
      rel="stylesheet"
      href="cms-domain/__data/assets/git_bridge/123/1234/dist/client.css"
    />
  </head>
  <body>
    [component://output]
    <script src="cms-domain/__data/assets/git_bridge/123/1234/dist/client.js"></script>
  </body>
</html>
```

2. Deploy the code to the repository and update the existing GitBridge.
3. Link the styles and scripts hosted via GitBridge to the DXP console preview.
