import React from 'react';
import { View, Image } from 'react-native';
import { H6, H4, XStack, YStack, Paragraph, SizableText } from 'tamagui';
import { Calendar, Clock, Location, Star1 } from 'iconsax-react-native';
import { useRouter } from 'expo-router';


const EventCard: React.FC<EventDetails> = (event) => {
  const router = useRouter();

  function handleEvent() {
    router.push(`/(protected)/artisan/events/${event.id}`);
  }
  return (
    <YStack backgroundColor="#222222" padding="$4" borderRadius="$3" marginBottom="$5" width={'100%'}>
      <H4 fontWeight={700} marginBottom={'$2'} onPress={handleEvent}>
        {event.title}
      </H4>

      <XStack marginBottom="$2" flex={1} alignItems="center">
        <Calendar size="20" color="#585858" />
        <H6 size={20} color={'#585858'} marginLeft="$2" marginRight="$5">
          {new Date(event.date).toLocaleDateString('en-US')}
        </H6>

        <Clock size="20" color="#585858" />
        <H6 size={20} color={'#585858'} marginLeft="$2" marginRight="$5">
          {new Date(event.date).toLocaleTimeString('en-US')}
        </H6>
      </XStack>

      <Paragraph width={'100%'} size={'$3'} theme="alt2" marginBottom={'$3'}>
        {event.description}
      </Paragraph>

      <YStack alignItems='flex-start' space="$2">
        <SizableText fontWeight={"bold"}>ADDRESS</SizableText>
        <H6 size={14}>
          {event.address}
        </H6>
      </YStack>
      {/* <YStack gap={'$1'}> */}
        {/* <XStack flex={1} justifyContent="space-between" width={'100%'}> */}
        {/* </XStack> */}
      {/* </YStack> */}
    </YStack>
  );
};

export default EventCard;
