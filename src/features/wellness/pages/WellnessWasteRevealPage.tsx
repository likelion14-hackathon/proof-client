import NumberFlow from '@number-flow/react'
import {
  WELLNESS_WASTE_REVEAL,
  WELLNESS_AUTO_ADVANCE_MS,
} from '@/features/wellness/constants'
import { useRevealOnce } from '@/features/wellness/useRevealOnce'
import { useWellnessResult } from '@/features/wellness/useWellnessResult'
import { useUserName } from '@/features/auth/useUserName'
import Logo from '@/shared/components/Logo'
import { useTimedNavigate } from '@/shared/hooks/useTimedNavigate'

export default function WellnessWasteRevealPage() {
  const { wasteCost } = useWellnessResult()
  const userName = useUserName()

  const displayWasteCost = useRevealOnce('wasteCost', wasteCost)

  useTimedNavigate('/wellness/yearly-spend-reveal', WELLNESS_AUTO_ADVANCE_MS, {
    replace: true,
  })

  return (
    <div className="bg-off-white min-h-screen-safe mx-auto flex w-full max-w-103.5 flex-col">
      <Logo />

      <div className="flex flex-col items-center gap-15.5 px-13.5">
        <h1 className="text-text-primary text-center text-[26px] leading-10 font-semibold break-keep">
          {userName}
          {WELLNESS_WASTE_REVEAL.title[0]}
          <br />
          {WELLNESS_WASTE_REVEAL.title[1]}
        </h1>

        <div className="flex flex-col items-center gap-3.75 text-center">
          <p className="text-text-secondary text-[14px] font-medium">
            {WELLNESS_WASTE_REVEAL.wasteCostLabel}
          </p>
          <p className="text-primary text-[28px] font-semibold">
            <NumberFlow value={displayWasteCost} suffix="원" />
          </p>
        </div>
      </div>
    </div>
  )
}
