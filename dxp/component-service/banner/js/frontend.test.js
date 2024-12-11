import { initializeBanner } from './frontend.js';

describe('Banner - Frontend', () => {
  beforeEach(() => {
    document.body.innerHTML = `
        <section class="banner">
            <video class="banner__media" src="video.mp4" autoplay muted loop></video>
            <button class="banner__button banner__button--pause" aria-label="Pause decorative video in the banner's background"></button>
        </section>
        `;
  });

  it('should toggle play/pause on button click', () => {
    const banner = document.querySelector('.banner');
    const video = banner.querySelector('.banner__media');
    const button = banner.querySelector('.banner__button');

    video.play = vi.fn(() => {
      Object.defineProperty(video, 'paused', { value: false, writable: true });
    });
    video.pause = vi.fn(() => {
      Object.defineProperty(video, 'paused', { value: true, writable: true });
    });

    initializeBanner(banner);

    button.click();

    expect(video.play).toHaveBeenCalled();
    expect(button.classList.contains('banner__button--play')).toBe(false);
    expect(button.classList.contains('banner__button--pause')).toBe(true);

    button.click();

    expect(video.pause).toHaveBeenCalled();
    expect(button.classList.contains('banner__button--play')).toBe(true);
    expect(button.classList.contains('banner__button--pause')).toBe(false);
  });

  it('should hide button if no video is present', () => {
    document.body.innerHTML = `
        <section class="banner">
            <button class="banner__button" aria-label="Pause decorative video"></button>
        </section>
        `;

    const banner = document.querySelector('.banner');
    const button = banner.querySelector('.banner__button');

    initializeBanner(banner);

    expect(button.style.display).toBe('none');
  });
});
