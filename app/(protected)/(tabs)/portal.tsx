import { useState } from 'react';
import {
  Button,
  H2,
  H3,
  H5,
  H6,
  Paragraph,
  ScrollView,
  Separator,
  SizableText,
  Tabs,
  type TabsContentProps,
  XStack,
  YStack,
} from 'tamagui';
import JobPortalCard from '~/components/custom/JobPortalCard';
import jobs from '~/lib/data/Jobs.json';
import RentalMachineCard from '~/components/custom/RentalMachineCard';
import rentalmachine from '~/lib/data/rentalmachine.json';
import { Filter, Add } from 'iconsax-react-native';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import PortalSheet from '~/components/sheets/PortalSheet';

function HorizontalTabs({ setCurrentTab }: any) {
  const router = useRouter();
  return (
    <Tabs
      defaultValue="job_portal"
      orientation="horizontal"
      flexDirection="column"
      flex={1}
      borderRadius={'$5'}
      overflow="hidden"
      onValueChange={setCurrentTab}>
      <Tabs.List separator={<Separator vertical />} mb="$4">
        <Tabs.Tab flex={1} value="job_portal">
          <SizableText fontFamily="$body">Job Portal</SizableText>
        </Tabs.Tab>
        <Tabs.Tab flex={1} value="rental_machines">
          <SizableText fontFamily="$body">Machines On Rent</SizableText>
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Content value="job_portal" padding="$1" flex={1}>
        <ScrollView flex={1}>
          <YStack flex={1} alignItems="center">
            {jobs.jobs.map((jobs) => (
              <JobPortalCard key={jobs.id} {...jobs} />
            ))}
          </YStack>
        </ScrollView>
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 5,
            right: 5,
            backgroundColor: '#ffffff',
            borderRadius: 15,
            padding: 10,
            elevation: 5,
          }}
          onPress={() => {
            router.push('/(protected)/artisan/portal/job/create');
          }}>
          <XStack flex={1} alignItems="center">
            <Add size="24" color="#000000" />
            <H6 size="$5" marginLeft="$3" theme="alt2">
              Add a Job
            </H6>
          </XStack>
        </TouchableOpacity>
      </Tabs.Content>

      <Tabs.Content value="rental_machines" flex={1}>
        <ScrollView flex={1}>
          <YStack flex={1} alignItems="center">
            {rentalmachine.rentalmachine.map((rentalmachine) => (
              <RentalMachineCard key={rentalmachine.id} {...rentalmachine} />
            ))}
          </YStack>
        </ScrollView>
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 5,
            right: 5,
            backgroundColor: '#ffffff',
            borderRadius: 15,
            padding: 10,
            elevation: 5,
          }}
          onPress={() => {
            router.push('/(protected)/artisan/portal/rentalMachine/create');
          }}>
          <XStack flex={1} alignItems="center">
            <Add size="24" color="#000000" />
            <H6 size="$5" marginLeft="$3" theme="alt2">
              List a Machine
            </H6>
          </XStack>
        </TouchableOpacity>
      </Tabs.Content>
    </Tabs>
  );
}

const filters = [
  { id: 'location', title: 'Location', keys: ['Nearest', 'Farthest'] },
  { id: 'price', title: 'Price', keys: ['High to low', 'Low to high'] },
];

const info = {
  job_portal: {
    title: 'Job Portal',
    desc: 'Look out for the jobs that suit you!',
  },
  rental_machines: {
    title: 'Machine On Rents',
    desc: "Want some machines to use but won't buy it? We got you!",
  },
};

export default function PortalView() {
  const [open, setOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [currentTab, setCurrentTab] = useState<'job_portal' | 'rental_machines'>('job_portal');

  function toggleFilter(id: string) {
    if (selectedFilters.includes(id)) {
      setSelectedFilters((prev) => prev.filter((item) => item !== id));
    } else {
      setSelectedFilters((prev) => [id, ...prev]);
    }
  }

  return (
    <YStack flex={1} padding="$5">
      <PortalSheet open={open} setOpen={setOpen} filters={filters} />
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
        <HorizontalTabs setCurrentTab={setCurrentTab} />
      </YStack>
    </YStack>
  );
}
