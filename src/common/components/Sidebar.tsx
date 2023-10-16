import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  useGetRequest,
  usePatchMutation,
  usePostMutation,
} from '@/services/networkRequestService';
import { PrivateContent, SharedContent } from '@/common/components';
import { apiEndPoint } from '@/services';
import { convertDataIntoSidebarData, getSideBarLabelAndCount } from '@/utils';
import { BOTTOM_SIDEBAR_LINKS, UPPER_SIDEBAR_LINKS } from '@/utils/constant';
import XonLogo from '@/assets/images/xon-logo.png';

type OnDeckMovePropsType = {
  nextParentNode: { id: string };
  node: { id: string };
};

type UpdateDeckHierarchyPropsType = {
  deckParam: string | null;
  parentId: string | null;
};

export const Sidebar = () => {
  const [privateDecks, setPrivateDecks] = useState<any>([]);
  const [updateDeckHierarchyData, setUpdateDeckHierarchyData] =
    useState<UpdateDeckHierarchyPropsType>({ deckParam: null, parentId: null });
  
  const navigate = useNavigate();

  const { data: decks, refetch: decksRefetch } = useGetRequest(
    'decks',
    [],
    apiEndPoint.DECKS,
    {
      refetchOnWindowFocus: false,
      retry: true,
      onSuccess: (resp) =>
        setPrivateDecks(convertDataIntoSidebarData(resp?.data)),
    },
  );

  const { data: SidebarCount } = useGetRequest(
    'sidebar',
    [],
    apiEndPoint.SIDEBAR,
  );

  const handleDropDeck = (id: string) => {
    setUpdateDeckHierarchyData((prevData) => ({
      ...prevData,
      parentId: id ? id : null,
    }));
  };

  const handleDragDeck = (id: string) => {
    setUpdateDeckHierarchyData((prevData) => ({
      ...prevData,
      deckParam: id,
    }));
  };

  const getUpdateDeckHierarchyPayload = () => {
    const payload = {
      parent: updateDeckHierarchyData.parentId,
    };
    return payload;
  };

  const { mutate: handleUpdateDeckHierarchy } = usePatchMutation(
    'update-decks-hierarchy',
    apiEndPoint.UPDATE_DECKS_HIERARCHY(updateDeckHierarchyData.deckParam),
    getUpdateDeckHierarchyPayload(),
    (resp) => {
      setPrivateDecks(convertDataIntoSidebarData(resp?.data));
    },
    () => {
      decksRefetch();
      setPrivateDecks(convertDataIntoSidebarData(decks?.data));
    },
  );

  const { mutate: handleDeckCreation } = usePostMutation(
    'create-decks',
    apiEndPoint.DECKS,
    {name: 'New Deck'},
    (resp) => {
      decksRefetch();
      navigate(`/decks/${resp?.data?.id}`)
    },
    (err) => console.log(err)
    ,
  );

  const handleOnDeckMove = (event: OnDeckMovePropsType) => {
    handleDropDeck(event?.nextParentNode?.id);
    handleDragDeck(event?.node?.id);
    handleUpdateDeckHierarchy();
  };

  return (
    <div className='flex-grow-0 flex-shrink-0 flex-basis-[20.5rem] w-[20.5rem] border-r border-sideBarBorderColor h-screen overflow-hidden'>
      <div className='pt-6'>
        <div className='w-[2.625rem] h-[2.625rem] rounded-full ml-8'>
          <img src={XonLogo} alt='logo' className='w-[2.625rem] h-[2.625rem]' />
        </div>
        <ul className='px-4 pt-[1.75rem] pb-6 flex flex-col border-b border-sideBarBorderColor'>
          {getSideBarLabelAndCount(UPPER_SIDEBAR_LINKS, SidebarCount).map((sidebarItem) => (
            <NavLink
              key={sidebarItem.id}
              to={sidebarItem.link}
              className={({ isActive }) =>
                `flex gap-3 py-1.5 px-6 items-center justify-between text-[0.8125rem] font-medium leading-4 text-darkPrimary rounded-lg hover:bg-reviewCardBg hover:cursor-pointer ${
                  isActive ? 'activeLink' : ''
                }`
              }
            >
              <span className='flex gap-3 items-center'>
                {sidebarItem.icon}
                {sidebarItem.label}
              </span>
              {sidebarItem.totalCards !== '' && <span className='flex items-center justify-center text-sm font-bold leading-[0.8375rem] text-darkPrimary py-[0.25rem] px-[0.375rem] rounded-full bg-badgeBlueBg'>
                {sidebarItem.totalCards}
              </span>}
            </NavLink>
          ))}
        </ul>
      </div>
      <div className='flex flex-col gap-[1.125rem] px-4 pt-5 pb-4 border-b border-sideBarBorderColor h-[calc(100%-36.0625rem)] overflow-auto custom-scroll'>
        {/* TODO: Shared Content for v2 */}
        {/* <SharedContent /> */}
        <PrivateContent
          privateDecks={privateDecks}
          setPrivateDecks={setPrivateDecks}
          handleOnDeckMove={handleOnDeckMove}
          handleDeckCreation={handleDeckCreation}
        />
      </div>
      <ul className='px-4 mt-[1.875rem] flex flex-col pb-20 absolute bottom-0 w-inherit'>
        {BOTTOM_SIDEBAR_LINKS.map(({ id, icon, label }) => (
          <li
            key={id}
            className='flex gap-3 py-1.5 px-6 items-center text-[0.8125rem] font-medium leading-[0.8375rem] text-darkPrimary rounded-lg hover:bg-reviewCardBg hover:cursor-pointer'
          >
            {icon}
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
};
