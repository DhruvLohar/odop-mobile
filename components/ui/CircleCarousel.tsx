import * as React from 'react';
import { Text, Dimensions } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { interpolate } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import { YStack, XStack, Button, Paragraph, Card, Avatar, SizableText } from 'tamagui';
import { ProfileCircle } from 'iconsax-react-native';

const PAGE_WIDTH = Dimensions.get('window').width; // Replace with your window width

const descriptions = [
  'A government initiative designed to promote one key product per district, boosting local economies and creating job opportunities.',
  'Identify the primary product of your district and apply through your local development authority to be part of the ODOP scheme.',
  'Conduct a feasibility study, create a detailed business plan, and submit your application for financial support and resources.',
  'Enhances local craftsmanship, provides financial aid, and connects products to national and international markets.',
  'Receive subsidies and low-interest loans to support production, marketing, and expansion of your district-specific product.',
  'Access to national and global markets through e-commerce platforms and government-supported trade fairs.',
  'Benefit from training programs that improve skills in production, management, and marketing for artisans and entrepreneurs.',
  'Gain access to funding for developing production units, packaging facilities, and other necessary infrastructure.',
  'Utilize modern technology to enhance product quality, streamline production processes, and increase efficiency.',
  'Tap into global markets with the help of export facilitation services and international trade connections.',
  'Ensure that your product meets high-quality standards to build trust with consumers and enhance marketability.',
  'Adopt eco-friendly production methods that reduce environmental impact and promote sustainable practices.',
  'Create economic opportunities for all community members, including marginalized groups, fostering inclusive growth.',
  'Increased visibility for local products, enhanced economic development, job creation, and improved infrastructure and skills.',
  'Engage with local authorities for application details, participate in training and development programs, and leverage government support for market access and financial assistance.',
];

function Index() {
  const [isFast, setIsFast] = React.useState(false);
  const [isAutoPlay, setIsAutoPlay] = React.useState(false);
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
        data={descriptions}
        renderItem={({ index }) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => {
              console.log(index);
            }}
            containerStyle={{ flex: 1 }}
            style={{ flex: 1 }}>
            <Card
              flex={1}
              justifyContent="center"
              overflow="visible"
              borderRadius={10}
              w="$18"
              p="$2"
              alignItems="center">
              <Avatar circular size="$4" position="absolute" top="$-4">
                <Avatar.Image
                  accessibilityLabel="Cam"
                  src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
                />
              </Avatar>
              <SizableText
                color="$gray10"
                size="$1"
                fontWeight="100"
                textAlign="center"
                lineHeight={15}
                mt="$4">
                {descriptions[index]}
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
