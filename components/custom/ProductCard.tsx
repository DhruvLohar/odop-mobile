import { Link } from 'expo-router';
import { Location } from 'iconsax-react-native';
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { H3, H6, Paragraph, SizableText, XStack, YStack } from 'tamagui';

type ProductCardProps = {
  id: number;
  name: string;
  price: string;
  location: string;
  image: string;
};

const imageMap: { [key: string]: any } = {
  'Product1.png': require('../../assets/Products/Product1.png'),
  'Product2.png': require('../../assets/Products/Product2.png'),
};

const ProductCard: React.FC<ProductCardProps> = ({ name, price, location, image }) => {
  return (
    <Link href={`/product/${name}`}>
      <YStack backgroundColor="$backgroundStrong">
        <Image
          source={imageMap[image]}
          style={{
            minWidth: 200,
            width: "100%",
            height: 250,
            objectFit: 'cover'
          }}
        />
        <H6 size={"$6"} mt="$2">{name}</H6>
        <XStack theme="alt2" alignItems='center' mt="$1" mb="$2">
          <Location size={18} color='#ffffffa7' />
          <Paragraph fontWeight={"bold"} ml="$2">{location}</Paragraph>
        </XStack>
        <H3>{price}</H3>
      </YStack>
    </Link>
  );
};

export default ProductCard;
