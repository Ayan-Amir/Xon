import React from 'react';
import { isEmpty } from 'lodash';
import { CardTagProps, SelectedDeckCardProps } from '@/common/components/DeckCards';
import { Badge, ButtonLoader, NotionBlockNote, PopoverDropdown, Saving } from '@/common/components/index';
import { Addition } from '@/assets/svgs';

export const DetailCard: React.FC<SelectedDeckCardProps> = ({
  selectedDeckCard,
  handleTagAddition,
  tagLabel,
  handleTagAdditionKeyDown,
  handleRemoveTag,
  popover,
  setPopover,
  setBackCardContent,
  setFrontCardContent,
  deckCardUpdateLoading,
}) => {

  const frontContent = isEmpty(selectedDeckCard?.frontContent) ? [{}] : JSON.parse(selectedDeckCard?.frontContent);
  const backContent = isEmpty(selectedDeckCard?.backContent) ? [{}] : JSON.parse(selectedDeckCard?.backContent);

  return (
    <div className='pl-[4.4375rem] pr-10 mt-[1.0625rem] flex-1 max-h-[calc(100vh-12.3125rem)] remove-scrollbar'>
      <div className='pb-4 border-b border-studyCardBorderColor'>
        <span className='text-base font-normal leading-[0.9569rem] text-detailCardPrimaryColor'>
          Front
        </span>
        <div className='flex gap-1 items-center mt-[0.6875rem] mb-[0.9375rem]'>
          {selectedDeckCard?.tags?.map((cardDeckTag: CardTagProps) => (
            <Badge
              key={cardDeckTag?.id}
              id={cardDeckTag?.id}
              label={cardDeckTag?.label}
              variant={cardDeckTag?.colorCode}
              handleRemoveTag={handleRemoveTag}
              size='small'
              closeIcon={true}
            />
          ))}
          <PopoverDropdown
            popover={popover}
            dropdownStyle='mt-3 -right-3'
            displayItem={<Addition />}
            setPopover={setPopover}
          >
            <div className='w-[13.375rem]'>
              <input
                type='text'
                placeholder='Search for an option'
                className='w-full bg-authBg border-0 border-darkPrimary/50 relative z-40 ring-0 text-xs leading-3 focus:ring-0 focus:outline-none focus:border-transparent'
                value={tagLabel}
                onChange={handleTagAddition}
                onKeyDown={handleTagAdditionKeyDown}
              />
              <div className='min-h-[2.75rem] px-3.5 py-2 border-t border-darkPrimary/50'>
                <p className='text-xs text-darkPrimary font-normal leading-3 mb-2'>Select an option or create one</p>
                {tagLabel && <p className='text-xs text-darkPrimary font-normal leading-3'>Create <span className='bg-authBg px-[0.25rem] py-[0.5rem]'>{tagLabel}</span></p>}
              </div>
            </div>
          </PopoverDropdown>
        </div>
        <NotionBlockNote initialContent={frontContent} setCardContent={setFrontCardContent} />
      </div>
      <div className='mt-[1.8125rem] detail-card-notion'>
        <span className='text-base font-normal leading-[0.9569rem] text-detailCardPrimaryColor'>
          Back
        </span>
        <NotionBlockNote initialContent={backContent} setCardContent={setBackCardContent} />
      </div>
      {deckCardUpdateLoading && <div className='absolute saving-btn right-[3.75rem] bottom-[3.5625rem] flex items-center gap-[0.375rem]'>
        <ButtonLoader /><span className='text-darkPrimary text-sm font-normal leading-[13.4px]'>Saving</span>
      </div>}
    </div>
  );
};
