// This component will not be added as a Component Service but will be integrated directly into the CMS.
import PaintTool from '@images/paint_icon.png';

export const Footer = `
  <footer class="footer">
      <div class="container">
          <div class="footer__details">
              <img alt="Logo" src="${PaintTool}" width="100" />
              <div class="footer__company-details">
                  <span class="heading-quinary">Sculpture Society</span>
                  <p>Wide range of workshops, classes and exhibitions for artists of all levels</p>
              </div>
          </div>
          <ul>
              <li><a href="#" target="_self">FAQ</a></li>
              <li><a href="#" target="_self">Our shop</a></li>
              <li><a href="#" target="_self">Courses online</a></li>
              <li><a href="#" target="_self">Workshops</a></li>
          </ul>
          <ul>
              <li><a href="#" target="_self">Exhibitions</a></li>
              <li><a href="#" target="_self">Newest Events</a></li>
              <li><a href="#" target="_self">About us</a></li>
              <li><a href="#" target="_self">Contact us</a></li>
          </ul>
          <div class="footer__copyright">© 2025 Sculpture Society Inc. All rights reserved </div>
          </div>
  </footer>
`;
