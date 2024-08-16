import React from 'react';
import { H5, H6, XStack, YStack, Button } from 'tamagui';

type OrderCardProps = {
  id: number;
  date: string;
  seller: string;
  status: string;
};

export default function OrderCard({ id, date, seller, status }: OrderCardProps) {
  return (
    <YStack borderWidth={1} borderColor={"#222222"} width={"100%"} borderRadius={"$4"} padding={"$5"} gap={"$3"} marginBottom={"$5"}>
      <XStack flex={1} justifyContent="space-between">
        <H5>Order #{id}</H5>
        <H6 size={16} color={"#585858"} marginLeft="$2">{date}</H6>
      </XStack>

      <XStack flex={1} justifyContent="space-between">
        <H6 size={16} color={"#585858"} marginLeft="$2">Seller: {seller}</H6>
        <H6 size={16} color={"#585858"} marginLeft="$2">{status}</H6>
      </XStack>

      <Button size={12} backgroundColor="transparent" borderWidth={1} borderColor={"#222222"}>
        View Order details
      </Button>
    </YStack>
  );
}
