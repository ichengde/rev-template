import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.simple(),
  defaultMeta: { service: "frida" },
  transports: [
    //
    // - Write all logs with importance level of `error` or higher to `error.log`
    //   (i.e., error, fatal, but not other levels)
    //
    new winston.transports.File({
      filename: "./log/error.log",
      level: "error",
    }),
    //
    // - Write all logs with importance level of `info` or higher to `combined.log`
    //   (i.e., fatal, error, warn, and info, but not trace)
    //
    new winston.transports.File({
      filename: "./log/combined.log",
    }),
    new winston.transports.Console(),
  ],
});

export { logger };
