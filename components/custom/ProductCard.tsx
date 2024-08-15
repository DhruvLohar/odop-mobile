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

const ProductCard: React.FC<ProductCardProps> = ({ name, price, location, image }) => {
  return (
    <YStack marginRight="$3" marginTop="$1" borderRadius="$3" width={150} backgroundColor="$backgroundStrong" padding="$1">
      <Image
        source={{ uri: image }}
        style={styles.productImage}
      />
      <H6 size={"$4"}>{name}</H6>
      <H6 size={"$1"} theme="alt2">{location}</H6>
      <H6 size={"$5"}>{price}</H6>
    </YStack>
  );
};

const styles = StyleSheet.create({
  productImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#ddd',
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default ProductCard;
