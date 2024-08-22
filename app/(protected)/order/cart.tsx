import React, { useState } from 'react';
import { H2, H6, ScrollView, XStack, YStack, Button, Paragraph } from 'tamagui';
import CartItem from '~/components/custom/CartCard';
import AddressInfo from '~/components/sheets/AddressInfoSheet';
import { useCart } from '~/app/context/CartContext';

export default function Cart() {
  const [open, setOpen] = useState(false);

  // Using the cart context
  const { cartItems } = useCart();

  // Calculate the subtotal
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => item.price * 1, 0);
  };

  const subtotal = calculateSubtotal();

  return (
    <ScrollView>
      <AddressInfo open={open} setOpen={setOpen} />
      <YStack flex={1} alignItems="center" paddingVertical="$3" paddingHorizontal="$5">
        <H2 width={'100%'} fontWeight={700}>
          Cart
        </H2>
        <H6 width={'100%'} color={'#585858'} marginTop="$3">
          Your cart: Save, Review, and checkout with ease
        </H6>

        {cartItems.length === 0 ? (
          <Paragraph marginTop="$5" fontSize={16} color="#585858">
            No items in cart
          </Paragraph>
        ) : (
          cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))
        )}

        {cartItems.length > 0 && (
          <YStack marginTop="$7" width={'100%'}>
            <H2 width={'100%'} fontWeight={700} marginBottom={'$5'}>
              Calculated Costing
            </H2>
            <XStack justifyContent="space-between" width="100%" paddingHorizontal={'$5'}>
              <H6 size={14} width={'30%'} color={'#585858'} fontWeight={700}>
                Subtotal
              </H6>
              <H6 size={14} marginLeft={'$5'} fontWeight={700}>
              ₹{subtotal.toFixed(2)}
              </H6>
            </XStack>
            <XStack
              justifyContent="space-between"
              width="100%"
              marginTop={'$2'}
              paddingHorizontal={'$5'}>
              <H6 size={14} width={'30%'} color={'#585858'} fontWeight={700}>
                Shipping
              </H6>
              <H6 size={14} marginLeft={'$5'} fontWeight={700}>
                FREE
              </H6>
            </XStack>

            <XStack
              justifyContent="space-between"
              width="100%"
              marginTop={'$5'}
              paddingHorizontal={'$5'}>
              <H6 size={14} width={'30%'} fontWeight={700}>
                Order Total
              </H6>
              <H6 size={14} marginLeft={'$5'} fontWeight={700}>
              ₹{subtotal.toFixed(2)}
              </H6>
            </XStack>

            <Button
              size="$5"
              borderRadius={20}
              backgroundColor="#191919"
              marginTop={'$7'}
              onPress={() => {
                setOpen(true);
              }}>
              Checkout
            </Button>
          </YStack>
        )}
      </YStack>
    </ScrollView>
  );
}
