import { AxiosResponse } from 'axios';
import Skeleton from 'react-loading-skeleton';
import { NotionBlockNote } from '@/common/components/NotionBlockNote';
import { Input } from '@/common/components/index'

type ReviewCardProps = {
  isExpandedCard: boolean,
  setIsExpandedCard: React.Dispatch<React.SetStateAction<boolean>>,
  reviewCardDetail?: AxiosResponse,
  isLoading: boolean,
};

export const ReviewCard = ({ isExpandedCard, setIsExpandedCard, reviewCardDetail, isLoading }: ReviewCardProps) => {
  return (
    <div className='flex gap-[1.625rem]'>
      <div className='relative pt-[1.875rem]'>
        <div className='absolute w-[57.1875rem] h-[7.375rem] top-[0.875rem] border border-reviewCardBorder/20 rounded-3xl left-[1.5625rem] -z-10 bg-reviewCardBg/60'></div>
        <div className='absolute w-[53.6875rem] h-[7.375rem] top-0 border border-reviewCardBorder/10 rounded-3xl left-[3.3125rem] -z-20 bg-reviewCardBg/30'></div>
        <div
          className={`py-10 px-12 border border-reviewCardBorder/30 rounded-[1.4375rem] min-h-[18.75rem] ${isExpandedCard ? 'h-[31.25rem]' : ''} transition-height duration-200 ease-in max-h-[31.25rem] overflow-x-hidden overflow-y-auto w-[60.375rem] bg-reviewCardBg`}
          onClick={() => setIsExpandedCard(true)}
        >
          {
            isLoading ? <Skeleton count={2} /> : <p className='text-2xl font-bold leading-[2.25rem] text-darkPrimary'>
              {reviewCardDetail?.data?.card?.frontContent}
            </p>
          }
          {isExpandedCard &&
            //TODO: needs json type response to use notion blockNote
            // <NotionBlockNote isEditable={false} initialContent={JSON.parse(reviewCardDetail?.data?.card?.backContent)} />
            <p className='text-2xl font-bold leading-[2.25rem] text-darkPrimary'>{reviewCardDetail?.data?.card?.backContent}</p>
          }
        </div>
      </div>
    </div>
  );
};
