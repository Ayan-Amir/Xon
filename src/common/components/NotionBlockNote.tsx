import { useRef } from 'react';
import {
	defaultBlockSchema,
	defaultProps,
} from '@blocknote/core';
import {
	BlockNoteView,
	useBlockNote,
	createReactBlockSpec,
	InlineContent,
	getDefaultReactSlashMenuItems,
} from '@blocknote/react';
import { RiImage2Fill } from 'react-icons/ri';
import '@blocknote/core/style.css';

type BlockNoteProps = {
	isEditable?: boolean,
	initialContent?: object[],
}

export function NotionBlockNote({ isEditable=true, initialContent=[{}] }: BlockNoteProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  const ImageBlock = createReactBlockSpec({
    type: 'image',
    propSchema: {
      ...defaultProps,
      src: '',
    },
    containsInlineContent: true,
    render: ({ block }) => (
      block?.props?.src && (
        <div id='image-wrapper'>
          <img src={block.props.src} contentEditable={true} />
          <InlineContent />
        </div>
      )
    ),
  });

  const customSchema = {
    ...defaultBlockSchema,
    image: ImageBlock,
  };

  const insertImage = {
    name: 'Insert Image',
    execute: (editor) => {
			fileInputRef.current?.click();
			editorRef.current = editor;
    },
    aliases: ['image', 'img', 'picture', 'media'],
    group: 'Media',
    icon: <RiImage2Fill />,
    hint: 'Insert an image',
  };

  const editor = useBlockNote({
    blockSchema: customSchema,
    editable: isEditable,
    initialContent: initialContent,
    slashMenuItems: [
      ...getDefaultReactSlashMenuItems(customSchema),
      insertImage,
    ],
    onEditorContentChange: (e) => console.log(e.topLevelBlocks),
  });

	const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const uploadedFile = e.target.files?.[0];
		
		if (uploadedFile) {
			const fileUrl = URL.createObjectURL(uploadedFile);
	
			if (editorRef.current) {
				editorRef.current.insertBlocks(
					[
						{
							type: 'image',
							props: {
								src: fileUrl,
								backgroundColor: uploadedFile,
							},
						},
					],
					editorRef.current.getTextCursorPosition().block,
					'after'
				);
			}
			
			if (fileInputRef.current) {
				fileInputRef.current.value = '';
			}
		}
	};

  return (
    <div className='notion-block-note'>
      <BlockNoteView editor={editor} theme={'light'} />
      <input
        type='file'
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleUploadImage}
      />
    </div>
  );
}
