import '../navbar';

describe('Navbar - Frontend', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <nav class="navbar">
        <button class="navbar__toggler"></button>
        <div class="collapse"></div>
        <a class="navbar__link" href="/home">Home</a>
        <a class="navbar__link" href="/about">About</a>
      </nav>
    `;
    document.dispatchEvent(new Event('DOMContentLoaded'));
  });

  /* Navbar toggler */
  it('should toggle the visibility of the collapse element on button click', () => {
    const navbarToggler = document.querySelector('.navbar__toggler');
    const navbarCollapse = document.querySelector('.collapse');

    navbarToggler.click();
    expect(navbarCollapse.classList.contains('show')).toBe(true);

    navbarToggler.click();
    expect(navbarCollapse.classList.contains('show')).toBe(false);
  });

  /* Highlight active link */
  it('should highlight the active link based on the current path', () => {
    const currentPath = '/about';
    Object.defineProperty(window, 'location', {
      value: { pathname: currentPath },
      writable: true
    });

    document.dispatchEvent(new Event('DOMContentLoaded'));

    const activeLink = document.querySelector('.navbar__link.active');
    expect(activeLink).not.toBeNull();
    expect(activeLink.textContent).toBe('About');
  });
});
