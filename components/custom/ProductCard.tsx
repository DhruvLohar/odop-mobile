import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { H6, YStack } from 'tamagui';

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
  'Product3.png': require('../../assets/Products/Product3.png'),
};

const ProductCard: React.FC<ProductCardProps> = ({ name, price, location, image }) => {
  return (
    <YStack marginRight="$3" marginTop="$1" borderRadius="$3" width={150} backgroundColor="$backgroundStrong" padding="$1">
      <Image
        source={imageMap[image]}
        style={{
          width: "100%",
          height: 200,
          borderRadius: 10,
          marginBottom: 10,
        }}
      />
      <H6 size={"$4"}>{name}</H6>
      <H6 size={"$1"} theme="alt2">{location}</H6>
      <H6 size={"$5"}>{price}</H6>
    </YStack>
  );
};

export default ProductCard;
