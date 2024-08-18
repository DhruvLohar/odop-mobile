import { useRouter } from 'expo-router';
import React from 'react';
import { } from 'react-native';
import { H3, H4, Paragraph, YStack, Image } from 'tamagui';

type NewsCardProps = {
  id: number;
  description: string;
  title: string;
  image: string;
};

const imageMap: { [key: string]: any } = {
  'Workshop1.jpg': require('../../assets/Workshops/Workshop1.jpg'),
  'Workshop2.jpg': require('../../assets/Workshops/Workshop2.jpg'),
};

const NewsCard: React.FC<NewsCardProps> = ({ id, title, description, image }) => {

  const router = useRouter()

    function singleinfo() {
        
        router.push('/(protected)/artisan/info/${id}')
    }
    
  return (
    <YStack
      borderRadius="$7"
      marginBottom="$5"
      width="100%"
      overflow="hidden"
      position="relative"
    >
      <YStack position="relative" width="100%" height={300}>
        <Image
          
          source={imageMap[image]}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
        <YStack
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          backgroundColor="rgba(0, 0, 0, 0.5)"
        />
      </YStack>

      <YStack
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        padding="$3"
        borderRadius="$7"
      >
        <H3
          onPress={singleinfo}
          fontWeight={700}
          color="#fff"
        >
          {title}
        </H3>

        <Paragraph width="100%" size="$3" theme="alt2" color="#fff">
          {description}
        </Paragraph>
      </YStack>
    </YStack>
  );
};

export default NewsCard;
