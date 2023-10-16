import { ContinueStudy, HeatMap, Button } from '@/common/components';
import { EmptyStudyingDeck } from '@/assets/svgs';
import dueCardImage from '@/assets/images/dueCardImage.png';
import studiedCardImage from '@/assets/images/studiedCardImage.png';

type StudyTrailPropsType = {
  todayDueCards: string;
  todayStudiedCards: string;
  continueStudy: object[];
};

export const StudyTrail = ({
  todayDueCards,
  todayStudiedCards,
  continueStudy,
}: StudyTrailPropsType) => {
  const cardsToday = [
    {
      id: 0,
      status: 'Due',
      heading: todayDueCards && `${todayDueCards}`,
      text: 'cards today',
      imgUrl: dueCardImage,
    },
    {
      id: 1,
      status: 'Studied',
      heading: todayStudiedCards && `${todayStudiedCards}`,
      text: 'cards today',
      imgUrl: studiedCardImage,
    },
  ];

  return (
    <div className='w-fill-available'>
      <div className='flex gap-5 md:gap-[1.375rem] lg:gap-5 xxl:gap-[1.375rem] mb-8 md:mb-10 lg:mb-7 xxl:mb-10'>
        {cardsToday.map((data) => (
          <div
            key={data.id}
            className='flex justify-between w-fill-available py-5 md:py-[1.3125rem] lg:py-[0.9375rem] px-4 md:pl-[1.875rem] lg:pl-[1.3331rem] md:pr-[1.125rem] lg:pr-[0.6806rem] xxl:py-[1.3125rem] xxl:pl-[1.875rem] xxl:pr-[1.125rem] border border-trailCardBorderColor rounded-xl lg:rounded-lg xxl:rounded-xl'
          >
            <div>
              <span className='text-base md:text-2xl lg:text-base xxl:text-2xl font-medium leading-[0.9569rem] md:leading-[1.4356rem] lg:leading-[0.9569rem] xxl:leading-[1.435rem] text-darkPrimary'>
                {data.status}
              </span>
              <h4 className='mt-5 md:mt-[0.875rem] lg:mt-3 xxl:mt-[0.875rem] mb-[0.125rem] md:mb-1 lg:mb-[0.1794rem] xxl:mb-1 text-[2rem] md:text-[2.5rem] lg:text-[1.75rem] xxl:text-[2.5rem] font-bold leading-[1.9138rem] md:leading-[2.3925rem] lg:leading-[1.675rem] xxl:leading-[2.3925rem] text-darkPrimary'>
                {data.heading}
              </h4>
              <p className='text-base md:text-xl lg:text-sm xxl:text-xl font-normal leading-[0.9569rem] md:leading-[1.1963rem] lg:leading-[0.8375rem] xxl:leading-[1.1963rem] text-darkPrimary'>
                {data.text}
              </p>
            </div>
            <div className='relative bottom-[0.25rem] md:bottom-[0.1875rem] lg:bottom-[0.3125rem] w-6 h-6 md:w-8 md:h-8 lg:w-6 lg:h-6 xxl:w-8 xxl:h-8'>
              <img src={data.imgUrl} alt='image' />
            </div>
          </div>
        ))}
      </div>
        <div className='mb-8 md:mb-10 lg:mb-7 xxl:mb-10'>
          <ContinueStudy continueStudy={continueStudy} />
        </div>
      <div>
        <HeatMap />
      </div>
    </div>
  );
};
