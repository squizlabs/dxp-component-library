export const getStarted = `
<section class="container">
  <h1 id="dxp-component-library">DXP Component Library</h1>
<p>The DXP Component Library is a library of simple components built on Component Service technology.</p>
<p>It demonstrates how to create DXP components using basic technologies like vanilla JavaScript.</p>
<p>The <code>/dxp/component-service/</code> directory contains ready-to-use and customizable components, ranging from simple to more complex examples, incorporating various data types supported by Component Service.</p>
<p>In addition to components, this repository also includes <strong>layout examples</strong> located under <code>/dxp/layouts/</code>.<br>Layouts define the structural composition of a page - configurable zones where components can be placed.  </p>
<p>The library is educational, with code comments explaining the behavior and functionality of the components and layouts.</p>
<h2 id="getting-started">Getting Started</h2>
<h3 id="cloning-the-repository">Cloning the Repository</h3>
<p>Clone the repository and navigate to the project directory:</p>
<pre><code>git clone git@github.com:squizlabs/dxp-component-library.git</code></pre>
<pre><code>cd dxp-component-library</code></pre>
<h3 id="removing-git-connection">Removing Git Connection</h3>
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
</code></pre>
`;
