import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Sentry from '@sentry/react';
import App from '@/App.tsx';
import '@/index.css';
import 'react-loading-skeleton/dist/skeleton.css'
import '@blocknote/core/style.css';

if (import.meta.env.VITE_APP_SENTRY_DSN) {
  Sentry.init({
    dsn: `${import.meta.env.VITE_APP_SENTRY_DSN}`,
    integrations: [
      new Sentry.BrowserTracing({
        tracingOrigins: ['*'],
      }),
    ],
    tracesSampleRate: import.meta.env
      .VITE_APP_SENTRY_TRACES_SAMPLE_RATE_VALUE,
    replaysSessionSampleRate: import.meta.env
      .VITE_APP_SENTRY_REPLAYS_SESSION_SAMPLE_RATE_VALUE,
    replaysOnErrorSampleRate: import.meta.env
      .VITE_APP_SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE,
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  // TODO: will uncomment before deployment
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);
