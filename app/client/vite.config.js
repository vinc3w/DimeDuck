import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@app": path.resolve("./src/app"),
      "@assets": path.resolve("./src/assets"),
      "@components": path.resolve("./src/components"),
      "@features": path.resolve("./src/features"),
      "@utils": path.resolve("./src/utils"),
      "@styles": path.resolve("./src/styles"),
    },
  },
});
