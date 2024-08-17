import React from 'react';
import { Text, View } from 'react-native';
import { H3, Paragraph, YStack, ScrollView, Image, H2 } from 'tamagui';

export default function IndividualNews() {
  return (
    <ScrollView>
      <YStack padding="$5">

   
        <YStack marginBottom="$2">
          <H2 fontWeight={800}>
            ODOP Strikes Again now Part 3
          </H2>
        </YStack>

       
        <YStack marginBottom="$4">
          <Paragraph theme="alt2">
            By Aadish Gotekar
          </Paragraph>
        </YStack>


        <Image
          source={require("~/assets/Workshops/Workshop1.jpg")}
          style={{
            width: '100%',
            height: 200,
            borderRadius: 10
          }}
        />
        
        <YStack marginTop="$4">
          <Paragraph theme="alt2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque imperdiet, nunc at volutpat vestibulum, libero nisi scelerisque purus, ac tempus mi odio et sapien. Donec tincidunt nisi ut orci elementum, nec egestas est auctor. Nulla facilisi. Curabitur sagittis, elit a fermentum varius, elit mi dictum nunc, at dignissim nisl ligula in urna.
          </Paragraph>
        </YStack>
      </YStack>
    </ScrollView>
  );
}
