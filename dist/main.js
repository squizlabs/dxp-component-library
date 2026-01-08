const u = (e) => {
    const t = e.querySelector('.banner__button'),
      a = e.querySelector('video');
    a && t
      ? t.addEventListener('click', () => {
          const r = !a.paused;
          (a[r ? 'pause' : 'play'](),
            t.classList.toggle('banner__button--play', r),
            t.classList.toggle('banner__button--pause', !r),
            t.setAttribute(
              'aria-label',
              r
                ? "Play decorative video in the banner's background"
                : "Pause decorative video in the banner's background"
            ));
        })
      : t && (t.style.display = 'none');
  },
  b = () => {
    document.querySelectorAll('.banner').forEach((t) => u(t));
  };
b();
const g = (e) => {
    const t = e.querySelector('[data-testimonials-track]'),
      a = e.querySelector('[data-testimonials-prev]'),
      r = e.querySelector('[data-testimonials-next]');
    if (t && a && r) {
      let n = 0;
      const i = Array.from(t.children),
        o = (s, c) => {
          (s.setAttribute('aria-disabled', c),
            c ? s.setAttribute('disabled', '') : s.removeAttribute('disabled'));
        },
        l = () => {
          (i.forEach((s, c) => {
            (s.removeAttribute('aria-current'),
              s.setAttribute('tabindex', '-1'),
              c === n &&
                (s.setAttribute('aria-current', 'true'),
                s.setAttribute('tabindex', '0'),
                s.focus()));
          }),
            o(a, n === 0),
            o(r, n === i.length - 1));
        };
      (a.addEventListener('click', () => {
        n > 0 && (n--, l());
      }),
        r.addEventListener('click', () => {
          n < i.length - 1 && (n++, l());
        }),
        i.forEach((s) => {
          s.setAttribute('tabindex', '-1');
        }),
        l());
    }
  },
  m = () => {
    document.querySelectorAll('[data-testimonials]').forEach((t) => g(t));
  };
m();
const h = (e) => {
    console.error(`No element found for theme: ${e}`);
  },
  d = (e, t) => {
    const a = document.documentElement;
    if (
      (t.forEach((n) => {
        var i;
        (a.classList.remove(n.getAttribute('value')),
          (n.disabled = !1),
          (i = n.nextElementSibling) == null || i.classList.remove('active'));
      }),
      a.classList.add(e),
      !document.querySelector(`.style-switcher__css[value="${e}"]`))
    ) {
      h(e);
      return;
    }
    localStorage.setItem('theme', e);
  },
  v = () => {
    const e = document.querySelector('[aria-controls="style-switcher"]'),
      t = document.querySelector('#style-switcher'),
      a = document.querySelectorAll('.style-switcher__css');
    if (e && t && a.length) {
      const r = localStorage.getItem('theme');
      (r && d(r, a),
        e.addEventListener('click', () => {
          const n = e.getAttribute('aria-expanded') === 'true';
          (e.setAttribute('aria-expanded', !n), (t.hidden = n));
        }),
        a.forEach((n) => {
          n.addEventListener('click', (i) => {
            const o = i.target.getAttribute('value');
            d(o, a);
          });
        }),
        document.addEventListener('click', (n) => {
          e.getAttribute('aria-expanded') === 'true' &&
            !n.target.closest('#style-switcher') &&
            n.target !== e &&
            (e.setAttribute('aria-expanded', 'false'), (t.hidden = !0));
        }));
    }
  };
document.addEventListener('DOMContentLoaded', v);
document.addEventListener('DOMContentLoaded', () => {
  const e = document.querySelector('.navbar__toggler'),
    t = document.querySelector('.collapse');
  e &&
    t &&
    e.addEventListener('click', () => {
      t.classList.toggle('show');
    });
  const a = document.querySelectorAll('.navbar__link'),
    r = window.location.pathname;
  a.forEach((n) => {
    const i = new URL(n.href, window.location.origin).pathname;
    n.classList.toggle('active', i === r);
  });
});
