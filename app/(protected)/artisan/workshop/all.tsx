import React from 'react';
import { ScrollView, YStack, H3, Paragraph } from 'tamagui';
import workshops from '~/lib/data/workshops.json';
import WorkshopCard from '~/components/custom/WorkshopCard';

export default function WorkshopAll() {
  return (
    <ScrollView>
      <YStack flex={1} alignItems="center" paddingHorizontal="$5" paddingVertical="$3">
        <H3 width={"100%"} color="#fff">Workshops for you!!!</H3>
        <Paragraph width={"100%"} size={"$4"} theme="alt2" marginBottom={"$5"}>
          Educating and enhancing your skills
        </Paragraph>
        
        {workshops.workshops.map(workshop => (
          <WorkshopCard 
            key={workshop.id}
            {...workshop}
          />
        ))}
      </YStack>
    </ScrollView>
  );
}
