import { initializeSwitcher, setActiveTheme } from '../switcher';

describe('Switcher - Frontend', () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <div>
      <button aria-controls="style-switcher" aria-expanded="false"></button>
      <div id="style-switcher" hidden>
        <input class="style-switcher__css" type="radio" value="theme-light" />
        <input class="style-switcher__css" type="radio" value="theme-dark" />
      </div>
    </div>
  `;

    initializeSwitcher();
  });

  // Toggle the dropdown visibility
  it('should toggle the visibility of the dropdown on button click', () => {
    const switcherToggle = document.querySelector(
      '[aria-controls="style-switcher"]'
    );
    const switcherDropdown = document.querySelector('#style-switcher');

    switcherToggle.click();
    expect(switcherToggle.getAttribute('aria-expanded')).toBe('true');
    expect(switcherDropdown.hidden).toBe(false);

    switcherToggle.click();
    expect(switcherToggle.getAttribute('aria-expanded')).toBe('false');
    expect(switcherDropdown.hidden).toBe(true);
  });

  // Active theme on LocalStorage
  it('should set the active theme and save it to localStorage', () => {
    const themeLight = document.querySelector(
      '.style-switcher__css[value="theme-light"]'
    );
    const themeDark = document.querySelector(
      '.style-switcher__css[value="theme-dark"]'
    );

    themeDark.click();
    expect(document.documentElement.classList.contains('theme-dark')).toBe(
      true
    );
    expect(localStorage.getItem('theme')).toBe('theme-dark');

    themeLight.click();
    expect(document.documentElement.classList.contains('theme-light')).toBe(
      true
    );
    expect(localStorage.getItem('theme')).toBe('theme-light');
  });

  // Closing dropdown when clicking outside
  it('should close the dropdown when clicking outside', () => {
    const switcherToggle = document.querySelector(
      '[aria-controls="style-switcher"]'
    );
    const switcherDropdown = document.querySelector('#style-switcher');

    switcherToggle.click();
    expect(switcherToggle.getAttribute('aria-expanded')).toBe('true');
    expect(switcherDropdown.hidden).toBe(false);

    document.body.click();
    expect(switcherToggle.getAttribute('aria-expanded')).toBe('false');
    expect(switcherDropdown.hidden).toBe(true);
  });

  // Test if switcher exists
  it('should log an error when theme element is not found', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const theme = 'nonexistent-theme';
    const switcherCss = document.querySelectorAll('.style-switcher__css');

    setActiveTheme(theme, switcherCss);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `No element found for theme: ${theme}`
    );
    consoleErrorSpy.mockRestore();
  });
});
