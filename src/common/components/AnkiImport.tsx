import { Button, Badge } from '@/common/components';
import { RemoveIcon } from '@/assets/svgs';

export const AnkiImport = () => {
  // TODO: this data will be API response
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
            'are derived from cholesterol and are lipid-soluble Steroid peptide bind extracellular receptors',
          detailText:
            'Steroid hormones are derived from cholesterol and are lipid-soluble Steroid hormones are derived from cholesterol and are lipid-soluble Steroid hormones are derived from cholesterol and are lipid-soluble Steroid hormones are derived from cholesterol and are lipid-soluble',
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
            'are derived from cholesterol and are lipid-soluble Steroid peptide bind extracellular receptors',
          detailText:
            'Steroid hormones are derived from cholesterol and are lipid-soluble Steroid hormones are derived from cholesterol and are lipid-soluble Steroid hormones are derived from cholesterol and are lipid-soluble Steroid hormones are derived from cholesterol and are lipid-soluble',
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
            'are derived from cholesterol and are lipid-soluble Steroid peptide bind extracellular receptors',
          detailText:
            'Steroid hormones are derived from cholesterol and are lipid-soluble Steroid hormones are derived from cholesterol and are lipid-soluble Steroid hormones are derived from cholesterol and are lipid-soluble Steroid hormones are derived from cholesterol and are lipid-soluble',
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
            'are derived from cholesterol and are lipid-soluble Steroid peptide bind extracellular receptors',
          detailText:
            'Steroid hormones are derived from cholesterol and are lipid-soluble Steroid hormones are derived from cholesterol and are lipid-soluble Steroid hormones are derived from cholesterol and are lipid-soluble Steroid hormones are derived from cholesterol and are lipid-soluble',
        },
      ],
    },
  ];
  return (
    <div className='flex-1 pt-[6.25rem] pr-[4.375rem] pl-10'>
      <div className='flex justify-between items-center mb-9'>
        <h3 className='text-[2rem] font-bold leading-[1.9138rem] text-darkPrimary'>
          Import from Anki
        </h3>
        <Button
          label='Create Deck'
          size='small'
          className='!w-[8.4375rem] !h-[2.1875rem] !text-sm !font-medium !leading-[0.8375rem] !rounded-md'
        />
      </div>
      <div className='flex flex-col gap-6 max-h-[calc(100vh-169px)] overflow-scroll'>
        {cardData.map((data, index) => (
          <div
            key={index}
            className='relative pt-6 pb-[1.8125rem] pl-6 pr-[1.375rem] border border-[#D5D5D5] rounded-xl'
          >
            <button className='absolute right-6 top-6'>
              <RemoveIcon />
            </button>
            <div className='flex gap-[3.75rem] mb-6'>
              <h3 className='text-[0.9375rem] font-bold leading-5 text-darkPrimary whitespace-nowrap mt-1'>
                {data.cardNumber}
              </h3>
              <div className='flex gap-[0.375rem] flex-wrap'>
                <Badge label='# 👨‍👩‍👧‍👧 Study Group!/Endocrine Physiology' />
                <Badge label='# 💊 Y1 Pharmacology' />
                <Badge label='# 👨‍👩‍👧‍👧 Study Group!/Endocrine Physiology' />
              </div>
            </div>
            <div className='flex gap-20'>
              <div className='basis-[43%]'>
                <h4 className='text-[0.9375rem] font-normal leading-[1.2188rem] text-[#89888D] mb-[0.3125rem] tracking-[0.02em]'>
                  {data.front}
                </h4>
                <p className='text-sm font-bold leading-6 text-darkPrimary'>
                  {data.frontText}
                </p>
              </div>
              <div className='basis-[57%]'>
                <h4 className='text-[0.9375rem] font-normal leading-[1.2188rem] text-[#89888D] mb-3 tracking-[0.02em]'>
                  {data.back}
                </h4>
                <div className='flex flex-col gap-3'>
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
                    <div>
                      <p
                        key={text.link}
                        className='text-xs font-normal leading-[0.975rem] text-darkPrimary'
                      >
                        {text.beforeText}{' '}
                        <span className='text-[#F94207]'>{text.link}</span>{' '}
                        {text.afterText}
                      </p>
                      <p className='text-xs font-normal leading-[0.975rem] text-darkPrimary line-clamp-1'>
                        {text.detailText}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
