import React from 'react';
import { H1, H2, Paragraph, Sheet, YStack, Card, Label, ScrollView } from 'tamagui';
import { ProductCategories, ProductRawMaterials } from '~/lib/constants/AddProductFormData';

type ProductSheetProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSelectCategory: (category: string) => void;
};

export default function ProductSheet({ open, setOpen, onSelectCategory }: ProductSheetProps) {
  return (
    <Sheet
      forceRemoveScrollEnabled={open}
      modal
      open={open}
      onOpenChange={setOpen}
      dismissOnSnapToBottom
      zIndex={100_000}>
      <Sheet.Overlay animation={'lazy'} enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />

      <Sheet.Handle backgroundColor={'white'} />

      <Sheet.Frame padding="$5" justifyContent="flex-end" alignItems="flex-start">
        <H1 fontSize={'$9'} fontWeight={'bold'}>
          Product Categories
        </H1>
        <Paragraph theme={'alt2'} fontSize={'$5'} mb="$4">
          Choose From one of the Given Product Categories
        </Paragraph>
        <ScrollView>
          <YStack width={'100%'} my="$6">
            {ProductCategories.map((item, i) => (
              <Card
                width="100%"
                padding="$4"
                marginBottom="$4"
                borderRadius="$3"
                key={i}
                onPress={() => {
                  onSelectCategory(item.label);
                  setOpen(false);
                }}>
                <YStack>
                  <H2 fontWeight="bold" fontSize="$6" color={'whitesmoke'}>
                    {item.label}
                  </H2>
                  <Paragraph marginTop="$2" fontSize="$2" textAlign="justify" color="$gray10">
                    {item.description}
                  </Paragraph>
                </YStack>
              </Card>
            ))}
          </YStack>
        </ScrollView>
      </Sheet.Frame>
    </Sheet>
  );
}
