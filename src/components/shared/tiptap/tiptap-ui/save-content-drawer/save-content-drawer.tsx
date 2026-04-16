import { useEffect, useState } from 'react';

import { Check, ChevronsUpDown, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from '@/components/ui/field';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { INTERNAL_URL_IN_CLIENT } from '@/constants/url';
import { cn } from '@/lib/utils';
import { PostCategoryResponse } from '@/types/post-category';
import { requestHttp } from '@/utils/http/request';
import { omitObjectEmptyValues } from '@/utils/object';

import ActionIconButton from '../../../action-icon-button';

const SaveContentDrawer = ({ category: categoryName, published, children, onSave }: SaveContentDrawerProps) => {
  const [categories, setCategories] = useState<PostCategoryResponse[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<PostOptions>({
    published: published ? 'public' : 'private',
    category: categoryName || '',
  });

  const handlePublishOptionChange = (option: 'public' | 'private') => {
    setOptions(prev => ({ ...prev, published: option }));
  };

  const handleSave = async () => {
    await onSave(omitObjectEmptyValues(options));
    setIsOpen(false);
  };

  const data = [
    {
      title: '발행',
      items: [
        { label: '공개', description: '해당 콘텐츠는 모든 사용자에게 공개됩니다.', value: 'public' },
        { label: '비공개', description: '해당 콘텐츠는 작성한 사용자에게만 공개됩니다.', value: 'private' },
      ],
    },
  ];

  useEffect(() => {
    requestHttp
      .get<PostCategoryResponse[]>(INTERNAL_URL_IN_CLIENT.POST_CATEGORIES)
      .then(res => {
        setCategories(res.data ?? []);
      })
      .catch(console.error);
  }, []);

  const [open, setOpen] = useState(false);
  const [categoryInput, setCategoryInput] = useState('');
  const [isCreateCategory, setIsCreateCategory] = useState(false);

  const handleCategoryInputChange = (inputValue: string) => {
    setCategoryInput(inputValue);
  };

  const handleCategoryCreateClick = () => {
    setOptions(prev => ({ ...prev, category: categoryInput }));
    setOpen(false);
    setIsCreateCategory(true);
  };

  const handleCategoryCreateCancelClick = () => {
    setIsCreateCategory(false);
    setCategoryInput('');
    setOptions(prev => ({ ...prev, category: '' }));
  };

  return (
    <>
      <Dialog modal={false} open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>정말 저장하시겠습니까?</DialogTitle>
            <DialogDescription>변경 사항이 저장됩니다.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            {data.map(section => (
              <div key={section.title} className="grid gap-2 px-4">
                {/* 저장할 때 보여줄 내용 */}
                <div className="text-lg font-bold underline">{section.title}</div>
                <RadioGroup className="flex" value={options.published} onValueChange={handlePublishOptionChange}>
                  {section.items.map(item => (
                    <FieldLabel
                      key={item.label}
                      className="max-w-sm cursor-pointer"
                      htmlFor={`${section.title}-${item.label}-${item.value}`}>
                      <Field orientation="horizontal">
                        <FieldContent>
                          <FieldTitle>{item.label}</FieldTitle>
                          <FieldDescription>{item.description}</FieldDescription>
                        </FieldContent>
                        <RadioGroupItem id={`${section.title}-${item.label}-${item.value}`} value={item.value} />
                      </Field>
                    </FieldLabel>
                  ))}
                </RadioGroup>
              </div>
            ))}

            {/* 저장할 때 보여줄 내용 */}
            <div className="grid gap-2 px-4">
              <div className="text-lg font-bold underline">카테고리</div>
              <Popover open={open} onOpenChange={setOpen}>
                <div className="flex items-center gap-2">
                  <PopoverTrigger asChild>
                    <Button aria-expanded={open} className="w-full justify-between" role="combobox" variant="outline">
                      {options.category || '카테고리를 선택해주세요'}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  {isCreateCategory && (
                    <ActionIconButton
                      className="p-2 text-red-800"
                      label="생성 취소"
                      onClick={handleCategoryCreateCancelClick}>
                      <Trash2 />
                    </ActionIconButton>
                  )}
                </div>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput
                      className="h-9"
                      placeholder="카테고리 검색"
                      value={categoryInput}
                      onValueChange={handleCategoryInputChange}
                    />
                    <CommandList>
                      <CommandEmpty>
                        <Button onClick={handleCategoryCreateClick}>{categoryInput} 생성하기.</Button>
                      </CommandEmpty>
                      <CommandGroup>
                        {categories.map(category => (
                          <CommandItem
                            key={category.id}
                            value={category.name}
                            onSelect={currentValue => {
                              setOptions({
                                ...options,
                                category: currentValue === options.category ? '' : currentValue,
                              });
                              setOpen(false);
                            }}>
                            {category.name}
                            <Check
                              className={cn(
                                'ml-auto',
                                options.category === category.name ? 'opacity-100' : 'opacity-0',
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <Separator className="my-4" />
          <DialogFooter className="flex flex-row justify-end gap-4">
            <DialogClose asChild>
              <Button variant="outline">취소</Button>
            </DialogClose>
            <Button onClick={handleSave}>제출</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SaveContentDrawer;

export interface PostOptions {
  published: 'public' | 'private';
  category: string;
}

interface SaveContentDrawerProps {
  children: React.ReactNode;
  published: boolean;
  category: string;
  onSave: (options: Partial<PostOptions>) => Promise<void>;
}
