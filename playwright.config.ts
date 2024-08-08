import { defineConfig } from "@playwright/test";

export default defineConfig({
    testDir: './E2E',
    timeout: 30000,
    retries: 1,
    reporter: 'list',
    use: {
        headless: true,
        viewport :{ width: 1280, height: 720 },
        actionTimeout: 0,
        ignoreHTTPSErrors: true,
    },
});
