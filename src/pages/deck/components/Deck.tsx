import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { debounce, isEmpty } from 'lodash';
import { DeckCards } from '@/common/components';
import { apiEndPoint } from '@/services';
import { performGetRequest } from '@/services/apiClient';
import { ROUTES } from '@/routes';
import { useDeleteMutation, useGetRequest, usePatchMutation, usePostMutation } from '@/services/networkRequestService';
import { doInfiniteScroll, getNextPage, } from '@/utils';
import { ARCHIVED, FLAGGED, PAUSED, ENTER, CARDS, IS_ACTIVE, IS_PAUSED, IS_FLAGGED, TODAY, TODAY_CARD, TAGS, IS_TAGS } from '@/utils/constant';

export type CardTagProps = {
  label: string,
};

type Params = {
  deckParam: string;
  cardId: string;
};

export function Deck() {
  const navigate = useNavigate();
  const { deckParam, cardId } = useParams<Params>();

  const scrollContainerRef = useRef<HTMLDivElement>();

  const [deckCardId, setDeckCardId] = useState<number>();
  const [isFlaggedCard, setIsFlaggedCard] = useState<boolean>();
  const [tagLabel, setTagLabel] = useState<string>('');
  const [tagId, setTagId] = useState<number>();
  const [tagPopover, setTagPopover] = useState<boolean>(false);
  const [frontCardContent, setFrontCardContent] = useState<string>([{}]);
  const [backCardContent, setBackCardContent] = useState<string>([{}]);
  const [selectedCardType, setSelectedCardType] = useState('');
  const [createdTags, setCreatedTags] = useState<CardTagProps[]>([]);
  const [editDeckName, setEditDeckName] = useState(false);
  const [deleteDeckModal, setDeleteDeckModal] = useState(false);
  const [deckName, setDeckName] = useState('');

  const handleDeckEditName = () => setEditDeckName(true);

  const handleShowDeleteDeckModal = () => setDeleteDeckModal(true);

  const handleCloseDeleteDeckModal = () => setDeleteDeckModal(false);

  const handleDeckName = debounce((e: React.ChangeEvent<HTMLDivElement>) => 
    setDeckName(e?.target?.innerHTML), 2000);

  const getDeckCardListing = ({ pageParam = 1 }) =>
    performGetRequest(apiEndPoint.DECK_CARD_LISTING(deckParam, pageParam));

  const getTagCardListing = ({ pageParam = 1 }) =>
    performGetRequest(`${apiEndPoint.CARD_LIST(pageParam)}&${IS_TAGS}=${true}`);

  const getTodayCardListing = ({ pageParam = 1 }) =>
    performGetRequest(`${apiEndPoint.CARD_LIST(pageParam)}&${TODAY_CARD}=${true}`);

  const getArchiveCardListing = ({ pageParam = 1 }) =>
    performGetRequest(`${apiEndPoint.CARD_LIST(pageParam)}&${IS_ACTIVE}=${false}`);

  const getPausedCardListing = ({ pageParam = 1 }) =>
    performGetRequest(`${apiEndPoint.CARD_LIST(pageParam)}&${IS_PAUSED}=${true}`);

  const getFlaggedCardListing = ({ pageParam = 1 }) =>
    performGetRequest(`${apiEndPoint.CARD_LIST(pageParam)}&${IS_FLAGGED}=${true}`);

  const getCardListing = ({ pageParam = 1 }) =>
    performGetRequest(`${apiEndPoint.CARD_LIST(pageParam)}&${IS_ACTIVE}=${true}&${IS_PAUSED}=${false}`);

  const {
    data: deckCardListing,
    isFetching: deckCardListingLoading,
    refetch: deckCardListingRefetch,
    fetchNextPage: deckCardListingNextPage,
    hasNextPage: deckCardListingHasNextPage,
  } = useInfiniteQuery({
    enabled: false,
    refetchOnWindowFocus: false,
    retry: true,
    queryKey: ['deck-card-listing'],
    queryFn: getDeckCardListing,
    getNextPageParam: getNextPage,
    onError: (err: AxiosError) => console.log(err),
  });

  const { data: deckCard, refetch: deckCardRefetch, isFetching: deckCardLoading } = useGetRequest(
    'deck-card',
    [],
    apiEndPoint.GET_DECK_CARD(cardId),
    {
      enabled: false,
      refetchOnWindowFocus: false,
      retry: true,
    }
  );

  const { refetch: decksRefetch } = useGetRequest(
    'decks',
    [],
    apiEndPoint.DECKS,
  );

  const { mutate: handleArchiveCardState } = usePatchMutation(
    'archive-card',
    apiEndPoint.UPDATE_REVIEW_DECK_CARD(deckCardId),
    { isActive: deckParam === ARCHIVED ? true : false },
    () => {
      deckParam === ARCHIVED ? handleRefetchArchiveCardsList() : deckParam === CARDS ? handleRefetchCardsList() : deckCardListingRefetch(),
      SidebarCountRefetch();
    },
    (err) => console.log(err),
  );

  const { mutate: handlePausedCardState } = usePatchMutation(
    'pause-card',
    apiEndPoint.UPDATE_REVIEW_DECK_CARD(deckCardId),
    { isPaused: deckParam === PAUSED ? false : true },
    () => {
      deckParam === PAUSED ? handleRefetchPausedCardsList() : deckParam === CARDS ? handleRefetchCardsList() : deckCardListingRefetch(),
      SidebarCountRefetch();
    },
    (err) => console.log(err),
  );

  const { mutate: handleFlaggedCardState } = usePatchMutation(
    'flag-card',
    apiEndPoint.UPDATE_REVIEW_DECK_CARD(deckCardId),
    { isFlagged: deckParam === FLAGGED ? false : isFlaggedCard },
    () => {
      deckParam === FLAGGED ? handleRefetchFlaggedCardsList() : deckParam === CARDS ? handleRefetchCardsList() : deckCardListingRefetch(),
      SidebarCountRefetch();
    },
    (err) => console.log(err),
  );

  const { mutate: handleAddTag } = usePatchMutation(
    'card-tag',
    apiEndPoint.UPDATE_CARD_TAG(cardId),
    { label: tagLabel },
    () => {
      deckCardRefetch();
      setTagLabel('');
      setTagPopover(false);
    },
    (err) => console.log(err),
  );

  const { mutate: handleDeleteTag } = usePatchMutation(
    'delete-tag',
    apiEndPoint.REMOVE_CARD_TAG(cardId),
    { tagId },
    () => deckCardRefetch(),
    (err) => console.log(err),
  );

  const { mutate: handleDeckFrontCardUpdate, isLoading: deckFrontCardUpdateLoading } = usePatchMutation(
    'update-card',
    apiEndPoint.GET_DECK_CARD(cardId),
    {
      frontContent: JSON.stringify(frontCardContent),
    },
    () => {
      deckParam === ARCHIVED && handleRefetchArchiveCardsList();
      deckParam === PAUSED && handleRefetchPausedCardsList();
      deckParam === FLAGGED && handleRefetchFlaggedCardsList();
      deckParam === CARDS && handleRefetchCardsList();
      deckParam === TODAY && handleRefetchTodayCardsList();
      deckParam === TAGS && handleRefetchTagCardsList();
      !isNaN(deckParam) && deckCardListingRefetch();
    },
    (err) => console.log(err),
  );

  const { mutate: handleDeckBackCardUpdate, isLoading: deckBackCardUpdateLoading } = usePatchMutation(
    'update-card',
    apiEndPoint.GET_DECK_CARD(cardId),
    {
      backContent: JSON.stringify(backCardContent),
    },
    () => {
      deckParam === ARCHIVED && handleRefetchArchiveCardsList();
      deckParam === PAUSED && handleRefetchPausedCardsList();
      deckParam === FLAGGED && handleRefetchFlaggedCardsList();
      deckParam === CARDS && handleRefetchCardsList();
      deckParam === TODAY && handleRefetchTodayCardsList();
      deckParam === TAGS && handleRefetchTagCardsList();
      !isNaN(deckParam) && deckCardListingRefetch();
    },
    (err) => console.log(err),
  );

  const { mutate: handleDeckCardCreate } = usePostMutation(
    'create-card',
    apiEndPoint.DECK_CARD(deckParam),
    {
      type: selectedCardType,
      deck: deckParam,
      backContent: '',
      frontContent: '',
      tags: [],
    },
    (resp) => { 
      deckCardListingRefetch();
      setSelectedCardType('');
      navigate(`/decks/${deckParam}/cards/${resp?.data?.id}`)
    },
    (err) => console.log(err),
  );

  const { mutate: handleEditDeck } = usePatchMutation(
    'edit-deck',
    apiEndPoint.UPDATE_DECK(deckParam),
    {name: deckName.replace(/&nbsp;/g, " ")},
    () => {
      deckCardListingRefetch();
      decksRefetch();
      setEditDeckName(false);
    },
    (err) => console.log(err),
  );

  const { mutate: handleDeleteDeck } = useDeleteMutation(
    'delete-deck',
    apiEndPoint.UPDATE_DECK(deckParam),
    () => {
      decksRefetch();
      deckCardListingRefetch();
      setDeleteDeckModal(false);
      navigate(ROUTES.DECKS);
    },
    (err) => console.log(err),
  );

  const removeCardContent = () => {
    setSelectedCardType('');
    setBackCardContent('');
    setFrontCardContent('');
    setTagLabel('');
    setCreatedTags([]);
  };

  const handleArchiveBtn = (e: React.MouseEvent<HTMLButtonElement>, cardId: number) => {
    e.stopPropagation();
    setDeckCardId(cardId);
    handleArchiveCardState();
  };

  const handlePausedBtn = (e: React.MouseEvent<HTMLButtonElement>, cardId: number) => {
    e.stopPropagation();
    setDeckCardId(cardId);
    handlePausedCardState();
  };

  const handleFlaggedBtn = (e: React.MouseEvent<HTMLButtonElement>, cardId: number, isFlagged: boolean) => {
    e.stopPropagation();
    setDeckCardId(cardId);
    setIsFlaggedCard(!isFlagged);
    handleFlaggedCardState();
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) =>
    doInfiniteScroll(
      e,
      deckCardListingHasNextPage,
      deckCardListingLoading,
      deckCardListingNextPage,
    );

  const handleTagCardsScroll = (e: React.UIEvent<HTMLDivElement>) =>
    doInfiniteScroll(
      e,
      tagCardsListingHasNextPage,
      tagCardsListingLoading,
      tagCardsListingNextPage,
    );

  const handleTodayCardsScroll = (e: React.UIEvent<HTMLDivElement>) =>
    doInfiniteScroll(
      e,
      todayCardsListingHasNextPage,
      todayCardsListingLoading,
      todayCardsListingNextPage,
    );

  const handleArchiveCardsScroll = (e: React.UIEvent<HTMLDivElement>) =>
    doInfiniteScroll(
      e,
      archiveCardsListingHasNextPage,
      archiveCardsListingLoading,
      archiveCardsListingNextPage,
    );

  const handlePausedCardsScroll = (e: React.UIEvent<HTMLDivElement>) =>
    doInfiniteScroll(
      e,
      pausedCardsListingHasNextPage,
      pausedCardsListingLoading,
      pausedCardsListingNextPage,
    );

  const handleFlaggedCardsScroll = (e: React.UIEvent<HTMLDivElement>) =>
    doInfiniteScroll(
      e,
      flaggedCardsListingHasNextPage,
      flaggedCardsListingLoading,
      flaggedCardsListingNextPage,
    );

  const handleCardsScroll = (e: React.UIEvent<HTMLDivElement>) =>
    doInfiniteScroll(
      e,
      cardsListingHasNextPage,
      cardsListingLoading,
      cardsListingNextPage,
    );

  const {
    data: cardsListing,
    isFetching: cardsListingLoading,
    refetch: handleRefetchCardsList,
    fetchNextPage: cardsListingNextPage,
    hasNextPage: cardsListingHasNextPage,
  } = useInfiniteQuery({
    enabled: false,
    refetchOnWindowFocus: false,
    retry: true,
    queryKey: ['cards-list'],
    queryFn: getCardListing,
    getNextPageParam: getNextPage,
    onError: (err: AxiosError) => console.log(err),
  });
  

  const {
    data: tagCardsListing,
    isFetching: tagCardsListingLoading,
    refetch: handleRefetchTagCardsList,
    fetchNextPage: tagCardsListingNextPage,
    hasNextPage: tagCardsListingHasNextPage,
  } = useInfiniteQuery({
    enabled: false,
    refetchOnWindowFocus: false,
    retry: true,
    queryKey: ['tag-cards-list'],
    queryFn: getTagCardListing,
    getNextPageParam: getNextPage,
    onError: (err: AxiosError) => console.log(err),
  });

  const {
    data: todayCardsListing,
    isFetching: todayCardsListingLoading,
    refetch: handleRefetchTodayCardsList,
    fetchNextPage: todayCardsListingNextPage,
    hasNextPage: todayCardsListingHasNextPage,
  } = useInfiniteQuery({
    enabled: false,
    refetchOnWindowFocus: false,
    retry: true,
    queryKey: ['today-cards-list'],
    queryFn: getTodayCardListing,
    getNextPageParam: getNextPage,
    onError: (err: AxiosError) => console.log(err),
  });

  const {
    data: archiveCardsListing,
    isFetching: archiveCardsListingLoading,
    refetch: handleRefetchArchiveCardsList,
    fetchNextPage: archiveCardsListingNextPage,
    hasNextPage: archiveCardsListingHasNextPage,
  } = useInfiniteQuery({
    enabled: false,
    refetchOnWindowFocus: false,
    retry: true,
    queryKey: ['archive-cards-list'],
    queryFn: getArchiveCardListing,
    getNextPageParam: getNextPage,
    onError: (err: AxiosError) => console.log(err),
  });

  const {
    data: pausedCardsListing,
    isFetching: pausedCardsListingLoading,
    refetch: handleRefetchPausedCardsList,
    fetchNextPage: pausedCardsListingNextPage,
    hasNextPage: pausedCardsListingHasNextPage,
  } = useInfiniteQuery({
    enabled: false,
    refetchOnWindowFocus: false,
    retry: true,
    queryKey: ['paused-cards-list'],
    queryFn: getPausedCardListing,
    getNextPageParam: getNextPage,
    onError: (err: AxiosError) => console.log(err),
  });

  const {
    data: flaggedCardsListing,
    isFetching: flaggedCardsListingLoading,
    refetch: handleRefetchFlaggedCardsList,
    fetchNextPage: flaggedCardsListingNextPage,
    hasNextPage: flaggedCardsListingHasNextPage,
  } = useInfiniteQuery({
    enabled: false,
    refetchOnWindowFocus: false,
    retry: true,
    queryKey: ['flagged-cards-list'],
    queryFn: getFlaggedCardListing,
    getNextPageParam: getNextPage,
    onError: (err: AxiosError) => console.log(err),
  });

  const handleCardStateData = (deckParam: string | undefined) => {
    let cardStateList: InfiniteData<AxiosResponse<any, any>> | undefined | never[] = [];
    switch (deckParam) {
      case ARCHIVED:
        cardStateList = archiveCardsListing;
        break;
      case PAUSED:
        cardStateList = pausedCardsListing;
        break;
      case FLAGGED:
        cardStateList = flaggedCardsListing;
        break;
      case CARDS:
        cardStateList = cardsListing;
        break;
      case TODAY:
        cardStateList = todayCardsListing;
        break;
      case TAGS:
        cardStateList = tagCardsListing;
        break;
      default:
        cardStateList = deckCardListing;
        break;
    }
    return cardStateList;
  };

  const handleCardStateScroll = (e: any, deckParam: string | undefined) => {
    let cardStateScroll;
    switch (deckParam) {
      case ARCHIVED:
        cardStateScroll = handleArchiveCardsScroll(e);
        break;
      case PAUSED:
        cardStateScroll = handlePausedCardsScroll(e);
        break;
      case FLAGGED:
        cardStateScroll = handleFlaggedCardsScroll(e);
        break;
      case CARDS:
        cardStateScroll = handleCardsScroll(e);
        break;
      case TODAY:
        cardStateScroll = handleTodayCardsScroll(e);
        break;
      case TAGS:
        cardStateScroll = handleTagCardsScroll(e);
        break;
      default:
        cardStateScroll = handleScroll(e);
        break;
    }
    return cardStateScroll;
  };

  const handleTagAddition = (e: React.ChangeEvent<HTMLInputElement>) => setTagLabel(e?.target?.value);

  const handleTagAdditionKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => e.key === ENTER && handleAddTag();

  const handleCreateTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ENTER) {
      setCreatedTags([...createdTags, { label: tagLabel }]);
      setTagLabel('');
    };
  };

  const handleRemoveTag = (removeTagId: number) => setTagId(removeTagId);

  const handleRemoveCreateTag = (removeTagId?: number) => {
    let selectedTag = createdTags[removeTagId];
    setCreatedTags(createdTags?.filter(v => v?.label !== selectedTag?.label));
  };

  const handleCreateCardType = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedCardType(e?.target?.value);
    setFrontCardContent('');
    setBackCardContent('');
  };

  const handleDeleteDeckButton = () => {
    handleDeleteDeck();
    handleCloseDeleteDeckModal();
  };

  const { refetch: SidebarCountRefetch } = useGetRequest(
    'sidebar',
    [],
    apiEndPoint.SIDEBAR,
  );

  useEffect(() => {
    deckParam === ARCHIVED && handleRefetchArchiveCardsList();
    deckParam === PAUSED && handleRefetchPausedCardsList();
    deckParam === FLAGGED && handleRefetchFlaggedCardsList();
    deckParam === CARDS && handleRefetchCardsList();
    deckParam === TODAY && handleRefetchTodayCardsList();
    deckParam === TAGS && handleRefetchTagCardsList();
  }, [deckParam]);

  useEffect(() => {
    !!cardId && deckCardRefetch();
  }, [cardId]);

  useEffect(() => {
    tagId && handleDeleteTag();
  }, [tagId]);

  useEffect(() => {
    !isEmpty(frontCardContent[0]) && handleDeckFrontCardUpdate();
  }, [frontCardContent]);

  useEffect(() => {
    !isEmpty(backCardContent[0]) && handleDeckBackCardUpdate();
  }, [backCardContent]);

  useEffect(() => {
    !isNaN(deckParam) && deckCardListingRefetch();
  }, [deckParam]);

  useEffect(() => {
    selectedCardType && handleDeckCardCreate();
  }, [selectedCardType]);

  useEffect(() => {
    !!deckName && handleEditDeck();
  }, [deckName])

  return (
    <div className='mt-[2.0625rem] mb-14 w-full'>
      <DeckCards
        cardState={deckParam}
        deckCards={handleCardStateData(deckParam)}
        scrollRef={scrollContainerRef}
        handleScroll={(e) => handleCardStateScroll(e, deckParam)}
        handleArchiveBtn={handleArchiveBtn}
        handlePausedBtn={handlePausedBtn}
        handleFlaggedBtn={handleFlaggedBtn}
        handleDeleteDeck={handleDeleteDeck}
        selectedDeckCard={deckCard?.data}
        handleTagAddition={handleTagAddition}
        tagLabel={tagLabel}
        handleTagAdditionKeyDown={handleTagAdditionKeyDown}
        handleRemoveTag={handleRemoveTag}
        popover={tagPopover}
        setPopover={setTagPopover}
        setBackCardContent={setBackCardContent}
        setFrontCardContent={setFrontCardContent}
        selectedCardType={selectedCardType}
        handleCreateCardType={handleCreateCardType}
        frontCardContent={frontCardContent}
        createdTags={createdTags}
        handleCreateTagKeyDown={handleCreateTagKeyDown}
        handleRemoveCreateTag={handleRemoveCreateTag}
        deckCardLoading={deckCardLoading}
        editDeckName={editDeckName}
        deleteDeckModal={deleteDeckModal}
        handleDeckEditName={handleDeckEditName}
        handleShowDeleteDeckModal={handleShowDeleteDeckModal}
        handleCloseDeleteDeckModal={handleCloseDeleteDeckModal}
        deckCardUpdateLoading={deckFrontCardUpdateLoading || deckBackCardUpdateLoading}
        handleDeleteDeckButton={handleDeleteDeckButton}
        handleDeckName={handleDeckName}
        deckCardListingLoading={deckCardListingLoading}
      />
    </div>
  );
}
