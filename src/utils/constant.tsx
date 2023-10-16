import React from 'react';
import { HomeIcon, CardsIcon, StarIcon, FlaggedIcon, LeaderBoard, Tags, PausedIcon, ArchivedIcon, Membership, Library, ImportAnki } from '@/assets/svgs';
export const ENVIRONMENT = {
  STAGE: 'stage',
  PRODUCTION: 'prod',
};

export const PAGE = 'page';
export const FIRST_PAGE = 1;
export const PARTIAL_ACTIVE = 'PARTIAL_ACTIVE';

export const TEXT = 'text';
export const PASSWORD = 'password';

export const SPACEBAR = 'Space';

export const ACCESS_TOKEN = 'accessToken';

export const ARCHIVED = 'archived';
export const PAUSED = 'paused';
export const FLAGGED = 'flagged';
export const CARDS = 'cards';
export const TODAY = 'today';
export const TAGS = 'tags';

export const IS_ACTIVE = 'is_active';
export const IS_PAUSED = 'is_paused';
export const IS_FLAGGED = 'is_flagged';
export const TODAY_CARD = 'today_card';
export const IS_TAGS = 'is_tags';
export const DECK = 'deck';

export const CARD_MEMO_STATE = {
  AGAIN: 0,
  HARD: 1,
  GOOD: 2,
  EASY: 3,
};

export const ENTER = 'Enter';

export const CARD_DROPDOWN = [
  { label: 'Basic Card', value: 'BASIC' },
  { label: 'Fill-in-the-blank', value: 'FILL_IN_THE_BLANKS' },
  { label: 'Typing', value: 'TYPING' },
];

export const AVATAR_OPTIONS = [
  {
    id: 1,
    sex: "man",
    faceColor: "#F9C9B6",
    earSize: "big",
    eyeStyle: "smile",
    noseStyle: "short",
    mouthStyle: "laugh",
    shirtStyle: "polo",
    glassesStyle: "none",
    hairColor: "#F48150",
    hairStyle: "thick",
    hatStyle: "none",
    hatColor: "#FC909F",
    eyeBrowStyle: "up",
    shirtColor: "#FC909F",
    bgColor: "#FFEDEF",
    shape: 'circle'
  },
  {
    id: 2,
    shape: 'circle',
    sex: "woman",
    faceColor: "#F9C9B6",
    earSize: "big",
    eyeStyle: "smile",
    noseStyle: "long",
    mouthStyle: "smile",
    shirtStyle: "polo",
    glassesStyle: "round",
    hairColor: "#fff",
    hairStyle: "womanShort",
    hatStyle: "none",
    hatColor: "#fff",
    eyeBrowStyle: "upWoman",
    shirtColor: "#6BD9E9",
    bgColor: "#F4D150"
  },
];

export type SideBarCountProps = {
  flaggedCards: number,
  todayCards: number,
  totalCards: number,
};

export type NavItem = {
  id: number;
  icon: React.ComponentProps<any>;
  label: string;
  link: string,
  totalCards: string,
};

export const UPPER_SIDEBAR_LINKS: NavItem[] = [
  {
    id: 0,
    icon: <HomeIcon />,
    label: 'Home',
    link: '/home',
    totalCards: '',
  },
  {
    id: 1,
    icon: <CardsIcon />,
    label: 'Cards',
    link: '/decks/cards',
    totalCards: '',
  },
  {
    id: 2,
    icon: <StarIcon />,
    label: 'Today',
    link: '/decks/today',
    totalCards: '',
  },
  {
    id: 3,
    icon: <FlaggedIcon />,
    label: 'Flagged',
    link: '/decks/flagged',
    totalCards: '',
  },
  {
    id: 4,
    icon: <LeaderBoard />,
    label: 'LeaderBoard',
    link: '/leaderboard',
    totalCards: '',
  },
  {
    id: 5,
    icon: <Tags />,
    label: 'Tags',
    link: '/decks/tags',
    totalCards: '',
  },
  {
    id: 6,
    icon: <PausedIcon />,
    label: 'Paused',
    link: '/decks/paused',
    totalCards: '',
  },
  {
    id: 7,
    icon: <ArchivedIcon />,
    label: 'Archived',
    link: '/decks/archived',
    totalCards: '',
  },
];

export const BOTTOM_SIDEBAR_LINKS = [
  {
    id: 0,
    icon: <Membership />,
    label: 'Membership',
  },
  {
    id: 1,
    icon: <Library />,
    label: 'Library',
  },
  {
    id: 2,
    icon: <ImportAnki />,
    label: 'Import from PDF/Anki',
  },
];

export const maxNestingDepth = 4;

export const PARAGRAPH = 'paragraph';
export const IMAGE = 'image';

export const SIDEBAR_UPPER_LINKS = {
  CARDS: 'Cards',
  TODAY: 'Today',
  FLAGGED: 'Flagged',
};
