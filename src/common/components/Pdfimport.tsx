import { RemoveIcon } from '@/assets/svgs';
import { Badge } from './Badge';

export const Pdfimport = () => {
  const cardData = [
    {
      cardNumber: 'Card 1',
      front: 'Front',
      frontText:
        'How do the receptors bound by steroid and thyroid hormones differ from the receptors bound by peptide hormones?',
      back: 'Back',
      backPrimaryText: [
        {
          beforeText: 'Peptide hormones bind extracellular',
          link: 'extracellular',
          afterText: 'receptors.',
        },
      ],
      backSecondaryText: [
        {
          beforeText: '',
          link: 'Steroid hormones',
          afterText:
            'are derived from cholesterol and are lipid-soluble Steroid hormones are derived from cholesterol and are lipid-soluble Steroid hormones are derived from cholesterol and are lipid-soluble ...',
        },
      ],
    },
    {
      cardNumber: 'Card 1',
      front: 'Front',
      frontText:
        'How do the receptors bound by steroid and thyroid hormones differ from the receptors bound by peptide hormones?',
      back: 'Back',
      backPrimaryText: [
        {
          beforeText: 'Peptide hormones bind extracellular',
          link: 'extracellular',
          afterText: 'receptors.',
        },
      ],
      backSecondaryText: [
        {
          beforeText: '',
          link: 'Steroid hormones',
          afterText:
            'are derived from cholesterol and are lipid-soluble Steroid hormones are derived from cholesterol and are lipid-soluble Steroid hormones are derived from cholesterol and are lipid-soluble ...',
        },
      ],
    },
    {
      cardNumber: 'Card 1',
      front: 'Front',
      frontText:
        'How do the receptors bound by steroid and thyroid hormones differ from the receptors bound by peptide hormones?',
      back: 'Back',
      backPrimaryText: [
        {
          beforeText: 'Peptide hormones bind extracellular',
          link: 'extracellular',
          afterText: 'receptors.',
        },
      ],
      backSecondaryText: [
        {
          beforeText: '',
          link: 'Steroid hormones',
          afterText:
            'are derived from cholesterol and are lipid-soluble Steroid hormones are derived from cholesterol and are lipid-soluble Steroid hormones are derived from cholesterol and are lipid-soluble ...',
        },
      ],
    },
  ];
  return (
    <div className='flex-1 pt-[6.375rem] px-10 max-h-screen overflow-hidden'>
      <h4 className='text-[2rem] font-bold leading-[1.9138rem] text-darkPrimary mb-9'>
        Import from PDF
      </h4>
      <div className='flex gap-7'>
        <div className='grow-0 shrink-0 basis-[27.875rem]'>
          this content will come when pdf is extracted
        </div>
        <div className='flex flex-col gap-6 max-h-[calc(100vh-169px)] overflow-scroll'>
          {cardData.map((data, index) => (
            <div
              key={index}
              className='relative py-6 pl-[1.125rem] pr-4 border border-[#D5D5D5] rounded-xl'
            >
              <button className='absolute right-3 top-3'>
                <RemoveIcon />
              </button>
              <div className='flex gap-5 mb-6'>
                <h3 className='text-[0.9375rem] font-bold leading-5 text-darkPrimary whitespace-nowrap mt-1'>
                  {data.cardNumber}
                </h3>
                <div className='flex gap-[0.375rem] flex-wrap'>
                  <Badge label='# 👨‍👩‍👧‍👧 Study Group!/Endocrine Physiology' />
                  <Badge label='# 💊 Y1 Pharmacology' />
                  <Badge label='# 👨‍👩‍👧‍👧 Study Group!/Endocrine Physiology' />
                </div>
              </div>
              <div className='flex gap-[1.375rem]'>
                <div>
                  <h4 className='text-[0.9375rem] font-normal leading-[1.2188rem] text-[#89888D] mb-[0.3125rem] tracking-[0.02em]'>
                    {data.front}
                  </h4>
                  <p className='w-[16.4375rem] text-sm font-bold leading-6 text-darkPrimary'>
                    {data.frontText}
                  </p>
                </div>
                <div>
                  <h4 className='text-[0.9375rem] font-normal leading-[1.2188rem] text-[#89888D] mb-3 tracking-[0.02em]'>
                    {data.back}
                  </h4>
                  <div className='max-w-[14.9375rem] flex flex-col gap-3'>
                    {data.backPrimaryText.map((text) => (
                      <p
                        key={text.link}
                        className='text-xs font-normal leading-[0.975rem] text-darkPrimary'
                      >
                        {text.beforeText}{' '}
                        <span className='text-[#FF3D00]'>{text.link}</span>{' '}
                        {text.afterText}
                      </p>
                    ))}
                    {data.backSecondaryText.map((text) => (
                      <p
                        key={text.link}
                        className='text-xs font-normal leading-[0.975rem] text-darkPrimary line-clamp'
                      >
                        {text.beforeText}{' '}
                        <span className='text-[#F94207]'>{text.link}</span>{' '}
                        {text.afterText}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
