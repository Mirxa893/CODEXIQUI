import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import vitePluginInjectDataLocator from "./plugins/vite-plugin-inject-data-locator";

export default defineConfig({
  plugins: [react(), vitePluginInjectDataLocator()],
  server: {
    allowedHosts: true, // Accepts all hosts (fine for dev)
  },
});
