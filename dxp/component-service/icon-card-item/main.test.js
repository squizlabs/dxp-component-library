import { xssSafeContent } from '../../utils/xss';
import IconCardItem from './main.js';
import { iconMap } from './iconMap';

const mockItem = {
  componentContent: {
    icon: 'pen',
    heading: 'Short Heading',
    textContent: 'Short desc',
    link: {
      text: 'Learn more',
      url: 'https://squiz.net',
      target: '_self'
    }
  }
};

describe('Icon Card (single)', () => {
  /* General */
  it('should return valid HTML structure', async () => {
    const result = await IconCardItem.main(mockItem);

    expect(result).toBeDefined();
    expect(result).toContain('<article class="icon-card">');
  });

  it('should render wrapper div when link is not provided', async () => {
    const noLink = {
      componentContent: {
        ...mockItem.componentContent,
        link: null
      }
    };

    const result = await IconCardItem.main(noLink);

    expect(result).toContain('<div class="icon-card__wrapper">');
    expect(result).not.toContain('<a href=');
  });

  /* Icon */
  it('should render icon if it exists in iconMap', async () => {
    const result = await IconCardItem.main(mockItem);

    expect(result).toContain('<div class="icon-card__icon">');
    expect(result).toContain(iconMap[mockItem.componentContent.icon].svg);
  });

  it('should not render icon if icon is undefined or invalid', async () => {
    const noIcon = {
      componentContent: {
        ...mockItem.componentContent,
        icon: null
      }
    };
    const result = await IconCardItem.main(noIcon);

    expect(result).not.toContain('<div class="icon-card__icon">');
  });

  /* Heading */
  it('should render heading if provided', async () => {
    const result = await IconCardItem.main(mockItem);

    expect(result).toContain(mockItem.componentContent.heading);
    expect(result).toContain('data-sq-field="componentContent.heading"');
  });

  it('should not render heading when empty', async () => {
    const noHeading = {
      componentContent: {
        ...mockItem.componentContent,
        heading: ''
      }
    };
    const result = await IconCardItem.main(noHeading);

    expect(result).not.toContain('<h3 class="icon-card__heading">');
  });

  /* Text Content */
  it('should render text content', async () => {
    const result = await IconCardItem.main(mockItem);

    expect(result).toContain(mockItem.componentContent.textContent);
    expect(result).toContain('data-sq-field="componentContent.textContent"');
  });

  /* Link wrapper */
  it('should render link wrapper when link is provided', async () => {
    const result = await IconCardItem.main(mockItem);
    const normalize = (s) => s.replace(/\s+/g, ' ').trim();

    const expectedStart = `<a href="${mockItem.componentContent.link.url}" target="${mockItem.componentContent.link.target}"`;
    expect(normalize(result)).toContain(expectedStart);
    expect(result).toContain('data-sq-field="componentContent.link"');
    expect(result).toContain('class="icon-card__wrapper"');
  });

  /* XSS (HTML context only) */
  it('should sanitize heading and textContent to prevent XSS', async () => {
    const payload = {
      componentContent: {
        icon: 'pen',
        heading: '<script>alert("xss-h")</script>',
        textContent: '<img src=x onerror=alert("xss-t")>',
        link: {
          text: 'Go',
          url: 'https://squiz.net',
          target: '_self'
        }
      }
    };

    const result = await IconCardItem.main(payload);

    expect(result).toContain(xssSafeContent(payload.componentContent.heading));
    expect(result).toContain(
      xssSafeContent(payload.componentContent.textContent)
    );
    expect(result).not.toContain('<script>alert("xss-h")</script>');
    expect(result).not.toContain('onerror=alert("xss-t")');
  });

  it('should pass link URL through xssSafeContent', async () => {
    const badUrl = 'javascript:alert(1)';
    const payload = {
      componentContent: {
        ...mockItem.componentContent,
        link: { text: 'bad', url: badUrl, target: '_self' }
      }
    };

    const result = await IconCardItem.main(payload);
    expect(result).toContain(`href="${xssSafeContent(badUrl)}"`);
  });

  /* Robustness */
  it('should render gracefully with empty componentContent', async () => {
    const result = await IconCardItem.main({});

    expect(result).toContain('<article class="icon-card">');
    expect(result).toContain('class="icon-card__wrapper"');
    expect(result).toContain('class="icon-card__text"');
  });
});
