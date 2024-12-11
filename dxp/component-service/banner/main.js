// Utility function to render raw HTML without extra parsing
import { html } from '../../utils/html';
// Sanitizes dynamic content to prevent XSS attacks
import { xssSafeContent } from '../../utils/xss';

// This module takes an object with "heading", "videoSource", and "image" properties as input.
export default {
  async main({ mediaType, heading, videoSource, image }) {
    // Generate a unique ID for each banner instance to ensure unique element IDs - this allow to put as many of them as needed.
    const uniqueId = `banner-${Math.floor(Math.random() * 9999)}`;

    let mediaElement = '';

    // If a video source is provided, create a video element.
    if (mediaType === 'video') {
      mediaElement = `<video class="banner__media" src="${videoSource.url}" autoplay muted loop></video>`;
    }
    // If an image is provided, create an image element.
    else if (mediaType === 'image') {
      mediaElement = `<img src="${image.imageVariations.original.url}" alt="${image.alt}" class="banner__media" />`;
    }
    // If neither a video source nor an image is provided, create a default background element.
    else {
      mediaElement = `<div class="banner__background--default"></div>`;
    }

    return html`
      <section class="banner" id="${uniqueId}">
        <!-- In the mediaElement will be displayed video, image or simple background, depending on what editor user pass -->

        ${mediaElement}
        <div class="banner__content">
          <h1 class="banner__title">${xssSafeContent(heading)}</h1>
        </div>

        <!-- Additional buttons for play or pause - only for video -->

        ${videoSource
          ? `<button id="${uniqueId}-toggleButton" class="banner__button banner__button--pause" aria-label="Pause decorative video in the banner's background"></button>`
          : ''}
      </section>
    `;
  }
};
