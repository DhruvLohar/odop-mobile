import { View,Text } from "react-native";
import { H2, H5,H6, ScrollView, XStack, YStack } from "tamagui";

export default function Individualorder() {
    return (
        <ScrollView>
            <YStack flex={1} alignItems="center" paddingHorizontal="$5" paddingVertical="$3">
                <YStack borderWidth={1} borderColor={"#222222"} flex={1} alignItems="center" width={"100%"} borderRadius={"$4"} padding={"$5"} gap={"$3"} marginBottom={"$5"}>
                    <H5>Order #123123</H5>

                    <YStack backgroundColor="#191919" borderRadius={20} paddingHorizontal="$3" paddingVertical="$1" marginRight="$2">
                        <Text style={{ color: '#fff', fontWeight: '500' }}>Pending</Text>
                    </YStack>

                    <YStack alignSelf="flex-start">
                        <H6 size={16} color={"#585858"} marginLeft="$2">Order Date</H6>
                        <H6 size={16} marginLeft="$2">25 June</H6>
                    </YStack>

                    <YStack alignSelf="flex-start" width={"100%"}>
                        <H6 size={16} color={"#585858"} marginLeft="$2">Product Details</H6>
                        <XStack  flex={1} justifyContent="space-between">
                            <H6 size={16} marginLeft="$2">Wood Craft</H6>
                            <H6 size={16} marginLeft="$2">$256</H6>
                        </XStack>
                        <XStack  flex={1} justifyContent="space-between">
                            <H6 size={16} marginLeft="$2">Wood Toy</H6>
                            <H6 size={16} marginLeft="$2">$24</H6>
                        </XStack>

                        <YStack alignSelf="flex-start" marginTop="$2">
                        <H6 size={16} color={"#585858"} marginLeft="$2">Total</H6>
                        <H6 size={16} marginLeft="$2">$280</H6>
                    </YStack>

                    </YStack>
                </YStack>
            </YStack>

            {/* Shipping details */}


            <YStack flex={1} alignItems="center" paddingHorizontal="$5">
                <YStack borderWidth={1} borderColor={"#222222"} flex={1} alignItems="center" width={"100%"} borderRadius={"$4"} padding={"$5"} gap={"$3"} marginBottom={"$5"}>
                    <H5>Shipping Details</H5>

                    <YStack alignSelf="flex-start" width={"100%"}>
                        <H6 size={16} color={"#585858"} marginLeft="$2">Shipping Address</H6>
                        <H6 size={16} marginLeft="$2">8, Dream Park, Ashoka Marg, Nashik</H6>
                    </YStack>

                    <YStack alignSelf="flex-start" width={"100%"}>
                        <H6 size={16} color={"#585858"} marginLeft="$2">Shipping Method</H6>
                        <H6 size={16} marginLeft="$2">Standard Shipping</H6>
                    </YStack>

                    <YStack alignSelf="flex-start" width={"100%"}>
                        <H6 size={16} color={"#585858"} marginLeft="$2">Tracking no.</H6>
                        <H6 size={16} marginLeft="$2">12345678</H6>
                    </YStack>

                </YStack>
            </YStack>

        </ScrollView>
    )
}
