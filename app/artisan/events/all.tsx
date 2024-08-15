import React from 'react';
import { ScrollView, YStack, H3, Paragraph } from 'tamagui';
import EventCard from '../../../components/custom/EventCard'; // Adjust the import path as needed
import eventsData from '../../../lib/data/events.json'; // Adjust the path to your JSON file

type Event = {
    id: number;
    title: string;
    rating: number;
    location: string;
    showTime: string;
  };
  
  export default function EventsPage() {
    return (
      <ScrollView>
        <YStack flex={1} alignItems="center" paddingHorizontal="$5" paddingVertical="$3">
          <H3 width={"100%"} fontWeight={800} marginBottom={15}>Events</H3>
          <Paragraph width={"100%"} size={"$3"} theme="alt2" marginBottom={"$5"}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et dignissimos perspiciatis exercitationem, esse sed at. Totam optio ipsum, nisi labore neque?
          </Paragraph>
  
          {eventsData.map((event: Event) => (
            <EventCard key={event.id} event={event} />
          ))}
  
        </YStack>
      </ScrollView>
    );
  }
