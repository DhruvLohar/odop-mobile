import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { H3,H6,Image, YStack, Paragraph, Tabs, XStack, H4 } from 'tamagui';
import productsData from '../../lib/data/products.json';
import ProductCard from '../../components/custom/ProductCard'; 

type Category = 'Edibles' | 'Clothing' | 'Handicraft';



const HomePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('Edibles');
  const { productsNearby, categoryProducts } = productsData;

  return (
    <ScrollView>
      <YStack flex={1} alignItems="center" paddingHorizontal="$5">
        <H3 width={"100%"} color="#fff">Good Afternoon, User</H3>
        <Paragraph width={"100%"} size={"$4"} theme="alt2" marginBottom={"$3"}>
          Ratnagiri, Maharashtra
        </Paragraph>
        
        <Image
          source={require('../../assets/HomePageImage.png')}
          style={{
            width: "100%",
            height: 200,
            borderRadius: 20,
            marginBottom: 20,
          }}
        />

        <H4 width={"100%"} color="#fff">Products Nearby</H4>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
          {productsNearby.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
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
                  {(categoryProducts[category as Category] || []).map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
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
