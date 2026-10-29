import rocket from '@/shared/assets/images/rocket.png'
import {
  WELLNESS_PLAN_TEASER,
  WELLNESS_AUTO_ADVANCE_MS,
} from '@/features/wellness/constants'
import Logo from '@/shared/components/Logo'
import { useTimedNavigate } from '@/shared/hooks/useTimedNavigate'

export default function WellnessPlanTeaserPage() {
  useTimedNavigate('/wellness/plan-teaser-spend', WELLNESS_AUTO_ADVANCE_MS, {
    replace: true,
  })

  return (
    <div className="bg-off-white min-h-screen-safe mx-auto flex w-full max-w-103.5 flex-col">
      <Logo />

      <div className="flex flex-col gap-7.5 px-5">
        <h1 className="text-text-primary text-center text-[26px] leading-10 font-semibold break-keep">
          {WELLNESS_PLAN_TEASER.title[0]}
          <br />
          {WELLNESS_PLAN_TEASER.title[1]}
        </h1>

        <div className="border-primary flex min-h-[121px] items-start gap-4 rounded-[20px] border-2 pt-[25px] pr-[24px] pb-[21px] pl-[25px]">
          <img src={rocket} alt="" className="h-[75px] w-[70px] shrink-0" />
          <div className="flex flex-col items-start gap-2">
            <p className="text-primary text-[14px] font-semibold">
              {WELLNESS_PLAN_TEASER.cardTitle}
            </p>
            <p className="text-text-secondary text-[12px] leading-5.5 font-medium break-keep">
              {WELLNESS_PLAN_TEASER.cardDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
