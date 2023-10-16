import { useParams } from 'react-router-dom';
import { Button, DetailCard, Modal, DeckCardListing, } from '@/common/components';
import { ProfileMenuDropDown } from '@/common/components/ProfileMenuDropDown';
import { gernalizeDeckName } from '@/utils';
import { DeleteIcon, PenIcon, } from '@/assets/svgs';

export type CardProps = {
  id: number,
  backContent: string,
  frontContent: string,
  dueAt: string,
  isActive: boolean,
  isFlagged: boolean,
  isPaused: boolean,
  type: string,
};

export type CardTagProps = {
  id?: number,
  label?: string,
  colorCode?: string,
};

export type selectedCard = {
  id: number,
  backContent: string,
  frontContent: string,
  isFlagged: boolean,
  type: string,
  tags: CardTagProps[]
};

export type DeckCardProps = {
  cardState: string,
  deckCards: any,
  scrollRef: React.RefObject<HTMLDivElement | undefined>,
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void,
  handleArchiveBtn: (e: React.MouseEvent<HTMLButtonElement>, cardId: number) => void,
  handlePausedBtn: (e: React.MouseEvent<HTMLButtonElement>, cardId: number) => void,
  handleFlaggedBtn: (e: React.MouseEvent<HTMLButtonElement>, cardId: number, isFlagged: boolean) => void,
  handleDeleteDeck: () => void,
  selectedDeckCard?: selectedCard | undefined,
  handleTagAddition?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  tagLabel?: string,
  handleTagAdditionKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
  handleRemoveTag: (removeTagId: number) => void,
  popover?: boolean,
  setPopover?: React.Dispatch<React.SetStateAction<boolean>>,
  setBackCardContent: React.Dispatch<React.SetStateAction<any>>,
  setFrontCardContent: React.Dispatch<React.SetStateAction<any>>,
  handleCreateTagKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
  selectedCardType?: string,
  handleCreateCardType?: (e: React.MouseEvent<HTMLButtonElement>) => void,
  frontCardContent?: string,
  createdTags?: CardTagProps[],
  handleRemoveCreateTag?: (removeTagId?: number) => void;
  deckCardLoading: boolean,
  editDeckName: boolean,
  deleteDeckModal: boolean,
  handleDeckEditName: () => void,
  handleShowDeleteDeckModal: () => void,
  handleCloseDeleteDeckModal: () => void,
  handleDeleteDeckButton: () => void,
  deckCardUpdateLoading: boolean,
  handleDeckName: (e: React.ChangeEvent<HTMLDivElement>) => void,
  deckCardListingLoading: boolean,
};

export type SelectedDeckCardProps = {
  selectedDeckCard?: selectedCard,
  handleTagAddition?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  tagLabel?: string,
  handleTagAdditionKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
  handleRemoveTag: (removeTagId: number) => void,
  popover?: boolean,
  setPopover?: React.Dispatch<React.SetStateAction<boolean>>,
  setBackCardContent: React.Dispatch<React.SetStateAction<any>>,
  setFrontCardContent: React.Dispatch<React.SetStateAction<any>>,
  handleSave?: () => void,
  frontCardContent?: string,
  createdTags?: CardTagProps[],
  handleRemoveCreateTag?: (removeTagId?: number) => void;
  deckCardLoading: boolean,
  deckCardUpdateLoading: boolean,
};

type Params = {
  deckParam: string;
  cardId: string;
};

export const DeckCards: React.FC<DeckCardProps> = ({
  cardState,
  deckCards,
  scrollRef,
  handleScroll,
  handleArchiveBtn,
  handlePausedBtn,
  handleFlaggedBtn,
  handleDeleteDeck,
  selectedDeckCard,
  handleTagAddition,
  tagLabel,
  handleTagAdditionKeyDown,
  handleRemoveTag,
  popover,
  setPopover,
  setBackCardContent,
  setFrontCardContent,
  selectedCardType,
  handleCreateCardType,
  frontCardContent,
  createdTags,
  handleCreateTagKeyDown,
  handleRemoveCreateTag,
  deckCardLoading,
  editDeckName,
  deleteDeckModal,
  handleDeckEditName,
  handleShowDeleteDeckModal,
  handleCloseDeleteDeckModal,
  deckCardUpdateLoading,
  handleDeleteDeckButton,
  handleDeckName,
  deckCardListingLoading,
}) => {
  const { deckParam, cardId } = useParams<Params>();
  
  return (
    <>
      <div className='flex justify-between items-center mr-10'>
        <div className='w-max flex items-center gap-6 mb-9 group'>
          <h2
            className={`text-[2rem] font-bold leading-[1.9138rem] text-darkPrimary outline-none focus:outline-none focus-visible:outline-none`}
            contentEditable={editDeckName}
            suppressContentEditableWarning={true}
            onInput={handleDeckName}
          >
            {gernalizeDeckName(deckCards?.pages[0]?.data?.deckName, deckParam)}
          </h2>
          {!isNaN(deckParam) && <div className='hidden group-hover:flex items-center gap-3'>
            <span onClick={handleDeckEditName} className='cursor-pointer'>
              <PenIcon />
            </span>
            <span onClick={handleShowDeleteDeckModal} className='cursor-pointer'>
              <DeleteIcon />
            </span>
          </div>}
        </div>
        <ProfileMenuDropDown />
      </div>
      <div className='flex gap-4 h-full'>
        <div>
          <DeckCardListing
            cardState={cardState}
            deckCards={deckCards}
            scrollRef={scrollRef}
            handleScroll={handleScroll}
            handleArchiveBtn={handleArchiveBtn}
            handlePausedBtn={handlePausedBtn}
            handleFlaggedBtn={handleFlaggedBtn}
            handleCreateCardType={handleCreateCardType}
            deckCardUpdateLoading={deckCardUpdateLoading}
          />
        </div>
        {!!cardId && <div className='w-[calc(100vw-47.625rem)]'>
          <DetailCard
            key={deckCardLoading ? 1 : 2}
            selectedDeckCard={selectedDeckCard}
            handleTagAddition={handleTagAddition}
            tagLabel={tagLabel}
            handleTagAdditionKeyDown={handleTagAdditionKeyDown}
            handleRemoveTag={handleRemoveTag}
            popover={popover}
            setPopover={setPopover}
            setBackCardContent={setBackCardContent}
            setFrontCardContent={setFrontCardContent}
            deckCardUpdateLoading={deckCardUpdateLoading}
          />
        </div>}
      </div >
      <Modal isOpen={deleteDeckModal} onClose={handleCloseDeleteDeckModal} width='33.375rem'>
        <div className='w-full flex flex-col items-center gap-7'>
          <DeleteIcon className='w-20 h-20 fill-current text-errorButton' />
          <div className='flex flex-col items-center gap-4'>
            <h4 className='text-[1.75rem] text-darkPrimary font-bold leading-7'>Delete Deck</h4>
            <p className='text-sm text-darkPrimary leading-[0.875rem]'>Are you sure you want to delete your deck?</p>
          </div>
          <div className='w-full flex flex-col gap-3'>
            <Button label='Delete' variant='primary' className='w-full' onClick={handleDeleteDeckButton} />
            <Button label='Cancel' variant='secondary' className='w-full' onClick={handleCloseDeleteDeckModal} />
          </div>
        </div>
      </Modal>
    </>
  );
};
