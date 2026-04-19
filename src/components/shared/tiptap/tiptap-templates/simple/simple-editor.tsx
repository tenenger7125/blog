'use client';

import { useEffect, useRef, useState } from 'react';

import { Highlight } from '@tiptap/extension-highlight';
import { Image as BaseImage } from '@tiptap/extension-image';
import { TaskItem, TaskList } from '@tiptap/extension-list';
import { Subscript } from '@tiptap/extension-subscript';
import { Superscript } from '@tiptap/extension-superscript';
import { TextAlign } from '@tiptap/extension-text-align';
import { Typography } from '@tiptap/extension-typography';
import { Selection } from '@tiptap/extensions';
import { EditorContent, EditorContext, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { common, createLowlight } from 'lowlight';
import { Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

import ActionIconButton from '@/components/shared/action-icon-button';
import { ArrowLeftIcon } from '@/components/shared/tiptap/tiptap-icons/arrow-left-icon';
import { HighlighterIcon } from '@/components/shared/tiptap/tiptap-icons/highlighter-icon';
import { LinkIcon } from '@/components/shared/tiptap/tiptap-icons/link-icon';
import { HorizontalRule } from '@/components/shared/tiptap/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension';
import { ImageUploadNode } from '@/components/shared/tiptap/tiptap-node/image-upload-node/image-upload-node-extension';
// import content from '@/components/shared/tiptap/tiptap-templates/simple/data/content.json';
import { BlockquoteButton } from '@/components/shared/tiptap/tiptap-ui/blockquote-button';
import { CodeBlockButton } from '@/components/shared/tiptap/tiptap-ui/code-block-button';
import {
  ColorHighlightPopover,
  ColorHighlightPopoverContent,
  ColorHighlightPopoverButton,
} from '@/components/shared/tiptap/tiptap-ui/color-highlight-popover';
import { HeadingDropdownMenu } from '@/components/shared/tiptap/tiptap-ui/heading-dropdown-menu';
import { ImageUploadButton } from '@/components/shared/tiptap/tiptap-ui/image-upload-button';
import { LinkPopover, LinkContent, LinkButton } from '@/components/shared/tiptap/tiptap-ui/link-popover';
import { ListDropdownMenu } from '@/components/shared/tiptap/tiptap-ui/list-dropdown-menu';
import { MarkButton } from '@/components/shared/tiptap/tiptap-ui/mark-button';
import { TextAlignButton } from '@/components/shared/tiptap/tiptap-ui/text-align-button';
import { UndoRedoButton } from '@/components/shared/tiptap/tiptap-ui/undo-redo-button';
import { Button } from '@/components/shared/tiptap/tiptap-ui-primitive/button';
import { Spacer } from '@/components/shared/tiptap/tiptap-ui-primitive/spacer';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from '@/components/shared/tiptap/tiptap-ui-primitive/toolbar';
import { PATH } from '@/constants';
import { INTERNAL_URL_IN_CLIENT } from '@/constants/url';
import { useCursorVisibility } from '@/hooks/use-cursor-visibility';
import { useIsBreakpoint } from '@/hooks/use-is-breakpoint';
import { useWindowSize } from '@/hooks/use-window-size';
import { handleImageUpload, MAX_FILE_SIZE } from '@/lib/tiptap-utils';
import { requestHttp } from '@/utils/http/request';

import { CustomCodeBlock } from '../../tiptap-ui/code-block-extension/code-block-extension';
import SaveContentDrawer, { PostOptions } from '../../tiptap-ui/save-content-drawer/save-content-drawer';

import '@/components/shared/tiptap/tiptap-node/blockquote-node/blockquote-node.scss';
import '@/components/shared/tiptap/tiptap-node/heading-node/heading-node.scss';
import '@/components/shared/tiptap/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss';
import '@/components/shared/tiptap/tiptap-node/image-node/image-node.scss';
import '@/components/shared/tiptap/tiptap-node/list-node/list-node.scss';
import '@/components/shared/tiptap/tiptap-node/paragraph-node/paragraph-node.scss';
import '@/components/shared/tiptap/tiptap-templates/simple/simple-editor.scss';
import 'highlight.js/styles/github-dark.css';

const lowlight = createLowlight(common);

const Image = BaseImage.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      'data-image-id': {
        default: null,
        parseHTML: (element: HTMLElement) => element.getAttribute('data-image-id'),
        renderHTML: (attributes: Record<string, string>) => {
          if (!attributes['data-image-id']) return {};
          return { 'data-image-id': attributes['data-image-id'] };
        },
      },
    };
  },
});

