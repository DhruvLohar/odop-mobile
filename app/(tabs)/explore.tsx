import { Filter } from "iconsax-react-native";
import { useState } from "react";
import { Button, H2, H5, Input, Paragraph, ScrollView, Separator, SizableText, Tabs, type TabsContentProps, XStack, YStack } from "tamagui";
import FiltersSheet from "~/components/sheets/FiltersSheet";

export default function Explore() {

    const [open, setOpen] = useState(false)

    return (
        <>
            <FiltersSheet 
                open={open}
                setOpen={setOpen}
            />
            
            <YStack padding="$5">
                <H2 fontWeight={"bold"} mb="$2">Explore ODOP</H2>
                <Paragraph theme={"alt2"} fontSize={"$4"}>
                    Explore an exciting and diversed range of products, artifacts and handicrafts 
                    crafted by skilled and authentic artisans under the ODOP Scheme!  
                </Paragraph>

                <XStack my="$4" alignItems="center" justifyContent="space-between">
                    <Input 
                        flex={0.9}
                        placeholder="Search Products ..."
                    />

                    <Filter size={26} color="white" onPress={() => setOpen(true)} />
                </XStack>
            </YStack>
        </>
    )
}