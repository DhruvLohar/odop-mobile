import { StatusBar } from "expo-status-bar";
import { Filter } from "iconsax-react-native";
import { useState } from "react";
import { FlatList } from "react-native";
import { Button, H2, H5, Input, Paragraph, ScrollView, Separator, SizableText, Tabs, type TabsContentProps, XStack, YStack } from "tamagui";
import ProductCard from "~/components/custom/ProductCard";
import FiltersSheet from "~/components/sheets/FiltersSheet";
import productsData from '~/lib/data/products.json';

export default function Explore() {

    const [open, setOpen] = useState(false)
    const { productsNearby, categoryProducts } = productsData;

    const renderItem = ({ item }: any) => (
        <ProductCard key={item.id} {...item} />
    );

    return (
        <>
            <FiltersSheet
                open={open}
                setOpen={setOpen}
            />
            <StatusBar style="light" />

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

                <ScrollView>
                    <YStack 
                        width={"100%"} 
                        justifyContent="center" alignItems="center"
                        rowGap="$6"
                    >
                        {Array.from({ length: 10 }).map((_, idx) => (
                            <XStack 
                                key={idx}
                                width={"100%"}
                                alignItems="center" justifyContent="space-between"
                            >
                                {productsNearby.slice(0, 2).map(product => (
                                    <ProductCard key={product.id} {...product} />
                                ))}
                            </XStack>
                        ))}
                    </YStack>
                </ScrollView>
            </YStack>
        </>
    )
}