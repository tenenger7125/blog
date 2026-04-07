import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

const SaveContentDrawer = ({ published, children, onSave }: SaveContentDrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [publishOption, setPublishOption] = useState<'public' | 'private'>(published ? 'public' : 'private');

  const handlePublishOptionChange = (option: 'public' | 'private') => {
    setPublishOption(option);
  };

  const handleSave = async () => {
    await onSave(publishOption);
    setIsOpen(false);
  };

  return (
    <>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>정말 저장하시겠습니까?</DrawerTitle>
            <DrawerDescription>변경 사항이 저장됩니다.</DrawerDescription>
          </DrawerHeader>
          <div className="grid gap-2 px-4">
            {/* 저장할 때 보여줄 내용 */}
            <div className="text-lg font-bold underline">발행</div>
            <RadioGroup className="flex" value={publishOption} onValueChange={handlePublishOptionChange}>
              <FieldLabel className="max-w-sm cursor-pointer" htmlFor="public-publish">
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>공개</FieldTitle>
                    <FieldDescription>해당 콘텐츠는 모든 사용자에게 공개됩니다.</FieldDescription>
                  </FieldContent>
                  <RadioGroupItem id="public-publish" value="public" />
                </Field>
              </FieldLabel>
              <FieldLabel className="max-w-sm cursor-pointer" htmlFor="private-publish">
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>비공개</FieldTitle>
                    <FieldDescription>해당 콘텐츠는 작성한 사용자에게만 공개됩니다.</FieldDescription>
                  </FieldContent>
                  <RadioGroupItem id="private-publish" value="private" />
                </Field>
              </FieldLabel>
            </RadioGroup>
          </div>
          <Separator className="my-4" />
          <DrawerFooter className="flex flex-row justify-end gap-4">
            <DrawerClose asChild>
              <Button variant="outline">취소</Button>
            </DrawerClose>
            <Button onClick={handleSave}>제출</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SaveContentDrawer;

interface SaveContentDrawerProps {
  children: React.ReactNode;
  published: boolean;
  onSave: (publishOption: 'public' | 'private') => Promise<void>;
}
