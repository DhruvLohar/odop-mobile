import React from 'react';
import { View, Image } from 'react-native';
import { H3, H4, XStack, YStack, Paragraph, Button, H5 } from 'tamagui';
import { Star1 } from 'iconsax-react-native';
import { useRouter } from 'expo-router';
import { Href } from 'expo-router';
import { MEDIA_URL } from '~/lib/api';

// const imageMap: { [key: string]: any } = {
//   'Machine1.jpg': require('../../assets/Machines/Machine1.jpg'),
//   'Workshop2.jpg': require('../../assets/Workshops/Workshop2.jpg'),
// };

const RentalMachineCard: React.FC<RentalMachine> = (machine) => {
  const router = useRouter();
  return (
    <YStack backgroundColor="#222222" borderRadius="$3" marginBottom="$5" width={'100%'}>
      {machine?.images?.length && (
        <Image
          source={{ uri: MEDIA_URL + machine.images[0] }}
          style={{ width: '100%', height: 200, borderRadius: 10, marginBottom: 20 }}
        />
      )}
      <YStack paddingHorizontal="$3" paddingBottom="$3">
        <H3
          fontWeight={700}
          marginBottom={'$2'}
          onPress={() =>
            router.push(`/(protected)/artisan/portal/rentalMachine/${machine.id}` as Href)
          }>
          {machine?.title}
        </H3>

        <Paragraph width={'100%'} size={'$3'} theme="alt2" marginBottom={'$3'}>
          {machine?.description}
        </Paragraph>
      </YStack>
    </YStack>
  );
};

export default RentalMachineCard;
