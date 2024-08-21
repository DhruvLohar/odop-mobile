import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { H4, H6, XStack, YStack, Paragraph, Button, SizableText } from 'tamagui';
import { Calendar, Clock } from 'iconsax-react-native';
import WorkshopRegister from '../sheets/RegisterWorkshopSheet';
import { useRouter } from 'expo-router';
import { MEDIA_URL } from '~/lib/api';

const WorkshopCard: React.FC<Workshop> = (workshop) => {
  const router = useRouter()
  const [open, setOpen] = useState(false);

  function handleWorkshop() {
    router.push(`/(protected)/artisan/workshop/${workshop.id}`)
  }


  return (
    <>
      <WorkshopRegister open={open} setOpen={setOpen} title={workshop.title} />
      <YStack backgroundColor="#222222" borderRadius="$3" marginBottom="$5" width={'100%'}>
        <Image

          source={{ uri: MEDIA_URL + workshop.images[0] }}
          style={{ width: '100%', height: 220, borderRadius: 10, marginBottom: 20, objectFit: 'cover' }}
        />
        <YStack paddingHorizontal="$3" paddingBottom="$3">
          <XStack marginBottom="$2">
            {workshop.tags.map((tags, index) => (
              <XStack
                key={index}
                backgroundColor="#191919"
                borderRadius={200}
                margin
                paddingHorizontal="$5"
                paddingVertical="$2"
                marginRight="$2"
                alignSelf="flex-start">
                <SizableText fontSize={"$2"}>{tags}</SizableText>
              </XStack>
            ))}
          </XStack>

          <H4 marginBottom="$2" style={{ color: '#fff', fontWeight: 'bold' }} onPress={handleWorkshop}>
            {workshop.title}
          </H4>

          <XStack marginBottom="$2" flex={1} alignItems="center">
            <Calendar size="20" color="#585858" />
            <H6 size={20} color={'#585858'} marginLeft="$2" marginRight="$5">
              {new Date(workshop.date).toLocaleDateString('en-US')}
            </H6>

            <Clock size="20" color="#585858" />
            <H6 size={20} color={'#585858'} marginLeft="$2" marginRight="$5">
              {new Date(workshop.date).toLocaleTimeString('en-US')}
            </H6>
          </XStack>

          <Paragraph width={'100%'} size={'$3'} theme="alt2" marginBottom={'$5'}>
            {workshop.description}
          </Paragraph>

          <Button size="$4" backgroundColor="#191919" onPress={() => setOpen(true)}>
            Register Now
          </Button>
        </YStack>
      </YStack>
    </>
  );
};

export default WorkshopCard;
