import React from 'react';
import { View, Image } from 'react-native';
import { H6, H4, XStack, YStack, Paragraph } from 'tamagui';
import { Star1 } from 'iconsax-react-native';
import { useRouter } from 'expo-router';

type EventCardProps = {
  id: number;
  description: string;
  title: string;
  location: string;
  date: string;
  time: string;
  image: string;
};

const imageMap: { [key: string]: any } = {
  'Workshop1.jpg': require('../../assets/Workshops/Workshop1.jpg'),
  'Workshop2.jpg': require('../../assets/Workshops/Workshop2.jpg'),
};

const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  description,
  location,
  date,
  time,
  image,
}) => {
  const router = useRouter();

  function handleEvent() {
    router.push(`/(protected)/artisan/events/${id}`);
  }
  return (
    <YStack backgroundColor="#222222" borderRadius="$3" marginBottom="$5" width={'100%'}>
      <Image
        source={imageMap[image]}
        style={{ width: '100%', height: 200, borderRadius: 10, marginBottom: 20 }}
      />
      <YStack paddingHorizontal="$3" paddingBottom="$3">
        <H4 fontWeight={700} marginBottom={'$2'} onPress={handleEvent}>
          {title}
        </H4>

        <Paragraph width={'100%'} size={'$3'} theme="alt2" marginBottom={'$3'}>
          {description}
        </Paragraph>

        <YStack gap={'$1'}>
          <XStack flex={1} justifyContent="space-between" width={'100%'}>
            <XStack>
              <H6 size={14} color={'#585858'} fontWeight={700} mr={'$2'}>
                {date}
              </H6>
              <H6 size={14} color={'#585858'} fontWeight={700}>
                {time}
              </H6>
            </XStack>
            <H6 size={14} color={'#585858'} fontWeight={700}>
              {location}
            </H6>
          </XStack>
        </YStack>
      </YStack>
    </YStack>
  );
};

export default EventCard;
