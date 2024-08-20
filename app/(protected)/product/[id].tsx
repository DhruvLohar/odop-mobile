import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
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
} from 'tamagui';
import AddressInfo from '~/components/sheets/AddressInfoSheet';
import { useRouter, Href } from 'expo-router';
import { useCart } from '~/app/context/CartContext';

function Info({ title, content }: { title: string; content: string }) {
  return (
    <YStack flex={1}>
      <H3 theme="alt2">{title}</H3>
      <SizableText>{content}</SizableText>
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
          {product.description}
        </Paragraph>

        <XStack p="$2" mt="$2">
          <Info title="MATERIAL" content={product.product_details.material} />
          <Info
            title="DIMENSIONS"
            content={`${product.dimensions.h} x ${product.dimensions.l} cm`}
          />
        </XStack>
        <XStack p="$2">
          <Info title="WEIGHT" content={product.product_details.weight} />
          <Info title="IS CUSTOMIZABLE" content={product.is_customizable ? 'Yes' : 'No'} />
        </XStack>
      </TabsContent>

      <TabsContent value="artisan">
        <XStack>
          <Avatar flex={0.4} mr="$4" circular size="$8">
            <Avatar.Image
              accessibilityLabel={product.artisan.name}
              src={`${product.artisan.profile_image}`}
            />
            <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
          </Avatar>
          <YStack flex={0.6}>
            <H3>{product.artisan.name}</H3>
            <Paragraph textAlign="left" theme={'alt2'}>
              {product.back_story}
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

  const product: Product = {
    artisan: {
      id: 123,
      name: 'Aadish Gotekar',
      phone_number: '8888888888',
      profile_image:
        'https://images.unsplash.com/photo-1531384441138-2736e62e0919?&w=100&h=100&dpr=2&q=80',
    },
    back_story: 'A beautiful handcrafted shawl from Kashmir.',
    cancelled_at: null,
    category: 'Clothing',
    created_at: '2024-01-01T00:00:00Z',
    description: 'This Kashmiri Wool Silks Kalamkari Shawl is a luxurious piece crafted with care.',
    dimensions: {
      h: 12,
      l: 14,
    },
    id: 1,
    images: ['https://arunakullu.com/wp-content/uploads/2024/01/71F3Vs3jiuL._SY741_.jpg'],
    is_customizable: true,
    is_verified: true,
    modified_at: '2024-01-15T00:00:00Z',
    price: 23000,
    product_details: {
      material: 'Silk',
      weight: '500g',
    },
    quantity: 1,
    raw_material: 'Wool',
    restock_date: null,
    tax_percent: 5,
    title: 'Kashmiri Wool Silks',
  };

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
          <Paragraph>{product.category}</Paragraph>
        </XStack>

        {product.images[0] ? (
          <Image
            source={{ uri: product.images[0] }}
            width={'100%'}
            height={550}
            style={{ objectFit: 'cover', marginVertical: 20, borderRadius: 25 }}
          />
        ) : null}

        <H1 fontSize={'$8'}>{product.title}</H1>
        <SizableText fontSize={'$10'} lineHeight={'$10'}>
          ₹{product.price.toLocaleString('en-IN')}
        </SizableText>

        <HorizontalTabs product={product} />

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
                    src={`${product.artisan.profile_image}`}
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
            try {
              addToCart(product);
              router.push('/order/cart' as Href);
            } catch (error) {
              console.error('Navigation error:', error);
            }
          }}
          width={'48%'}
          icon={() => <ShoppingCart size="32" color="#d9e3f0" variant="Bold" />}>
          Add to Cart
        </Button>
      </XStack>
    </ScrollView>
  );
}
