import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { H3, H6, Image, YStack, Paragraph, Tabs, XStack, H4, H2 } from 'tamagui';
import productsData from '../../lib/data/products.json';
import ProductCard from '../../components/custom/ProductCard';
import { Location } from 'iconsax-react-native';

type Category = 'Edibles' | 'Clothing' | 'Handicraft';



const HomePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('Edibles');
  const { productsNearby, categoryProducts } = productsData;

  return (
    <ScrollView>
      <YStack flex={1} alignItems="flex-start" justifyContent='flex-start' padding="$5">
        <H3 fontSize={"$9"} mb="$2" fontWeight={"bold"}>Good Afternoon, User</H3>
        <XStack justifyContent='center' alignItems='center' columnGap="$2">
          <Location size={20} color="#ffffffAA" />
          <Paragraph theme={"alt2"} fontSize={"$5"}>
            Ratnagiri, Maharashtra
          </Paragraph>
        </XStack>

        <Image
          source={require('../../assets/HomePageImage.png')}
          style={{
            width: "100%",
            height: 200,
            borderRadius: 20,
            marginVertical: 20,
          }}
        />

        <H4 width={"100%"} color="#fff">Products Nearby</H4>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
          <XStack alignItems='center' justifyContent='center' columnGap="$4">
            {productsNearby.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </XStack>
        </ScrollView>

        <YStack width={"100%"} flexDirection="row" alignItems="center" justifyContent="space-between" marginTop="$7">
          <H4 color="#fff">Explore More</H4>
          <H6 size={"$3"} theme="alt2">See More</H6>
        </YStack>

        <YStack width="100%" flexDirection="row">
          <Tabs defaultValue="Edibles" orientation="horizontal" flexDirection="column" width="100%" height={400} marginTop="$2">
            <Tabs.List disablePassBorderRadius="bottom" aria-label="Product categories" backgroundColor="transparent" style={{ marginRight: 10 }}>
              {Object.keys(categoryProducts).map((category) => (
                <Tabs.Tab
                  key={category}
                  value={category}
                  flex={1}
                  unstyled
                  onPress={() => setActiveCategory(category as Category)}
                >
                  <XStack backgroundColor="transparent" alignItems="center" justifyContent="flex-start" width={"100%"} borderBottomWidth={2} borderBottomColor={activeCategory === category ? '$orange10' : 'transparent'} paddingVertical="$2" paddingLeft="$3">
                    <H6 size={"$2"} color={activeCategory === category ? '$orange10' : '$gray10'} fontWeight={activeCategory === category ? "bold" : "normal"}>
                      {category}
                    </H6>
                  </XStack>
                </Tabs.Tab>
              ))}
            </Tabs.List>

            {Object.keys(categoryProducts).map((category) => (
              <Tabs.Content key={category} value={category}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10, height: "auto" }}>
                  <XStack alignItems='center' justifyContent='center' columnGap="$4">
                    {(categoryProducts[category as Category] || []).map((product) => (
                      <ProductCard key={product.id} {...product} />
                    ))}
                  </XStack>
                </ScrollView>
              </Tabs.Content>
            ))}
          </Tabs>
        </YStack>
      </YStack>
    </ScrollView>
  );
};

export default HomePage;
