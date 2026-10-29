import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import navHome from '@/shared/assets/icons/nav-home.svg'
import navInfo from '@/shared/assets/icons/nav-info.svg'
import navPlan from '@/shared/assets/icons/nav-plan.svg'
import navRecord from '@/shared/assets/icons/nav-record.svg'
import MaskIcon from '@/shared/components/MaskIcon'

export type NavTabId = 'home' | 'plan' | 'record' | 'info'

interface NavTab {
  id: NavTabId
  label: string
  path: string
  icon: string
  iconClass: string
  /** 탭 화면 청크. 탭을 누르기 전에 미리 받아 두어 전환 시 대기 시간을 없앤다 */
  preload: () => Promise<unknown>
}

const TABS: NavTab[] = [
  {
    id: 'home',
    label: '홈',
    path: '/',
    icon: navHome,
    iconClass: 'size-4',
    preload: () => import('@/features/home/pages/HomePage'),
  },
  {
    id: 'plan',
    label: '플랜',
    path: '/plan',
    icon: navPlan,
    iconClass: 'size-4',
    preload: () => import('@/features/plan/pages/PlanPage'),
  },
  {
    id: 'record',
    label: '기록',
    path: '/diary',
    icon: navRecord,
    iconClass: 'size-4',
    // react-day-picker/date-fns를 포함해 탭 중 가장 무겁다.
    preload: () => import('@/features/diary/pages/DiaryCalendar'),
  },
  {
    id: 'info',
    label: '정보',
    path: '/my',
    icon: navInfo,
    iconClass: 'h-4 w-3.5',
    preload: () => import('@/features/my/pages/MyPage'),
  },
]

/** 첫 화면 렌더링을 방해하지 않도록 브라우저가 한가할 때 실행한다 */
function runWhenIdle(task: () => void) {
  if ('requestIdleCallback' in window) {
    const id = window.requestIdleCallback(task, { timeout: 2000 })
    return () => window.cancelIdleCallback(id)
  }
  const id = setTimeout(task, 300)
  return () => clearTimeout(id)
}

interface BottomNavProps {
  current: NavTabId
}

export default function BottomNav({ current }: BottomNavProps) {
  const navigate = useNavigate()

  useEffect(
    () =>
      runWhenIdle(() => {
        TABS.forEach((tab) => {
          if (tab.id !== current) tab.preload().catch(() => {})
        })
      }),
    [current],
  )

  return (
    <nav className="border-nav-border bg-nav-background flex h-15 gap-0 rounded-[100px] border p-0.75 shadow-[0px_0px_8.3px_-5px_rgba(0,0,0,0.25)] backdrop-blur-[2px]">
      {TABS.map((tab) => {
        const selected = tab.id === current
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              if (!selected) navigate(tab.path)
            }}
            aria-current={selected ? 'page' : undefined}
            className={`flex flex-1 flex-col items-center justify-center gap-[7.5px] rounded-[100px] transition-colors duration-200 ${
              selected ? 'bg-primary' : ''
            }`}
          >
            <MaskIcon
              src={tab.icon}
              className={`${tab.iconClass} ${
                selected ? 'bg-off-white' : 'bg-text-secondary'
              }`}
            />
            <span
              className={`text-[10px] leading-normal font-medium ${
                selected ? 'text-off-white' : 'text-text-secondary'
              }`}
            >
              {tab.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
