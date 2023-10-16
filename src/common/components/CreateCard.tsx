import React from 'react';
import { debounce } from 'lodash';
import { SelectedDeckCardProps } from '@/common/components/DeckCards';
import { Badge, NotionBlockNote, PopoverDropdown, Saving } from '@/common/components/index';
import { Addition } from '@/assets/svgs';

export const CreateCard: React.FC<SelectedDeckCardProps> = ({ 
  handleTagAddition,
  tagLabel,
  handleTagAdditionKeyDown,
  popover,
  setPopover,
  setBackCardContent,
  setFrontCardContent,
  frontCardContent,
	createdTags,
  handleRemoveCreateTag,
}) => {

  return (
    <div className='pl-[4.4375rem] pr-10 mt-[1.0625rem] flex-1 max-h-[calc(100vh-12.3125rem)] remove-scrollbar'>
      <div className='min-h-[9.0625rem] pb-4 border-b border-studyCardBorderColor'>
        <span className='text-base font-normal leading-[0.9569rem] text-detailCardPrimaryColor'>
          Front
        </span>
        <div className='flex gap-1 items-center mt-[0.6875rem] mb-[0.9375rem]'>
          {createdTags?.map((cardDeckTag, index) => (
            <Badge
              key={index}
              id={index}
              label={cardDeckTag?.label}
              //TODO: now the variant is static needs to handle this variant dynamically as well.
              variant={index % 2 === 0 ? 'green' : 'blue'}
              handleRemoveTag={handleRemoveCreateTag}
            />
          ))}
          <PopoverDropdown
            popover={popover}
            dropdownStyle='mt-3 -right-3'
            //TODO: need to style add label
            displayItem={<span className='flex items-center gap-1 text-xs font-normal leading-[0.7175rem] text-darkSecondary'>{<Addition />} Click to add label</span>}
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
                {/* TODO: needs to add styling of create tag label */}
                {tagLabel && <p className='text-xs text-darkPrimary font-normal leading-3'>Create <span className='bg-authBg px-[0.25rem] py-[0.5rem]'>{tagLabel}</span></p>}
              </div>
            </div>
          </PopoverDropdown>
        </div>
        <h4
          contentEditable={true}
          suppressContentEditableWarning={true}
					before='Add Text'
          className={`relative text-2xl font-bold text-darkPrimary outline-none focus:outline-none focus-visible:outline-none before:absolute ${!frontCardContent && 'before:content-[attr(before)]'} before:text-darkSecondary before:top-0 before:left-0`}
          onInput={debounce((e: React.ChangeEvent<HTMLDivElement>) => setFrontCardContent(e?.target?.innerHTML), 2000)}
        >
        </h4>
      </div>
      <div className='mt-[1.8125rem]'>
        <span className='text-base font-normal leading-[0.9569rem] text-detailCardPrimaryColor'>
          Back
        </span>
        <NotionBlockNote setCardContent={setBackCardContent}/>
      </div>
      <div className='absolute right-[3.75rem] bottom-[3.5625rem]'>
        <Saving />
      </div>
    </div>
  );
};
