import { useGetRequest } from '@/services/networkRequestService';
import { HomeContent } from '@/common/components';
import { apiEndPoint } from '@/services/apiEndPoint';

export function Home() {
  const { data: dashboardData } = useGetRequest(
    'dashboard',
    [],
    apiEndPoint.DASHBOARD,
  );

  const { data: userData } = useGetRequest(
    'user',
    [],
    apiEndPoint.ME,
  );

  return (
    <div className='pb-[2.8125rem] w-fill-available'>
      <HomeContent
        todayDueCards={dashboardData?.data?.todayDueCards}
        todayStudiedCards={dashboardData?.data?.todayStudiedCards}
        continueStudy={dashboardData?.data?.continueStudy}
        userName={userData?.data?.firstName}
      />
    </div>
  );
}
