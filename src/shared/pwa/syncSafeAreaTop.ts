/**
 * iOS 홈 화면 앱(standalone)에서 페이지가 상태바 밑까지 그려지는데도
 * env(safe-area-inset-top)이 0으로 나오는 경우가 있다(iOS 26 이후 설치 시점 설정에 따라 다름).
 * 이때 로고 등 상단 요소가 상태바/다이내믹 아일랜드에 가려지므로, 화면 높이로 상태바 높이를 추정해
 * --safe-top-fallback 으로 넣어 둔다. env 값이 정상이면 CSS에서 max()로 env 값이 그대로 쓰인다.
 */
function isIosStandalone() {
  const nav = navigator as Navigator & { standalone?: boolean }
  return (
    (nav.standalone === true ||
      window.matchMedia('(display-mode: standalone)').matches) &&
    /iP(hone|od|ad)/.test(navigator.userAgent)
  )
}

function readEnvSafeTop() {
  const probe = document.createElement('div')
  probe.style.cssText =
    'position:fixed;top:0;left:0;visibility:hidden;pointer-events:none;padding-top:env(safe-area-inset-top)'
  document.body.appendChild(probe)
  const value = parseFloat(getComputedStyle(probe).paddingTop) || 0
  probe.remove()
  return value
}

/** 기기 세로 길이(pt)로 상태바 높이를 추정한다 */
function estimateStatusBarHeight() {
  const longSide = Math.max(window.screen.width, window.screen.height)
  if (longSide >= 852) return 59 // 다이내믹 아일랜드 기종
  if (longSide >= 812) return 47 // 노치 기종
  return 20 // 홈 버튼 기종
}

function update() {
  const root = document.documentElement
  // 세로 모드에서 페이지가 화면 전체 높이를 차지할 때만 상태바 밑까지 그려진 것으로 본다.
  const coversStatusBar =
    window.innerHeight >= window.innerWidth &&
    Math.abs(window.innerHeight - Math.max(screen.width, screen.height)) <= 1

  if (coversStatusBar && readEnvSafeTop() === 0) {
    root.style.setProperty(
      '--safe-top-fallback',
      `${estimateStatusBarHeight()}px`,
    )
  } else {
    root.style.removeProperty('--safe-top-fallback')
  }
}

export function syncSafeAreaTop() {
  if (!isIosStandalone()) return
  update()
  window.addEventListener('resize', update)
  window.addEventListener('orientationchange', update)
}
