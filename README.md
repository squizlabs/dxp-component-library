# DXP Component Library

The DXP Component Library is a library of simple components built on Component Service technology.

It demonstrates how to create DXP components using basic technologies like vanilla JavaScript.

The `/dxp/component-service/` directory contains ready-to-use and customizable components, ranging from simple to more complex examples, incorporating various data types supported by Component Service.

The library is educational, with code comments explaining the behavior and functionality of the components.

---

## Pre-requisites

1. [git](https://git-scm.com).

   See _installing-git.md_, included in this repo, for `git` install procedures for macOS, Windows, and Linux.

2. [Node Version Manager](https://github.com/nvm-sh/nvm), aka `nvm`.

3. [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

   We recommend using `nvm` to install Node.js and npm.

4. [DXP CLI](https://docs.squiz.net/squiz-dxp/latest/dxp-cli/), aka `dxp-next`.

   ```bash
   npm install --global @squiz/dxp-cli-next
   ```

   See The [DXP CLI Install and upgrade](https://docs.squiz.net/squiz-dxp/latest/dxp-cli/get-started/installation.html) documentation for details and for upgrade instructions.

## Files required for component creation:

- `manifest.json`;
- `preview.html`; and
- `example.data.json`.

**NB:** examples of these files are included in the DXP Component Library.

## Getting Started

To keep your work separate from the original and manage your changes independently, you can either

- clone the repository and then detach the cloned repository from the source repo; or

- fork the repository.

Cloning and detaching is done entirely from your workstation.

Forking is a GitLab-specific procedure.

### Clone and detach the repository

1. Clone the repository

   ```bash
   git@github.com:squizlabs/dxp-component-library.git
   ```

2. Switch to the project directory

   ```bash
   cd dxp-component-library
   ```

3. Detach the project from the original Git repository:

   ```bash
   rm -rf .git
   ```

### Fork the repository

1. Load <https://github.com/squizlabs/dxp-component-library> in a browser.

2. In a separate browser window load the [GitLab Fork documentation](https://docs.gitlab.com/ee/user/project/repository/forking_workflow.html).

3. Follow the **Create a fork** procedure on the [GitLab Fork documentation](https://docs.gitlab.com/ee/user/project/repository/forking_workflow.html) page.

4. Clone the forked repository to your local machine.

   ```bash
   git@<forked-project-name-space>/<forked-project-name>.git
   ```

5. Navigate to the project directory.

   ```bash
   cd dxp-component-library
   ```

### Install necessary dependencies and check the Node.js version

1. Run the npm install command to install necessary dependencies

   ```bash
   npm install
   ```

2. Check you are using the correct Node.js version

   A pseudo RUNCOM file, `.nvmrc`, can be placed in the root directory of a project. This file [sets the Node.js version to be used by that particular project](https://github.com/nvm-sh/nvm#nvmrc).

   Assuming the `pwd` is `/path/to/dxp-component-library`, run

   ```bash
   nvm use
   ```

   The command should return something equivalent to the following:

   ```bash
   Found '/home/<username>/<path>/dxp-component-library/.nvmrc' with version <20>
   Now using node v20 (npm v10.9.2)
   ```

   If a `.nvmrc` file is not present in a project’s root directory, the command returns the following:

   ```bash
   No .nvmrc file found
   Please see `nvm --help` or https://github.com/nvm-sh/nvm#nvmrc for more information.
   ```

### View components

To preview the components, run:

```
npm run dev
```

And open the port:

1. Development frontend: `http://localhost:4000`.

   This is the development preview with linked styles and scripts, ideal for active development.

   It supports Hot Module Replacement (HMR), allowing automatic reloads on code changes.

2. Edge Component development webserver: `http://localhost:5555`.

   This is a classic Edge Component development webserver with a raw preview of the component, useful for testing its rendering without additional UI layers.

3. UI started on port: `http://localhost:3000`.

   This port provides a CMS-like preview showing how the component’s fields (for example, string, SquizImage) are displayed in Matrix. It simulates the field setup UI for better context during development.

## Create a new component

To create a new component, start in the `dxp/component-service` directory and create a new folder with the name of your component. Alternatively, copy an existing one and adjust the names.

Example component structure:

```
dxp/
├── component-service/
│   ├── <new-component>/
│   │   ├── css/
│   │   │   ├── <new-component>.scss
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

### Project structure

The project structure is straightforward, centered around the `component-service/` directory. The `src/` directory contains files facilitating development, such as shared scripts, styles, mixins, variables, and fonts.

### Component file descriptions

| file                | description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `example.data.json` | Contains example data passed to the component, displayed in previews and DXP.                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `main.js`           | Defines the component's structure, including classes and functions for state and appearance changes.                                                                                                                                                                                                                                                                                                                                                                                             |
| `manifest.json`     | A critical file linking all others, specifying dependencies, defining preview data sources, and setting up input configurations in the CMS.<br><br>To learn more about the manifest and its individual fields, check the official documentation: [Preview Configuration](https://docs.squiz.net/component-service/latest/preview/preview-configuration.html) and [Edit Manifest File](https://docs.squiz.net/component-service/latest/tutorials/build-a-basic-component/edit-manifest-file.html) |
| `preview.html`      | A wrapper for the component. Usually identical for each component.                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `README.md`         | Component description with tips and property examples.                                                                                                                                                                                                                                                                                                                                                                                                                                           |

### Optional files:

| file                  | description                                                                                                                                                  |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `main.test.json`      | Tests for the component written in Vitest.                                                                                                                   |
| `frontend.js`         | Custom scripts for the component.                                                                                                                            |
| `name-component.scss` | Component-specific styles.<br><br>When adding global styles or colorful themes, it is recommended to start with `src/styles/common` and `src/styles/themes`. |
| `frontend.test.js`    | Tests for custom scripts.                                                                                                                                    |

## Linters and formatters

The project uses Prettier, ESLint, and Stylelint.

Review the `package.json` to find commands to run these before pushing changes.

**Note:** after setting up CI/CD, these commands will run automatically.

## Visual Page Builder support

All components in this repository have inline editing support for the Visual Page Builder. This allows quick editing in the preview column. For more details visit [Squiz Documentation](https://docs.squiz.net/page-builder/latest/building-components/index.html).

## Aliases

Within the `/src` folder and styles, you can use aliases defined in `vite.config.js`.

Avoid deep relative paths by using aliases such as `@images/logo.svg`.

## Utils

Utility functions for components are stored in `dxp/component-service/utils`:

`xss.js`
: Prevents XSS attacks by sanitizing inputs.

`html.js`
: Tags template literals for syntax highlighting, readability, and structured HTML generation.

## Previewing a component

To preview a component with styles, display it along with others on the cutup view by adding it to the page.

For example, open `homepage.js` and include the component using its namespace and name:

```js
<!--@@ cmp edge-dxp-comp-lib/component-name @@-->
```

### Displaying multiple versions

To display multiple versions of a component, define additional previews in `manifest.json` and point to extra `example.data.json` files. For instance:

```js
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

```js
<!--@@ cmp edge-dxp-comp-lib/component-name alternate @@-->
```

### Global HTML elements

Global elements, like footers or navigation, can be created or edited in `src/global_components`.

Import them on any page in `src/html`.

```js
import { ElementName } from '@global_components/element/elementName';
```

### Environment variables

To work with environment variables and components that fetch data, create a `.env` file.

This file has been added to `.gitignore` to prevent it from being pushed to the repository.

In the `.example.env` file, you will find a sample structure that you can use to create your own environment variables.

If these variables are required for your component to work, don't forget to update this section in the manifest:

```json
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

```json
if (API_IDENTIFIER && BASE_DOMAIN && BASE_PATH) {
  // Fetch real data
} else {
  // Fallback to mock data if environment variables are not set
}
```

### Creating a subpage

To create a new page for components, simply create a file with the desired page name inside the `src/html` directory.

If necessary, import global elements into the page and export it to render the template.

Import the page into `entry-server.js`:

```js
import Subpage from '@pages/subpage.js';
```

Then, add it as a new case:

```js
case 'pageName':
  pageTitle = 'PageName';
  htmlContent = await PageName();
  break;
```

If you want the new page to be visible in the navigation, add it as a new child to the navigation list:

```html
<li class="navbar__item">
  <a class="navbar__link" href="/pagename">PageName</a>
</li>
```

## Build and push

To package the project for production, run the following command:

```
npm run build
```

This will generate a `/dist` folder containing `main.js` and `main.css`.

Push your changes to GIT, deploy your component as described in the _deploying a component_ section below, and update the associated GitBridge connected to the CMS.

## Version management

This project includes the `vermgmt` library, which helps in versioning and deploying multiple components simultaneously. Although optional, it can significantly streamline your workflow. To check its available options, run:

```
npm run vermgmt
```

## Deploying a component

To deploy a component, first log in to the appropriate tenant using the following command.

Replace **{tenant-id}** with your tenant’s ID.

```bash
dxp-next auth login --tenant={tenant-id}
```

Ensure the component’s version is updated according to semantic versioning (SemVer). Then, deploy the component using:

```bash
npm run deploy --name=component_name
```

After deployment, add the component to a set. If this is the first deployment, it must be added manually. Subsequent deployments will automatically increment the version in the set.

## Adding styles to the DXP console preview

**NB:** this is an optional step.

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
