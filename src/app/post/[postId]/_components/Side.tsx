'use client';

import { SquareMenu } from 'lucide-react';

import ActionIconButton from '@/components/shared/action-icon-button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import useDisClosure from '@/hooks/useDisclosure';

const Side = ({ children }: { children: React.ReactNode }) => {
  const [isSheetOpen, sheetHandler] = useDisClosure();

  return (
    <>
      <div className="fixed right-0 top-20 lg:hidden">
        <Sheet open={isSheetOpen} onOpenChange={sheetHandler.set}>
          <SheetTrigger asChild>
            <div>
              <ActionIconButton size={8} onClick={sheetHandler.open}>
                <SquareMenu />
              </ActionIconButton>
            </div>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle></SheetTitle>
              <SheetDescription asChild>{children}</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <div className="max-h-128 sticky right-0 top-20 min-w-72 overflow-y-auto max-lg:hidden">{children}</div>
    </>
  );
};

export default Side;
