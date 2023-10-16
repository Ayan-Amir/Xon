import { FlagIcon, UnFlagIcon, UndoIcon } from '@/assets/svgs';

type SlideFeatureProps = {
  isUndoCard: boolean,
  isFlagged: boolean,
  handleUndoCard: () => void,
  handleFlagCard: () => void,
};

export const SlideFeature = ({ isUndoCard, handleUndoCard, isFlagged, handleFlagCard }: SlideFeatureProps) => {
  return (
    <div className='flex flex-col gap-[1.125rem] py-5 px-3 border border-darkPrimary/0.6 rounded-[0.625rem] bg-reviewCardBg'>
      {isUndoCard && 
        <button onClick={handleUndoCard}>
          <UndoIcon />
        </button>
      }
      <button className='review-flag-icon h-[2rem] w-[2rem] flex items-center justify-center' onClick={handleFlagCard}>
        {isFlagged ? <UnFlagIcon /> : <FlagIcon />}
      </button>
    </div>
  );
};
