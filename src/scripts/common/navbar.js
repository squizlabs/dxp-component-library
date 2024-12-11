document.addEventListener('DOMContentLoaded', () => {
  // Navbar toggler
  const navbarToggler = document.querySelector('.navbar__toggler');
  const navbarCollapse = document.querySelector('.collapse');

  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', () => {
      navbarCollapse.classList.toggle('show');
    });
  }

  // Highlight active link
  const links = document.querySelectorAll('.navbar__link');
  const currentPath = window.location.pathname;

  links.forEach((link) => {
    const linkPath = new URL(link.href, window.location.origin).pathname;
    link.classList.toggle('active', linkPath === currentPath);
  });
});
