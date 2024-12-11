// Global switcher styles
import './common/switcher';
import './common/navbar';

// import CSS
import '@styles/main.scss';

// Dynamically load in client side component JS
export const components = import.meta.glob(
  '../../dxp/component-service/**/js/frontend.js',
  { eager: true }
);
