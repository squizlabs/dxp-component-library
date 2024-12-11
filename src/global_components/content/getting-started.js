export const getStarted = `
<section class="container">
<h1 id="dxp-component-library">DXP Component Library</h1>
<p>This project provides a library of simple components built on Component Service technology. It demonstrates how to create components using basic technologies like vanilla JS, along with the required files for component creation: <code>manifest.json</code>, <code>preview.html</code>, and <code>example.data.json</code>.</p>
<p>The library is educational, with code comments explaining the behavior and functionality of the components. In the <code>dxp/component-service/</code> directory, you&#39;ll find ready-to-use and customizable components, ranging from simple to more complex examples, incorporating various data types supported by Component Service.</p>
<hr>
<h2 id="getting-started">Getting Started</h2>
<h3 id="cloning-the-repository">Cloning the Repository</h3>
<p>Clone the repository and navigate to the project directory:</p>
<pre><code>git@github.com:squizlabs/dxp-component-library.git</code></pre><pre><code>cd dxp-<span class="hljs-keyword">component</span>-<span class="hljs-keyword">library</span>
</code></pre><h3 id="removing-git-connection">Removing Git Connection</h3>
<p>Removing Git Connection</p>
<p>To detach the project from the original Git repository:</p>
<pre><code><span class="hljs-selector-tag">rm</span> <span class="hljs-selector-tag">-rf</span> <span class="hljs-selector-class">.git</span>
</code></pre><h3 id="forking-the-repository">Forking the Repository</h3>
<p>Alternatively, you can fork this project to your repository to keep it separate and manage your changes:</p>
<ol>
<li>Fork the repository.</li>
<li>Clone the forked repository to your local machine.</li>
<li>Navigate to the project directory.</li>
</ol>
<h3 id="installing-dependencies">Installing Dependencies</h3>
<p>Install all necessary dependencies:</p>
<pre><code>npm <span class="hljs-keyword">install</span>
</code></pre><p>Ensure you are using the correct Node.js version:</p>
<pre><code>nvm <span class="hljs-keyword">use</span>
</code></pre><h3 id="viewing-components">Viewing Components</h3>
<p>To preview the components, run:</p>
<pre><code>npm <span class="hljs-keyword">run</span><span class="bash"> dev</span>
</code></pre><p>And open the port:</p>
<ol>
<li>Development frontend: <code>http://localhost:4000</code> - This is the development preview with linked styles and scripts, ideal for active development. It supports Hot Module Replacement (HMR), allowing automatic reloads on code changes.</li>
<li>Edge Component development webserver: <code>http://localhost:5555</code> - This is a classic Edge Component development webserver with a raw preview of the component, useful for testing its rendering without additional UI layers.</li>
<li>UI started on port: <code>http://localhost:3000</code> - This port provides a CMS-like preview showing how the component&#39;s fields (e.g., string, SquizImage) are displayed in Matrix. It simulates the field setup UI for better context during development.</li>
</ol>
<h2 id="creating-new-component">Creating New Component</h2>
<p>To create a new component, start in the <code>dxp/component-service</code> directory and create a new folder with the name of your component. Alternatively, copy an existing one and adjust the names.</p>
<p>Example structure:</p>
<pre><code>dxp/
├── component-service/
│   ├── new-component/
│   │   ├── css/
│   │   │   ├── new-component<span class="hljs-selector-class">.scss</span>
│   │   ├── js/
│   │   │   ├── frontend<span class="hljs-selector-class">.js</span>
│   │   ├── example<span class="hljs-selector-class">.data</span><span class="hljs-selector-class">.json</span>
│   │   ├── main<span class="hljs-selector-class">.js</span>
│   │   ├── main<span class="hljs-selector-class">.test</span><span class="hljs-selector-class">.js</span>
│   │   ├── manifest<span class="hljs-selector-class">.json</span>
│   │   ├── preview<span class="hljs-selector-class">.html</span>
│   │   ├── README.md
</code></pre><p>All additional scripts and styles will automatically be included in <code>src/styles/main.scss</code> and <code>src/scripts/main.js</code>. These files are used to build the final output in the /dist directory, which you can connect through GitBridge.</p>
<h3 id="project-structure">Project Structure</h3>
<p>The project structure is straightforward, centered around the <code>component-service/</code> directory. The <code>src/</code> directory contains files facilitating development, such as shared scripts, styles, mixins, variables, and fonts.</p>
<h3 id="component-file-descriptions">Component File Descriptions</h3>
<ul>
<li><code>example.data.json</code> - Contains example data passed to the component, displayed in previews and DXP.</li>
<li><code>main.js</code> - Defines the component&#39;s structure, including classes and functions for state and appearance changes.</li>
<li><code>manifest.json</code> - A critical file linking all others, specifying dependencies, defining preview data sources, and setting up input configurations in the CMS. To learn more about the manifest and its individual fields, check the official documentation: <a href="https://docs.squiz.net/component-service/latest/preview/preview-configuration.html">Preview Configuration</a> and <a href="https://docs.squiz.net/component-service/latest/tutorials/build-a-basic-component/edit-manifest-file.html">Edit Manifest File</a></li>
<li><code>preview.html</code> - A wrapper for the component, usually identical for each component.</li>
<li><code>README.md</code> - Component description with tips and property examples.</li>
</ul>
<h4 id="optional-files-">Optional files:</h4>
<ul>
<li><code>main.test.json</code> - Tests for the component written in Vitest.</li>
<li><code>frontend.js</code> - Custom scripts for the component.</li>
<li><code>name-component.scss</code> - Component-specific styles. When adding global styles or colorful themes, it&#39;s recommended to start with <code>src/styles/common</code> and <code>src/styles/themes</code>.</li>
<li><code>frontend.test.js</code> - Tests for custom scripts.</li>
</ul>
<h2 id="linters-formatters">Linters &amp; Formatters</h2>
<p>The project uses Prettier, ESLint, and Stylelint. Review the <code>package.json</code> to find commands to run these before pushing changes.</p>
<p>Note: After setting up CI/CD, these commands will run automatically.</p>
<h2 id="tests">Tests</h2>
<p>The project includes tests written in Vitest. They cover all main.js files and additional scripts related to the components.</p><p>To run the tests locally, use:</p><p><code>npm run test</code></p>
<p>Note: After setting up CI/CD, these tests will run automatically on each push or merge request.</p>
<h2 id="aliases">Aliases</h2>
<p>Within the <code>/src</code> folder and styles, you can use aliases defined in vite.config.js. Avoid deep relative paths by using aliases like <code>@images/logo.svg</code>.</p>
<h2 id="utils">Utils</h2>
<p>Utility functions for components are stored in <code>dxp/component-service/utils</code>:</p>
<p><code>xss.js</code> - Prevents XSS attacks by sanitizing inputs.
<code>html.js</code> - Tags template literals for syntax highlighting, readability, and structured HTML generation.</p>
<h2 id="previewing-component">Previewing Component</h2>
<p>To preview a component with styles, display it along with others on the cutup view by adding it to the page. For example, open <code>homepage.js</code> and include the component using its namespace and name:</p>
<pre><code>&lt;!--@@ cmp edge-dxp-comp-<span class="hljs-class"><span class="hljs-keyword">lib</span>/<span class="hljs-title">component</span>-<span class="hljs-title">name</span> @@--&gt;</span>
</code></pre><h3 id="displaying-multiple-versions">Displaying Multiple Versions</h3>
<p>To display multiple versions of a component, define additional previews in manifest.json and point to extra <code>example.data.json</code> files. For instance:</p>
<pre><code>  <span class="hljs-string">"previews"</span>: {
    <span class="hljs-string">"default"</span>: {
      <span class="hljs-string">"functionData"</span>: {
        <span class="hljs-string">"main"</span>: {
          <span class="hljs-string">"inputData"</span>: {
            <span class="hljs-string">"type"</span>: <span class="hljs-string">"file"</span>,
            <span class="hljs-string">"path"</span>: <span class="hljs-string">"./example-data/example.data.json"</span>
          },
          <span class="hljs-string">"wrapper"</span>: {
            <span class="hljs-string">"path"</span>: <span class="hljs-string">"preview.html"</span>
          }
        }
      }
    },
    <span class="hljs-string">"alternate"</span>: {
      <span class="hljs-string">"functionData"</span>: {
        <span class="hljs-string">"main"</span>: {
          <span class="hljs-string">"inputData"</span>: {
            <span class="hljs-string">"type"</span>: <span class="hljs-string">"file"</span>,
            <span class="hljs-string">"path"</span>: <span class="hljs-string">"./example-data/example-alt.data.json"</span>
          },
          <span class="hljs-string">"wrapper"</span>: {
            <span class="hljs-string">"path"</span>: <span class="hljs-string">"preview.html"</span>
          }
        }
      }
    }
</code></pre><p>To view the custom version, use:</p>
<pre><code>&lt;!--@@ cmp edge-dxp-comp-<span class="hljs-class"><span class="hljs-keyword">lib</span>/<span class="hljs-title">component</span>-<span class="hljs-title">name</span> <span class="hljs-title">alternate</span> @@--&gt;</span>
</code></pre><h3 id="global-html-elements">Global HTML Elements</h3>
<p>Global elements like footers or navigation can be created or edited in <code>src/global_components</code>. Import them on any page in <code>src/html</code>.</p>
<pre><code><span class="hljs-section">import</span> { <span class="hljs-attribute">ElementName</span> } from <span class="hljs-string">'<span class="hljs-variable">@global_components</span>/element/elementName'</span>;
</code></pre><h3 id="environment-variables">Environment Variables</h3>
<p>To work with environment variables and components that fetch data, create a <code>.env</code> file. This file has been added to <code>.gitignore</code> to prevent it from being pushed to the repository.</p>
<p>In the <code>.example.env</code> file, you will find a sample structure that you can use to create your own environment variables.</p>
<p>If these variables are required for your component to work, don&#39;t forget to update this section in the manifest:</p>
<pre><code><span class="hljs-string">"environment"</span>: [
  {
    <span class="hljs-string">"name"</span>: <span class="hljs-string">"API_IDENTIFIER"</span>,
    <span class="hljs-string">"required"</span>: <span class="hljs-literal">false</span>
  },
  {
    <span class="hljs-string">"name"</span>: <span class="hljs-string">"BASE_DOMAIN"</span>,
    <span class="hljs-string">"required"</span>: <span class="hljs-literal">false</span>
  },
  {
    <span class="hljs-string">"name"</span>: <span class="hljs-string">"BASE_PATH"</span>,
    <span class="hljs-string">"required"</span>: <span class="hljs-literal">false</span>
  }
]
</code></pre><p>Currently, data-fetching components in this project are replaced with mocks, but after adding your environment variables to <code>.env</code>, you can remove this if condition:</p>
<pre><code><span class="hljs-symbol">if</span> (API_IDENTIFIER &amp;&amp; <span class="hljs-keyword">BASE_DOMAIN </span>&amp;&amp; <span class="hljs-keyword">BASE_PATH) </span>{
  // Fetch real <span class="hljs-meta">data</span>
} <span class="hljs-meta">else</span> {
  // Fallback to mock <span class="hljs-meta">data</span> <span class="hljs-meta">if</span> environment variables are not set
}
</code></pre><h3 id="creating-a-subpage">Creating a Subpage</h3>
<p>To create a new page for components, simply create a file with the desired page name inside the <code>src/html</code> directory. If needed, import global elements into the page and export it to render the template.</p>
<p>Import the page into <code>entry-server.js</code>:</p>
<pre><code><span class="hljs-keyword">import</span> Subpage <span class="hljs-keyword">from</span> <span class="hljs-string">'@pages/subpage.js'</span>;
</code></pre><p>Then, add it as a new case:</p>
<pre><code><span class="hljs-keyword">case</span> <span class="hljs-string">'pageName'</span>:
  pageTitle = <span class="hljs-string">'PageName'</span>;
  htmlContent = <span class="hljs-keyword">await</span> PageName();
  <span class="hljs-keyword">break</span>;
</code></pre><p>If you want the new page to be visible in the navigation, add it as a new child to the navigation list:</p>
<pre><code>&lt;li <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"navbar__item"</span>&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"navbar__link"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/pagename"</span>&gt;</span>PageName<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/li&gt;</span>
</code></pre><h2 id="build-push">Build &amp; Push</h2>
<p>To package the project for production, run the following command:</p>
<pre><code>npm <span class="hljs-keyword">run</span><span class="bash"> build</span>
</code></pre><p>This will generate a <code>/dist</code> folder containing <code>main.js</code> and <code>main.css</code>.</p>
<p>Push your changes to GIT, deploy your component as described in the Deploying a Component section, and update the associated GitBridge connected to the CMS.</p>
<h2 id="version-management">Version Management</h2>
<p>This project includes the <code>vermgmt</code> library, which helps in versioning and deploying multiple components simultaneously. Although optional, it can significantly streamline your workflow. To check its available options, run:</p>
<pre><code>npm <span class="hljs-keyword">run</span><span class="bash"> vermgmt</span>
</code></pre><h2 id="deploying-a-component">Deploying a Component</h2>
<p>To deploy a component, first log in to the appropriate tenant using the following command, replacing {tenant-id} with your tenant&#39;s ID:</p>
<pre><code>dxp-<span class="hljs-built_in">next</span> auth login <span class="hljs-comment">--tenant={tenant-id}</span>
</code></pre><p>Ensure the component&#39;s version is updated according to semantic versioning (SemVer). Then, deploy the component using:</p>
<pre><code>npm <span class="hljs-built_in">run</span> deploy <span class="hljs-comment">--name=component_name</span>
</code></pre><p>After deployment, add the component to a set. If this is the first deployment, it must be added manually. Subsequent deployments will automatically increment the version in the set.</p>
<h2 id="adding-styles-to-the-dxp-console-preview-optional-">Adding Styles to the DXP Console Preview (Optional)</h2>
<p>By default, your component will not be styled in the DXP console preview. To add styles, follow these steps:</p>
<ul>
<li>Create an additional <code>preview-dxp.html</code> file with the following structure:</li>
</ul>
<pre><code class="lang-html"><span class="hljs-meta">&lt;!doctype html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>DXP preview<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span>
      <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span>
      <span class="hljs-attr">href</span>=<span class="hljs-string">"cms-domain/__data/assets/git_bridge/123/1234/dist/client.css"</span>
    /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    [component://output]
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"cms-domain/__data/assets/git_bridge/123/1234/dist/client.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<ul>
<li>Deploy the code to the repository and update the existing GitBridge.</li>
<li>Link the styles and scripts hosted via GitBridge to the DXP console preview.</li>
</ul>
</section>
`;
