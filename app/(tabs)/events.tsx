import { useState } from "react";
import { Button, H2, H5, Paragraph, ScrollView, Separator, SizableText, Tabs, type TabsContentProps, YStack } from "tamagui";

function HorizontalTabs({ setCurrentTab }: any) {
    return (
        <Tabs
            defaultValue="workshops"
            orientation="horizontal"
            flexDirection="column"
            width={"100%"}
            height={150}
            borderRadius={"$5"}
            overflow="hidden"
            onValueChange={setCurrentTab}
        >
            <Tabs.List
                separator={<Separator vertical />}
            >
                <Tabs.Tab flex={1} value="workshops">
                    <SizableText fontFamily="$body">Workshops</SizableText>
                </Tabs.Tab>
                <Tabs.Tab flex={1} value="events">
                    <SizableText fontFamily="$body">Events</SizableText>
                </Tabs.Tab>
            </Tabs.List>

            <TabsContent value="workshops">
                <H5>Workshops</H5>
            </TabsContent>

            <TabsContent value="events">
                <H5>Events</H5>
            </TabsContent>
        </Tabs>
    )
}

const TabsContent = (props: TabsContentProps) => {
    return (
        <Tabs.Content
            padding="$2"
            alignItems="center"
            justifyContent="center"
            flex={1}
            borderWidth={0}
            {...props}
        >
            {props.children}
        </Tabs.Content>
    )
}

const filters = [
    { id: "location", title: "Location", keys: ["Nearest", "Farthest"] },
    { id: "level", title: "Level", keys: ["Begineer", "Intermidate", "Advance"] },
    { id: "price", title: "Price", keys: ["High to low", "Low to high"] },
]

const info = {
    "workshops": {
        title: "Live Workshops",
        desc: "Explore live workshops online or offline to learn from the best!"
    },
    "events": {
        title: "Explore Events",
        desc: "Explore events to stay updated about current welfares and competitions to prove your worth!"
    }
}

export default function EventsPage() {

    const [selectedFilters, setSelectedFilters] = useState<string[]>([])
    const [currentTab, setCurrentTab] = useState<"workshops" | "events">("workshops")

    function toogleFilter(id: string) {
        if (selectedFilters.includes(id)) {
            setSelectedFilters(prev => prev.filter(item => item !== id))
        } else {
            setSelectedFilters(prev => [id, ...prev])
        }
    }

    return (
        <YStack padding="$5">
            <H2 fontWeight={"bold"} mb="$2">{info[currentTab].title}</H2>
            <Paragraph theme={"alt2"} fontSize={"$4"}>{info[currentTab].desc}</Paragraph>


            <ScrollView horizontal my="$4" space="$2">
                {filters.map(item => (
                    <Button
                        key={item.id} 
                        size={"$3"}
                        borderRadius={"$radius.12"}
                        themeInverse={selectedFilters.includes(item.id)}
                        onPress={() => toogleFilter(item.id)}
                    >
                        {item.title}: {item.keys[0]}
                    </Button>
                ))}
            </ScrollView>

            <HorizontalTabs setCurrentTab={setCurrentTab} />
        </YStack>
    )
}