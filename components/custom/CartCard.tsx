// CartItem.tsx
import React, { useState } from 'react';
import { Image } from "react-native";
import { H6, H4, XStack, YStack, Button } from "tamagui";

export interface CartItemType {
    id: number;
    name: string;
    price: number;
    seller: string;
    quantity: number;
    image: any; // You might want to use a more specific type for images
  }

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: number) => void;
  onQuantityChange: (id: number, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove, onQuantityChange }) => {
    const [quantity, setQuantity] = useState(item.quantity);

    const increaseQuantity = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        onQuantityChange(item.id, newQuantity);
    };

    const decreaseQuantity = () => {
        const newQuantity = quantity > 1 ? quantity - 1 : 1;
        setQuantity(newQuantity);
        onQuantityChange(item.id, newQuantity);
    };

    return (
        <YStack width="100%" marginTop="$5">
            <XStack alignItems="center" justifyContent="flex-start" width="100%">
                <Image
                    source={item.image}
                    style={{
                        width: 120,
                        height: 120,
                        borderRadius: 20,
                    }}
                />

                <YStack justifyContent="center" marginLeft={40} height={120}>
                    <H4 fontWeight={700}>${item.price}</H4>
                    <H4 fontWeight={700}>{item.name}</H4>
                    <H6 fontSize={14} color={"#585858"}>Seller: {item.seller}</H6>
                </YStack>
            </XStack>

            <XStack alignItems="center" justifyContent="space-between" width="100%" marginTop="$3">
                <H6 color={"#585858"} onPress={() => onRemove(item.id)} style={{ cursor: 'pointer' }}>
                    Remove
                </H6>
                
                <XStack alignItems="center" justifyContent="flex-end" gap="$2">
                    <Button size="$4" backgroundColor="transparent" onPress={decreaseQuantity}>
                        -
                    </Button>
                    <H6 fontSize={14} color={"#585858"}>{quantity}</H6>
                    <Button size="$4" backgroundColor="transparent" onPress={increaseQuantity}>
                        +
                    </Button>
                </XStack>
            </XStack>
        </YStack>
    );
};

export default CartItem;