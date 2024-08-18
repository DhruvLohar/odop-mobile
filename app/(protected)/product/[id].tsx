import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ShoppingCart } from 'iconsax-react-native';
import {
  Avatar,
  Button,
  H1,
  H2,
  H3,
  H5,
  H6,
  Image,
  Paragraph,
  ScrollView,
  Separator,
  SizableText,
  Tabs,
  TabsContentProps,
  XStack,
  YStack,
} from 'tamagui';
import AddressInfo from '~/components/sheets/AddressInfoSheet';
import { useRouter, Href } from 'expo-router';

function Info({ title, content }: { title: string; content: string }) {
  return (
    <YStack flex={1}>
      <H6 theme="alt2">{title}</H6>
      <SizableText>{content}</SizableText>
    </YStack>
  );
}

function HorizontalTabs() {
  const router = useRouter();

  return (
    <Tabs
      defaultValue="details"
      orientation="horizontal"
      flexDirection="column"
      width={'100%'}
      minHeight={200}
      height={'auto'}
      borderRadius={'$5'}
      marginVertical="$5"
      overflow="hidden">
      <Tabs.List separator={<Separator vertical />} mb="$4">
        <Tabs.Tab flex={1} value="details">
          <SizableText fontFamily="$body">About Product</SizableText>
        </Tabs.Tab>
        <Tabs.Tab flex={1} value="artisan">
          <SizableText fontFamily="$body">Artisan</SizableText>
        </Tabs.Tab>
      </Tabs.List>

      <TabsContent value="details">
        <Paragraph textAlign="justify" theme={'alt2'} lineHeight={'$1'}>
          This exquisite wooden sculpture is a testament to fine craftsmanship. Made from premium
          quality oak wood, it is a perfect addition to any home decor, embodying both elegance and
          cultural heritage.This exquisite wooden sculpture is a testament to fine craftsmanship.
          Made from premium quality oak wood, it is a perfect addition to any home decor, embodying
          both elegance and cultural heritage.
        </Paragraph>

        <XStack p="$2" mt="$2">
          <Info title="MATERIAL" content="Pure Silk" />
          <Info title="DIMENSIONS" content="12 x 14 foot" />
        </XStack>
        <XStack p="$2">
          <Info title="WEIGHT" content="500g" />
          <Info title="IS CUSTOMIZABLE" content="true" />
        </XStack>
      </TabsContent>

      <TabsContent value="artisan">
        <XStack>
          <Avatar flex={0.4} mr="$4" circular size="$8">
            <Avatar.Image
              accessibilityLabel="Nate Wienert"
              src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?&w=100&h=100&dpr=2&q=80"
            />
            <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
          </Avatar>
          <YStack flex={0.6}>
            <H3>Aadish Gotekar</H3>
            <Paragraph textAlign="left" theme={'alt2'}>
              Mr. Gote is a master woodcarver with over 25 years of experience. His works are
              renowned for their intricate details and cultural significance, reflecting the rich
              heritage of Balinese art.
            </Paragraph>
          </YStack>
        </XStack>
        <Button
          width={'100%'}
          my="$4"
          onPress={() => router.push('/(protected)/artisan/profile/AadishGotekar' as Href)}>
          Visit Profile
        </Button>
      </TabsContent>
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

export default function ProductPage() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <ScrollView>
      <AddressInfo open={open} setOpen={setOpen} />
      <YStack padding="$5">
        <StatusBar style="light" />

        <XStack gap="$3" justifyContent="flex-start" alignItems="center">
          <Paragraph fontSize={'$5'} fontWeight={'bold'} theme={'alt2'}>
            Burari, Uttar Pradesh
          </Paragraph>
          <Separator rotate="10deg" vertical height={'80%'} />
          <Paragraph>Clothing</Paragraph>
        </XStack>

        <Image
          source={{
            uri: 'https://arunakullu.com/wp-content/uploads/2024/01/71F3Vs3jiuL._SY741_.jpg',
          }}
          width={'100%'}
          height={550}
          style={{ objectFit: 'cover', marginVertical: 20, borderRadius: 25 }}
        />

        <H1 fontSize={'$8'}>Kashmiri Wool Silks Kalamkari Shawl</H1>
        <SizableText fontSize={'$10'} lineHeight={'$10'}>
          ₹23,000
        </SizableText>

        <HorizontalTabs />

        <YStack>
          <H3 mb="$2">Explore similar artisans</H3>
          <Paragraph theme={'alt2'} lineHeight={'$1'}>
            These are some artisan belonging to the Burari, Uttar Pradesh District selling similar
            products.
          </Paragraph>
          <ScrollView horizontal my="$5">
            <XStack gap="$4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Avatar key={i} circular size="$7">
                  <Avatar.Image
                    accessibilityLabel="Nate Wienert"
                    src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?&w=100&h=100&dpr=2&q=80"
                  />
                  <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
                </Avatar>
              ))}
            </XStack>
          </ScrollView>
        </YStack>

        <YStack>
          <H3 mb="$2">People also buy</H3>
          <Paragraph>idhar product cards dalde</Paragraph>
        </YStack>
      </YStack>
      <XStack flex={1} p="$4" gap="$4">
        <Button
          themeInverse
          width={'48%'}
          onPress={() => {
            setOpen(true);
          }}>
          Buy Now
        </Button>
        <Button
          onPress={() => {
            router.push('/order/cart');
          }}
          width={'48%'}
          icon={() => <ShoppingCart size="32" color="#d9e3f0" variant="Bold" />}>
          Add to Cart{' '}
        </Button>
      </XStack>
    </ScrollView>
  );
}
