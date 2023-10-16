import { useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash'; 
import { Button } from '@/common/components/index';
import { EmptyStudyingDeck } from '@/assets/svgs';

type ContinueStudyPropsType = {
  continueStudy: object[];
};

export const ContinueStudy = ({ continueStudy }: ContinueStudyPropsType) => {
  const navigate = useNavigate();

  return (
    <div>
      <h3 className='tex-xl md:text-2xl lg:text-base xxl:text-2xl font-bold leading-[1.2125rem] md:leading-[1.4356rem] lg:leading-[0.9569rem] xxl:leading-[1.4356rem] text-darkPrimary mb-4 md:mb-6 lg:mb-[1.125rem] xxl:mb-6'>
        Continue Studying
      </h3>
      {!!continueStudy && (
        <div className='flex flex-col gap-4 md:gap-6 lg:gap-5 xxl:gap-6'>
          {continueStudy?.map((card) => (
            <div
              key={card?.id}
              className='p-4 md:px-[1.875rem] md:py-6 lg:px-5 lg:py-4 xxl:px-[1.875rem] xxl:py-6 border border-studyGroupBorderColor rounded-xl lg:rounded-lg xxl:rounded-xl'
            >
              <div className='flex justify-between items-start mb-5 md:mb-[1.4375rem] lg:mb-[0.9506rem] xxl:mb-5'>
                <h4 className='text-base md:text-lg lg:text-xs xxl:text-lg font-medium leading-[0.9569rem] md:leading-[1.0769rem] lg:leading-[0.7175rem] xxl:leading-[1.0769rem] text-darkPrimary'>
                  {card?.name}
                </h4>
                {/* TODO: not decided to use edit button yet */}
                {/* <EditIcon /> */}
              </div>
              <div className='flex flex-col gap-5 md:flex-row md:justify-between md:items-end'>
                <div className='flex'>
                  <div className='stat flex'>
                    <div className='pr-6 md:pr-9 lg:pr-6 xxl:pr-9 border-r border-studyCardBorder'>
                      <h4 className='text-2xl md:text-3xl lg:text-[1.375rem] xxl:text-3xl font-bold leading-[1.4356rem] md:leading-[1.7944rem] lg:leading-[1.3156rem] xxl:leading-[1.7944rem] text-darkPrimary mb-2 lg:mb-[0.3319rem] ,mb-2'>
                        {card?.totalCards}
                      </h4>
                      <p className='text-sm md:text-base lg:text-xs xxl:text-base font-normal leading-[0.8375rem] md:leading-[0.9569rem] lg:leading-[0.7175rem] xxl:leading-[0.9569rem] text-darkPrimary'>
                        Cards
                      </p>
                    </div>
                    <div className='pl-6 md:pl-9 lg:pl-6 xxl:pl-9 pr-6 md:pr-9 lg:pr-6 xxl:pr-9 border-r border-studyCardBorder'>
                      <h4 className='text-2xl md:text-3xl lg:text-[1.375rem] xxl:text-3xl font-bold leading-[1.4356rem] md:leading-[1.7944rem] lg:leading-[1.3156rem] xxl:leading-[1.7944rem] text-darkPrimary mb-2 lg:mb-[0.3319rem] mb-2'>
                        {card?.newCards}
                      </h4>
                      <p className='text-sm md:text-base lg:text-xs xxl:text-base font-normal leading-[0.8375rem] md:leading-[0.9569rem] lg:leading-[0.7175rem] xxl:leading-[0.9569rem] text-darkPrimary'>
                        New
                      </p>
                    </div>
                    <div className='pl-6 md:pl-9 lg:pl-6 xxl:pl-9'>
                      <h4 className='text-2xl md:text-3xl lg:text-[1.375rem] xxl:text-3xl font-bold leading-[1.4356rem] md:leading-[1.7944rem] lg:leading-[1.3156rem] xxl:leading-[1.7944rem] text-darkPrimary mb-2 lg:mb-[0.3319rem] mb-2'>
                        {card?.reviewCards}
                      </h4>
                      <p className='text-sm md:text-base lg:text-xs xxl:text-base font-normal leading-[0.8375rem] md:leading-[0.9569rem] lg:leading-[0.7175rem] xxl:leading-[0.9569rem] text-darkPrimary'>
                        Review
                      </p>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => navigate(`/deck/${card?.id}/review`)}
                  label='Study'
                  size='small'
                  className='!w-[6.25rem] !h-8 md:!w-[7.5rem] md:!h-9 lg:!w-[5.375rem] lg:!h-6 xxl:!w-[7.5rem] xxl:!h-9 rounded-lg lg:rounded-md !text-xs md:!text-sm lg:!text-[0.625rem] xxl:!text-sm !font-medium !leading-[0.7175rem] md:!leading-[0.8375rem] lg:!leading-[0.5981rem] xxl:!leading-[0.8375rem]'
                />
              </div>
            </div>
          ))}
        </div>
      )}
      {isEmpty(continueStudy) && <div className='flex flex-col gap-6 items-center pt-8 pb-[76px]'>
        <EmptyStudyingDeck />
        <p className='text-base font-medium leading-[0.9569rem] text-darkPrimary'>
          You don't have any deck yet
        </p>
      </div>}
    </div>
  );
};
