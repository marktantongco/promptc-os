import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);

// Register service worker with update detection
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then(reg => {
      // Check for updates every 60 seconds
      setInterval(() => {
        reg.update();
      }, 60000);
      // Notify app of updates
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'activated') {
            // Dispatch custom event for app to handle
            window.dispatchEvent(new CustomEvent('sw-updated', { detail: { newVersion: true } }));
          }
        });
      });
    }).catch(() => {});
  });
}
