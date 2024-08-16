import React from 'react';
import { View, Text, Image } from 'react-native';
import { H4, H6, XStack, YStack, Paragraph, Button } from 'tamagui';
import { Calendar, Clock } from 'iconsax-react-native';

type WorkshopCardProps = {
  title: string;
  description: string;
  date: string;
  time: string;
  categories: string[];
  image: string;
};

const imageMap: { [key: string]: any } = {
    'Workshop1.jpg': require('../../assets/Workshops/Workshop1.jpg'),
    'Workshop2.jpg': require('../../assets/Workshops/Workshop2.jpg'),
  };

const WorkshopCard: React.FC<WorkshopCardProps> = ({ title, description, date, time, categories, image }) => {
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
      <YStack paddingHorizontal="$3" paddingBottom="$3">
        <XStack marginBottom="$2">
          {categories.map((category, index) => (
            <XStack
              key={index}
              backgroundColor="#191919"
              borderRadius={20}
              paddingHorizontal="$3"
              paddingVertical="$1"
              marginRight="$2"
              alignSelf="flex-start"
            >
              <Text style={{ color: '#fff', fontWeight: '500' }}>{category}</Text>
            </XStack>
          ))}
        </XStack>

        <H4 marginBottom="$2" style={{ color: '#fff', fontWeight: 'bold' }}>
          {title}
        </H4>

        <XStack marginBottom="$2" flex={1} alignItems='center'>
          <Calendar size="20" color="#585858" />
          <H6 size={20} color={"#585858"} marginLeft="$2" marginRight="$5">{date}</H6>

          <Clock size="20" color="#585858" />
          <H6 size={20} color={"#585858"} marginLeft="$2" marginRight="$5">{time}</H6>
        </XStack>

        <Paragraph width={"100%"} size={"$3"} theme="alt2" marginBottom={"$5"}>
          {description}
        </Paragraph>

        <Button size="$4" backgroundColor="#191919">
          Register Now
        </Button>
      </YStack>
    </YStack>
  );
};

export default WorkshopCard;
