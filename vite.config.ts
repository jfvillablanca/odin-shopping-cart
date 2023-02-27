/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/odin-shopping-cart/',
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: ["./src/tests/setupTest.ts"]
    }
});
