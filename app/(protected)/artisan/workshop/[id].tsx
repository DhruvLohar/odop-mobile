import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { H2, H3, H6, ScrollView, XStack, YStack, Paragraph, Button } from 'tamagui';
import { Location } from 'iconsax-react-native';
import { useLocalSearchParams } from 'expo-router';
import { axiosRequest, MEDIA_URL } from '~/lib/api';
import NotCurrentUser from '~/components/shared/NotCurrentUser';

const images = [
  require('~/assets/Workshops/Workshop1.jpg'),
  require('~/assets/Workshops/Workshop2.jpg'),
  require('~/assets/Workshops/Workshop3.jpg'),
];

export default function WorkshopAll() {

  const { id } = useLocalSearchParams()
  const [workshop, setWorkshop] = useState<Workshop | null>( null)

  async function fetchWorkshop() {
    const res = await axiosRequest(`workshop/${id}/`, {
      method: 'get'
    }, false);

    if (res?.success) {
      setWorkshop(res.workshop)
    }
  }

  useEffect(() => {
    fetchWorkshop()
  }, [])

  return (
    <ScrollView>
      <YStack flex={1} alignItems="center" paddingHorizontal="$5" paddingVertical="$3">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          paddingVertical="$1"
          paddingBottom="$4"
          contentContainerStyle={{
            alignItems: 'center',
          }}
          width={"100%"}
        >
          {workshop?.images?.map((image, index) => (
            <Image
              key={index}
              source={{ uri: MEDIA_URL + image }}
              style={{
                width: 420,
                height: 250,
                borderRadius: 10,
                marginRight: 10,
              }}
            />
          ))}
        </ScrollView>

        <H3 width={"100%"} marginBottom="$2">
          {workshop?.title}
        </H3>
        <XStack width={"100%"} flex={1} alignItems='center'>
          <Location size="16" color="#585858" />
          <H6 marginLeft="$2" size={16} color={"#585858"}>Ratnagiri, Maharashtra</H6>
        </XStack>
        <YStack width={"100%"} paddingTop={10}>
          <H6 size={28}>Description</H6>
          <Paragraph width={"100%"} size={"$4"} theme="alt2" marginBottom={"$5"}>
            {workshop?.description}
          </Paragraph>
        </YStack>

        <YStack width={"100%"}>
          <H6 size={28}>Workshop Level</H6>
          <Paragraph width={"100%"} size={"$4"} theme="alt2" marginBottom={"$5"}>
            {workshop?.workshop_level}
          </Paragraph>
        </YStack>

        <YStack width={"100%"}>
          <H6 size={28}>Organizers</H6>
          <Paragraph width={"100%"} size={"$4"} theme="alt2" marginBottom={"$5"}>
            {workshop?.conducted_by_artisan
              ? workshop?.artisan.name
              : workshop?.organized_by
            }
          </Paragraph>
        </YStack>

        <NotCurrentUser checkID={workshop?.artisan?.id as number}>
          <Button size="$4" width={"100%"} backgroundColor="#191919">
            Notify Me
          </Button>
        </NotCurrentUser>

      </YStack>
    </ScrollView>
  );
}