// template imports
import { Navigation } from '@global_components/navigation/navigation';
import { Footer } from '@global_components/footer/footer';

// render template
export default async function () {
  return `
    ${Navigation}
    <main class="container">
      <!--@@ cmp edge-dxp-comp-lib/banner @@-->
      <!--@@ cmp edge-dxp-comp-lib/dynamic-header @@-->
      <!--@@ cmp edge-dxp-comp-lib/single-column @@-->
      <!--@@ cmp edge-dxp-comp-lib/cards-manual @@-->
      <!--@@ cmp edge-dxp-comp-lib/accordion @@-->
      <!--@@ cmp edge-dxp-comp-lib/cards-matrix @@-->
      <!--@@ cmp edge-dxp-comp-lib/blockquote @@-->
      <!--@@ cmp edge-dxp-comp-lib/cards-root @@-->
      <!--@@ cmp edge-dxp-comp-lib/icon-card @@-->
      <!--@@ cmp edge-dxp-comp-lib/key-statistic @@-->
      <!--@@ cmp edge-dxp-comp-lib/testimonials @@-->
    </main>
    ${Footer}
  `;
}
