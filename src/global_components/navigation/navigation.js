// This component was added solely to improve navigation on the site during local development.It will not be added to the CMS.

import Logo from '@images/favicon/favicon-96x96.png';

export const Navigation = `
  <nav class="navbar container">
    <a class="navbar__brand" href="/">
        <img alt="Logo" src="${Logo}" />
    </a>
    <button class="navbar__toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar__toggler-icon"></span>
    </button>
    <div class="collapse navbar__collapse" id="navbarNav">
      <ul class="navbar__list">
        <li class="navbar__item">
          <a class="navbar__link" href="/wysiwyg-elements">WYSIWYG elements</a>
        </li>
        <li class="navbar__item">
          <a class="navbar__link" href="/homepage">All Components</a>
        </li>
        <li class="navbar__item">
          <a class="navbar__link" href="/article">Article page</a>
        </li>
        <li class="navbar__item">
          <a class="navbar__link" href="/subpage">Subpage</a>
        </li>
      </ul>
      <div class="style-switcher">
      <button id="style-switcher-toggle" aria-expanded="false" aria-controls="style-switcher">Change theme</button>
      <div id="style-switcher" class="style-switcher__options" hidden>
          <fieldset aria-labelledby="style-switcher-toggle">
              <div class="style-switcher__option">
                  <input class="style-switcher__css" type="radio" name="theme" value="default" checked aria-label='Select Default theme'>
                  <label for="light">Default theme</label>
              </div>
              <div class="style-switcher__option">
                  <input class="style-switcher__css" type="radio" name="black-theme" value="black-theme" aria-label='Select Black theme'>
                  <label for="black-theme">Black Theme</label>
              </div>
              <div class="style-switcher__option">
                <input class="style-switcher__css" type="radio" name="green-theme" value="green-theme" aria-label='Select Green theme'>
                <label for="green-theme">Green Theme</label>
              </div>
              <div class="style-switcher__option">
                <input class="style-switcher__css" type="radio" name="violet-theme" value="violet-theme" aria-label='Select Violet theme'>
                <label for="violet-theme">Violet Theme</label>
              </div>
              <div class="style-switcher__option">
                  <input class="style-switcher__css" type="radio" name="white-theme" value="white-theme" aria-label='Select White theme'>
                  <label for="white-theme">White Theme</label>
              </div>
          </fieldset>
      </div>
    </div>
    </div>
  </nav>
`;
