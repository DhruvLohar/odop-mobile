import { StatusBar } from 'expo-status-bar';
import { Filter } from 'iconsax-react-native';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import {
  Button,
  H2,
  H5,
  Input,
  Paragraph,
  ScrollView,
  Separator,
  SizableText,
  Tabs,
  type TabsContentProps,
  XStack,
  YStack,
} from 'tamagui';
import ProductCard from '~/components/custom/ProductCard';
import FiltersSheet from '~/components/sheets/FiltersSheet';
import { axiosRequest } from '~/lib/api';
import productsData from '~/lib/data/products.json';
import { productsHome } from '~/lib/data/productsHome';

export default function Explore() {
  const [open, setOpen] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);

  const renderItem = (data: any) => (
    <XStack flex={1} key={data.index} alignItems="center" justifyContent="space-between" space="$4" mb="$4" minHeight={300}>
      {data.item?.map((product: Product, idx: number) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </XStack>
  );

  const chunkArray = (array: any[], size: number): any[] => {
    const result = [];

    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }

    return result;
  };

  async function fetchProducts() {
    const res = await axiosRequest(
      'product/',
      {
        method: 'get',
      },
      false
    );

    if (res || res.length > 0) {
      setProducts(res);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <FiltersSheet open={open} setOpen={setOpen} />
      <StatusBar style="light" />

      <YStack padding="$5">
        <H2 fontWeight={'bold'} mb="$2">
          Explore ODOP
        </H2>
        <Paragraph theme={'alt2'} fontSize={'$4'}>
          Explore an exciting and diversed range of products, artifacts and handicrafts crafted by
          skilled and authentic artisans under the ODOP Scheme!
        </Paragraph>

        <XStack my="$4" alignItems="center" justifyContent="space-between">
          <Input flex={0.9} placeholder="Search Products ..." />

          <Filter size={26} color="white" onPress={() => setOpen(true)} />
        </XStack>

        {/* <ScrollView> */}
        {products && products.length > 0 && (
          <YStack width={'100%'} justifyContent="center" alignItems="center" rowGap="$4" paddingBottom="$10">
            <FlatList
              data={chunkArray(products, 2)}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </YStack>
        )}
        {/* </ScrollView> */}
      </YStack>
    </>
  );
}
