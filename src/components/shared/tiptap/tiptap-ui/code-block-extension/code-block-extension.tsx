// components/shared/tiptap/tiptap-node/code-block-node/code-block-extension.ts
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';

const LANGUAGES = [
  { label: 'Plain Text', value: 'text' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'HTML', value: 'html' },
  { label: 'CSS', value: 'css' },
  { label: 'Bash', value: 'bash' },
  { label: 'YAML', value: 'yaml' },
  { label: 'Python', value: 'python' },
];

export const CustomCodeBlock = CodeBlockLowlight.extend({
  addNodeView() {
    return ({ node, HTMLAttributes, getPos, editor }) => {
      // 1. 컨테이너 생성
      const container = document.createElement('div');
      container.className = 'code-block-container relative group';

      // 2. 셀렉트 박스 생성
      const select = document.createElement('select');
      // group-hover를 통해 마우스를 올렸을 때만 보이게 하거나, 항상 보이게 조절 가능합니다.
      select.className =
        'absolute right-2 top-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] bg-slate-800 text-slate-200 rounded px-1 py-0.5 border border-slate-700 outline-none appearance-none cursor-pointer hover:bg-slate-700';

      LANGUAGES.forEach(lang => {
        const option = document.createElement('option');
        option.value = lang.value;
        option.innerText = lang.label;
        if (node.attrs.language === lang.value) option.selected = true;
        select.appendChild(option);
      });

      // 언어 변경 이벤트
      select.addEventListener('change', e => {
        const lang = (e.target as HTMLSelectElement).value;
        if (typeof getPos === 'function') {
          // 현재 노드의 속성 업데이트
          editor.chain().focus().updateAttributes(this.name, { language: lang }).run();
        }
      });

      // 3. 코드 영역 생성
      const pre = document.createElement('pre');
      const code = document.createElement('code');

      // 전달받은 HTML 속성(class 등) 적용
      Object.entries(HTMLAttributes).forEach(([key, value]) => {
        code.setAttribute(key, value as string);
      });

      pre.appendChild(code);
      container.append(select, pre);

      return {
        dom: container,
        contentDOM: code, // 실제 타이핑이 일어나는 곳을 지정
      };
    };
  },
});
