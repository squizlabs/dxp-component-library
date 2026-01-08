const Logo = '/favicon-96x96.png';
const Navigation = `
  <nav class="navbar container">
    <a class="navbar__brand" href="/">
        <img alt="Logo" src="${Logo}" />
    </a>
    <button class="navbar__toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar__toggler-icon"></span>
    </button>
    <div class="collapse navbar__collapse" id="navbarNav">
      <ul class="navbar__list">
        <li class="navbar__item">
          <a class="navbar__link" href="/wysiwyg-elements">WYSIWYG elements</a>
        </li>
        <li class="navbar__item">
          <a class="navbar__link" href="/homepage">All Components</a>
        </li>
        <li class="navbar__item">
          <a class="navbar__link" href="/article">Article page</a>
        </li>
        <li class="navbar__item">
          <a class="navbar__link" href="/subpage">Subpage</a>
        </li>
      </ul>
      <div class="style-switcher">
      <button id="style-switcher-toggle" aria-expanded="false" aria-controls="style-switcher">Change theme</button>
      <div id="style-switcher" class="style-switcher__options" hidden>
          <fieldset aria-labelledby="style-switcher-toggle">
              <div class="style-switcher__option">
                  <input class="style-switcher__css" type="radio" name="theme" value="default" checked aria-label='Select Default theme'>
                  <label for="light">Default theme</label>
              </div>
              <div class="style-switcher__option">
                  <input class="style-switcher__css" type="radio" name="black-theme" value="black-theme" aria-label='Select Black theme'>
                  <label for="black-theme">Black Theme</label>
              </div>
              <div class="style-switcher__option">
                <input class="style-switcher__css" type="radio" name="green-theme" value="green-theme" aria-label='Select Green theme'>
                <label for="green-theme">Green Theme</label>
              </div>
              <div class="style-switcher__option">
                <input class="style-switcher__css" type="radio" name="violet-theme" value="violet-theme" aria-label='Select Violet theme'>
                <label for="violet-theme">Violet Theme</label>
              </div>
              <div class="style-switcher__option">
                  <input class="style-switcher__css" type="radio" name="white-theme" value="white-theme" aria-label='Select White theme'>
                  <label for="white-theme">White Theme</label>
              </div>
          </fieldset>
      </div>
    </div>
    </div>
  </nav>
`;
const PaintTool = '/paint_icon.png';
const Footer = `
  <footer class="footer">
      <div class="container">
          <div class="footer__details">
              <img alt="Logo" src="${PaintTool}" width="100" />
              <div class="footer__company-details">
                  <span class="heading-quinary">Sculpture Society</span>
                  <p>Wide range of workshops, classes and exhibitions for artists of all levels</p>
              </div>
          </div>
          <ul>
              <li><a href="#" target="_self">FAQ</a></li>
              <li><a href="#" target="_self">Our shop</a></li>
              <li><a href="#" target="_self">Courses online</a></li>
              <li><a href="#" target="_self">Workshops</a></li>
          </ul>
          <ul>
              <li><a href="#" target="_self">Exhibitions</a></li>
              <li><a href="#" target="_self">Newest Events</a></li>
              <li><a href="#" target="_self">About us</a></li>
              <li><a href="#" target="_self">Contact us</a></li>
          </ul>
          <div class="footer__copyright">© 2025 Sculpture Society Inc. All rights reserved </div>
          </div>
  </footer>
`;
const getStarted = `
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
async function Index() {
  return `
    ${Navigation}
    ${getStarted}
    ${Footer}
  `;
}
async function Homepage() {
  return `
    ${Navigation}
    <main class="container">
      <!--@@ cmp edge-dxp-comp-lib/banner @@-->
      <!--@@ cmp edge-dxp-comp-lib/dynamic-header @@-->
      <!--@@ cmp edge-dxp-comp-lib/image-text-row @@-->
      <!--@@ cmp edge-dxp-comp-lib/cards-manual @@-->
      <!--@@ cmp edge-dxp-comp-lib/accordion @@-->
      <!--@@ cmp edge-dxp-comp-lib/cards-matrix @@-->
      <!--@@ cmp edge-dxp-comp-lib/blockquote @@-->
      <!--@@ cmp edge-dxp-comp-lib/cards-root @@-->
      <!--@@ cmp edge-dxp-comp-lib/icon-card @@-->
      <!--@@ cmp edge-dxp-comp-lib/key-statistics @@-->
      <!--@@ cmp edge-dxp-comp-lib/testimonials @@-->
    </main>
    ${Footer}
  `;
}
async function WysiwygElements() {
  return `
    ${Navigation}
    <div class="container">
      <!-- Headings and Paragraphs -->
      <section>
        <h1>Heading 1</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

        <h2>Heading 2</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Extended example text.</p>

        <h3>Heading 3</h3>
        <p>Example of a simple paragraph for Heading 3.</p>

        <h4>Heading 4</h4>
        <p>Another paragraph for Heading 4.</p>

        <h5>Heading 5</h5>
        <p>A shorter paragraph for Heading 5.</p>

        <h6>Heading 6</h6>
        <p>A final small heading paragraph.</p>
      </section>

      <hr>

      <!-- Blockquotes -->
      <section>
        <h2>Blockquotes</h2>
        <blockquote class="blockquote">
          <p>A block quotation (also known as a long quotation or extract) is set off from the main text as a paragraph or block of text.</p>
          <cite class="blockquote__author">Aristotle</cite>
        </blockquote>
        <p><a href="#!" target="_self">Said no one, ever.</a></p>
      </section>

      <hr>

      <!-- Inline Elements -->
      <section>
        <h2>Inline Elements</h2>
        <p><a href="#!" target="_self">This is a text link</a></p>
        <p><strong>Strong importance</strong></p>
        <p><em>Added emphasis</em></p>
        <p><span class="underline">Underlined text</span></p>
        <p><s>Strikethrough text</s></p>
        <p>Subscript for H<sub>2</sub>O and superscript for X<sup>2</sup></p>
        <p><abbr title="Cascading Style Sheets">CSS</abbr> and <abbr title="HyperText Markup Language">HTML</abbr> examples</p>
        <p><small>Smaller text for fine print</small></p>
        <p><time datetime="2018-07-07">July 7, 2018</time> in London's Hyde Park</p>
        <p>This is called <mark>"separation of concerns."</mark></p>
        <p>A <dfn id="def-validator">validator</dfn> checks for syntax errors.</p>
        <p>The area of a triangle is: 1/2 x <var>b</var> x <var>h</var>.</p>
        <p>
          <q cite="https://en.wikipedia.org/wiki/To_be,_or_not_to_be">To be, or not to be, that is the question</q> -- by William Shakespeare.
        </p>
      </section>

      <hr>

      <!-- Lists -->
      <section>
        <h2>Lists</h2>
        <h3>Ordered List</h3>
        <ol>
          <li>List Item 1</li>
          <li>List Item 2</li>
          <li>List Item 3</li>
        </ol>

        <h3>Unordered List</h3>
        <ul>
          <li>List Item 1</li>
          <li>List Item 2</li>
          <li>List Item 3</li>
        </ul>

        <h3>Definition List</h3>
        <dl>
          <dt>Definition List Title</dt>
          <dd>This is a definition list division.</dd>
        </dl>
      </section>

      <hr>

      <!-- Tabular Data -->
      <section>
        <h2>Tabular Data</h2>
        <table>
          <caption>Example Data Table</caption>
          <thead>
            <tr>
              <th>Heading 1</th>
              <th>Heading 2</th>
              <th>Heading 3</th>
              <th>Heading 4</th>
              <th>Heading 5</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cell 1</td>
              <td>Cell 2</td>
              <td>Cell 3</td>
              <td>Cell 4</td>
              <td>Cell 5</td>
            </tr>
            <tr>
              <td>Cell 1</td>
              <td>Cell 2</td>
              <td>Cell 3</td>
              <td>Cell 4</td>
              <td>Cell 5</td>
            </tr>
          </tbody>
        </table>
      </section>

      <hr>

      <!-- Code and Keyboard Input -->
      <section>
        <h2>Code and Keyboard Input</h2>
        <p><strong>Keyboard input:</strong> <kbd>Cmd</kbd></p>
        <p><strong>Inline code:</strong> <code>code</code></p>
        <p><strong>Sample output:</strong> <samp>This is sample output from a program.</samp></p>
        <pre>
      Hello, World!
      let xyx = 31234;
      class X {}
      function calculate() {
        console.error("x");
      }</pre>
      </section>

      <hr>

      <!-- Images -->
      <section>
        <h2>Images</h2>

        <h3>No <code>figure</code> Element</h3>
        <img src="https://via.placeholder.com/400x400" alt="Placeholder image" width="400" height="400">

        <h3>With <code>figure</code> and <code>figcaption</code></h3>
        <figure>
          <img src="https://via.placeholder.com/400x400" alt="Elephant at sunset" />
          <figcaption>An elephant at sunset</figcaption>
        </figure>
      </section>
    </div>
    ${Footer}
  `;
}
const Article = `
<section>
    <h2>Discover the art of sculpture in our engaging workshop designed for beginners.</h2>
    <p>Whether you are an aspiring artist or simply looking to explore a new hobby, this workshop will provide you with the foundational skills needed to create your own sculptures. Led by experienced instructors, you will learn various techniques, from clay modeling to carving, in a supportive and inspiring environment.
    </p>
    <p>In this workshop, participants will explore the basic principles of sculpture, including form, texture, and proportion. The session will cover a range of materials and techniques, such as clay modeling, wood carving, and metalworking. Participants will have the opportunity to create their own pieces under the guidance of professional sculptors, gaining hands-on experience in shaping and crafting their visions.</p>
