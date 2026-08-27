import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN || "https://4202e8b1b41656d47cdb5f5fcc66de4b@o4511818334011392.ingest.de.sentry.io/4511818360160336",

  dataCollection: {
    // To disable sending user data and HTTP bodies, uncomment the lines below:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#dataCollection
    // userInfo: false,
    // httpBodies: [],
  },
  tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1,

  // Attach local variable values to stack frames
  includeLocalVariables: true,

  enableLogs: true,
});
