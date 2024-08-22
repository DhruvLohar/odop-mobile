import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Box, Edit2, Logout, MoneySend, More } from 'iconsax-react-native';
import { useEffect, useRef, useState } from 'react';
import workshops from '~/lib/data/workshops.json';
import WorkshopCard from '~/components/custom/WorkshopCard';
import {
  Avatar,
  Button,
  Card,
  H3,
  H4,
  Paragraph,
  ScrollView,
  Separator,
  SizableText,
  Tabs,
  type TabsContentProps,
  XStack,
  YStack,
} from 'tamagui';
import ProfileDetails from '~/components/profile/DetailsSheet';
import GetInTouch from '~/components/profile/GetInTouch';
import productsData from '~/lib/data/products.json';
import ProductCard from '~/components/custom/ProductCard';
import SupportArtisan from '~/components/profile/SupportArtisanSheet';
import WithRole from '~/components/shared/WithRole';
import { useSession } from '~/lib/auth';
import { productsHome } from '~/lib/data/productsHome';
import { FlatList } from 'react-native';
import { axiosRequest } from '~/lib/api';


function HorizontalTabs({ workshops, products }: any) {

  const renderItem = (data: any) => (
    <XStack key={data.index} alignItems="center" justifyContent="space-between" space="$4">
      {data.item?.map((product: Product, idx: number) => <ProductCard key={idx} {...product} />)}
    </XStack>
  );

  const chunkArray = (array: any[], size: number): any[] => {
    const result = [];

    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }

    return result;
  };

  return (
    <Tabs
      defaultValue="products"
      orientation="horizontal"
      flexDirection="column"
      width={'100%'}
      height={2000}
      borderRadius={'$5'}
      overflow="hidden"
    >
      <Tabs.List separator={<Separator vertical />} mb="$4">
        <Tabs.Tab flex={1} value="products">
          <SizableText fontFamily="$body">Products</SizableText>
        </Tabs.Tab>
        <Tabs.Tab flex={1} value="workshops">
          <SizableText fontFamily="$body">Workshops</SizableText>
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Content value="products" flex={1}>
        <YStack>
          {products && products.length > 0 ? (
            <YStack width={'100%'} justifyContent="center" alignItems="center" rowGap="$4">
              <FlatList
                data={chunkArray(products, 2)}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </YStack>
          ) : <SizableText>No Products Listed.</SizableText>}
        </YStack>
      </Tabs.Content>

      <Tabs.Content value="workshops" flex={1}>
        {workshops?.length > 0 ? (
          <ScrollView nestedScrollEnabled={true} flex={1}>
            <YStack alignItems="center" flex={1}>
              {workshops.map((workshop: Workshop) => (
                <WorkshopCard key={workshop.id} {...workshop} />
              ))}
            </YStack>
          </ScrollView>
        ) : (<SizableText>No Workshops Attended / Hosted</SizableText>)}
      </Tabs.Content>
    </Tabs>
  );
}

