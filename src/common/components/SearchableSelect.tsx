import { Fragment, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Combobox, Transition } from '@headlessui/react';
import { isEmpty } from 'lodash';
import { userContext } from '@/useContext';
import { ROUTES } from '@/routes';
import { ChevronUpDownIcon, InputSearchIcon } from '@/assets/svgs';

type DegreesTypeProps = {
  name: string;
  id: number;
};

type DepartmentTypeProps = {
  degrees: DegreesTypeProps;
};

type OptionTypeProps = {
  name?: string;
  id?: string;
  degrees: DepartmentTypeProps | any;
};

type ProfileDataProps = {
  profileData: OptionTypeProps[];
};

export function SearchableSelect({ profileData }: ProfileDataProps) {
  const [selectedOption, setSelectedOption] = useState(
    profileData ? profileData[0]?.degrees[0] : '',
  );
  const [selectedFilteredOption, setSelectedFilteredOption] = useState('');

  const navigate = useNavigate();

  const { setProfilePayload } = useContext(userContext);

  const handleUpdateProfilePayload = () => {
    setProfilePayload(prevData => ({
      ...prevData,
      degree: selectedOption,
    }));
  };

  useEffect(() => {
    selectedOption && handleUpdateProfilePayload();
  }, [selectedOption]);

  const filteredOptions =
    selectedFilteredOption === ''
      ? profileData
      : profileData?.filter(department => {
          return department.degrees.some((degree: DegreesTypeProps) => {
            const degreeName = degree.name.toLowerCase().replace(/\s+/g, '');
            const filteredOption = selectedFilteredOption
              .toLowerCase()
              .replace(/\s+/g, '');
            return degreeName.includes(filteredOption);
          });
        });

  useEffect(() => {
    !profileData && navigate(ROUTES.USER_TYPE);
  }, [profileData]);

  return (
    <div className='w-full'>
      <Combobox value={selectedOption} onChange={setSelectedOption}>
        <div className='relative'>
          <div className='relative w-full flex items-center gap-2.5 cursor-default border border-darkPrimary rounded-xl overflow-hidden bg-white py-[.8125rem] xl:py-[1.3125rem] lg:py-3 md:py-[1.3125rem] px-4 md:px-[1.625rem]'>
            <Combobox.Button className='absolute inset-y-0 left-0 pl-4 md:pl-[1.625rem] flex items-center'>
              <InputSearchIcon />
            </Combobox.Button>
            <Combobox.Input
              className='w-full border-none px-6 py-0 text-sm leading-[0.875rem] text-gray-900 focus:ring-0'
              //TODO: needs to configure the option type
              displayValue={(option: any) => option?.name}
              onChange={(event) =>
                setSelectedFilteredOption(event?.target?.value)
              }
            />
            <Combobox.Button className='absolute inset-y-0 right-0 pr-4 md:pr-[1.625rem] flex items-center'>
              <ChevronUpDownIcon />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            afterLeave={() => setSelectedFilteredOption('')}
          >
            <Combobox.Options className='absolute mt-4 max-h-[25rem] w-full z-50 overflow-y-auto overflow-x-hidden rounded-xl border border-darkPrimary bg-white text-base'>
              {isEmpty(filteredOptions) && !isEmpty(selectedFilteredOption) ? (
                <div className='relative cursor-default select-none py-2 px-4 text-gray-700'>
                  Nothing found.
                </div>
              ) : (
                filteredOptions?.map((department: OptionTypeProps) => (
                  <div key={department?.id}>
                    <Combobox.Option
                      disabled
                      key={department?.id}
                      className={({ active }) =>
                        `relative select-none py-2 pl-6 xl:pl-[1.875rem] lg:pl-[1.375rem] md:pl-[1.875rem] pr-4 ${
                          active
                            ? 'bg-darkPrimary bg-opacity-5 text-darkPrimary'
                            : 'text-gray-900'
                        }`
                      }
                      value={department}
                    >
                      {() => (
                        <>
                          <span
                            className={`block truncate font-medium text-sm md:text-base leading-[1.625rem]`}
                          >
                            {`${department?.id}. ${department?.name}`}
                          </span>
                        </>
                      )}
                    </Combobox.Option>
                    {!isEmpty(department?.degrees) && (
                      <div className='space-y-2'>
                        {department?.degrees?.map((degree: DegreesTypeProps) => (
                          <div key={degree?.id}>
                            <Combobox.Option
                              className={({ active }) =>
                                `relative cursor-pointer select-none py-2 pl-6 xl:pl-[1.875rem] lg:pl-[1.375rem] md:pl-[1.875rem] pr-4 ${
                                  active
                                    ? 'bg-darkPrimary bg-opacity-5 text-darkPrimary'
                                    : 'text-gray-900'
                                }`
                              }
                              value={degree}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? 'font-medium' : 'font-normal'
                                    } text-sm md:text-base leading-[1.625rem] pl-4`}
                                  >
                                    {`- ${degree?.name}`}
                                  </span>
                                </>
                              )}
                            </Combobox.Option>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
