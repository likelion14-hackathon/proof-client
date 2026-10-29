import { useNavigate } from 'react-router-dom'
import { HOME_SUMMARY } from '@/features/home/constants'
import { useTodayDiaryStatus } from '@/features/diary/hooks/useTodayDiaryStatus'
import { useUserName } from '@/features/auth/useUserName'
import pencilIcon from '@/shared/assets/icons/pencil.svg'

export default function TodayActionCard() {
  const navigate = useNavigate()
  const { data: todayStatus, isPending } = useTodayDiaryStatus()
  const userName = useUserName()
  const isRecordedToday = Boolean(todayStatus)
  const { subtitle, title } = isRecordedToday
    ? HOME_SUMMARY.todayActionDone
    : HOME_SUMMARY.todayAction

  return (
    <button
      type="button"
      onClick={() =>
        navigate(isRecordedToday ? '/diary' : '/diary/photo-select')
      }
      aria-busy={isPending}
      className="border-nav-border bg-primary relative flex h-24 w-full items-start rounded-[10px] border px-5 pt-6 text-left transition-transform active:scale-[0.99]"
    >
      {/* 오늘 기록 여부를 받기 전에는 문구를 숨겨 '기록하기 → 기록 완료'로 글자가 바뀌어 보이는 깜빡임을 막는다 */}
      <div
        className={`min-w-0 flex-1 transition-opacity duration-200 ${
          isPending ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <p className="text-off-white-sub text-[13px] leading-4 font-medium">
          {subtitle.replace('{name}', userName)}
        </p>
        <p className="text-off-white mt-2.5 text-[18px] leading-5.5 font-semibold break-keep">
          {title}
        </p>
      </div>
      <img
        src={pencilIcon}
        alt=""
        className="absolute top-6.5 right-5 h-11 w-11.25"
      />
    </button>
  )
}
