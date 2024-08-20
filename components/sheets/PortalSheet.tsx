import React from 'react';
import { H1, Paragraph, Sheet, YStack } from 'tamagui';
import CustomSelect from '../shared/CustomSelect';

type FilterSheetProps = {
  open: boolean;
  setOpen: any;
  filters: {
    id: string;
    title: string;
    keys: {
      id: string;
      value: string;
    }[];
  }[];
  currentFilters: {
    [key: string]: string
  };
  setCurrentFilters: any
};

export default function PortalSheet({
  open, setOpen, filters,
  currentFilters,
  setCurrentFilters
}: FilterSheetProps) {

  return (
    <Sheet
      forceRemoveScrollEnabled={open}
      modal
      open={open}
      onOpenChange={setOpen}
      snapPointsMode="fit"
      dismissOnSnapToBottom
      zIndex={100_000}
    >
      <Sheet.Overlay animation={'lazy'} enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />

      <Sheet.Handle backgroundColor={'white'} />

      <Sheet.Frame padding="$5" justifyContent="flex-start" alignItems="flex-start">
        <H1 fontSize={'$9'} fontWeight={'bold'}>
          Filters
        </H1>
        <Paragraph theme={'alt2'} fontSize={'$5'}>
          Filter the event and workshops as you need!
        </Paragraph>

        <YStack width={'100%'} my="$6">
          {filters.map((item, i) => (
            <CustomSelect
              key={item.id}
              value={currentFilters[item.id]}
              setValue={(e: string) => setCurrentFilters((prev: Record<string, string>) => ({
                ...prev,
                [item.id]: e,
              }))}
              label={item.title}
              options={item.keys}
            />
          ))}
        </YStack>
      </Sheet.Frame>
    </Sheet>
  );
}
