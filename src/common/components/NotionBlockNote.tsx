import { BlockNoteEditor } from '@blocknote/core';
import {
  BlockNoteView,
  useBlockNote,
} from '@blocknote/react';
import { debounce } from 'lodash';
import { apiEndPoint } from '@/services';
import { performPostRequest } from '@/services/apiClient';
import '@blocknote/core/style.css';

type BlockNoteProps = {
  isEditable?: boolean,
  initialContent?: object[],
  setCardContent?:  React.Dispatch<React.SetStateAction<string>>,
};

export function NotionBlockNote({ isEditable = true, initialContent = [{}], setCardContent }: BlockNoteProps) {

  const handleUploadImage = (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    return performPostRequest(apiEndPoint.UPLOAD_IMAGE, formData).then(resp => resp?.data?.image).catch(err => console.log(err));
  };

  const editor: BlockNoteEditor = useBlockNote({
    editable: isEditable,
    initialContent: initialContent,
    uploadFile: handleUploadImage,
    onEditorContentChange: debounce((e) => setCardContent(e.topLevelBlocks), 2000),
  });

  return (
    <div className='notion-block-note'>
      <BlockNoteView editor={editor} theme={'light'} />
    </div>
  );
}
