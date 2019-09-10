import { Logger} from "@Lib/utils";

export const logInitInfo = () => {

  const logger: Logger = new Logger("INIT");

  logger.info("🔶 Starting application in DEV mode.");
  logger.info("🔶 First init time:", new Date());

  logger.pushSeparator();
};
