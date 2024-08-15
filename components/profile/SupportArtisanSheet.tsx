import { MoneySend } from "iconsax-react-native";
import React from "react";
import { Button, H1, Input, Label, Paragraph, Sheet, XStack } from "tamagui";

type SupportArtisanProps = {
    open: boolean,
    setOpen: any
}

export default function SupportArtisan({
    open, setOpen
}: SupportArtisanProps) {

    return (
        <Sheet
            forceRemoveScrollEnabled={open}
            modal
            open={open}
            onOpenChange={setOpen}
            snapPointsMode="fit"
            dismissOnSnapToBottom
            zIndex={100_000}
        >
            <Sheet.Overlay
                animation={"lazy"}
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
            />

            <Sheet.Handle backgroundColor={"white"} />

            <Sheet.Frame padding="$5" justifyContent="flex-start" alignItems="flex-start">
                <H1 fontSize={"$9"} fontWeight={"bold"}>Support Artisan</H1>
                <Paragraph theme={"alt2"} fontSize={"$5"}>Stand behind our Artisans: Secure and Trustworthy Support at your fingertips</Paragraph>

                <XStack my="$6" columnGap="$4">
                    <Button size={"$8"} circular themeInverse>
                        ₹10
                    </Button>
                    <Button size={"$8"} circular>
                        ₹100
                    </Button>
                    <Button size={"$8"} circular>
                        ₹500
                    </Button>
                </XStack>

                <Label fontSize={"$6"} mb="$2">Or donate as you wish</Label>
                <Input 
                    width={"100%"}
                    size={"$5"}
                    keyboardType="numeric"
                    placeholder="Enter an amount" 
                />

                <Button 
                    my="$6"
                    icon={() => <MoneySend color="black" />} themeInverse
                    width={"100%"}
                >DONATE NOW</Button>

            </Sheet.Frame>

        </Sheet>
    )
}