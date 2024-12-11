// template imports
import { Navigation } from '@global_components/navigation/navigation';
import { Footer } from '@global_components/footer/footer';
import { Article } from '@global_components/content/article';

// render template
export default async function () {
  return `
    ${Navigation}
    <main class="container">
      <!--@@ cmp edge-dxp-comp-lib/banner @@-->
      ${Article}
      <!--@@ cmp edge-dxp-comp-lib/single-column @@-->
      <!--@@ cmp edge-dxp-comp-lib/single-column switched @@-->
      <!--@@ cmp edge-dxp-comp-lib/single-column @@-->
    </main>
    ${Footer}
  `;
}
