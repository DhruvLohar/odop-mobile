import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { H3, H6, Image, YStack, Paragraph, Tabs, XStack, H4, H2, Card, SizableText } from 'tamagui';
import productsData from '../../../lib/data/products.json';
import ProductCard from '../../../components/custom/ProductCard';
import { Location } from 'iconsax-react-native';
import CustomCarousel from '~/components/ui/Carousel';
import Index from '~/components/ui/CircleCarousel';
import DistrictCard from '~/components/custom/DistrictCard';
import { StatusBar } from 'expo-status-bar';

const districtData = [
  {
    districtName: 'Lucknow',
    imageUrl:
      'https://images.unsplash.com/photo-1679958854536-a1bb774ef8ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    districtName: 'Kanpur',
    imageUrl:
      'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=1060&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    districtName: 'Agra',
    imageUrl:
      'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=1060&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    districtName: 'Varanasi',
    imageUrl:
      'https://images.unsplash.com/photo-1679958854536-a1bb774ef8ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

type Category = 'Edibles' | 'Clothing' | 'Handicraft';

const CarouselItem = ({ item, index }: any) => {
  return (
    <>
      <Image
        source={item}
        width={'100%'}
        height={'100%'}
        style={{ borderRadius: 20, objectFit: 'cover' }}
      />
    </>
  );
};

const HomePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('Edibles');
  const { productsNearby, categoryProducts } = productsData;

  return (
    <ScrollView>
      <StatusBar style='light' />

      <YStack flex={1} alignItems="flex-start" justifyContent="flex-start" padding="$5">
        <H3 fontSize={'$9'} mb="$2" fontWeight={'bold'}>
          Good Afternoon, User
        </H3>
        <XStack justifyContent="center" alignItems="center" columnGap="$2">
          <Location size={20} color="#ffffffAA" />
          <Paragraph theme={'alt2'} fontSize={'$5'}>
            Ratnagiri, Maharashtra
          </Paragraph>
        </XStack>

        {/* <Image
          source={require('../../assets/HomePageImage.png')}
          style={{
            width: "100%",
            height: 200,
            borderRadius: 20,
            marginVertical: 20,
          }}
        /> */}
        <CustomCarousel
          data={[
            require('~/assets/carousel/car-1.jpg'),
            require('~/assets/carousel/car-2.jpg'),
            require('~/assets/carousel/car-3.jpg'),
          ]}
          CarouselItem={CarouselItem}
        />

        <H4 width={'100%'} color="#fff">
          Products Nearby
        </H4>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
          <XStack alignItems="center" justifyContent="center" columnGap="$4">
            {productsNearby.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </XStack>
        </ScrollView>

        <H4 color="#fff" mt="$4">
          Explore Districts
        </H4>

        <XStack flex={1} justifyContent="space-between" w={'100%'} mt="$4">
          <YStack w="48%" gap="$2">
            {districtData.slice(0, 2).map((district, index) => (
              <DistrictCard
                key={index}
                districtName={district.districtName}
                imageUrl={district.imageUrl}
                height={index % 2 == 0 ? '$20' : '$15'}
              />
            ))}
          </YStack>

          <YStack w="48%" gap="$2">
            {districtData.slice(2, 4).map((district, index) => (
              <DistrictCard
                key={index}
                districtName={district.districtName}
                imageUrl={district.imageUrl}
                height={index % 2 == 1 ? '$20' : '$15'}
              />
            ))}
          </YStack>
        </XStack>

        <H4 width={'100%'} color="#fff" mt="$10">
          Learn More about the Benefits
        </H4>
        <Index />
      </YStack>
    </ScrollView>
  );
};

export default HomePage;
