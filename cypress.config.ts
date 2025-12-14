import { defineConfig } from "cypress";
import mongoose from "mongoose";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        async resetDB() {
          const uri = process.env.MONGODB_URI;

          if (!uri) {
            throw new Error("MONGODB_URI is not defined");
          }

          // 🔒 SAFETY GUARD — must be BEFORE any DB operation
          if (!uri.includes("_test")) {
            throw new Error(
              "Refusing to drop non-test database. MONGODB_URI must include '_test'."
            );
          }

          if (mongoose.connection.readyState === 0) {
            await mongoose.connect(uri);
          }

          await mongoose.connection.db?.dropDatabase();
          return null;
        },
      });

      return config;
    },
  },
});
