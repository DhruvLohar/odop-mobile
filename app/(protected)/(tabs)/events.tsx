import { useState, useEffect, useMemo } from 'react';
import {
  Button,
  H2,
  H3,
  H5,
  Paragraph,
  ScrollView,
  Separator,
  SizableText,
  Tabs,
  type TabsContentProps,
  XStack,
  YStack,
} from 'tamagui';
import workshops from '../../../lib/data/workshops.json';
import WorkshopCard from '../../../components/custom/WorkshopCard';
import EventCard from '../../../components/custom/EventCard';
import eventsData from '../../../lib/data/events.json';
import { Filter } from 'iconsax-react-native';
import EventsSheet from '~/components/sheets/EventsSheet';
import PortalSheet from '~/components/sheets/PortalSheet';

function parseShowTime(showTime: string): string {
  const [datePart, timePart] = showTime.split(' | ');
  const [day, month] = datePart.split(' ');

  // Correctly parse the month
  const monthIndex = new Date(Date.parse(month + ' 1, 2012')).getMonth() + 1;

  // Ensure day and month are in two digits
  const dayString = day.padStart(2, '0');
  const monthString = monthIndex.toString().padStart(2, '0');

  // Return date in YYYY-MM-DD format
  return `${new Date().getFullYear()}-${monthString}-${dayString}`;
}

function HorizontalTabs({ setCurrentTab, currentFilters, currentTab }: any) {
  useEffect(() => {
    console.log(currentFilters);
  }, [currentFilters]);

  const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

  const filteredWorkShops = useMemo(() => {
    let filteredData = workshops.workshops;

    // Apply level filter
    if (currentFilters['level'] && currentFilters['level'] !== 'all') {
      const selectedLevel = currentFilters['level'];
      filteredData = filteredData.filter((workshop) =>
        workshop.categories.some((category) =>
          selectedLevel === 'bg'
            ? category === 'Beginner'
            : selectedLevel === 'int'
              ? category === 'Intermediate'
              : selectedLevel === 'adv'
                ? category === 'Advanced'
                : true
        )
      );
    }

    // Apply date filter
    if (currentFilters['workshopDate'] === 'current') {
      filteredData = filteredData
        .filter((workshop) => workshop.date >= currentDate) // Ongoing or near workshops
        .sort((a, b) => a.date.localeCompare(b.date)); // Ascending order
    } else if (currentFilters['workshopDate'] === 'upcoming') {
      filteredData = filteredData
        .filter((workshop) => workshop.date > currentDate) // Future workshops
        .sort((a, b) => b.date.localeCompare(a.date)); // Descending order
    }

    return filteredData;
  }, [workshops, currentFilters, currentTab, currentDate]);

  const filteredEvents = useMemo(() => {
    let filteredData = eventsData.events;

    // Apply date filter based on the day only
    if (currentFilters['eventDate'] === 'current') {
      filteredData = filteredData
        .filter((workshop) => workshop.date >= currentDate) // Ongoing or near workshops
        .sort((a, b) => a.date.localeCompare(b.date)); // Ascending order
    } else if (currentFilters['workshopDate'] === 'upcoming') {
      filteredData = filteredData
        .filter((workshop) => workshop.date > currentDate) // Future workshops
        .sort((a, b) => b.date.localeCompare(a.date)); // Descending order
    }

    return filteredData;
  }, [eventsData, currentFilters, currentTab, currentDate]);

  return (
    <Tabs
      defaultValue="workshops"
      orientation="horizontal"
      flexDirection="column"
      flex={1}
      borderRadius={'$5'}
      overflow="hidden"
      onValueChange={setCurrentTab}>
      <Tabs.List separator={<Separator vertical />} mb="$4">
        <Tabs.Tab flex={1} value="workshops">
          <SizableText fontFamily="$body">Workshops</SizableText>
        </Tabs.Tab>
        <Tabs.Tab flex={1} value="events">
          <SizableText fontFamily="$body">Events</SizableText>
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Content value="workshops" flex={1}>
        <ScrollView flex={1}>
          <YStack alignItems="center" flex={1}>
            {filteredWorkShops.map((workshop) => (
              <WorkshopCard key={workshop.id} {...workshop} />
            ))}
          </YStack>
        </ScrollView>
      </Tabs.Content>

      <Tabs.Content value="events" flex={1}>
        <ScrollView flex={1}>
          <YStack flex={1} alignItems="center">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </YStack>
        </ScrollView>
      </Tabs.Content>
    </Tabs>
  );
}

// const filters = [
//   { id: 'location', title: 'Location', keys: ['Nearest', 'Farthest'] },
//   { id: 'level', title: 'Level', keys: ['Begineer', 'Intermidate', 'Advance'] },
//   { id: 'price', title: 'Price', keys: ['High to low', 'Low to high'] },
// ];

const filters = [
  {
    id: 'workshopDate',
    title: 'Date',
    keys: [
      { id: 'current', value: 'Current' },
      { id: 'upcoming', value: 'Upcoming' },
    ],
  },
  {
    id: 'level',
    title: 'Level',
    keys: [
      { id: 'all', value: 'All' },
      { id: 'bg', value: 'Begginer' },
      { id: 'inter', value: 'Intermediate' },
      { id: 'adv', value: 'Advance' },
    ],
  },
];

const eventFilters = [
  {
    id: 'eventDate',
    title: 'Date',
    keys: [
      { id: 'current', value: 'Current' },
      { id: 'upcoming', value: 'Upcoming' },
    ],
  },
];

const info = {
  workshops: {
    title: 'Live Workshops',
    desc: 'Attend and explore workshops that interests you!',
  },
  events: {
    title: 'Explore Events',
    desc: 'Meet, interact and connect with the best, in the events!',
  },
};

export default function EventsPage() {
  const [currentFilters, setCurrentFilters] = useState<{ [key: string]: string }>({
    level: 'all',
  });
  const [currentEventFilters, setCurrentEventFilters] = useState<{ [key: string]: string }>({
    level: 'bg',
  });
  const [currentTab, setCurrentTab] = useState<'workshops' | 'events'>('workshops');
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* <EventsSheet open={open} setOpen={setOpen} /> */}
      <PortalSheet
        open={open}
        setOpen={setOpen}
        filters={currentTab === 'workshops' ? filters : eventFilters}
        currentFilters={currentTab === 'workshops' ? currentFilters : currentEventFilters}
        setCurrentFilters={currentTab === 'workshops' ? setCurrentFilters : setCurrentEventFilters}
      />

      <YStack flex={1} padding="$5">
        <XStack mb="$4" alignItems="center">
          <YStack mr="auto">
            <H2 fontWeight={'bold'}>{info[currentTab].title}</H2>
            <Paragraph width={'80%'} theme={'alt2'}>
              {info[currentTab].desc}
            </Paragraph>
          </YStack>
          <Filter color="white" onPress={() => setOpen(true)} />
        </XStack>

        <YStack flex={1}>
          <HorizontalTabs
            setCurrentTab={setCurrentTab}
            currentFilters={currentFilters}
            currentTab={currentTab}
          />
        </YStack>
      </YStack>
    </>
  );
}
