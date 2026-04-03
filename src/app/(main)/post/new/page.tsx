import { SimpleEditor } from '@/components/shared/tiptap/tiptap-templates/simple/simple-editor';
import { Input } from '@/components/ui/input';

const Page = () => (
  <div className="flex w-full flex-col">
    <div className="w-full">
      <Input className="mb-4 text-2xl font-bold" defaultValue="" placeholder="제목을 입력하세요" />
    </div>
    <SimpleEditor />
  </div>
);

export default Page;
