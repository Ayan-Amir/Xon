// TODO: this file will be deleted in future as we have real data for deck
import {
  DaysLogo,
  BasicCard,
  DownloadButtonIcon,
  PauseButtonIcon,
} from '../assets/svgs/index';
import dueCardImage from '@/assets/images/dueCardImage.png';
import studiedCardImage from '@/assets/images/studiedCardImage.png';
export const studyCardContent = [
  {
    heading: 'What is the effect of somatostatin on...',
    text: 'Steroid hormones are derived from cholesterol and are lipid-soluble, allowing them to pass through the cell membrane and bind to intracellular receptors.',
    daysUrl: DaysLogo,
    daysText: 'New Card',
    BasicCardUrl: BasicCard,
    DownloadButtonIconUrl: DownloadButtonIcon,
    PauseButtonIconUrl: PauseButtonIcon,
  },
  {
    heading: 'What is the effect of somatostatin on...',
    text: 'Steroid hormones are derived from cholesterol and are lipid-soluble, allowing them to pass through the cell membrane and bind to intracellular receptors.',
    daysUrl: DaysLogo,
    daysText: '3 days',
    BasicCardUrl: BasicCard,
    DownloadButtonIconUrl: DownloadButtonIcon,
    PauseButtonIconUrl: PauseButtonIcon,
  },
  {
    heading: 'What effect do anti-muscarinics have on...',
    text: 'Steroid hormones are derived from cholesterol and are lipid-soluble, allowing them to pass through the cell membrane and bind to intracellular receptors.',
    daysUrl: DaysLogo,
    daysText: '5 days',
    BasicCardUrl: BasicCard,
    DownloadButtonIconUrl: DownloadButtonIcon,
    PauseButtonIconUrl: PauseButtonIcon,
  },
  {
    heading: 'The therapeutic index is calculated by...',
    text: 'Steroid hormones are derived from cholesterol and are lipid-soluble, allowing them to pass through the cell membrane and bind to intracellular receptors.',
    daysUrl: DaysLogo,
    daysText: 'New Card',
    BasicCardUrl: BasicCard,
    DownloadButtonIconUrl: DownloadButtonIcon,
    PauseButtonIconUrl: PauseButtonIcon,
  },
  {
    heading: 'What effect do anti-muscarinics have on...',
    text: 'Steroid hormones are derived from cholesterol and are lipid-soluble, allowing them to pass through the cell membrane and bind to intracellular receptors.',
    daysUrl: DaysLogo,
    daysText: '5 days',
    BasicCardUrl: BasicCard,
    DownloadButtonIconUrl: DownloadButtonIcon,
    PauseButtonIconUrl: PauseButtonIcon,
  },
  {
    heading: 'The therapeutic index is calculated by...',
    text: 'Steroid hormones are derived from cholesterol and are lipid-soluble, allowing them to pass through the cell membrane and bind to intracellular receptors.',
    daysUrl: DaysLogo,
    daysText: 'New Card',
    BasicCardUrl: BasicCard,
    DownloadButtonIconUrl: DownloadButtonIcon,
    PauseButtonIconUrl: PauseButtonIcon,
  },
];
export const cardsToday = [
  {
    status: 'Due',
    heading: '54',
    text: 'cards today',
    imgUrl: dueCardImage,
  },
  {
    status: 'Studied',
    heading: '136',
    text: 'cards today',
    imgUrl: studiedCardImage,
  },
];
export const ContinueStudyContent = [
  {
    title: '💊 Y1 Pharmacology',
    details: [
      {
        cardStat: '136',
        cardStatus: 'Cards',
      },
      {
        cardStat: '100',
        cardStatus: 'New',
      },
      {
        cardStat: '36',
        cardStatus: 'Review',
      },
    ],
  },
  {
    title: '💊 Y1 Pharmacology',
    details: [
      {
        cardStat: '136',
        cardStatus: 'Cards',
      },
      {
        cardStat: '100',
        cardStatus: 'New',
      },
      {
        cardStat: '36',
        cardStatus: 'Review',
      },
    ],
  },
];
export const StreakRecordData = [
  {
    title: 'Daily average:',
    text: '56 cards',
  },
  {
    title: 'Longest Streak:',
    text: '999 days',
  },
  {
    title: 'Current Streak:',
    text: '685 days',
  },
];
