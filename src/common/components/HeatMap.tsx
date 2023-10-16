import { BaseIconLeft, BaseIconRight } from '@/assets/svgs';
import HeatMapImage from '@/assets/images/HeatMapImage.png';

export const HeatMap = () => {
  return (
    <div>
      <div className='flex justify-between mb-6'>
        <h4 className='text-2xl font-bold leading-[1.4356rem] text-darkPrimary'>
          Heatmap
        </h4>
        <div className='flex gap-3'>
          <h5 className='text-2xl font-medium leading-[1.4356rem] text-darkPrimary'>
            2023
          </h5>
          <div className='flex gap-2'>
            <button>
              <BaseIconLeft />
            </button>
            <button>
              <BaseIconRight />
            </button>
          </div>
        </div>
      </div>
      <div className='w-full h-[10.1875rem] md:h-[11.6875rem] lg:h-[8.3125rem] xxl:h-[11.6875rem] rounded-xl lg:rounded-lg xxl:rounded-xl'>
        <img src={HeatMapImage} alt='heatMap' className='w-full h-full' />
      </div>
    </div>
  );
};
