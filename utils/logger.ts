function error(message: any) {
  console.error(message);
}

function info(message: any) {
  console.info(message);
}

function log(message: any) {
  console.log(message);
}

function warning(message: any) {
  console.warn(message);
}

const logger = { error, info, log, warning };

export default logger;
