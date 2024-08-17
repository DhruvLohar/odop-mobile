
import React from 'react';
import { ScrollView, YStack, H3 } from 'tamagui';
import orders from '~/lib/data/orders.json';
import OrderCard from '~/components/custom/OrderCard';

export default function OrderPage() {
  return (
    <ScrollView>
      <YStack flex={1} alignItems="center" paddingHorizontal="$5" paddingVertical="$3">
        <H3 width={"100%"} marginBottom="$5">All orders</H3>

        {orders.orders.map(order => (
          <OrderCard 
            key={order.id} 
            id={order.id} 
            date={order.date} 
            seller={order.seller} 
            status={order.status} 
          />
        ))}
      </YStack>
    </ScrollView>
  );
}
