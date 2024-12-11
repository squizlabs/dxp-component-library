import Index from '@pages/index.js';
import Homepage from '@pages/homepage.js';
import WysiwygElements from '@pages/wysiwyg-elements.js';
import Subpage from '@pages/subpage.js';
import ArticlePage from '@pages/article-page.js';

export async function render(url, ssrManifest) {
  // Define basic page templates or import your component-rendering logic here
  let htmlContent;
  let pageTitle;
  switch (url) {
    case '':
      pageTitle = 'coreDXP';
      htmlContent = await Index();
      break;
    case 'homepage':
      pageTitle = 'Home Page';
      htmlContent = await Homepage();
      break;
    case 'wysiwyg-elements':
      pageTitle = 'WysiwygElements';
      htmlContent = await WysiwygElements();
      break;
    case 'article':
      pageTitle = 'Article Page';
      htmlContent = await ArticlePage();
      break;
    case 'subpage':
      pageTitle = 'Subpage';
      htmlContent = await Subpage();
      break;
    default:
      pageTitle = '404 Not Found';
      htmlContent = `<h1>404 - Page not found</h1>
      <p>😥 It is more than likely that you just need to add
      your page page to this file ./src/entry-server.js</p>
      `;
      break;
  }
  return {
    head: `<title>${pageTitle}</title>`, // Add other head elements if needed
    html: htmlContent
  };
}
