import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ShoppingCart } from 'iconsax-react-native';
import {
  Avatar,
  Button,
  H1,
  H3,
  Paragraph,
  ScrollView,
  Separator,
  SizableText,
  Tabs,
  TabsContentProps,
  XStack,
  YStack,
  Image,
  H4,
  H5,
} from 'tamagui';
import AddressInfo from '~/components/sheets/AddressInfoSheet';
import { useRouter, Href, useLocalSearchParams } from 'expo-router';
import { useCart } from '~/app/context/CartContext';
import { axiosRequest, MEDIA_URL } from '~/lib/api';

function Info({ title, content }: { title: string; content: string }) {
  return (
    <YStack flex={1}>
      <H5 theme="alt2">{title}</H5>
      <SizableText>{content || '-'}</SizableText>
    </YStack>
  );
}

function HorizontalTabs({ product }: { product: Product }) {
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
          {product?.description}
        </Paragraph>

        <XStack p="$2" mt="$2">
          <Info title="MATERIAL" content={product?.product_details?.material} />
          <Info
            title="DIMENSIONS"
            content={`${product?.dimensions.h} x ${product?.dimensions.l} cm`}
          />
        </XStack>
        <XStack p="$2">
          <Info title="WEIGHT" content={product?.product_details?.weight} />
          <Info title="IS CUSTOMIZABLE" content={product?.is_customizable ? 'Yes' : 'No'} />
        </XStack>
      </TabsContent>

      <TabsContent value="artisan">
        <XStack>
          <Avatar flex={0.4} mr="$4" circular size="$8">
            <Avatar.Image
              accessibilityLabel={product?.artisan?.name}
              src={`${product?.artisan?.profile_image}`}
            />
            <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
          </Avatar>
          <YStack flex={0.6}>
            <H3>{product?.artisan?.name}</H3>
            <Paragraph textAlign="left" theme={'alt2'}>
              {product?.back_story}
            </Paragraph>
          </YStack>
        </XStack>
        <Button width={'100%'} my="$4" onPress={() => console.log('Button Press')}>
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
  const { addToCart } = useCart();

  const { id } = useLocalSearchParams()
  const [product, setProduct] = useState<Product | null>(null)

  async function fetchProduct() {
    const res = await axiosRequest(`product/${id}/`, {
      method: 'get'
    }, false);

    if (res) {
      setProduct(res)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  return (
    <ScrollView>
      <AddressInfo open={open} setOpen={setOpen} />
      <YStack padding="$5">
        <StatusBar style="light" />

        <XStack gap="$3" justifyContent="flex-start" alignItems="center">
          <Paragraph fontSize={'$5'} fontWeight={'bold'} theme={'alt2'}>
            {product?.artisan.district}, {product?.artisan.state}
          </Paragraph>
          <Separator rotate="10deg" vertical height={'80%'} />
          <Paragraph>{product?.category}</Paragraph>
        </XStack>

        {product?.images && product?.images?.length > 0 && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} my="$5">
            <XStack gap="$2">
              {product?.images.map((imageUri, index) => (
                <Image
                  key={index}
                  source={{ uri: MEDIA_URL + imageUri }}
                  width={380}
                  height={550}
                  style={{ objectFit: 'cover', borderRadius: 25 }}
                />
              ))}
            </XStack>
          </ScrollView>
        )}

        <H1 fontSize={'$8'}>{product?.title}</H1>
        <SizableText fontSize={'$10'} lineHeight={'$10'}>
          ₹{product?.price}
        </SizableText>

        <HorizontalTabs product={product as Product} />

        <YStack>
          <H3 mb="$2">Explore similar artisans</H3>
          <Paragraph theme={'alt2'} lineHeight={'$1'}>
            These are some artisans belonging to the Burari, Uttar Pradesh District selling similar
            products.
          </Paragraph>
          <ScrollView horizontal my="$5">
            <XStack gap="$4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Avatar key={i} circular size="$7">
                  <Avatar.Image
                    accessibilityLabel="Nate Wienert"
                    src={product?.artisan.profile_image as string}
                  />
                  <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
                </Avatar>
              ))}
            </XStack>
          </ScrollView>
        </YStack>

        <YStack>
          <H3 mb="$2">People also buy</H3>
          <Paragraph>Product cards for similar items would go here.</Paragraph>
        </YStack>
      </YStack>
      <XStack flex={1} p="$4" gap="$4" justifyContent='flex-start' alignItems='center'>
        <Button
          circular size={"$5"} themeInverse
          icon={() => <ShoppingCart color='black' />}
          onPress={() => {
            try {
              addToCart(product as Product);
              router.push('/order/cart' as Href);
            } catch (error) {
              console.error('Navigation error:', error);
            }
          }}
        >
        </Button>

        <Button
          themeInverse
          width={'80%'}
          onPress={() => {
            setOpen(true);
          }}>
          Buy Now
        </Button>
      </XStack>
    </ScrollView>
  );
}
