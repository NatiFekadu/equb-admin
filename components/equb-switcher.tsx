'use client';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useEqubModal } from '@/hooks/use-equb-modal';
import { Equb } from '@prisma/client';
import { ChevronsUpDown, Store, StoreIcon, Check, PlusCircle } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandItem,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandSeparator,
} from '@/components/ui/command';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;
interface EqubSwitcherProps extends PopoverTriggerProps {
  items: Equb[];
}

export default function EqubSwitcher({
  className,
  items = [],
}: EqubSwitcherProps) {
  const equbModal = useEqubModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentEqub = formattedItems.find(
    (item) => item.value === params.equbId
  );
  const [open, setOpen] = useState(false);
  const onEqubSelect = (equb: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${equb.value}`);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          className={cn('w-[200px] justify-between', className)}
        >
          <Store className="mr-2 h-4 w-4" />
          {currentEqub?.label}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search equb..." />
            <CommandEmpty>No Equb Found</CommandEmpty>
            <CommandGroup heading="Equbs">
              {formattedItems.map((equb) => (
                <CommandItem
                  key={equb.value}
                  onSelect={() => onEqubSelect(equb)}
                  className="text-sm"
                >
                  <StoreIcon className="mr-2 h-4 w-4" />
                  {equb.label}
                  <Check
                    className={cn(
                      'ml-auto h-4 w-4',
                      currentEqub?.value == equb.value
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator/>
          <CommandList>
            <CommandGroup>
                <CommandItem className='cursor: pointer' onSelect={()=>{setOpen(false); equbModal.onOpen()}}>
                  <PlusCircle className='mr-2 h-5 w-5 '/>
                  Create Equb
                </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
