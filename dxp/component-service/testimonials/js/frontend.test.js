import { initializeTestimonials } from './frontend';

describe('Testimonials - Frontend', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <section data-testimonials>
        <ul data-testimonials-track>
          <li>Slide 1</li>
          <li>Slide 2</li>
          <li>Slide 3</li>
        </ul>
        <button data-testimonials-prev disabled aria-disabled="true"></button>
        <button data-testimonials-next></button>
      </section>
    `;
  });

  /* Initialization and default state */
  it('should initialize with the first slide active and buttons in correct state', () => {
    const testimonials = document.querySelector('[data-testimonials]');
    const track = testimonials.querySelector('[data-testimonials-track]');
    const slides = Array.from(track.children);
    const prevButton = testimonials.querySelector('[data-testimonials-prev]');
    const nextButton = testimonials.querySelector('[data-testimonials-next]');

    // Call the function to initialize
    initializeTestimonials(testimonials);

    // Assertions
    expect(prevButton.getAttribute('aria-disabled')).toBe('true');
    expect(nextButton.getAttribute('aria-disabled')).toBe('false');
    expect(slides[0].getAttribute('aria-current')).toBe('true');
    expect(slides[0].getAttribute('tabindex')).toBe('0');
    expect(slides[1].getAttribute('tabindex')).toBe('-1');
    expect(slides[2].getAttribute('tabindex')).toBe('-1');
  });

  /* Next button functionality */
  it('should navigate to the next slide on button click', () => {
    const testimonials = document.querySelector('[data-testimonials]');
    const track = testimonials.querySelector('[data-testimonials-track]');
    const slides = Array.from(track.children);
    const prevButton = testimonials.querySelector('[data-testimonials-prev]');
    const nextButton = testimonials.querySelector('[data-testimonials-next]');

    // Call the function to initialize
    initializeTestimonials(testimonials);

    nextButton.click();

    // Assertions after the click
    expect(slides[1].getAttribute('aria-current')).toBe('true');
    expect(slides[1].getAttribute('tabindex')).toBe('0');
    expect(slides[0].getAttribute('tabindex')).toBe('-1');
    expect(prevButton.getAttribute('aria-disabled')).toBe('false');
  });

  /* Previous button functionality */
  it('should navigate to the previous slide on button click', () => {
    const testimonials = document.querySelector('[data-testimonials]');
    const track = testimonials.querySelector('[data-testimonials-track]');
    const slides = Array.from(track.children);
    const prevButton = testimonials.querySelector('[data-testimonials-prev]');
    const nextButton = testimonials.querySelector('[data-testimonials-next]');

    // Call the function to initialize
    initializeTestimonials(testimonials);

    nextButton.click();
    prevButton.click();

    // Assertions after the click
    expect(slides[0].getAttribute('aria-current')).toBe('true');
    expect(slides[0].getAttribute('tabindex')).toBe('0');
    expect(slides[1].getAttribute('tabindex')).toBe('-1');
    expect(prevButton.getAttribute('aria-disabled')).toBe('true');
    expect(nextButton.getAttribute('aria-disabled')).toBe('false');
  });
});
