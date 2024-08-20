import { useEffect, useMemo, useState } from 'react';
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
import { axiosRequest } from '~/lib/api';

function HorizontalTabs({ setCurrentTab, currentFilters }: any) {
  const router = useRouter();

  const [rentalMachines, setRentalMachines] = useState<any[]>([])

  async function fetchRentalMachines() {
    const res = await axiosRequest('community/rental_machines/', {
      method: 'get'
    }, false);

    if (res?.success) {
      setRentalMachines(res.rental_machines)
    }
  }

  useEffect(() => {
    console.log(currentFilters)
  }, [currentFilters])

  const filteredRentalMachines = useMemo(() => {

    let filteredData = rentalMachines;

    if (currentFilters['price'] != 'none') {
      if (currentFilters['price'] === 'lth') {
        filteredData = rentalMachines.sort((a, b) => a.rate - b.rate);
      } else if (currentFilters['price'] === 'htl') {
        filteredData = rentalMachines.sort((a, b) => b.rate - a.rate);
      }
    }

    return filteredData;

  }, [rentalMachines, currentFilters])

  useEffect(() => {
    fetchRentalMachines()
  }, [])

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
        <Button
          themeInverse
          position='absolute' bottom={5} right={5}
          borderRadius={60}
          icon={() => <Add size={24} color="#000000" />}
          onPress={() => router.push('/(protected)/artisan/portal/job/create')}
        >
          Add a Job
        </Button>
      </Tabs.Content>

      <Tabs.Content value="rental_machines" flex={1}>
        <ScrollView flex={1}>
          <YStack flex={1} alignItems="center">
            {filteredRentalMachines.map((rentalmachine: RentalMachine) => (
              <RentalMachineCard key={rentalmachine.id} {...rentalmachine} />
            ))}
          </YStack>
        </ScrollView>
        <Button
          themeInverse
          position='absolute' bottom={5} right={5}
          borderRadius={60}
          icon={() => <Add size={24} color="#000000" />}
          onPress={() => router.push('/(protected)/artisan/portal/rentalMachine/create')}
        >
          List a Machine
        </Button>
      </Tabs.Content>
    </Tabs>
  );
}

const filters = [
  { id: 'location', title: 'Location', keys: [
    {id: 'near', value: 'Near' },
    {id: 'far', value: 'Far' },
  ] },
  { id: 'price', title: 'Price', keys: [
    {id: 'htl', value: "High To Low"},
    {id: 'lth', value: "Low To High"},
    {id: 'none', value: "None"},
  ] },
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
  const [currentFilters, setCurrentFilters] = useState<{ [key: string]: string }>({
    'price': 'none'
  });
  const [currentTab, setCurrentTab] = useState<'job_portal' | 'rental_machines'>('job_portal');

  return (
    <YStack flex={1} padding="$5">

      <PortalSheet 
        open={open} setOpen={setOpen} 
        filters={filters} 
        currentFilters={currentFilters}
        setCurrentFilters={setCurrentFilters}
      />
      
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
          currentFilters={currentFilters} 
          setCurrentTab={setCurrentTab} 
        />
      </YStack>
    </YStack>
  );
}
