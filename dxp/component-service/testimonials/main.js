// Utility function to render raw HTML without extra parsing
import { html } from '../../utils/html';
// Sanitizes dynamic content to prevent XSS attacks
import { xssSafeContent } from '../../utils/xss';

// This module takes an object with "testimonials" properties as input.
export default {
  async main({ title, testimonials }) {
    return html`
      <section class="testimonials-section">
        <!-- Conditionally render title of the section -->
        ${title
          ? `<h2 class="heading-secondary">${xssSafeContent(title)}</h2>`
          : ''}

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Testimonials"
          class="testimonials"
          data-testimonials
        >
          <!-- The track that holds all the testimonial slides looped in the array -->
          <ul class="testimonials__track" data-testimonials-track>
            <!-- Loop through the "testimonials" array to create each slide. Each "testimonial" is expected to have "text" and "author" properties. -->
            ${testimonials
              .map(
                (testimonial) => `
              <!-- Each slide in the carousel. Tabindex value is changed in scripts -->
              <li role="group" aria-roledescription="slide">
                <div class="testimonials__item">
                  ${xssSafeContent(testimonial.text)}
                  <span class="testimonials__author">${xssSafeContent(testimonial.author)}</span>
                </div>
              </li>
            `
              )
              .join('')}
          </ul>

          <!-- The group that holds the previous and next buttons for the slider -->

          <div
            role="group"
            aria-label="Testimonials slider controls"
            class="testimonials__buttons"
          >
            <button
              class="testimonials__button testimonials__button--prev"
              data-testimonials-prev
              aria-label="Previous testimonial slide"
              aria-disabled="true"
              disabled
            ></button>

            <button
              class="testimonials__button testimonials__button--next"
              data-testimonials-next
              aria-label="Next testimonial slide"
              aria-disabled="false"
            ></button>
          </div>
        </div>
      </section>
    `;
  }
};
