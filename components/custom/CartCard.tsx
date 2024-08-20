// CartItem.tsx (Updated)

import React, { useState } from 'react';
import { Image } from 'react-native';
import { H6, H4, XStack, YStack, Button } from 'tamagui';
import { useCart } from '~/app/context/CartContext';

interface CartItemProps {
  item: Product;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const { removeFromCart, updateQuantity } = useCart(); // Access the cart context functions

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateQuantity(item.id, newQuantity); // Update the quantity using the context function
  };

  const decreaseQuantity = () => {
    const newQuantity = quantity > 1 ? quantity - 1 : 1;
    setQuantity(newQuantity);
    updateQuantity(item.id, newQuantity); // Update the quantity using the context function
  };

  const handleRemove = () => {
    removeFromCart(item.id); // Remove the item using the context function
  };

  return (
    <YStack width="100%" marginTop="$5">
      <XStack alignItems="center" justifyContent="flex-start" width="100%">
        <Image
          source={{ uri: item.images[0] }} // Assuming the first image in the array is used
          style={{
            width: 120,
            height: 120,
            borderRadius: 20,
          }}
        />

        <YStack justifyContent="center" marginLeft={40} height={120}>
          <H4 fontWeight={700}>${item.price}</H4>
          <H6 fontWeight={700}>{item.title}</H6>
          <H6 fontSize={14} color={'#585858'}>
            Seller: {item.artisan.name}
          </H6>
        </YStack>
      </XStack>

      <XStack alignItems="center" justifyContent="space-between" width="100%" marginTop="$3">
        <H6 color={'#585858'} onPress={handleRemove} style={{ cursor: 'pointer' }}>
          Remove
        </H6>

        <XStack alignItems="center" justifyContent="flex-end" gap="$2">
          <Button size="$4" backgroundColor="transparent" onPress={decreaseQuantity}>
            -
          </Button>
          <H6 fontSize={14} color={'#585858'}>
            {quantity}
          </H6>
          <Button size="$4" backgroundColor="transparent" onPress={increaseQuantity}>
            +
          </Button>
        </XStack>
      </XStack>
    </YStack>
  );
};

export default CartItem;
