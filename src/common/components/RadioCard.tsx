import { useContext, useEffect } from 'react';
import { RadioGroup } from '@headlessui/react';
import { userContext } from '@/useContext';
import { RadioCheckedIcon } from '@/assets/svgs';

type MapTypeProps = {
  id: string;
  icon: string | undefined;
  heading: string;
  subHeading: string;
};

// TODO: need to change the type
type ProfileTypeProps = {
  profileType: MapTypeProps[];
  selectedProfileType: any;
  setSelectedProfileType: any;
};

export function RadioCard({ selectedProfileType, setSelectedProfileType, profileType }: ProfileTypeProps) {

  const { setProfilePayload } = useContext(userContext);

  const handleUpdateProfilePayload = () => {
    setProfilePayload(prevData => ({
      ...prevData,
      type: selectedProfileType,
    }))
  };

  useEffect(() => {
    selectedProfileType && handleUpdateProfilePayload();
  }, [selectedProfileType]);

  return (
    <div className='w-full'>
      <div className='mx-auto w-full max-w-[26.5rem]'>
        <RadioGroup value={selectedProfileType} onChange={setSelectedProfileType}>
          <RadioGroup.Label className='sr-only'>User Type</RadioGroup.Label>
          <div className='space-y-[1.875rem]'>
            {profileType?.map(type => (
              <RadioGroup.Option
                key={type?.id}
                value={type}
                className={({ checked }) =>
                  `${checked ? 'bg-radioGroupBg !border-darkPrimary text-white' : 'bg-white'}
                    relative flex cursor-pointer rounded-lg px-[1.875rem] py-[2.125rem] border border-radioGroupBorder focus:outline-none`
                }
              >
                {({ checked }) => (
                  <div className='flex w-full items-center justify-between'>
                    <div className='flex items-center gap-3.5 xl:gap-6 lg:gap-[1.125rem]'>
                      <img src={type?.icon} className='w-8 h-8 rounded-full object-cover' />
                      <div className='flex flex-col gap-2 xl:gap-2 lg:lg:gap-1.5'>
                        <RadioGroup.Label
                          as='p'
                          className={`text-base xl:text-xl lg:text-sm md:text-xl font-semibold text-gray-900 leading-6 xl:leading-[1.625rem] lg:leading-[1.125rem]`}
                        >
                          {type?.heading}
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as='span'
                          className={`inline text-sm xl:text-base lg:text-[.625rem] md:text-base text-gray-500 font-normal leading-[1.125rem] xl:leading-[1.1875rem] lg:leading-3`}
                        >
                          {type?.subHeading}
                        </RadioGroup.Description>
                      </div>
                    </div>
                    <div className='shrink-0 text-white absolute top-3.5 right-3.5'>
                      {checked ? (
                        <RadioCheckedIcon />
                      ) : (
                        <div className='w-[1.6875rem] h-[1.6875rem] rounded-full border-2 border-radioGroupBorder'></div>
                      )}
                    </div>
                  </div>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
