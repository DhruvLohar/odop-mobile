import { H3, H5, Text, H6, XStack, YStack, ScrollView, Paragraph, Button, Input, Label } from "tamagui";
import { useState } from 'react';
import CustomSelect from "~/components/shared/CustomSelect";

export default function CheckoutPage() {
    const [paymentMethod, setPaymentMethod] = useState<string | undefined>('cash-on-delivery');
    const [showOnlineMessage, setShowOnlineMessage] = useState(false);

  const paymentOptions = [
    { id: 'cash-on-delivery', value: 'Cash on Delivery' },
    { id: 'online', value: 'Online' },
  ];

    return (
        <ScrollView>
            <YStack flex={1} alignItems="center" paddingHorizontal="$5" paddingVertical="$3">
                <H3 width={"100%"}>Order Summary</H3>
                <Paragraph width={"100%"} marginBottom="$5" color={"#585858"}>
                    Review the details of your order before completing payment.
                </Paragraph>
                <YStack borderWidth={1} borderColor={"#222222"} flex={1} alignItems="center" width={"100%"} borderRadius={"$4"} padding={"$3"} gap={"$3"} marginBottom={"$5"}>
                    <YStack alignSelf="flex-start" width={"100%"}>
                        <XStack flex={1} justifyContent="space-between">
                            <H6 color={"#585858"} marginLeft="$2">Wood Craft</H6>
                            <H6 color={"#585858"} marginLeft="$2">$256</H6>
                        </XStack>
                        <XStack flex={1} justifyContent="space-between" marginBottom="$4">
                            <H6 color={"#585858"} marginLeft="$2">Wood Toy</H6>
                            <H6 color={"#585858"} marginLeft="$2">$24</H6>
                        </XStack>
                        <XStack flex={1} justifyContent="space-between">
                            <H6 marginLeft="$2">Sub-Total</H6>
                            <H6 marginLeft="$2">$280</H6>
                        </XStack>
                    </YStack>
                </YStack>

                <H3 width={"100%"} marginTop="$5">Proceed to Pay</H3>

                <CustomSelect
                    label=""
                    value={paymentMethod}
                    setValue={setPaymentMethod}
                    options={paymentOptions}
                />
                {paymentMethod === 'online' && (
                    <YStack width={"100%"} marginTop="$3">
                    <Label htmlFor="card-no" marginBottom="$2">Card Number</Label>
                    <Input id="card-no" placeholder="Enter your card number" />
          
                    <YStack justifyContent="space-between" gap="$5" marginTop="$3">
                      <YStack flex={1}>
                        <Label htmlFor="cvv" marginBottom="$2">CVV</Label>
                        <Input id="cvv" placeholder="Enter CVV" />
                      </YStack>
                      <YStack flex={1}>
                        <Label htmlFor="expiry-date" marginBottom="$2">Expiry Date</Label>
                        <Input id="expiry-date" placeholder="MM/YY" />
                      </YStack>
                    </YStack>
                  </YStack>
                )}

                <Button size="$4" marginTop="$4" width={"100%"} backgroundColor="#191919">
                    Proceed
                </Button>
            </YStack>
        </ScrollView>
    );
}
