//TODO
import { StreakRecordData } from '../../constants';

export const StreakRecord = () => {
  return (
    <div className='flex justify-between pt-4 lg:pt-3 xxl:pt-4 pb-[2.875rem]'>
      {StreakRecordData.map((data, index) => (
        <ul key={index} className='flex flex-col md:flex-row gap-[0.3125rem]'>
          <li className='text-sm lg:text-[0.625rem] xxl:text-sm font-normal leading-[0.8375rem] lg:leading-[0.5981rem] xxl:leading-[0.8375rem] text-darkPrimary'>
            {data.title}
          </li>
          <li className='text-sm lg:text-[0.625rem] xxl:text-sm font-bold leading-[0.8375rem] lg:leading-[0.5981rem] xxl:leading-[0.8375rem] text-darkPrimary'>
            {data.text}
          </li>
        </ul>
      ))}
    </div>
  );
};
