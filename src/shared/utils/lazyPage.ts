import type { ComponentType } from 'react'
import type { RouteObject } from 'react-router-dom'

type PageModule = { default: ComponentType }

const CHUNK_RELOAD_KEY = 'chunk-reload-at'
/** 이 시간 안에 다시 실패하면 새로고침 반복을 막고 에러를 그대로 던진다 */
const CHUNK_RELOAD_GUARD_MS = 10_000

/**
 * 새 버전 배포 후 예전 화면을 띄워 둔 채로 이동하면, 이전 빌드의 청크 파일이 서버에 없어 import가 실패한다.
 * 이때 한 번 새로고침해서 최신 빌드를 받는다.
 */
async function importWithReload(
  importer: () => Promise<PageModule>,
): Promise<PageModule> {
  try {
    return await importer()
  } catch (error) {
    const lastReloadAt = Number(sessionStorage.getItem(CHUNK_RELOAD_KEY) ?? 0)
    if (Date.now() - lastReloadAt < CHUNK_RELOAD_GUARD_MS) throw error

    sessionStorage.setItem(CHUNK_RELOAD_KEY, String(Date.now()))
    window.location.reload()
    // 새로고침이 끝날 때까지 이전 화면을 유지한다.
    return new Promise<PageModule>(() => {})
  }
}

/**
 * 페이지 컴포넌트를 React Router의 route `lazy`로 불러온다.
 *
 * React.lazy + Suspense(fallback=null)로 감싸면 새 Suspense 경계가 마운트되는 순간
 * 청크가 오기 전까지 화면 전체가 비었다가 다시 그려진다(깜빡임).
 * route `lazy`는 라우터가 이동 전에 청크를 먼저 받아오므로, 받는 동안 이전 화면이 그대로 유지된다.
 */
export function lazyPage(
  importer: () => Promise<PageModule>,
): Pick<RouteObject, 'lazy'> {
  return {
    lazy: async () => ({
      Component: (await importWithReload(importer)).default,
    }),
  }
}
