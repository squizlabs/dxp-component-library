// template imports
import { Navigation } from '@global_components/navigation/navigation';
import { Footer } from '@global_components/footer/footer';
import { Article } from '@global_components/content/article';

// render template
export default async function () {
  return `
    ${Navigation}
      <div class="container">
        <!--@@ cmp edge-dxp-comp-lib/banner video @@-->
        ${Article}
        <!--@@ cmp edge-dxp-comp-lib/cards-manual @@-->
        <!--@@ cmp edge-dxp-comp-lib/accordion @@-->
        <!--@@ cmp edge-dxp-comp-lib/testimonials @@-->
      </div>
    ${Footer}
  `;
}
