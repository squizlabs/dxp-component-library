// Function to initialize a single testimonials slider
export const initializeTestimonials = (testimonials) => {
  // Find the track, previous button, and next button inside the testimonials container
  const track = testimonials.querySelector('[data-testimonials-track]');
  const prev = testimonials.querySelector('[data-testimonials-prev]');
  const next = testimonials.querySelector('[data-testimonials-next]');

  if (track && prev && next) {
    let currentIndex = 0;
    const slides = Array.from(track.children);

    // Function to update aria-disabled and disabled attributes for buttons
    const updateAriaDisabled = (button, isDisabled) => {
      button.setAttribute('aria-disabled', isDisabled);
      if (isDisabled) {
        button.setAttribute('disabled', '');
      } else {
        button.removeAttribute('disabled');
      }
    };

    // Function to update the slides' ARIA attributes and tabindex
    const updateSlides = () => {
      slides.forEach((slide, index) => {
        slide.removeAttribute('aria-current');
        slide.setAttribute('tabindex', '-1');
        if (index === currentIndex) {
          slide.setAttribute('aria-current', 'true');
          slide.setAttribute('tabindex', '0');
          slide.focus();
        }
      });

      // Update the disabled state of the prev and next buttons
      updateAriaDisabled(prev, currentIndex === 0);
      updateAriaDisabled(next, currentIndex === slides.length - 1);
    };

    // Add event listener for the previous button
    prev.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlides();
      }
    });

    // Add event listener for the next button
    next.addEventListener('click', () => {
      if (currentIndex < slides.length - 1) {
        currentIndex++;
        updateSlides();
      }
    });

    slides.forEach((slide) => {
      slide.setAttribute('tabindex', '-1');
    });

    updateSlides();
  }
};

// Function to initialize all testimonials sliders on the page
export const initializeAllTestimonials = () => {
  const testimonialsContainers = document.querySelectorAll(
    '[data-testimonials]'
  );
  testimonialsContainers.forEach((testimonials) =>
    initializeTestimonials(testimonials)
  );
};

// Initialize all testimonials sliders
initializeAllTestimonials();
