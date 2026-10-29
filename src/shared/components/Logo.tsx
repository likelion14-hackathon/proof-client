import proofLogoDark from '@/shared/assets/icons/proof-logo-dark.svg'

/**
 * 상단 로고 헤더.
 * 상태바(또는 노치) 아래로 24px 띄운다. 온보딩 헤더(높이 64px 가운데 정렬 = 위 24px)와 같은 위치다.
 * 상태바가 페이지 위에 겹치지 않는 환경에서는 safe-area-inset-top이 0이라 24px만 남는다.
 */
export default function Logo() {
  return (
    <header className="bg-off-white shrink-0 pt-[calc(var(--safe-top)+24px)] pb-12">
      <img
        src={proofLogoDark}
        alt="Proof"
        className="ml-5.25 block h-4 w-12.5"
      />
    </header>
  )
}
