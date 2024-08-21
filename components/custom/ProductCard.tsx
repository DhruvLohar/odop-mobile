import { Link } from 'expo-router';
import { Location } from 'iconsax-react-native';
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { H3, H6, Paragraph, SizableText, XStack, YStack } from 'tamagui';
import { MEDIA_URL } from '~/lib/api';

// const imageMap: { [key: string]: any } = {
//   'Product1.png': require('../../assets/Products/Product1.png'),
//   'Product2.png': require('../../assets/Products/Product2.png'),
// };

const ProductCard: React.FC<Product> = (product) => {
  return (
    <Link href={`/product/${product.id}`}>
      <YStack backgroundColor="$backgroundStrong">
        {product?.images?.length > 0 && (
          <Image
            // source={{ uri: MEDIA_URL + product.images[0] }}
            source={{
              uri: 'https://rukminim2.flixcart.com/image/850/1000/xif0q/shawl/g/f/o/free-flower-shawl-mehroon-krew-original-imaghrza9zqtgcz4.jpeg?q=90&crop=false',
            }}
            style={{
              minWidth: 180,
              width: '100%',
              height: 230,
              objectFit: 'cover',
              borderRadius: 15,
            }}
          />
        )}
        <H6 width={'40%'} fontSize={'$5'} mt="$2" numberOfLines={2}>
          {product.title}
        </H6>
        <XStack theme="alt2" alignItems="center" mt="$1" mb="$2">
          <Location size={18} color="#ffffffa7" />
          <Paragraph fontWeight={'bold'} ml="$2">
            Burari, Uttar Pradesh
          </Paragraph>
        </XStack>
        <H3>₹{product.price * 10}</H3>
      </YStack>
    </Link>
  );
};

export default ProductCard;
