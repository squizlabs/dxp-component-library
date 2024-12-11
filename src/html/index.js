// template imports
import { Navigation } from '@global_components/navigation/navigation';
import { Footer } from '@global_components/footer/footer';
import { getStarted } from '@global_components/content/getting-started';

// render template
export default async function () {
  return `
    ${Navigation}
    ${getStarted}
    ${Footer}
  `;
}
