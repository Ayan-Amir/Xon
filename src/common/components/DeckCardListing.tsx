import { AxiosResponse } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Menu } from '@headlessui/react'
import { DeckCardProps } from '@/common/components/DeckCards';
import { Button, MenuDropdown } from '@/common/components';
import { capitalizeString, cardDueDate, convertObjectToArray, gernalizeDeckName, showNotionCard } from '@/utils';
import { CARD_DROPDOWN, ARCHIVED, CARDS, FLAGGED, PAUSED } from '@/utils/constant';
import { BasicCard, DaysLogo, DownloadButtonIcon, FlagIcon, PauseButtonIcon, UnFlagIcon, DropdownIcon, UnArchiveIcon, UnPauseIcon, AddCard, } from '@/assets/svgs';

type Params = {
  deckParam: string;
  cardId: string;
};

export const DeckCardListing: React.FC<DeckCardProps> = ({
  cardState,
  deckCards,
  scrollRef,
  handleScroll,
  handleArchiveBtn,
  handlePausedBtn,
  handleFlaggedBtn,
  handleCreateCardType,
  deckCardUpdateLoading,
}) => {
  const navigate = useNavigate();
  const { deckParam, cardId } = useParams<Params>();  

  return (
    <div className='w-[23.625rem] py-6 border border-studyGroupBorderColor rounded-[1.4375rem] max-h-[calc(100vh-180px)] h-full z-10'>
      <div className='mx-6 pb-6'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-base font-bold leading-[0.9569rem] text-darkPrimary'>
            {gernalizeDeckName(deckCards?.pages[0]?.data?.deckName, deckParam)}
          </h2>
          {!isNaN(deckParam) && <div className='text-sm font-normal leading-[1rem] text-acordianTextColor'>
            <MenuDropdown dropdownStyle='mt-3 -right-1.5' displayItem={<div className='flex items-center gap-2 py-2 px-2.5 rounded border border-darkPrimary bg-white text-darkPrimary text-sm leading-[0.875rem]'><span>New Card</span>
              <DropdownIcon className='w-4 h-4' /></div>}>
              <div className='px-3 py-5 flex flex-col gap-1.5 w-[15rem]'>
                {CARD_DROPDOWN?.map((cardType, index) => (
                  <Menu.Item key={index} onClick={handleCreateCardType} value={cardType?.value}>
                    <button
                      className={`text-sm text-left text-darkPrimary font-normal leading-4 px-4 py-[0.4375rem] rounded hover:bg-authBg cursor-pointer whitespace-nowrap`}
                    >
                      {cardType?.label}
                    </button>
                  </Menu.Item>
                ))}
              </div>
            </MenuDropdown>
          </div>}
        </div>
        {![ARCHIVED, PAUSED].includes(deckParam) && <div className='flex flex-col gap-3'>
          <Button
            label='📚 Start Studying'
            size='small'
            className='!w-full !h-10 !rounded-md !text-sm !font-bold !leading-4'
            onClick={() => navigate(`/deck/${deckParam}/review`)}
          />
        </div>}
      </div>
      <div
        className='px-6 max-h-[calc(100vh-21.625rem)] h-full overflow-x-scroll custom-scroll'
        ref={scrollRef}
        onScroll={handleScroll}
      >
        {deckCards?.pages?.map((page: AxiosResponse) =>
          convertObjectToArray(page?.data?.results)?.map((deckCard) => (
            <div
              key={deckCard?.id}
              className='border-t border-b border-studyCardBorderColor group cursor-pointer'
              onClick={() => navigate(`/decks/${deckParam}/cards/${deckCard?.id}`)}
            >
              <div className={`my-3 h-[8.125rem] ${deckCard?.id === parseInt(cardId) ? 'bg-authBg rounded-[0.5625rem]' : ''}`}>
                <div className='flex flex-col gap-2 p-3 h-[6.125rem]'>
                  <div className='study-card-wrapper-front'>
                    <p>{deckCard?.frontContent && showNotionCard(deckCard?.frontContent)}</p>
                  </div>
                  <div className='h-12 text-xs study-card-wrapper-back'>
                    <p>{deckCard?.backContent && showNotionCard(deckCard?.backContent)}</p>
                  </div>
                </div>
                <div className={`flex justify-between bg-authBg px-3 py-[0.375rem] rounded-b-[0.5625rem] h-8 border border-t border-transparent ${deckCard?.id === parseInt(cardId) ? 'border-t-studyCardBorderColor' : ''}`}>
                  <div className='flex gap-4 items-center'>
                    <div className='flex gap-[0.375rem] items-center text-[9px] font-normal leading-[0.5381rem] text-darkPrimary'>
                      <DaysLogo />
                      {cardDueDate(deckCard?.dueAt)}
                    </div>
                    <div className='flex gap-[0.375rem] items-center text-[9px] font-normal leading-[0.5381rem] text-darkPrimary'>
                      <BasicCard />
                      {capitalizeString(deckCard?.type)} Card
                    </div>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <button
                      className='h-[1rem] w-[1.0625rem] flex items-center justify-center disabled:opacity-30 disabled:hover:cursor-not-allowed'
                      disabled={[FLAGGED, CARDS].includes(cardState) || !isNaN(cardState) ? false : true}
                      onClick={(e) => handleFlaggedBtn(e, deckCard?.id, deckCard?.isFlagged)}
                    >
                      {deckCard?.isFlagged ? <UnFlagIcon /> : <FlagIcon />}
                    </button>
                    <button
                      className='h-[1rem] w-[1.0625rem] flex items-center justify-center disabled:opacity-30 disabled:hover:cursor-not-allowed'
                      disabled={[ARCHIVED, CARDS].includes(cardState) || !isNaN(cardState) ? false : true}
                      onClick={(e) => handleArchiveBtn(e, deckCard?.id)}
                    >
                      {deckCard?.isActive ?  <DownloadButtonIcon /> : <UnArchiveIcon />}
                    </button>
                    <button
                      className='h-[1rem] w-[1.0625rem] flex items-center justify-center disabled:opacity-30 disabled:hover:cursor-not-allowed'
                      disabled={[PAUSED, CARDS].includes(cardState) || !isNaN(cardState) ? false : true}
                      onClick={(e) => handlePausedBtn(e, deckCard?.id)}
                    >
                      {!deckCard?.isPaused ? <UnPauseIcon /> : <PauseButtonIcon />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )))}
          {!deckCards?.pages[0]?.data?.count > 0 && <div className='h-full flex flex-col items-center justify-center gap-6'>
            <AddCard />
            <div className='flex flex-col items-center gap-3'>
              <h5 className='text-xl text-darkPrimary font-bold'>Add Card</h5>
              <p className='text-sm text-darkPrimary font-normal'>Add cards to keep going</p>
            </div>
          </div>
        }
      </div >
    </div >
  );
};
