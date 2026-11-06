import { defineConfig, devices } from '@playwright/test'

const PORT = 3100
export default defineConfig({
  testDir: 'tests/e2e',
  retries: 0,
  reporter: 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    extraHTTPHeaders: { 'x-forwarded-for': '203.0.113.9' },
    launchOptions: process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {},
  },
  projects: [
    { name: 'mobile', use: { ...devices['Pixel 7'], browserName: 'chromium' } },
    { name: 'desktop', use: { viewport: { width: 1440, height: 900 }, browserName: 'chromium' } },
  ],
  webServer: {
    command: `next start -p ${PORT}`,
    port: PORT,
    reuseExistingServer: true,
    env: { ALLOW_MEMORY_RATE_LIMIT: 'true', ALLOW_FILE_LEADS: 'true', CLIENT_IP_SOURCE: 'xff-trusted-hops', TRUSTED_PROXY_HOPS: '1' },
  },
})
