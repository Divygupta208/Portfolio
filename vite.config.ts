import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // New plugin

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Add this to the plugins array
  ],
  server: {
    port: 3002, // Replace with your desired port
  },
});
