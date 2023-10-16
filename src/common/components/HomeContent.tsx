import {
  Board,
  HomePerson,
  MobileHeader,
  StreakRecord,
  StudyTrail,
} from '@/common/components';

type HomeContentPropsType = {
  todayDueCards: string;
  todayStudiedCards: string;
  continueStudy: object[];
  userName: string;
};

export const HomeContent = ({
  todayDueCards,
  todayStudiedCards,
  continueStudy,
  userName,
}: HomeContentPropsType) => {
  return (
    <div className='flex-1'>
      <MobileHeader />
      <HomePerson userName={userName} />
      <div className='lg:flex gap-[1.1081rem] xxl:gap-6 xxl:h-[calc(100vh-8.8125rem)] px-5 md:px-[5.5rem] lg:pl-0 lg:pr-[1.875rem] xxl:pr-10 xxl:overflow-y-scroll'>
        <div className='w-fill-available lg:mr-[19.5625rem] xxl:mr-[27.625rem]'>
          <StudyTrail
            todayDueCards={todayDueCards}
            todayStudiedCards={todayStudiedCards}
            continueStudy={continueStudy}
          />
          <StreakRecord />
        </div>
        <Board />
      </div>
    </div>
  );
};
