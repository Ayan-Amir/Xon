import { AxiosResponse } from 'axios';

type ProgressBarProps = {
  progressbarDetail?: AxiosResponse
}

export const ProgressBar = ({ progressbarDetail }: ProgressBarProps) => {

  const PROGRESS_BAR_WIDTH = Math.floor(progressbarDetail?.data?.progress / progressbarDetail?.data?.totalCards * 100);

  return (
    <div className='flex items-center gap-4 mb-8'>
      <div className='w-full h-4 bg-reviewCardBg rounded-[3.75rem]'>
        <div style={{width: `${PROGRESS_BAR_WIDTH}%`}} className={`max-w-[57.25rem] h-full bg-darkPrimary rounded-[3.75rem]`}></div>
      </div>
      <p className='text-2xl font-light leading-[1.375rem] text-black'>
      {progressbarDetail?.data?.progress}<span className='font-bold'>/{progressbarDetail?.data?.totalCards}</span>
      </p>
    </div>
  );
};
