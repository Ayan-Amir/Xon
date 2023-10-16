import { Button } from './Button';
import { Input } from './Input';
import React from 'react';
import { DragDrop } from '@/assets/svgs/DragDrop';
export const Flashcard = () => {
  const [dragActive, setDragActive] = React.useState(false);
  // ref
  const inputRef = React.useRef(null);

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files);
    }
  };

  // triggers when file is selected with click
  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files);
    }
  };

  return (
    <div className='flex-1 h-screen pt-[6.25rem] pl-[6.1875rem] pr-[7.1875rem]'>
      <div></div>
      <h4 className='text-[2rem] font-bold leading-[1.9138rem] text-darkPrimary mb-9'>
        Generate Basic Flashcards
      </h4>
      <form
        id='form-file-upload'
        onDragEnter={handleDrag}
        onSubmit={(e) => e.preventDefault()}
        className='bg-authBg h-[24.625rem] rounded-[1.25rem] border-[3px] border-dashed border-darkPrimary mb-[1.875rem] flex justify-center items-center'
      >
        <input
          ref={inputRef}
          type='file'
          id='input-file-upload'
          multiple={true}
          onChange={handleChange}
          className='hidden'
        />
        <label
          id='label-file-upload'
          htmlFor='input-file-upload'
          className={dragActive ? 'drag-active' : ''}
        >
          <div className='flex flex-col items-center gap-[1.375rem]'>
            <DragDrop />
            <p className='text-2xl font-normal leading-[1.4356rem] text-darkPrimary'>
              Drag and drop files here
            </p>
            <span className='text-base font-normal leading-[0.9569rem] text-[#20242799]'>
              Supported file: PDF
            </span>
          </div>
        </label>
        {dragActive && (
          <div
            id='drag-file-element'
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          ></div>
        )}
      </form>
      <div className='flex justify-between items-center mb-[4.375rem]'>
        <p className='text-base font-light leading-[0.9569rem] text-darkPrimary'>
          Maximum upload file size: <span className='font-medium'>5MB</span>
        </p>
        <p className='text-base font-light leading-[0.9569rem] text-darkPrimary'>
          PDF files per day: <span className='font-medium'>3 files</span>
        </p>
        <p className='text-base font-light leading-[0.9569rem] text-darkPrimary'>
          Character limit: <span className='font-medium'>5000 characters</span>
        </p>
      </div>
      <div className='flex gap-[3.25rem]'>
        <div className='w-[50%]'>
          <Input
            type='text'
            placeholder='Enter your question style'
            label='Question Style'
            className='placeholder:text-[#ABABAB] text-sm font-normal leading-[0.8375rem] text-darkPrimary !h-[3.7094rem] !pl-6'
          />
        </div>
        <div className='w-[50%]'>
          <Input
            type='text'
            placeholder='Enter your deck name'
            label='Deck Name'
            className='placeholder:text-[#ABABAB] text-sm font-normal leading-[0.8375rem] text-darkPrimary !h-[3.7094rem] !pl-6 mb-3'
          />
          <Button label='Generate' className='!w-full !h-[3.75rem]' />
        </div>
      </div>
    </div>
  );
};
