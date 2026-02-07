'use client';

import { SquareMenu } from 'lucide-react';

import ActionIconButton from '@/components/shared/action-icon-button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import useDisClosure from '@/hooks/use-disclouse';

const IndexSheet = ({ children }: { children: React.ReactNode }) => {
  const [isSheetOpen, sheetHandler] = useDisClosure();

  return (
    <div className="flex flex-col gap-2 border-l-2 border-gray-200 dark:text-gray-600">
      <div className="fixed right-0 top-20 lg:hidden">
        <Sheet open={isSheetOpen} onOpenChange={sheetHandler.set}>
          <SheetTrigger asChild>
            <div>
              <ActionIconButton iconSize={8} label="목차 보기" onClick={sheetHandler.open}>
                <SquareMenu />
              </ActionIconButton>
            </div>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle></SheetTitle>
              <SheetDescription asChild>
                <div>{children}</div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <div className="sticky right-0 top-20 max-h-svh min-w-72 overflow-y-auto max-lg:hidden">
        <ScrollArea className="h-full w-full">{children}</ScrollArea>
      </div>
    </div>
  );
};

export default IndexSheet;
