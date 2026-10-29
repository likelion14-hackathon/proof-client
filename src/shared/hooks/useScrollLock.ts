import { useEffect } from 'react'

type SavedStyles = {
  htmlOverflow: string
  htmlOverflowY: string
  htmlOverscroll: string
  bodyPosition: string
  bodyTop: string
  bodyLeft: string
  bodyRight: string
  scrollY: number
}

let lockCount = 0
let saved: SavedStyles | null = null

const applyLock = () => {
  const html = document.documentElement
  const { body } = document

  saved = {
    htmlOverflow: html.style.overflow,
    htmlOverflowY: html.style.overflowY,
    htmlOverscroll: html.style.overscrollBehavior,
    bodyPosition: body.style.position,
    bodyTop: body.style.top,
    bodyLeft: body.style.left,
    bodyRight: body.style.right,
    scrollY: window.scrollY,
  }

  html.style.overflow = 'hidden'
  html.style.overflowY = 'hidden'
  html.style.overscrollBehavior = 'none'

  body.style.position = 'fixed'
  // body를 fixed로 바꾸면 문서 스크롤이 0으로 돌아가므로, 현재 위치만큼 올려 두어 화면이 튀지 않게 한다.
  body.style.top = `-${saved.scrollY}px`
  body.style.left = '0'
  body.style.right = '0'
}

const releaseLock = () => {
  if (!saved) return
  const html = document.documentElement
  const { body } = document

  html.style.overflow = saved.htmlOverflow
  html.style.overflowY = saved.htmlOverflowY
  html.style.overscrollBehavior = saved.htmlOverscroll
  body.style.position = saved.bodyPosition
  body.style.top = saved.bodyTop
  body.style.left = saved.bodyLeft
  body.style.right = saved.bodyRight
  window.scrollTo(0, saved.scrollY)
  saved = null
}

export const useScrollLock = (enabled = true) => {
  useEffect(() => {
    if (!enabled) return

    lockCount += 1
    if (lockCount === 1) applyLock()

    return () => {
      lockCount -= 1
      if (lockCount === 0) releaseLock()
    }
  }, [enabled])
}
