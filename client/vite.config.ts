import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import mkcert from "vite-plugin-mkcert";
import path from "path/win32";

export default defineConfig({
  build: {
    outDir: "../API/wwwroot",
    chunkSizeWarningLimit: 1500,
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    // strictPort: true,
  },
  plugins: [react(), mkcert()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/app/shared/components"),
    },
  },
});
