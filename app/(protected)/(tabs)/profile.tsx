import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { MoneySend, More } from "iconsax-react-native";
import { useRef, useState } from "react";
import workshops from '~/lib/data/workshops.json';
import WorkshopCard from '~/components/custom/WorkshopCard';
import { Avatar, Button, Card, H3, H4, Paragraph, ScrollView, Separator, SizableText, Tabs, type TabsContentProps, XStack, YStack } from "tamagui";
import ProfileDetails from "~/components/profile/DetailsSheet";
import GetInTouch from "~/components/profile/GetInTouch";
import productsData from '~/lib/data/products.json';
import ProductCard from '~/components/custom/ProductCard';
import SupportArtisan from "~/components/profile/SupportArtisanSheet";
import WithRole from "~/components/shared/WithRole";
import { useSession } from "~/lib/auth";

function HorizontalTabs({ internalScrollEnabled }: { internalScrollEnabled: boolean }) {

  const { productsNearby, categoryProducts } = productsData;

  return (
    <Tabs
      defaultValue="products"
      orientation="horizontal"
      flexDirection="column"
      width={"100%"}
      height={1000}
      borderRadius={"$5"}
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
        <ScrollView>
          <YStack>
            {productsNearby.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </YStack>
        </ScrollView>
      </Tabs.Content>

      <Tabs.Content value="workshops" flex={1}>
        <ScrollView nestedScrollEnabled={true} flex={1}>
          <YStack alignItems="center" flex={1}>
            {workshops.workshops.map(workshop => (
              <WorkshopCard
                key={workshop.id}
                {...workshop}
              />
            ))}
          </YStack>
        </ScrollView>
      </Tabs.Content>
    </Tabs>
  );
}

const TabsContent = (props: TabsContentProps) => {
  return (
    <Tabs.Content
      key="tab3"
      padding="$2"
      alignItems="center"
      justifyContent="center"
      flex={1}
      borderWidth={0}
      {...props}>
      {props.children}
    </Tabs.Content>
  );
};

export default function ProfilePage() {

  const { logOut } = useSession()
  const router = useRouter()

  const [open, setOpen] = useState(false);
  const [openSupport, setOpenSupport] = useState(false);
  const [openGetInTouch, setOpenGetInTouch] = useState(false);

  const separatorRef = useRef<any>(null)
  const [internalScrollEnabled, setInternalScrollEnabled] = useState(true)

  async function handleLogout() {
    await logOut()
    router.replace('/auth/onboarding')
  }

  return (
    <>
      <SupportArtisan open={openSupport} setOpen={setOpenSupport} />

      <ProfileDetails
        open={open}
        setOpen={setOpen}
        handleLogout={handleLogout}
      />

      <GetInTouch open={openGetInTouch} setOpen={setOpenGetInTouch} />
      <StatusBar style="light" />

      <ScrollView
        stickyHeaderIndices={[3]}
      >

        <XStack width={'100%'} justifyContent="center" alignItems="center">
          <Avatar circular size="$11">
            <Avatar.Image
              accessibilityLabel="Nate Wienert"
              src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?&w=100&h=100&dpr=2&q=80"
            />
            <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
          </Avatar>

          <YStack marginLeft="$5">
            <H3 fontWeight={'bold'}>Aadish Gotekar</H3>
            <Paragraph
              flexDirection="row"
              alignItems="center"
              fontSize={'$5'}
              theme={'alt2'}
              fontWeight={'bold'}>
              Cottonapur, Nigeria
            </Paragraph>
          </YStack>

          <Button
            circular
            icon={() => <More rotation={90} size={22} color="white" />}
            padding="$2"
            ml="auto"
            onPress={() => setOpen(true)}
          />
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
                <H3 fontWeight={'bold'}>100+</H3>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
            </Paragraph>
          </YStack>

          <YStack>
            <XStack mb="$4" justifyContent="space-between">
              <Button width={'48%'}>View Brochure</Button>
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
        </WithRole>

        <Separator ref={separatorRef} marginVertical="$5" />

        <HorizontalTabs internalScrollEnabled={internalScrollEnabled} />
      </ScrollView>
    </>
  )
}
