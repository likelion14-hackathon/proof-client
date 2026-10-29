import {
  WELLNESS_SAVING_INTRO,
  WELLNESS_AUTO_ADVANCE_MS,
} from '@/features/wellness/constants'
import Logo from '@/shared/components/Logo'
import { useTimedNavigate } from '@/shared/hooks/useTimedNavigate'

export default function WellnessSavingIntroPage() {
  useTimedNavigate('/wellness/plan-teaser', WELLNESS_AUTO_ADVANCE_MS, {
    replace: true,
  })

  return (
    <div className="bg-off-white min-h-screen-safe mx-auto flex w-full max-w-103.5 flex-col">
      <Logo />

      <div className="px-5">
        <h1 className="text-text-primary text-center text-[26px] leading-10 font-semibold break-keep">
          {WELLNESS_SAVING_INTRO.title[0]}
          <br />
          {WELLNESS_SAVING_INTRO.title[1]}
        </h1>
      </div>
    </div>
  )
}
