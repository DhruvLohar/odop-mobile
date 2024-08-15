import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { H2, H3, H6, ScrollView, XStack, YStack,Paragraph,Button } from 'tamagui';
import { Location } from 'iconsax-react-native';

const images = [
  require('../../../assets/Workshops/Workshop1.jpg'), 
  require('../../../assets/Workshops/Workshop2.jpg'), 
  require('../../../assets/Workshops/Workshop3.jpg'),
];

export default function WorkshopAll() {
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
          >
            {images.map((image, index) => (
              <Image
                key={index}
                source={image}
                style={{
                  width: 200,
                  height: 250,
                  borderRadius: 10,
                  marginRight: 10, 
                }}
              />
            ))}
          </ScrollView>

            <H3 width={"100%"} marginBottom="$2">
                Workshop Title 1
            </H3>
            <XStack  width={"100%"} flex={1} alignItems='center'>
                <Location size="16" color="#585858"/>
                <H6 marginLeft="$2" size={16} color={"#585858"}>Ratnagiri, Maharashtra</H6>
            </XStack>
            <YStack width={"100%"} paddingTop={10}>
                <H6 size={28}>Description</H6>
                <Paragraph width={"100%"} size={"$4"} theme="alt2" marginBottom={"$5"}>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere reiciendis ipsum culpa quis obcaecati deleniti, animi in dolorum atque
                </Paragraph>
            </YStack>

            <YStack width={"100%"}>
                <H6 size={28}>Workshop Level</H6>
                <Paragraph width={"100%"} size={"$4"} theme="alt2" marginBottom={"$5"}>
                    Begginner
                </Paragraph>
            </YStack>

            <YStack width={"100%"}>
                <H6 size={28}>Organizers</H6>
                <Paragraph width={"100%"} size={"$4"} theme="alt2" marginBottom={"$5"}>
                    Xyz Company : Path to Success
                </Paragraph>
            </YStack>

            <Button size="$4" width={"100%"} backgroundColor="#191919">
                Notify Me
            </Button>

        </YStack>
      </ScrollView>
    );
  }