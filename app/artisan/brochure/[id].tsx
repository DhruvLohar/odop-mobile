import React from "react";
import { Image } from "react-native";
import { H3, H5, Paragraph, ScrollView, YStack, XStack, Separator } from "tamagui";
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
  return (
    <ScrollView>
      <YStack padding="$3">
        <YStack alignItems="center">
          <Image
            source={require(`~/assets/brochure/ODOP1.png`)}
            style={{ height: 130, width: 130, resizeMode: "contain" }}
          />
        </YStack>

        <YStack space="$2">
          <H3>Introduction</H3>
          <XStack alignItems="center">
            <YStack flex={1}>
              <Paragraph marginBottom="$5" theme="alt2">{data.introduction.text}</Paragraph>
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
                style={{ width: "100%", height: 150, borderRadius: 10 }}
              />
            </YStack>
          </XStack>
        </YStack>

        <Separator my="$6" />

        <YStack space="$4">
          <H3 alignSelf="center" marginBottom="$3">Product Categories</H3>
          {data.productCategories.map((product, index) => (
            <XStack
              key={index}
              space="$4"
              alignItems="center"
              flexDirection={index % 2 === 0 ? "row" : "row-reverse"}
            >
              <YStack flex={1}>
                <H5>{product.name}</H5>
                <Paragraph theme="alt2" size="$2">{product.description}</Paragraph>
              </YStack>
              <YStack flex={1}>
                <Image
                  source={require(`~/assets/brochure/Rectangle4.png`)}
                  style={{ width: "100%", height: 150, borderRadius: 20 }}
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
