// Utility function to render raw HTML without extra parsing
import { html } from '../../utils/html';
// Sanitizes dynamic content to prevent XSS attacks
import { xssSafeContent } from '../../utils/xss';

// Create a dynamic class name based on the title level (e.g., h1, h2, etc.)
export const titleClassMap = {
  h1: 'heading-primary',
  h2: 'heading-secondary',
  h3: 'heading-tertiary',
  h4: 'heading-quaternary',
  h5: 'heading-quinary',
  h6: 'heading-senary'
};

// This module takes an object with "title", "titleLevel" and optional "content" properties as input.
export default {
  async main({ title, titleLevel, content }) {
    // Map heading level with proper CSS class or use h2 class by default.
    const titleClass = titleClassMap[titleLevel] || 'heading-secondary';

    return html`
    <section class="header-paragraph">
      <div class="container">
      <!-- Render the title with the corresponding heading level and dynamic class -->
      <${titleLevel} class="header-paragraph__title ${titleClass}">${xssSafeContent(title)}</${titleLevel}>
      <!-- Conditionally render the paragraph if "content" is provided -->
      ${content ? `${xssSafeContent(content)}` : ''}
      </div>
    </section>
  `;
  }
};
