import { NavLink } from 'react-router-dom';
import SortableTree from '@nosferatu500/react-sortable-tree';
import FileExplorerTheme from '@nosferatu500/theme-file-explorer';
import { PlusIcon } from '@/assets/svgs';
import { maxNestingDepth } from '@/utils/constant';
import '@nosferatu500/react-sortable-tree/style.css';

type PrivateContentPropsTypes = {
  privateDecks: string,
  setPrivateDecks: React.Dispatch<React.SetStateAction<string>>,
  handleOnDeckMove: any, 
  handleDeckCreation: () => void,
};

type NodePropsType = {
  id: string;
  newCards: number;
  reviewCards: number;
  title: string;
};

type DecksPropsType = {
  id?: string;
  newCards?: number;
  reviewCards?: number;
  title?: string;
  expanded?: boolean;
  children?: never[];
  name?: string;
  node: NodePropsType;
};

export function PrivateContent({ 
  privateDecks,
  setPrivateDecks,
  handleOnDeckMove,
  handleDeckCreation,
}: PrivateContentPropsTypes) {
  const generateDeckProps = ({ node }: DecksPropsType) => {
    return {
      title: (
        <NavLink
          to={`/decks/${node?.id}`}
          className={({isActive}) => `menulink flex flex-1 justify-between gap-2 text-[0.8125rem] font-normal leading-[1.25rem] text-darkPrimary px-2 py-1.5 rounded-lg hover:bg-authBg ${isActive ? 'bg-authBg' : ''})`}
        >
          <div className='flex gap-2'>
            <p>
              {node.title}
            </p>
          </div>
          <div className='flex gap-1'>
            <div className='flex items-center justify-center text-sm font-bold leading-[0.8375rem] text-darkPrimary min-w-[1.3125rem] h-5 px-1.5 py-0.5 rounded-full bg-badgeBlueBg'>{node.newCards}</div>
            <div className='flex items-center justify-center text-sm font-bold leading-[0.8375rem] text-darkPrimary min-w-[1.3125rem] h-5 px-1.5 py-0.5 rounded-full bg-statRedBg'>{node.reviewCards}</div>
          </div>
        </NavLink>
      ),
    };
  };

  return (
    <>
      <div className='flex justify-between items-center mb-[0.8125rem]'>
        <h4 className='text-[0.8125rem] font-medium leading-[0.8375rem]'>
          Private
        </h4>
        <span onClick={handleDeckCreation} className='cursor-pointer'>
          <PlusIcon />
        </span>
      </div>
      <div className='min-h-full max-h-max w-full'>
        <SortableTree
          treeData={privateDecks}
          onChange={newPrivateDecks => setPrivateDecks(newPrivateDecks)}
          onMoveNode={handleOnDeckMove}
          theme={FileExplorerTheme}
          generateNodeProps={generateDeckProps}
          maxDepth={maxNestingDepth}
          className='sortable-tree'
        />
      </div>
    </>
  );
}
