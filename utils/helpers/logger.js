import winston from 'winston';
const { createLogger, format, transports } = winston;
const { combine, splat, printf, timestamp } = format;

const my_format = printf(({ level, message, timestamp, ...metadata }) => {
  let msg = `${timestamp} [${level}] \t${message} `;
  if (metadata)
    msg += JSON.stringify(metadata);
  return msg;
});

export default createLogger({
  level: 'debug',
  exitOnError: false,
  format: combine(
    format.colorize({ all: true }),
    splat(),
    timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
    my_format
  ),
  transports: [
    new transports.File({
      filename: 'logs/server.log',
      level: 'debug'
    }),
    new transports.Console({ level: 'info' })
  ]
});