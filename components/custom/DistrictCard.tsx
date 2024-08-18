import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { Card, YStack, SizableText, SizeTokens } from 'tamagui';
import { useRouter, Href } from 'expo-router';

type DistrictCardProps = {
  imageUrl: string;
  districtName: string;
  height: SizeTokens; // Numeric value for height
};

const DistrictCard: React.FC<DistrictCardProps> = ({ imageUrl, districtName, height }) => {
  const router = useRouter();

  function handleEvent() {
    router.push(`/(protected)/artisan/district/${districtName}` as Href);
  }

  return (
    <Card h={height} w={'100%'} overflow="hidden" onPress={handleEvent}>
      <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
      <View style={styles.overlay} />
      <YStack
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        p="$3"
        justifyContent="flex-end"
        alignItems="center">
        <SizableText color="white" size="$8" textAlign="left" w={'100%'} fontWeight="bold">
          {districtName}
        </SizableText>
      </YStack>
    </Card>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black shade with 50% opacity
  },
});

export default DistrictCard;