export default function ProfilePage() {
  const { session, logOut } = useSession();
  const router = useRouter();

  const [profile, setProfile] = useState<Artisan | any>();
  const [products, setProducts] = useState<Product[]>([])
  const [workshops, setWorkshops] = useState<Workshop[]>([])

  const [open, setOpen] = useState(false);
  const [openSupport, setOpenSupport] = useState(false);
  const [openGetInTouch, setOpenGetInTouch] = useState(false);

  const separatorRef = useRef<any>(null);

  async function handleLogout() {
    await logOut();
    router.replace('/auth/onboarding');
  }

  async function fetchProfileData() {
    const res = await axiosRequest(`${session?.role}/${session?.id}/`, { method: 'get' }, false);

    if (res?.success) {
      setProfile(res?.profile)

      if (session?.role === "artisan") {
        setProducts(res?.products);
        setWorkshops(res?.workshops)
      }
    }
  }

  useEffect(() => {
    fetchProfileData()
  }, [])

  return (
    <>
      <SupportArtisan open={openSupport} setOpen={setOpenSupport} />

      <ProfileDetails open={open} setOpen={setOpen} handleLogout={handleLogout} />

      <GetInTouch open={openGetInTouch} setOpen={setOpenGetInTouch} />
      <StatusBar style="light" />

      <ScrollView stickyHeaderIndices={[3]} paddingHorizontal="$5">
        <XStack 
          width={'100%'} mb="$4" justifyContent="center" alignItems="center"
          flexDirection={session?.role === 'user' ? 'column' : 'row'}
        >
          <Avatar circular size="$11">
            <Avatar.Image
              src={profile?.profile_image as string}
            />
            <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
          </Avatar>

          <YStack 
            marginLeft={session?.role === 'user' ? '0' : '$5'} 
            alignItems={session?.role === 'user' ? 'center' : 'flex-start'}
            mt={session?.role === 'user' ? '$2' : '0'}
          >  
            <H3 fontWeight={'bold'}>{session?.name}</H3>
            <Paragraph
              flexDirection="row"
              alignItems="center"
              fontSize={'$5'}
              theme={'alt2'}
              fontWeight={'bold'}
            >
              <WithRole role="artisan">
                {profile?.district}, {profile?.state}
              </WithRole>
              <WithRole role="user">
                {profile?.city}, {profile?.state}
              </WithRole>
            </Paragraph>
          </YStack>

          <WithRole role="artisan">
            <Button
              circular
              icon={() => <More rotation={90} size={22} color="white" />}
              padding="$2"
              ml="auto"
              onPress={() => setOpen(true)}
            />
          </WithRole>
        </XStack>

        <WithRole role="artisan">
          <XStack width={'100%'} alignItems="center">
            <Card backgroundColor={'transparent'} flex={1}>
              <Card.Header alignItems="center">
                <H3 fontWeight={'bold'}>4.3</H3>
                <Paragraph theme={'alt2'}>Average Rating</Paragraph>
              </Card.Header>
            </Card>
            <Separator vertical height={'$6'} />
            <Card backgroundColor={'transparent'} flex={1}>
              <Card.Header alignItems="center">
                <H3 fontWeight={'bold'}>2</H3>
                <Paragraph theme={'alt2'}>Orders</Paragraph>
              </Card.Header>
            </Card>
            <Separator vertical height={'$6'} />
            <Card backgroundColor={'transparent'} flex={1}>
              <Card.Header alignItems="center">
                <H3 fontWeight={'bold'}>86%</H3>
                <Paragraph theme={'alt2'}>Interactivity</Paragraph>
              </Card.Header>
            </Card>
          </XStack>

          <YStack padding="$0" mb="$6">
            <H4 mb="$1" padding="$0">
              About Me
            </H4>
            <Paragraph theme={'alt2'} lineHeight={'$1'} textAlign="justify" padding="$0">
              {profile?.about_me}
            </Paragraph>
          </YStack>

          <YStack>
            <XStack mb="$4" justifyContent="space-between">
              <Button width={'48%'} onPress={() => router.push(`/(protected)/artisan/brochure/${profile.id}`)}>View Brochure</Button>
              <Button
                width={'48%'}
                onPress={() => {
                  setOpenGetInTouch(true);
                }}>
                Get In Touch
              </Button>
            </XStack>
            <Button
              themeInverse
              icon={() => <MoneySend color="black" />}
              onPress={() => setOpenSupport(true)}>
              Support Artisan
            </Button>
          </YStack>

          <Separator ref={separatorRef} marginVertical="$5" />

          <HorizontalTabs
            products={products}
            workshops={workshops}
          />
        </WithRole>

        <WithRole role='user'>
          <YStack padding="$0" mb="$6">
            <H4 mb="$1" padding="$0">
              Email
            </H4>
            <Paragraph theme={'alt2'} lineHeight={'$1'} textAlign="justify" padding="$0">
              {profile?.email}
            </Paragraph>
          </YStack>

          <YStack padding="$0" mb="$6">
            <H4 mb="$1" padding="$0">
              Address
            </H4>
            <Paragraph theme={'alt2'} lineHeight={'$1'} textAlign="justify" padding="$0">
              {profile?.address}
            </Paragraph>
          </YStack>

          <YStack rowGap="$4">
            <Button
              icon={() => <Box color="white" />}
              onPress={() => router.push('/(protected)/')}
            >
              Edit Profile
            </Button>
            <Button
              icon={() => <Box color="white" />}
              onPress={() => router.push('/(protected)/order/all')}
            >
              My Orders
            </Button>
            <Button
              themeInverse
              icon={() => <Logout color="black" />}
              onPress={handleLogout}>
              Logout
            </Button>
          </YStack>
        </WithRole>

      </ScrollView>
    </>
  );
}
