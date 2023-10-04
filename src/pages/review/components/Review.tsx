import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useGetRequest, usePatchMutation, usePostMutation } from '@/services/networkRequestService';
import { apiEndPoint } from '@/services';
import {
  Badge,
  ProgressBar,
  SlideFeature,
  ReviewCard,
  Button,
} from '@/common/components';
import { CARD_MEMO_STATE } from '@/utils/constant';
import { SPACEBAR } from '@/utils/constant';
import { CrossIcon } from '@/assets/svgs/CrossIcon';

type CardDeckTagProps = {
  id: number,
  label: string,
};

type Params = {
  deckId: string;
};

export const Review = () => {
  const { deckId } = useParams<Params>();

  const [isExpandedCard, setIsExpandedCard] = useState<boolean>(false);
  //TODO: needs to fix this any propType
  const [currentReviewCard, setCurrentReviewCard] = useState<any>();
  const [prevReviewCard, setPrevReviewCard] = useState<any>();
  const [cardMemoState, setCardMemoState] = useState<number>();
  const [isUndoCard, setIsUndoCard] = useState<boolean>(false);
  const [showPrevReviewCard, setShowPrevReviewCard] = useState<boolean>(false);

  const {
    data: deckCardDetail,
    isFetching: deckCardDetailLoading,
    refetch: deckCardDetailRefetch,
  } = useGetRequest(
    'review-deck-card',
    [],
    apiEndPoint.REVIEW_DECK_CARD(deckId),
    {
      refetchOnWindowFocus: false,
      retry: true,
      onSuccess: (resp) => setCurrentReviewCard(resp),
    },
  );

  const handleCardMemoState = (cardState: number) => {
    setCardMemoState(cardState);
    setPrevReviewCard(currentReviewCard);
    setIsUndoCard(true);
    setShowPrevReviewCard(false)
    handleNextCardDeckDetail();
  };

  const { mutate: handleNextCardDeckDetail, isLoading: nextCardDetailLoading } = usePostMutation(
    'next-deck-card-detail',
    apiEndPoint.REVIEW_DECK_CARD(deckId),
    {
      isUndo: false,
      memoState: cardMemoState,
      card: currentReviewCard?.data?.card?.id,
    },
    (resp) => {
      setIsExpandedCard(false);
      setCurrentReviewCard(resp);
    },
    (err) => console.log(err),
  );

  const { mutate: handleFlagCard, isLoading: flagCardLoading } = usePatchMutation(
		'flag-card',
		apiEndPoint.UPDATE_REVIEW_DECK_CARD(currentReviewCard?.data?.card?.id),
		{
			isFlagged: !currentReviewCard?.data?.card?.isFlagged,
		},
		(resp) => {
      setCurrentReviewCard({
        ...currentReviewCard, 
          data: {...currentReviewCard?.data,
            card: {...currentReviewCard?.data?.card, isFlagged: resp?.data?.isFlagged}
        }
      });
      showPrevReviewCard && setPrevReviewCard({
        ...prevReviewCard, 
          data: {...prevReviewCard?.data,
            card: {...prevReviewCard?.data?.card, isFlagged: resp?.data?.isFlagged}
        }
      });
    },
		(err) => console.log(err),
	);

  const handleSpaceBarKeyPress = (event: KeyboardEvent) => event.code === SPACEBAR && setIsExpandedCard(!isExpandedCard);

  const handleUndoCard = () => {
    setShowPrevReviewCard(true);
    setIsUndoCard(false);
    setIsExpandedCard(false);
    setCurrentReviewCard(prevReviewCard);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleSpaceBarKeyPress);
    return () => {
      document.removeEventListener('keydown', handleSpaceBarKeyPress);
    };
  }, [isExpandedCard]);

  return (
    <div className='w-full min-h-screen h-auto flex flex-col items-center'>
      <button className='absolute top-[3.75rem] right-[3.75rem] w-[3.75rem] h-[3.75rem]'>
        <CrossIcon />
      </button>
      <div className='pt-[6.25rem]'>
        <h1 className='mb-6 text-5xl leading-[45.94px] font-bold'>
          {/* TODO: Needs to display dynamically deck title */}
          💊 Y1 Pharmacology
        </h1>
        <div className='flex gap-4 mb-8'>
          {currentReviewCard?.data?.card?.tags?.map((cardDeckTag: CardDeckTagProps) => (
            <Badge
              key={cardDeckTag?.id}
              label={cardDeckTag?.label}
              //TODO: now the variant is static needs to handle this variant dynamically as well.
              variant={cardDeckTag?.id % 2 === 0 ? 'green' : 'blue'}
            />
          ))}
        </div>
        <ProgressBar progressbarDetail={currentReviewCard} />
        <div className='relative'>
          <ReviewCard isExpandedCard={isExpandedCard} setIsExpandedCard={setIsExpandedCard} reviewCardDetail={showPrevReviewCard ? prevReviewCard : currentReviewCard} isLoading={deckCardDetailLoading} />
          <div className='absolute top-[4.375rem] -right-[5.375rem]'>
            <SlideFeature 
              isUndoCard={isUndoCard}
              handleUndoCard={handleUndoCard}
              isFlagged={showPrevReviewCard ? prevReviewCard?.data?.card?.isFlagged : currentReviewCard?.data?.card?.isFlagged}
              handleFlagCard={handleFlagCard}
            />
          </div>
        </div>
        <p className='text-center mt-6 text-base font-light leading-[0.9375rem] text-darkPrimary'>
          Press <span className='font-bold'>SPACE </span>to{' '}
          {isExpandedCard ? 'collapse' : 'expand'}
        </p>
        {isExpandedCard && (
          <div className='mt-10 flex gap-6 justify-center'>
            <Button
              label={
                <p className='h-5 text-xl font-medium leading-5'>
                  Again <span className='text-base font-normal'>&lt;1 min</span>
                </p>
              }
              variant='error'
              onClick={() => handleCardMemoState(CARD_MEMO_STATE.AGAIN)}
            />
            <Button
              label={
                <p className='h-5 text-xl font-medium leading-5'>
                  Hard <span className='text-base font-normal'>&lt;6 min</span>
                </p>
              }
              variant='error-light'
              onClick={() => handleCardMemoState(CARD_MEMO_STATE.HARD)}
            />
            <Button
              label={
                <p className='h-5 text-xl font-medium leading-5'>
                  Good <span className='text-base font-normal'>&lt;10 min</span>
                </p>
              }
              variant='success-light'
              onClick={() => handleCardMemoState(CARD_MEMO_STATE.GOOD)}
            />
            <Button
              label={
                <p className='h-5 text-xl font-medium leading-5'>
                  Easy <span className='text-base font-normal'>&lt;1 min</span>
                </p>
              }
              variant='success'
              onClick={() => handleCardMemoState(CARD_MEMO_STATE.EASY)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
