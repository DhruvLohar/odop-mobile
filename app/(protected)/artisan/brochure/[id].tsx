import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { H3, H5, Paragraph, ScrollView, YStack, XStack, Separator } from "tamagui";
import { axiosRequest, MEDIA_URL } from "~/lib/api";
import { useSession } from "~/lib/auth";
import brochureData from "~/lib/data/brochuredata.json";

interface ProductCategory {
  name: string;
  description: string;
  image: string;
}

interface StoreInfo {
  phone: string;
  address: string;
  images: {
    storefront: string;
    map: string;
  };
}

interface Introduction {
  text: string;
  image: string;
}

interface MaterialsAndCraftsmen {
  text: string;
  image: string;
}

interface BrochureData {
  logo: string;
  title: string;
  introduction: Introduction;
  storeInfo: StoreInfo;
  productCategories: ProductCategory[];
  materialsAndCraftsmen: MaterialsAndCraftsmen;
}

const data: BrochureData = brochureData;

const ODOPBrochure: React.FC = () => {

  const { id } = useLocalSearchParams()
  const { session } = useSession()
  const [products, setProducts] = useState<Product[]>([])

  async function fetchProfileData() {
    const res = await axiosRequest(`${session?.role}/${session?.id}/`, { method: 'get' }, false);

    if (res?.success) {
      setProducts(res?.products);
    }
  }

  useEffect(() => {
    fetchProfileData()
  }, [])

  return (
    <ScrollView>
      <YStack padding="$3">
        <YStack alignItems="center">
          <Image
            source={require(`~/assets/Logo.png`)}
            style={{ height: 180, width: 180, resizeMode: "contain" }}
          />
        </YStack>

        <YStack space="$2">
          <H3>Introduction</H3>
          <XStack alignItems="center">
            <YStack flex={1}>
              <Paragraph marginBottom="$5" theme="alt2">{products[0].artisan.about_me}</Paragraph>
            </YStack>
          </XStack>
        </YStack>

        <YStack>
          <H3 marginBottom="$2">Store Info</H3>
          <XStack space="$4" alignItems="center">
            <YStack flex={1}>
              <Image
                source={require(`~/assets/brochure/Rectangle3.png`)}
                style={{ width: "100%", height: 220, borderRadius: 10 }}
              />
            </YStack>
            <YStack flex={1}>
              <Paragraph theme="alt2" size="$2">Phone: {data.storeInfo.phone}</Paragraph>
              <Paragraph theme="alt2" size="$2">Address: {data.storeInfo.address}</Paragraph>
              <Image
                source={require(`~/assets/brochure/Rectangle2.png`)}
                style={{ width: "100%", height: 150, borderRadius: 10, marginTop: 10 }}
              />
            </YStack>
          </XStack>
        </YStack>

        <Separator my="$6" />

        <YStack space="$4">
          <H3 alignSelf="center" marginBottom="$3">Products</H3>
          {products.map((product: Product, index) => (
            <XStack
              key={index}
              space="$4"
              alignItems="center"
              flexDirection={index % 2 === 0 ? "row" : "row-reverse"}
            >
              <YStack flex={1}>
                <H5>{product.title}</H5>
                <Paragraph theme="alt2" size="$2" lineBreakMode="tail" numberOfLines={3}>{product.description}...</Paragraph>
              </YStack>
              <YStack flex={1}>
                <Image
                  source={{ uri: MEDIA_URL + product.images[0] }}
                  style={{ width: "100%", height: 150, borderRadius: 20, objectFit: 'cover' }}
                />
              </YStack>
            </XStack>
          ))}
        </YStack>

        <Separator my="$6" />

        <YStack space="$4">
          <H3>Materials and Craftsmen</H3>
          <Image
            source={require(`~/assets/brochure/Rectangle9.png`)}
            style={{ width: "100%", height: 200, borderRadius: 10 }}
          />
          <Paragraph theme="alt2">{data.materialsAndCraftsmen.text}</Paragraph>
        </YStack>
      </YStack>
    </ScrollView>
  );
};

export default ODOPBrochure;