</section>
`;
async function Subpage() {
  return `
    ${Navigation}
      <div class="container">
        <!--@@ cmp edge-dxp-comp-lib/banner @@-->
        ${Article}
        <!--@@ cmp layouts-card/card @@-->
        <!--@@ cmp edge-dxp-comp-lib/cards-manual @@-->
        <!--@@ cmp edge-dxp-comp-lib/accordion @@-->
        <!--@@ cmp edge-dxp-comp-lib/testimonials @@-->
      </div>
    ${Footer}
  `;
}
async function ArticlePage() {
  return `
    ${Navigation}
    <main class="container">
      <!--@@ cmp edge-dxp-comp-lib/banner @@-->
      ${Article}
      <!--@@ cmp edge-dxp-comp-lib/image-text-row @@-->
      <!--@@ cmp edge-dxp-comp-lib/image-text-row @@-->
    </main>
    ${Footer}
  `;
}
async function render(url, ssrManifest) {
  let htmlContent;
  let pageTitle;
  switch (url) {
    case '':
      pageTitle = 'coreDXP';
      htmlContent = await Index();
      break;
    case 'homepage':
      pageTitle = 'Home Page';
      htmlContent = await Homepage();
      break;
    case 'wysiwyg-elements':
      pageTitle = 'WysiwygElements';
      htmlContent = await WysiwygElements();
      break;
    case 'article':
      pageTitle = 'Article Page';
      htmlContent = await ArticlePage();
      break;
    case 'subpage':
      pageTitle = 'Subpage';
      htmlContent = await Subpage();
      break;
    default:
      pageTitle = '404 Not Found';
      htmlContent = `<h1>404 - Page not found</h1>
      <p>😥 It is more than likely that you just need to add
      your page page to this file ./src/entry-server.js</p>
      `;
      break;
  }
  return {
    head: `<title>${pageTitle}</title>`,
    // Add other head elements if needed
    html: htmlContent
  };
}
export { render };
