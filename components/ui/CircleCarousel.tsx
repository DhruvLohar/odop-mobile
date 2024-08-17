import * as React from 'react';
import { Text, Dimensions } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { interpolate } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import { YStack, XStack, Button, Paragraph, Card, Avatar, SizableText } from 'tamagui';
import { ProfileCircle } from 'iconsax-react-native';

const PAGE_WIDTH = Dimensions.get('window').width; // Replace with your window width

const userReviews = [
  {
    userName: 'AmitSharma',
    review: 'The ODOP initiative boosted our local economy and job opportunities.',
  },
  {
    userName: 'PriyaDesai',
    review: 'Applying for ODOP was easy with help from the local authority.',
  },
  {
    userName: 'RaviKumar',
    review: 'Submitting our business plan was worth it for the financial support.',
  },
  { userName: 'AnitaReddy', review: 'ODOP’s aid has expanded our market reach significantly.' },
  {
    userName: 'SureshPatel',
    review: 'Subsidies and loans from ODOP improved our production and marketing.',
  },
  {
    userName: 'NehaSingh',
    review: 'Showcasing on e-commerce platforms has opened new opportunities.',
  },
  {
    userName: 'VikramMehta',
    review: 'Training from ODOP enhanced our production and marketing skills.',
  },
  {
    userName: 'SnehaJain',
    review: 'Funding helped us upgrade production and packaging facilities.',
  },
  {
    userName: 'RajeshGhosh',
    review: 'Modern technology support increased our production efficiency.',
  },
  { userName: 'DeepaIyer', review: 'Export services helped us grow internationally.' },
  {
    userName: 'ManishVerma',
    review: 'High-quality standards have boosted our product’s marketability.',
  },
  {
    userName: 'GeetaChopra',
    review: 'Eco-friendly methods reduced our environmental impact and impressed customers.',
  },
  {
    userName: 'ArjunNair',
    review: 'ODOP created economic opportunities for all, including marginalized groups.',
  },
  { userName: 'PoojaArora', review: 'Local products gained visibility and saw economic growth.' },
  {
    userName: 'SanjayKumar',
    review: 'Local authority support and training improved our market access and stability.',
  },
];

function Index() {
  const itemSize = 100;
  const centerOffset = PAGE_WIDTH / 2 - itemSize / 2;

  // Define the custom animation style without explicit type
  const animationStyle = React.useCallback(
    (value: number) => {
      'worklet';

      const itemGap = interpolate(value, [-3, -2, -1, -1, 1, 2, 3], [-30, -10, 0, 0, 0, 5, 30]);
      const translateX =
        interpolate(value, [-1, 0, 1], [-itemSize - 240, -95, itemSize + 100]) +
        centerOffset -
        itemGap;

      const translateY = interpolate(value, [-1, -0.5, 0, 0.5, 1], [80, 65, 40, 65, 80]);

      const scale = interpolate(value, [-1, -0.5, 0, 0.5, 1], [0.8, 0.85, 1.1, 0.85, 0.8]);

      // Return the style object
      return {
        transform: [
          {
            translateX,
          },
          {
            translateY,
          },
          { scale },
        ],
      };
    },
    [centerOffset]
  );

  return (
    <YStack flex={1} mt="$2">
      <Carousel
        width={itemSize}
        height={itemSize}
        style={{
          width: PAGE_WIDTH,
          height: PAGE_WIDTH / 2,
        }}
        loop
        autoPlay={true}
        autoPlayInterval={2000}
        data={userReviews}
        renderItem={({ item, index }) => (
          <TouchableWithoutFeedback key={index} containerStyle={{ flex: 1 }} style={{ flex: 1 }}>
            <Card
              flex={1}
              justifyContent="center"
              overflow="visible"
              borderRadius={10}
              w="$18"
              p="$2"
              alignItems="center">
              <Avatar circular size="$4" position="absolute" top="$-5">
                <Avatar.Image
                  accessibilityLabel="Cam"
                  src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
                />
              </Avatar>
              <SizableText pt="$4">{item.userName}</SizableText>
              <SizableText
                color="$gray10"
                size="$1"
                fontWeight="100"
                textAlign="center"
                lineHeight={15}>
                {`"${item.review}"`}
              </SizableText>
            </Card>
          </TouchableWithoutFeedback>
        )}
        customAnimation={animationStyle} // Pass the custom animation function here
      />
    </YStack>
  );
}

export default Index;
