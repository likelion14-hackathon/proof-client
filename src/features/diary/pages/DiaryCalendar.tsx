import { useState } from 'react'
import TabPageLayout from '@/shared/layouts/TabPageLayout'
import MonthNavHeader from '@/features/diary/components/MonthNavHeader'
import MonthGrid from '@/features/diary/components/MonthGrid'
import WeekCalendarView from '@/features/diary/components/WeekCalendarView'
import calendarIcon from '@/shared/assets/icons/calendar.svg'

type ViewMode = 'month' | 'week'

export default function DiaryCalendar() {
  const [viewMode, setViewMode] = useState<ViewMode>('month')
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [month, setMonth] = useState<Date>(new Date())

  return (
    <TabPageLayout tab="record">
      <div className="flex items-center justify-between px-5">
        <h1 className="text-text-primary text-[26px] leading-10 font-semibold">
          기록
        </h1>
        <button
          type="button"
          onClick={() => setViewMode(viewMode === 'month' ? 'week' : 'month')}
          className="text-primary flex items-center gap-1"
        >
          <img src={calendarIcon} alt="" className="size-3.5" />
          <span className="flex h-4.5 w-16 items-center text-sm font-semibold">
            {viewMode === 'month' ? '주차별보기' : '월별보기'}
          </span>
        </button>
      </div>

      <div className="px-5 pt-3">
        {viewMode === 'month' ? (
          <>
            <MonthNavHeader month={month} onMonthChange={setMonth} />
            <MonthGrid
              month={month}
              onMonthChange={setMonth}
              selectedDate={selectedDate}
              onSelectDate={(date) => {
                setSelectedDate(date)
                setViewMode('week')
              }}
            />
          </>
        ) : (
          <WeekCalendarView
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        )}
      </div>
    </TabPageLayout>
  )
}
