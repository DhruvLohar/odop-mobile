import { useState } from "react";
import { Button, H2, H3, H5, Paragraph, ScrollView, Separator, SizableText, Tabs, type TabsContentProps, XStack, YStack } from "tamagui";
import workshops from '../../lib/data/workshops.json';
import WorkshopCard from '../../components/custom/WorkshopCard';
import EventCard from '../../components/custom/EventCard';
import eventsData from '../../lib/data/events.json';
import { Filter } from "iconsax-react-native";
import EventsSheet from "~/components/sheets/EventsSheet"


function HorizontalTabs({ setCurrentTab }: any) {
    return (
        <Tabs
            defaultValue="workshops"
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
                <Tabs.Tab flex={1} value="workshops">
                    <SizableText fontFamily="$body">Workshops</SizableText>
                </Tabs.Tab>
                <Tabs.Tab flex={1} value="events">
                    <SizableText fontFamily="$body">Events</SizableText>
                </Tabs.Tab>
            </Tabs.List>

            <Tabs.Content value="workshops" flex={1}>
                <ScrollView flex={1}>
                    <YStack alignItems="center" flex={1}>
                        {workshops.workshops.map(workshop => (
                            <WorkshopCard
                                key={workshop.id}
                                {...workshop}
                            />
                        ))}
                    </YStack>
                </ScrollView>
            </Tabs.Content>

            <Tabs.Content value="events" flex={1}>
                <ScrollView flex={1}>
                    <YStack flex={1} alignItems="center">
                        {eventsData.events.map((event) => (
                            <EventCard key={event.id} {...event} />
                        ))}
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
    "workshops": {
        title: "Live Workshops",
        desc: "Attend and explore workshops that interests you!"
    },
    "events": {
        title: "Explore Events",
        desc: "Meet, interact and connect with the best, in the events!"
    }
}

export default function EventsPage() {

    const [selectedFilters, setSelectedFilters] = useState<string[]>([])
    const [currentTab, setCurrentTab] = useState<"workshops" | "events">("workshops")
    const [open, setOpen] = useState(false)

    function toogleFilter(id: string) {
        if (selectedFilters.includes(id)) {
            setSelectedFilters(prev => prev.filter(item => item !== id))
        } else {
            setSelectedFilters(prev => [id, ...prev])
        }
    }

    return (
        <>

        <EventsSheet
                open={open}
                setOpen={setOpen}
            />

        <YStack flex={1} padding="$5">
            <XStack mb="$4" alignItems="center">
                <YStack mr="auto">
                    <H2 fontWeight={"bold"}>{info[currentTab].title}</H2>
                    <Paragraph width={"80%"} theme={"alt2"}>{info[currentTab].desc}</Paragraph>
                </YStack>
                <Filter color="white" onPress={() => setOpen(true)} />
            </XStack>

            <YStack flex={1}>
                <HorizontalTabs setCurrentTab={setCurrentTab} />
            </YStack>
        </YStack>
        </>
    )
}