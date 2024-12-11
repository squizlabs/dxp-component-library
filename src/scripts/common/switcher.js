// Export for tests
export const logThemeError = (theme) => {
  console.error(`No element found for theme: ${theme}`);
};

export const setActiveTheme = (theme, switcherCss) => {
  const html = document.documentElement;

  // Remove existing theme classes
  switcherCss.forEach((themeInput) => {
    html.classList.remove(themeInput.getAttribute('value'));
    themeInput.disabled = false;
    themeInput.nextElementSibling?.classList.remove('active');
  });

  // Add the new class
  html.classList.add(theme);

  // Mark the active theme
  const activeInput = document.querySelector(
    `.style-switcher__css[value="${theme}"]`
  );
  if (!activeInput) {
    logThemeError(theme);
    return;
  }

  // Save to localStorage
  localStorage.setItem('theme', theme);
};

export const initializeSwitcher = () => {
  const switcherToggle = document.querySelector(
    '[aria-controls="style-switcher"]'
  );
  const switcherDropdown = document.querySelector('#style-switcher');
  const switcherCss = document.querySelectorAll('.style-switcher__css');

  if (switcherToggle && switcherDropdown && switcherCss.length) {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setActiveTheme(savedTheme, switcherCss);
    }

    // Toggle switcher dropdown
    switcherToggle.addEventListener('click', () => {
      const isExpanded =
        switcherToggle.getAttribute('aria-expanded') === 'true';
      switcherToggle.setAttribute('aria-expanded', !isExpanded);
      switcherDropdown.hidden = isExpanded;
    });

    // Change theme on input click
    switcherCss.forEach((toggle) => {
      toggle.addEventListener('click', (e) => {
        const theme = e.target.getAttribute('value');
        setActiveTheme(theme, switcherCss);
      });
    });

    // Close switcher if clicked outside
    document.addEventListener('click', (event) => {
      if (
        switcherToggle.getAttribute('aria-expanded') === 'true' &&
        !event.target.closest('#style-switcher') &&
        event.target !== switcherToggle
      ) {
        switcherToggle.setAttribute('aria-expanded', 'false');
        switcherDropdown.hidden = true;
      }
    });
  }
};

// Automatically initialize when the DOM is ready
document.addEventListener('DOMContentLoaded', initializeSwitcher);
