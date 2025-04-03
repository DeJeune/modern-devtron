/// <reference types="webextension-polyfill" />
import browser from 'webextension-polyfill';

// Create a panel in DevTools
browser.devtools.panels.create(
  'Modern Devtron',       // Panel title
  'assets/icon32.png',    // Panel icon
  'src/panel.html',           // Panel HTML page
); 