import { useState } from 'react';
import { Tab } from '@headlessui/react';
import secondposition from '@/assets/images/secondposition.png';
import firstposition from '@/assets/images/firstposition.png';
import thirdposition from '@/assets/images/thirdposition.png';
import {
  FirstPosition,
  SecondPosition,
  ThirdPosition,
} from '../../assets/svgs/index';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function Tabs() {
  // TODO: Replace with real data
  let [categories] = useState({
    Streak: [
      {
        stats: [
          {
            position: '2nd',
            personAvatar: secondposition,
            positionUrl: SecondPosition,
            name: 'Whitney',
            stat: '594🔥',
          },
          {
            position: '1st',
            personAvatar: firstposition,
            positionUrl: FirstPosition,
            name: 'Jason',
            stat: '685🔥',
          },
          {
            position: '3rd',
            personAvatar: thirdposition,
            positionUrl: ThirdPosition,
            name: 'Calvin',
            stat: '572🔥',
          },
        ],
        ranking: [
          {
            rank: '4th',
            person: 'Zita',
            score: 499,
          },
          {
            rank: '5th',
            person: 'Jacob',
            score: 388,
          },
          {
            rank: '6th',
            person: 'Charlotte',
            score: 67,
          },
          {
            rank: '7th',
            person: 'Charlotte',
            score: 67,
          },
          {
            rank: '8th',
            person: 'Charlotte',
            score: 67,
          },
          {
            rank: '9th',
            person: 'Charlotte',
            score: 67,
          },
        ],
      },
    ],
    Today: [
      {
        stats: [
          {
            position: '2nd',
            personAvatar: thirdposition,
            positionUrl: SecondPosition,
            name: 'Whitney',
            stat: '594🔥',
          },
          {
            position: '1st',
            personAvatar: firstposition,
            positionUrl: FirstPosition,
            name: 'Jason',
            stat: '685🔥',
          },
          {
            position: '3rd',
            personAvatar: secondposition,
            positionUrl: ThirdPosition,
            name: 'Calvin',
            stat: '572🔥',
          },
        ],
        ranking: [
          {
            rank: '4th',
            person: 'Zita',
            score: 499,
          },
          {
            rank: '5th',
            person: 'Jacob',
            score: 388,
          },
          {
            rank: '6th',
            person: 'Charlotte',
            score: 221,
          },
          {
            rank: '7th',
            person: 'Charlotte',
            score: 67,
          },
          {
            rank: '8th',
            person: 'Charlotte',
            score: 67,
          },
          {
            rank: '9th',
            person: 'Charlotte',
            score: 67,
          },
        ],
      },
    ],
    Month: [
      {
        stats: [
          {
            position: '2nd',
            personAvatar: secondposition,
            positionUrl: SecondPosition,
            name: 'Whitney',
            stat: '594🔥',
          },
          {
            position: '1st',
            personAvatar: firstposition,
            positionUrl: FirstPosition,
            name: 'Jason',
            stat: '685🔥',
          },
          {
            position: '3rd',
            personAvatar: thirdposition,
            positionUrl: ThirdPosition,
            name: 'Calvin',
            stat: '572🔥',
          },
        ],
        ranking: [
          {
            rank: '4th',
            person: 'Zita',
            score: 499,
          },
          {
            rank: '5th',
            person: 'Jacob',
            score: 388,
          },
          {
            rank: '6th',
            person: 'Charlotte',
            score: 221,
          },
          {
            rank: '7th',
            person: 'Charlotte',
            score: 67,
          },
          {
            rank: '8th',
            person: 'Charlotte',
            score: 67,
          },
          {
            rank: '9th',
            person: 'Charlotte',
            score: 67,
          },
        ],
      },
    ],
  });

  return (
    <div className='w-full'>
      <Tab.Group>
        <Tab.List className='flex rounded-md border border-labelColorPrimary'>
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-md h-[1.54rem] xxl:h-[2.2869rem] text-[0.625rem] xxl:text-sm font-medium leading-[0.5981rem] xxl:leading-[0.8375rem] text-labelColorPrimary focus:outline-none',
                  selected
                    ? 'bg-darkPrimary text-white'
                    : ' hover:cursor-pointer',
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl bg-white',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
              )}
            >
              <div>
                {posts.map((post, index) => (
                  <ul key={index}>
                    <ul className='flex justify-between mt-6 mb-[1.875rem] xxl:my-[1.875rem] px-[0.625rem] xxl:px-[0]'>
                      {post.stats.map((data) => (
                        <div
                          key={data.position}
                          className='flex flex-col gap-2 xxl:gap-[0.625rem] items-center justify-end custom-leaderboard-image'
                        >
                          <li className='text-xs xxl:text-base font-bold leading-[0.7175rem] xxl:leading-[0.9569rem] text-darkPrimary'>
                            {data.position}
                          </li>
                          <li className='relative'>
                            <div className='absolute top-[0.375rem] right-[-0.625rem] z-10 p-[0.375rem] rounded-full bg-white drop-shadow-[0_0.777px_3.111px_rgba(0,0,0,0.25)]'>
                              <data.positionUrl />
                            </div>
                            <img
                              src={data.personAvatar}
                              alt='personAvatar'
                              className='w-[3.5556rem] xxl:w-20 h-[3.5556rem] xxl:h-20'
                            />
                          </li>
                          <li className='text-[0.625rem] xxl:text-sm font-normal leading-[0.5981rem] xxl:leading-[0.8375rem] text-darkPrimary'>
                            {data.name}
                          </li>
                          <li className='text-base xxl:text-2xl font-bold leading-[0.9569rem] xxl:leading-[1.4356rem] text-darkPrimary'>
                            {data.stat}
                          </li>
                        </div>
                      ))}
                    </ul>
                    <div className='flex flex-col gap-3 xxl:gap-4'>
                      {post.ranking.map((rankdata) => (
                        <ul
                          key={rankdata.rank}
                          className='flex py-[0.4375rem] xxl:py-[0.6875rem] px-4 gap-11 rounded-md bg-authBg'
                        >
                          <li className='text-[0.625rem] xxl:text-sm font-normal leading-[0.5981rem] xxl:leading-[0.8375rem] text-darkPrimary'>
                            {rankdata.rank}
                          </li>
                          <li className='text-[0.625rem] xxl:text-sm font-medium leading-[0.5981rem] xxl:leading-[0.8375rem] text-darkPrimary'>
                            {rankdata.person}
                          </li>
                          <li className='text-[0.625rem] xxl:text-sm font-bold leading-[0.5981rem] xxl:leading-[0.8375rem] text-darkPrimary ml-auto'>
                            {rankdata.score}
                          </li>
                        </ul>
                      ))}
                    </div>
                  </ul>
                ))}
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
