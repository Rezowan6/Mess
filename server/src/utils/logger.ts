import pino, { type LoggerOptions } from "pino";

const VALID_LEVELS = [
  "fatal",
  "error",
  "warn",
  "info",
  "debug",
  "trace",
  "silent",
] as const;

type LogLevel = (typeof VALID_LEVELS)[number];

const isProduction = process.env.NODE_ENV === "production";

const resolveLogLevel = (): LogLevel => {
  const envLevel = process.env.LOG_LEVEL?.toLowerCase();

  if (envLevel && (VALID_LEVELS as readonly string[]).includes(envLevel)) {
    return envLevel as LogLevel;
  }

  return isProduction ? "info" : "debug";
};

const options: LoggerOptions = {
  level: resolveLogLevel(),
  base: {
    env: process.env.NODE_ENV || "development",
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level: (label) => ({ level: label }),
  },
  serializers: {
    err: pino.stdSerializers.err,
    error: pino.stdSerializers.err,
  },
  redact: {
    paths: [
      "password",
      "*.password",
      "token",
      "*.token",
      "accessToken",
      "*.accessToken",
      "refreshToken",
      "*.refreshToken",
      "authorization",
      "*.authorization",
      "req.headers.authorization",
      "req.headers.cookie",
    ],
    censor: "[REDACTED]",
  },
};

export const logger = isProduction
  ? pino(options)
  : pino({
      ...options,
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname,env",
        },
      },
    });
