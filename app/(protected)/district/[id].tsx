import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { H2, H3, H6, ScrollView, XStack, YStack,Paragraph,Button, Avatar } from 'tamagui';
import { Location } from 'iconsax-react-native';
import productsData from '~/lib/data/products.json';
import ProductCard from '~/components/custom/ProductCard';

const images = [
  require('~/assets/Workshops/Workshop1.jpg'), 
  require('~/assets/Workshops/Workshop2.jpg'), 
  require('~/assets/Workshops/Workshop3.jpg'),
];

export default function WorkshopAll() {
  const { productsNearby, categoryProducts } = productsData;
    return (
      <ScrollView>
        <YStack flex={1} alignItems="center" paddingHorizontal="$5" paddingVertical="$3">
          <H2 textAlign='center' width={"100%"}>
                Lucknow
            </H2>
            <YStack width={"100%"}>
                <Paragraph width={"100%"} size={"$3"} theme="alt2" textAlign='center' marginBottom={"$3"}>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere reiciendis ipsum culpa quis obcaecati deleniti, animi in dolorum atque
                </Paragraph>
            </YStack>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            paddingVertical="$1"
            paddingBottom="$4"
            contentContainerStyle={{
            alignItems: 'center',
            }}
          >
            {images.map((image, index) => (
              <Image
                key={index}
                source={image}
                style={{
                  width: 200,
                  height: 250,
                  borderRadius: 10,
                  marginRight: 10, 
                }}
              />
            ))}
          </ScrollView>

          <YStack>
          <H3 textAlign='center' width={"100%"}>
                Artisans
            </H3>
          </YStack>
          <ScrollView horizontal my="$5">
            <XStack gap="$4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Avatar key={i} circular size="$6">
                  <Avatar.Image
                    accessibilityLabel="Nate Wienert"
                    src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?&w=100&h=100&dpr=2&q=80"
                  />
                  <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
                </Avatar>
              ))}
            </XStack>
          </ScrollView>

          <H3 textAlign='center' marginBottom="$3" width={"100%"}>
              Products
            </H3>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
          <XStack alignItems="center" justifyContent="center" columnGap="$4">
            {productsNearby.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </XStack>
        </ScrollView>

      

        </YStack>
      </ScrollView>
    );
  }