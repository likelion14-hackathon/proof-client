import { PLAN_CATEGORY_TAG } from '@/features/measurement/constants'
import type { PlanDetailItem } from '@/features/measurement/types'

interface PlanDetailRowProps {
  item: PlanDetailItem
}

const FALLBACK_TAG = { label: '기타', colorClass: 'bg-dark' }

export default function PlanDetailRow({ item }: PlanDetailRowProps) {
  const tag = PLAN_CATEGORY_TAG[item.category] ?? FALLBACK_TAG
  const tagLabel = item.categoryLabel ?? tag.label

  return (
    <div className="border-line flex flex-col gap-2.25 border-b px-5 pt-5.75 pb-6">
      <p className="text-primary text-[12px] leading-4.5 font-semibold">
        {item.weekLabel}
      </p>

      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            className={`${tag.colorClass} text-off-white shrink-0 rounded-[5px] pt-0.75 pr-2 pb-0.5 pl-1.75 text-[11px] leading-normal font-medium`}
          >
            {tagLabel}
          </span>
          <span className="text-text-primary min-w-0 flex-1 truncate text-[14px] leading-normal font-semibold">
            {item.name}
          </span>
          <span className="text-text-secondary shrink-0 text-[11px] leading-normal font-semibold">
            {item.frequency}
          </span>
        </div>
        <span className="text-primary shrink-0 text-[14px] leading-normal font-semibold">
          {item.price}
        </span>
      </div>

      <p className="text-text-secondary text-[12px] leading-normal font-medium">
        {item.description}
      </p>
    </div>
  )
}
