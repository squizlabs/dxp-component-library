// Function to initialize a single banner
export const initializeBanner = (banner) => {
  // Select the toggle button for play/pause
  const toggleButton = banner.querySelector('.banner__button');
  // Select the video element, if it exists
  const video = banner.querySelector('video');

  if (video && toggleButton) {
    toggleButton.addEventListener('click', () => {
      // Check if the video is currently playing
      const isPlaying = !video.paused;

      // Play or pause the video based on its current state
      video[isPlaying ? 'pause' : 'play']();
      toggleButton.classList.toggle('banner__button--play', isPlaying);
      toggleButton.classList.toggle('banner__button--pause', !isPlaying);

      // Set the appropriate aria-label for the button
      toggleButton.setAttribute(
        'aria-label',
        isPlaying
          ? "Play decorative video in the banner's background"
          : "Pause decorative video in the banner's background"
      );
    });
  } else if (toggleButton) {
    // If the toggle button exists but there's no video, hide the button
    toggleButton.style.display = 'none';
  }
};

// Initialize all banners on the page
const initializeAllBanners = () => {
  const banners = document.querySelectorAll('.banner');
  banners.forEach((banner) => initializeBanner(banner));
};

initializeAllBanners();

export { initializeAllBanners };
