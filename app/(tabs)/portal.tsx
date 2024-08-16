import { useState } from "react";
import { Button, H2, H3, H5, Paragraph, ScrollView, Separator, SizableText, Tabs, type TabsContentProps, XStack, YStack } from "tamagui";

import { Filter } from "iconsax-react-native";


function HorizontalTabs({ setCurrentTab }: any) {
    return (
        <Tabs
            defaultValue="job_portal"
            orientation="horizontal"
            flexDirection="column"
            flex={1}
            borderRadius={"$5"}
            overflow="hidden"

            onValueChange={setCurrentTab}
        >
            <Tabs.List
                separator={<Separator vertical />}
                mb="$4"
            >
                <Tabs.Tab flex={1} value="job_portal">
                    <SizableText fontFamily="$body">Job Portal</SizableText>
                </Tabs.Tab>
                <Tabs.Tab flex={1} value="rental_machines">
                    <SizableText fontFamily="$body">Machines On Rent</SizableText>
                </Tabs.Tab>
            </Tabs.List>

            <Tabs.Content value="job_portal" flex={1}>
                <ScrollView flex={1}>
                    <YStack alignItems="center" flex={1}>
                        <H2>Job Portal</H2>
                    </YStack>
                </ScrollView>
            </Tabs.Content>

            <Tabs.Content value="rental_machines" flex={1}>
                <ScrollView flex={1}>
                    <YStack flex={1} alignItems="center" paddingVertical="$5">
                        <H2>Machines on Rent</H2>
                    </YStack>
                </ScrollView>
            </Tabs.Content>
        </Tabs>
    )
}

const filters = [
    { id: "location", title: "Location", keys: ["Nearest", "Farthest"] },
    { id: "level", title: "Level", keys: ["Begineer", "Intermidate", "Advance"] },
    { id: "price", title: "Price", keys: ["High to low", "Low to high"] },
]

const info = {
    "job_portal": {
        title: "Job Portal",
        desc: "Look out for the jobs that suits you!"
    },
    "rental_machines": {
        title: "Machine On Rents",
        desc: "Want some machines to use but won't buy it? We got you!"
    }
}

export default function PortalView() {

    const [selectedFilters, setSelectedFilters] = useState<string[]>([])
    const [currentTab, setCurrentTab] = useState<"job_portal" | "rental_machines">("job_portal")

    function toogleFilter(id: string) {
        if (selectedFilters.includes(id)) {
            setSelectedFilters(prev => prev.filter(item => item !== id))
        } else {
            setSelectedFilters(prev => [id, ...prev])
        }
    }

    return (
        <YStack flex={1} padding="$5">
            <XStack mb="$4" alignItems="center">
                <YStack mr="auto">
                    <H2 fontWeight={"bold"}>{info[currentTab].title}</H2>
                    <Paragraph width={"80%"} theme={"alt2"}>{info[currentTab].desc}</Paragraph>
                </YStack>
                <Filter color="white" />
            </XStack>

            <YStack flex={1}>
                <HorizontalTabs setCurrentTab={setCurrentTab} />
            </YStack>
        </YStack>
    )
}