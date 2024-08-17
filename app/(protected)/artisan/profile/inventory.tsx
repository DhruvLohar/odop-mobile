import { Edit2 } from 'iconsax-react-native';
import React, { useState } from 'react';
import {
  ScrollView,
  YStack,
  H2,
  Paragraph,
  H4,
  XStack,
  Avatar,
  Card,
  SizableText,
  Button,
} from 'tamagui';
import Chart from '~/components/inventory/Chart';
import EditForm from '~/components/inventory/EditForm';

export default function ProductInventory() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <EditForm open={open} setOpen={setOpen} />
      <YStack
        width={'100%'}
        height={'100%'}
        justifyContent="flex-start"
        alignItems="flex-start"
        paddingHorizontal="$5"
        py="$6">
        <H2 fontWeight={'bold'}>Inventory</H2>
        <Paragraph color={'white'} fontSize={'$4'} mb="$4">
          Manage and Update Your Products
        </Paragraph>
        <Chart />
        <H4>Products</H4>
        <ScrollView>
          <YStack mt="$4" w="100%">
            {Array.from({ length: 5 }).map((_, index) => (
              <XStack
                key={index}
                bg={'$background'}
                borderRadius={10}
                w="100%"
                p="$3"
                my="$2"
                alignItems="center">
                <Avatar circular size="$6" mr="$2">
                  <Avatar.Image
                    accessibilityLabel="Nate Wienert"
                    src="https://images.unsplash.com/photo-1679958854536-a1bb774ef8ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  />
                  <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
                </Avatar>
                <YStack>
                  <H4>Product 1</H4>
                  <SizableText>400</SizableText>
                </YStack>
                <Button
                  circular
                  bg="transparent"
                  icon={() => <Edit2 color="white" size={24} />}
                  padding="$2"
                  onPress={() => setOpen(true)}
                  ml="auto"
                />
              </XStack>
            ))}
          </YStack>
        </ScrollView>
      </YStack>
    </>
  );
}

