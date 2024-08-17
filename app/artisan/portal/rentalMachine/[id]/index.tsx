import React from "react";
import { Image } from "react-native";
import { H2, H5, Paragraph, ScrollView, Button, XStack, YStack, Separator } from "tamagui";

const rentalMachine = {
    image: require('~/assets/Machines/Machine1.jpg'),
    name: "Pottery Maker", 
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum, explicabo.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum, explicabo.",
    price: "$100/day",
    availability: "Available" 
};

export default function RentalMachinePage() {
    return (
        <ScrollView flex={1} padding="$5">
            <YStack>
                <Image
                    source={rentalMachine.image}
                    style={{
                        width: "100%",
                        height: 250,
                        borderRadius: 20,
                        marginBottom: 20,
                    }}
                />

                <H2 marginBottom="$3" fontWeight="bold">
                    {rentalMachine.name}
                </H2>
                
                <Paragraph theme="alt2" size="$5" lineHeight="$4">
                    {rentalMachine.description}
                </Paragraph>

                <Separator marginVertical="$4" />
                
                <YStack space="$4">
                    <XStack justifyContent="space-between" alignItems="center">
                        <H5 theme="alt2" fontWeight="600">Price:</H5>
                        <Paragraph size="$7" fontWeight="500">
                            {rentalMachine.price}
                        </Paragraph>
                    </XStack>

                    <XStack justifyContent="space-between" alignItems="center">
                        <H5 theme="alt2" fontWeight="600">Availability:</H5>
                        <Paragraph size="$5" fontWeight="500" color={rentalMachine.availability === "Available" ? "#00C851" : "#ff4444"}>
                            {rentalMachine.availability}
                        </Paragraph>
                    </XStack>
                </YStack>

                <Separator marginVertical="$4" />

                <Button size="$6" backgroundColor="#191919" borderRadius="$4" fontWeight="600" alignSelf="flex-end">
                    Rent This Machine
                </Button>
            </YStack>
        </ScrollView>
    )
}
