import { env } from "./config/env.js";

import app from "./app.js";
import { prisma } from "./lib/prisma.js";
import { logger } from "./utils/logger.js";

const server = app.listen(env.PORT, () => {
  logger.info(`Server running on port ${env.PORT}`);
});

const shutdown = async (signal: string) => {
  logger.info(`🛑 Received ${signal}. Shutting down gracefully...`);

  try {
    await prisma.$disconnect();
    server.close(() => {
      logger.info("✅ Database disconnected");
      process.exit(0);
    });
  } catch (error) {
    logger.error(`❌ Error during shutdown, error: ${error}`);
    process.exit(1);
  }
};

process.on("SIGINT", shutdown); // CTRL+C
process.on("SIGTERM", shutdown); // Docker / Cloud