const MainToolbarContent = ({
  onHighlighterClick,
  onLinkClick,
  onSave,
  isMobile,
  published,
  category,
}: {
  onHighlighterClick: () => void;
  onLinkClick: () => void;
  onSave: (options: Partial<PostOptions>) => Promise<void>;
  isMobile: boolean;
  published: boolean;
  category: string;
}) => (
  <>
    <Spacer />

    <ToolbarGroup>
      <UndoRedoButton action="undo" />
      <UndoRedoButton action="redo" />
    </ToolbarGroup>

    <ToolbarSeparator />

    <ToolbarGroup>
      <HeadingDropdownMenu levels={[1, 2, 3, 4]} portal={isMobile} />
      <ListDropdownMenu portal={isMobile} types={['bulletList', 'orderedList', 'taskList']} />
      <BlockquoteButton />
      <CodeBlockButton />
    </ToolbarGroup>

    <ToolbarSeparator />

    <ToolbarGroup>
      <MarkButton type="bold" />
      <MarkButton type="italic" />
      <MarkButton type="strike" />
      <MarkButton type="code" />
      <MarkButton type="underline" />
      {!isMobile ? <ColorHighlightPopover /> : <ColorHighlightPopoverButton onClick={onHighlighterClick} />}
      {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
    </ToolbarGroup>

    <ToolbarSeparator />

    <ToolbarGroup>
      <MarkButton type="superscript" />
      <MarkButton type="subscript" />
    </ToolbarGroup>

    <ToolbarSeparator />

    <ToolbarGroup>
      <TextAlignButton align="left" />
      <TextAlignButton align="center" />
      <TextAlignButton align="right" />
      <TextAlignButton align="justify" />
    </ToolbarGroup>

    <ToolbarSeparator />

    <ToolbarGroup>
      <ImageUploadButton text="Add" />
    </ToolbarGroup>

    <ToolbarSeparator />

    <ToolbarGroup>
      <SaveContentDrawer category={category} published={published} onSave={onSave}>
        <ActionIconButton label="저장">
          <Save />
        </ActionIconButton>
      </SaveContentDrawer>
    </ToolbarGroup>

    <Spacer />

    {isMobile && <ToolbarSeparator />}

    {/* <ToolbarGroup> */}
    {/* <ThemeToggle /> */}
    {/* </ToolbarGroup> */}
  </>
);

const MobileToolbarContent = ({ type, onBack }: { type: 'highlighter' | 'link'; onBack: () => void }) => (
  <>
    <ToolbarGroup>
      <Button data-style="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === 'highlighter' ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {type === 'highlighter' ? <ColorHighlightPopoverContent /> : <LinkContent />}
  </>
);

export function SimpleEditor({
  title = '',
  content = '',
  postId,
  isEdit = false,
  published = false,
  category = '',
}: {
  title?: string;
  content?: string;
  postId: number;
  isEdit?: boolean;
  published?: boolean;
  category?: string;
}) {
  const uuid = uuidv4();

  const router = useRouter();
  const isMobile = useIsBreakpoint();
  const { height } = useWindowSize();
  const [mobileView, setMobileView] = useState<'main' | 'highlighter' | 'link'>('main');
  const toolbarRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        'aria-label': 'Main content area, start typing to enter text.',
        class: 'simple-editor tiptap-content',
      },
    },

    extensions: [
      StarterKit.configure({
        codeBlock: false,
        horizontalRule: false,
        link: {
          openOnClick: false,
          enableClickSelection: true,
        },
      }),
      CustomCodeBlock.configure({
        lowlight,
        // defaultLanguage: 'javascript',
      }),
      HorizontalRule,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
      Selection,
      ImageUploadNode.configure({
        accept: 'image/*',
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload(uuid),
        onError: error => console.error('Upload failed:', error),
      }),
    ],
    content,
  });

  const rect = useCursorVisibility({
    editor,
    overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
  });

  useEffect(() => {
    const toolbarEl = toolbarRef.current;
    const headerEl = document.querySelector('header');

    if (!toolbarEl || !headerEl) {
      return undefined;
    }

    const updateTop = () => {
      const headerRect = headerEl.getBoundingClientRect();
      toolbarEl.style.top = `${Math.sign(headerRect.top) ? 0 : headerRect.height}px`;
    };

    headerEl.addEventListener('transitionrun', updateTop);
    headerEl.addEventListener('transitionend', updateTop);

    return () => {
      headerEl.removeEventListener('transitionrun', updateTop);
      headerEl.removeEventListener('transitionend', updateTop);
    };
  }, []);

  useEffect(() => {
    if (!isMobile && mobileView !== 'main') {
      setMobileView('main');
    }
  }, [isMobile, mobileView]);

  const handleSave = async (options: Partial<PostOptions>) => {
    if (editor) {
      const html = editor.getHTML(); // 에디터 내용을 HTML로 추출
      // const highlighted = await getHighlightedHtml(html);

      //! 저장 요청시 로그인 모달 창 띄우고 -> 로그인 성공 시 저장 요청 다시 보내기 -> 로그인 상태도 유지하기(토큰 갱신)
      if (isEdit) {
        const res = await requestHttp.put(`${INTERNAL_URL_IN_CLIENT.POSTS}/${postId}`, {
          title,
          content: html,
          published: options.published === 'public',
          ...(options.category && { category: options.category }),
          sessionId: uuid,
        });

        if (res.ok) {
          router.replace(`${PATH.POST}/${postId}`);
          router.refresh();
        } else {
          toast.error('포스트 업데이트에 실패했습니다. 다시 시도해주세요.');
        }
      } else {
        const res = await requestHttp.post(INTERNAL_URL_IN_CLIENT.POSTS, {
          title,
          content: html,
          published: options.published === 'public',
          ...(options.category && { category: options.category }),
        });

        if (res.ok) {
          router.replace(PATH.HOME);
        } else {
          toast.error('포스트 저장에 실패했습니다. 다시 시도해주세요.');
        }
      }
    }
  };

  return (
    <div className="simple-editor-wrapper !w-full">
      <EditorContext.Provider value={{ editor }}>
        <Toolbar
          ref={toolbarRef}
          className="transition-all"
          style={{
            ...(isMobile
              ? {
                  bottom: `calc(100% - ${height - rect.y}px)`,
                }
              : {}),
          }}>
          {mobileView === 'main' ? (
            <MainToolbarContent
              category={category}
              isMobile={isMobile}
              published={published}
              onHighlighterClick={() => setMobileView('highlighter')}
              onLinkClick={() => setMobileView('link')}
              onSave={handleSave}
            />
          ) : (
            <MobileToolbarContent
              type={mobileView === 'highlighter' ? 'highlighter' : 'link'}
              onBack={() => setMobileView('main')}
            />
          )}
        </Toolbar>

        <EditorContent className="simple-editor-content" editor={editor} role="presentation" />
      </EditorContext.Provider>
    </div>
  );
}
