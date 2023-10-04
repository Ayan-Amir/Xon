import { Button } from '@/common/components'
import Congratulations from '@/assets/congrats.svg'

export function ReviewCardCompleted() {
  return (
    <div className='flex flex-col items-center'>
      <div className='mt-10'>
        <img src={Congratulations} alt='congratulations-image' />
      </div>
      <h3 className='text-[2.625rem] font-bold leading-[2.5119rem] mt-[3.5rem] mb-[1.5rem]'>
        Congratulations
      </h3>
      <p className='text-2xl font-normal leading-[2.125rem] max-w-[73.375rem] text-darkPrimary mb-10 text-center'>
        Congratulations on completing the entire deck of science subject
        questions! :tada::microscope: Your dedication and curiosity have paid off, and you've
        expanded your knowledge in this field. Keep up the great work and
        continue to explore the wonders of science!
      </p>
      <Button label='Continue' size='medium' className='!w-[26.5rem]' />
    </div>
  )
}
