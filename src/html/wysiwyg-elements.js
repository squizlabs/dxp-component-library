// template imports
import { Navigation } from '@global_components/navigation/navigation';
import { Footer } from '@global_components/footer/footer';

// render template
export default async function () {
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
