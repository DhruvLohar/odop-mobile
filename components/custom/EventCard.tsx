import React from 'react';
import { View,Image } from 'react-native';
import { H6,H4, XStack, YStack, Paragraph } from 'tamagui';
import { Star1 } from 'iconsax-react-native';

type EventCardProps = {
  id: number;
  description: string;
  title: string;
  rating: number;
  location: string;
  showTime: string;
  image: string;
};

const imageMap: { [key: string]: any } = {
  'Workshop1.jpg': require('../../assets/Workshops/Workshop1.jpg'),
  'Workshop2.jpg': require('../../assets/Workshops/Workshop2.jpg'),
};

const EventCard: React.FC<EventCardProps> = ({id, title, rating, description,location, showTime, image }) => {
  return (
    <YStack 
      backgroundColor="#222222"
      borderRadius="$3"
      marginBottom="$5"
      width={"100%"}
    >
      <Image
        source={imageMap[image]}
        style={{ width: '100%', height: 200, borderRadius: 10, marginBottom: 20 }}
      />
      <YStack  paddingHorizontal="$3" paddingBottom="$3">
      <H4 
        fontWeight={700}
        marginBottom={"$2"}
      >
        {title}
      </H4>

      <XStack flex={1} alignItems="center" marginBottom={"$2"}>
        <Star1 size="14" color="#dce775"/>
        <H6 marginLeft={"$3"} fontWeight={700}>
          {rating}
        </H6>
      </XStack>

      <Paragraph width={"100%"} size={"$3"} theme="alt2" marginBottom={"$3"}>
          {description}
        </Paragraph>

      <YStack gap={"$1"}>
        <XStack  flex={1} justifyContent='space-between' width={"100%"}>
          <H6 size={14} color={"#585858"} fontWeight={700}>{showTime}</H6>
          <H6 size={14} color={"#585858"} fontWeight={700}>{location}</H6>
        </XStack>

      </YStack>
      </YStack>
    </YStack>
  );
}

export default EventCard;