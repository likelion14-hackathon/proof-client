import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      // 새 버전을 배포하면 다음 실행 때 자동으로 교체된다.
      registerType: 'autoUpdate',
      // src/shared/pwa/registerServiceWorker.ts에서 직접 등록한다(업데이트 즉시 적용).
      injectRegister: false,
      // 매니페스트는 public/manifest.json을 그대로 쓴다.
      manifest: false,
      workbox: {
        // 앱 셸(JS/CSS/HTML/아이콘)을 미리 받아 두어 재실행 시 네트워크 없이 바로 뜨게 한다.
        // Pretendard 서브셋 폰트(woff2 90여 개)는 첫 설치 때 전부 받지 않도록 제외하고,
        // 실제로 쓰인 조각만 아래 runtimeCaching으로 캐시한다.
        globPatterns: ['**/*.{js,css,html,svg,png,ico,webp}'],
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api\//],
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'font',
            handler: 'CacheFirst',
            options: {
              cacheName: 'fonts',
              expiration: {
                maxEntries: 150,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: true,
  },
})
