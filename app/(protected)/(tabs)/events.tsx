import { useState, useMemo } from 'react';
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
  XStack,
  YStack,
} from 'tamagui';
import workshops from '../../../lib/data/workshops.json';
import WorkshopCard from '../../../components/custom/WorkshopCard';
import EventCard from '../../../components/custom/EventCard';
import eventsData from '../../../lib/data/events.json';
import { Filter } from 'iconsax-react-native';
import PortalSheet from '~/components/sheets/PortalSheet';

function HorizontalTabs({
  setCurrentTab,
  currentFilters,
  currentTab,
  filteredWorkShops,
  filteredEvents,
}: any) {
  return (
    <Tabs
      defaultValue="workshops"
      orientation="horizontal"
      flexDirection="column"
      flex={1}
      borderRadius={'$5'}
      overflow="hidden"
      onValueChange={setCurrentTab}
      value={currentTab}>
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
            {filteredWorkShops.map((workshop: any) => (
              <WorkshopCard key={workshop.id} {...workshop} />
            ))}
          </YStack>
        </ScrollView>
      </Tabs.Content>

      <Tabs.Content value="events" flex={1}>
        <ScrollView flex={1}>
          <YStack flex={1} alignItems="center">
            {filteredEvents.map((event: any) => (
              <EventCard key={event.id} {...event} />
            ))}
          </YStack>
        </ScrollView>
      </Tabs.Content>
    </Tabs>
  );
}

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
      { id: 'bg', value: 'Beginner' },
      { id: 'inter', value: 'Intermediate' },
      { id: 'adv', value: 'Advanced' },
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
    desc: 'Attend and explore workshops that interest you!',
  },
  events: {
    title: 'Explore Events',
    desc: 'Meet, interact, and connect with the best at these events!',
  },
};

export default function EventsPage() {
  const [currentFilters, setCurrentFilters] = useState<{ [key: string]: string }>({
    level: 'all',
    workshopDate: 'current',
  });
  const [currentEventFilters, setCurrentEventFilters] = useState<{ [key: string]: string }>({
    eventDate: 'current',
  });
  const [currentTab, setCurrentTab] = useState<'workshops' | 'events'>('workshops');
  const [open, setOpen] = useState(false);

  const currentDate = new Date().toISOString().split('T')[0];

  const filteredWorkShops = useMemo(() => {
    let filteredData = workshops.workshops;

    if (currentFilters['level'] && currentFilters['level'] !== 'all') {
      const selectedLevel = currentFilters['level'];
      filteredData = filteredData.filter((workshop) =>
        workshop.categories.some((category) =>
          selectedLevel === 'bg'
            ? category === 'Beginner'
            : selectedLevel === 'inter'
              ? category === 'Intermediate'
              : selectedLevel === 'adv'
                ? category === 'Advanced'
                : true
        )
      );
    }

    if (currentFilters['workshopDate'] === 'current') {
      filteredData = filteredData
        .filter((workshop) => workshop.date >= currentDate)
        .sort((a, b) => a.date.localeCompare(b.date));
    } else if (currentFilters['workshopDate'] === 'upcoming') {
      filteredData = filteredData
        .filter((workshop) => workshop.date > currentDate)
        .sort((a, b) => b.date.localeCompare(a.date));
    }

    return filteredData;
  }, [currentFilters, currentDate]);

  const filteredEvents = useMemo(() => {
    let filteredData = eventsData.events;

    if (currentEventFilters['eventDate'] === 'current') {
      filteredData = filteredData
        .filter((event) => event.date >= currentDate)
        .sort((a, b) => a.date.localeCompare(b.date));
    } else if (currentEventFilters['eventDate'] === 'upcoming') {
      filteredData = filteredData
        .filter((event) => event.date > currentDate)
        .sort((a, b) => b.date.localeCompare(a.date));
    }

    return filteredData;
  }, [currentEventFilters, currentDate]);

  return (
    <>
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
            currentFilters={currentTab === 'workshops' ? currentFilters : currentEventFilters}
            currentTab={currentTab}
            filteredWorkShops={filteredWorkShops}
            filteredEvents={filteredEvents}
          />
        </YStack>
      </YStack>
    </>
  );
}
