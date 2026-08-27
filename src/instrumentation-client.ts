import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || "https://4202e8b1b41656d47cdb5f5fcc66de4b@o4511818334011392.ingest.de.sentry.io/4511818360160336",

  dataCollection: {
    // To disable sending user data and HTTP bodies, uncomment the lines below:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#dataCollection
    // userInfo: false,
    // httpBodies: [],
  },

  ignoreErrors: [
    "evaluating 'window.webkit.messageHandlers'",
    "sendDataToNative",
    "Error invoking postMessage: Java exception was raised during method invocation",
  ],

  // 100% in dev, 10% in production
  tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1,

  // Session Replay: 10% of all sessions, 100% of sessions with errors
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  enableLogs: true,

  integrations: [
    Sentry.replayIntegration(),
  ],
});

// Hook into App Router navigation transitions (App Router only)
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
