import type { RouteObject } from 'react-router-dom'
import { lazyPage } from '@/shared/utils/lazyPage'

export const DiaryRoutes: RouteObject[] = [
  {
    index: true,
    ...lazyPage(() => import('@/features/diary/pages/DiaryCalendar')),
    handle: { title: '기록' },
  },
  {
    path: 'photo-select',
    ...lazyPage(() => import('@/features/diary/pages/DiaryPhotoSelect')),
    handle: { title: '오늘의 기록' },
  },
  {
    path: 'photo-capture',
    ...lazyPage(() => import('@/features/diary/pages/DiaryPhotoCapture')),
    handle: { title: '오늘의 기록' },
  },
  {
    path: 'photo-capture/complete',
    ...lazyPage(
      () => import('@/features/diary/pages/DiaryPhotoCaptureComplete'),
    ),
    handle: { title: '오늘의 기록' },
  },
  {
    path: 'analyze',
    ...lazyPage(() => import('@/features/diary/pages/DiaryAnalyzeInProgress')),
    handle: { title: '분석 중' },
  },
  {
    path: 'record/:step',
    ...lazyPage(() => import('@/features/diary/pages/DiaryRecordScoreStep')),
    handle: { title: '오늘의 기록' },
  },
  {
    path: 'record/checklist',
    ...lazyPage(() => import('@/features/diary/pages/DiaryRecordChecklist')),
    handle: { title: '오늘의 기록' },
  },
  {
    path: 'record/diary',
    ...lazyPage(() => import('@/features/diary/pages/DiaryRecordDiary')),
    handle: { title: '오늘의 기록' },
  },
]
