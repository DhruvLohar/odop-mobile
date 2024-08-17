// components/rawMaterialList/RawMaterialSheet.tsx
import React from 'react';
import { H1, H2, Paragraph, Sheet, YStack, Card, ScrollView, Button } from 'tamagui';
import { ProductRawMaterials } from '~/lib/constants/AddProductFormData';

type RawMaterialSheetProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedCategory: 'food' | 'handicraft' | 'clothing' | 'artwork' | 'other' | any;
  onSelectRawMaterial: (rawMaterial: string) => void;
};

export default function RawMaterialSheet({
  open,
  setOpen,
  selectedCategory,
  onSelectRawMaterial,
}: RawMaterialSheetProps) {

  const category = ProductRawMaterials[selectedCategory] || [];

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
          Raw Materials
        </H1>
        <Paragraph theme={'alt2'} fontSize={'$5'} mb="$4">
          Choose from the given raw materials
        </Paragraph>
        <ScrollView w="100%">
          <YStack width={'100%'} my="$6">
            {category.map((item: any) => (
              <Card
                width="100%"
                padding="$4"
                marginBottom="$4"
                borderRadius="$3"
                key={item.value}
                onPress={() => {
                  onSelectRawMaterial(item.value);
                  setOpen(false); // Close the sheet after selection
                }}>
                <YStack>
                  <H2 fontWeight="bold" fontSize="$6" color={'whitesmoke'}>
                    {item.label}
                  </H2>
                </YStack>
              </Card>
            ))}
          </YStack>
        </ScrollView>
      </Sheet.Frame>
    </Sheet>
  );
}
