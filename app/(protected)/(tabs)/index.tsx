import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { H3, H6, Image, YStack, Paragraph, Tabs, XStack, H4, H2, Card, SizableText } from 'tamagui';
import productsData from '../../../lib/data/products.json';
import ProductCard from '../../../components/custom/ProductCard';
import { Location } from 'iconsax-react-native';
import CustomCarousel from '~/components/ui/Carousel';
import Index from '~/components/ui/CircleCarousel';
import DistrictCard from '~/components/custom/DistrictCard';
import { StatusBar } from 'expo-status-bar';
import KnowMoreCard from '~/components/custom/KnowMoreCard';
import { useSession } from '~/lib/auth';
import { productsHome } from '~/lib/data/productsHome';
<<<<<<< HEAD
import { axiosRequest } from '~/lib/api';
=======
import WalkthroughCard from '~/components/custom/WalkthroughCard';
>>>>>>> d580204253f8b04975f845dcc56a74a866019227

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
  const { session } = useSession();

  const [activeCategory, setActiveCategory] = useState<Category>('Edibles');
  const { productsNearby, categoryProducts } = productsData;

  const [products, setProducts] = useState<Product[]>([])

  async function fetchProducts() {
    const res = await axiosRequest('product/', {
      method: 'get',
    }, false);

    if (res) {
      setProducts(res)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <ScrollView>
      <StatusBar style="light" />

      <YStack flex={1} alignItems="flex-start" justifyContent="flex-start" paddingHorizontal="$5">
        <YStack mt="$4" mb="$2">
          <H4 theme="alt2" fontSize={'$8'} mb="$2">Good Afternoon,</H4>
          <H4 fontSize={'$9'} marginBottom="$2" fontWeight={'bold'}>
            {session?.name}
          </H4>
        </YStack>
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

        <H4 width={'100%'} color="#fff" mb="$2">
          Products Nearby
        </H4>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
          <XStack alignItems="center" justifyContent="center" columnGap="$4">
            {products.length > 0 ? (
              <>
                {products.map(product => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </>
            ) : <SizableText>No Products Available</SizableText>}
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

<<<<<<< HEAD
        <H4 width={'100%'} color="#fff" mt="$10">
          Success Stories of our artisans
=======
        <YStack width="100%" marginTop="$7">
          <H4 marginBottom="$3">Explore how this app works</H4>
          <WalkthroughCard/>
        </YStack>

        <H4 width={'100%'} color="#fff" mt="$7">
          Learn More about the Benefits
>>>>>>> d580204253f8b04975f845dcc56a74a866019227
        </H4>
        <Index />

        <YStack width="100%" marginTop="$3">
          <KnowMoreCard />
        </YStack>

        
      </YStack>
    </ScrollView>
  );
};

export default HomePage;
