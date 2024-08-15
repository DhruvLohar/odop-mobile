import React from 'react';
import { View } from 'react-native';
import { H6, XStack, YStack } from 'tamagui';
import { Star1 } from 'iconsax-react-native';

type Event = {
  id: number;
  title: string;
  rating: number;
  location: string;
  showTime: string;
};

export default function EventCard({ event }: { event: Event }) {
  return (
    <YStack 
      backgroundColor={"#282828"}
      width={"100%"}  
      borderRadius={"$9"}
      padding={"$5"}
      paddingHorizontal={"$7"}
      gap={"$3"}
      marginBottom={"$5"}
    >
      <H6 
        size={18}
        fontWeight={700}
      >
        {event.title}
      </H6>

      <XStack flex={1} alignItems="center">
        <Star1 size="14" color="#dce775"/>
        <H6 size={14} marginLeft={"$3"} fontWeight={700}>
          {event.rating}
        </H6>
      </XStack>

      <YStack gap={"$1"}>
        <XStack>
          <H6 size={14} width={"30%"} color={"#585858"} fontWeight={700}>Location</H6>
          <H6 size={14} marginLeft={"$5"} fontWeight={700}>{event.location}</H6>
        </XStack>

        <XStack>
          <H6 size={14} width={"30%"} color={"#585858"} fontWeight={700}>Show time</H6>
          <H6 size={14} marginLeft={"$5"} fontWeight={700}>{event.showTime}</H6>
        </XStack>
      </YStack>
    </YStack>
  );
}
