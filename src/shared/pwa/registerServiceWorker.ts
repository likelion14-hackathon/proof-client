import { registerSW } from 'virtual:pwa-register'

/**
 * 서비스 워커를 등록하고, 새 버전이 배포되면 바로 적용(새로고침)한다.
 *
 * 홈 화면 앱은 완전히 종료되지 않고 백그라운드에서 다시 열리는 경우가 많아서,
 * 앱을 다시 볼 때마다(visibilitychange) 새 버전이 있는지 확인한다.
 */
export function registerServiceWorker() {
  if (import.meta.env.DEV) return

  registerSW({
    immediate: true,
    onRegisteredSW(_swUrl, registration) {
      if (!registration) return
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          registration.update().catch(() => {})
        }
      })
    },
  })
}
