import { xssSafeContent } from '../../utils/xss';
import Banner from './main.js';

const mockData = {
  mediaType: 'none',
  heading: 'Banner Heading'
};

describe('Banner', () => {
  /* General */
  it('should return valid HTML structure', async () => {
    const result = await Banner.main(mockData);

    expect(result).toBeDefined();
    // Will check generate correct ID in the next function
    expect(result).toMatch(/<section class="banner" id="banner-\d+">/);
  });

  /* ID */
  it('should generate an ID for the banner', async () => {
    const result = await Banner.main(mockData);

    expect(result).toMatch(/id="banner-\d+"/);
  });

  it('should generate unique IDs for multiple banners', async () => {
    const result1 = await Banner.main(mockData);
    const result2 = await Banner.main(mockData);

    const id1 = result1.match(/id="(banner-\d+)"/)[1];
    const id2 = result2.match(/id="(banner-\d+)"/)[1];

    expect(id1).not.toBe(id2);
  });

  /* Main title */
  it('should render the heading with the correct text', async () => {
    const result = await Banner.main(mockData);

    expect(result).toContain('<h1 class="banner__title">Banner Heading</h1>');
  });

  it('should not render the subheading if it is null or undefined', async () => {
    const dataWithoutSummary = { ...mockData, textContent: null };
    const result = await Banner.main(dataWithoutSummary);

    expect(result).not.toContain('<p class="banner__text">');
  });

  /* Color background - no video, no image */
  it('should render a default background if mediaType is none or missing', async () => {
    const result = await Banner.main(mockData);

    expect(result).toContain('<div class="banner__background--default"></div>');
    expect(result).not.toContain('<video');
    expect(result).not.toContain('<img');
  });

  /* Video background */
  it('should render only video if chosen mediaType option is video', async () => {
    const mockVideoData = {
      mediaType: 'video',
      videoSource: {
        text: 'Decorative video',
        url: 'video.mp4'
      },
      image: null
    };

    const videoResult = await Banner.main(mockVideoData);

    expect(videoResult).toContain(
      '<video class="banner__media" src="video.mp4" autoplay muted loop>'
    );
    expect(videoResult).not.toContain('<img');
    expect(videoResult).not.toContain(
      '<div class="banner__background--default">'
    );
  });

  it('should render a play/pause button only for videos', async () => {
    const mockVideoData = {
      mediaType: 'video',
      videoSource: {
        text: 'Decorative video',
        url: 'video.mp4'
      },
      image: null
    };

    const mockImageData = {
      mediaType: 'image',
      image: {
        imageVariations: {
          original: {
            url: 'https://picsum.photos/800/600'
          }
        }
      }
    };

    const videoResult = await Banner.main(mockVideoData);
    const imageResult = await Banner.main(mockImageData);

    expect(videoResult).toContain(
      'class="banner__button banner__button--pause"'
    );
    expect(imageResult).not.toContain(
      'class="banner__button banner__button--pause"'
    );
  });

  /* Image Background */
  it('should render only image if chosen mediaType option is image', async () => {
    const mockImageData = {
      mediaType: 'image',
      image: {
        imageVariations: {
          original: {
            url: 'https://picsum.photos/800/600'
          }
        }
      }
    };

    const imageResult = await Banner.main(mockImageData);

    expect(imageResult).toContain('<img');
    expect(imageResult).not.toContain('<video');
    expect(imageResult).not.toContain(
      '<div class="banner__background--default">'
    );
  });

  /* XSS */
  it('should escape XSS in content', async () => {
    const bannerWithScripts = {
      mediaType: 'none',
      heading: '<script>alert("xss")</script>',
      videoSource: null,
      image: null
    };
    const result = await Banner.main(bannerWithScripts);

    expect(result).toContain(xssSafeContent('<script>alert("xss")</script>'));
    expect(result).not.toContain('<script>alert("xss")</script>');
  });
});
