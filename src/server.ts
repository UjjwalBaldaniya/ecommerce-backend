import { env } from "./config/env.js";

import app from "./app.js";
import { prisma } from "./lib/prisma.js";

const server = app.listen(env.PORT, () => {
  console.log(`🚀 Server running on port ${env.PORT}`);
});

const shutdown = async (signal: string) => {
  console.log(`🛑 Received ${signal}. Shutting down gracefully...`);

  try {
    await prisma.$disconnect();
    server.close(() => {
      console.log("✅ Database disconnected");
      process.exit(0);
    });
  } catch (error) {
    console.error("❌ Error during shutdown", error);
    process.exit(1);
  }
};

process.on("SIGINT", shutdown); // CTRL+C
process.on("SIGTERM", shutdown); // Docker / Cloud
