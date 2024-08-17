import { useState } from "react";
import { Button, H2, H3, H5, Paragraph, ScrollView, Separator, SizableText, Tabs, type TabsContentProps, XStack, YStack } from "tamagui";
import NewsCard from "~/components/custom/NewsCard";
import news from "~/lib/data/news.json";
import odopguide from "~/lib/data/odopguide.json"
import OdopCard from "~/components/custom/OdopGuideCard";


function HorizontalTabs({ currentTab, setCurrentTab }: any) {
    return (
        <Tabs
            value={currentTab} // Controlled value
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
                <Tabs.Tab flex={1} value="News">
                    <SizableText fontFamily="$body">News and Article</SizableText>
                </Tabs.Tab>
                <Tabs.Tab flex={1} value="ODOP_Guide">
                    <SizableText fontFamily="$body">ODOP Guide</SizableText>
                </Tabs.Tab>
            </Tabs.List>

            <Tabs.Content value="News" padding="$1" flex={1}>
                <ScrollView flex={1}>
                    <YStack flex={1} alignItems="center">
                        {news.news.map((newsItem) => (
                            <NewsCard key={newsItem.id} {...newsItem} />
                        ))}
                    </YStack>
                </ScrollView>
            </Tabs.Content>

            <Tabs.Content value="ODOP_Guide" flex={1}>
                <ScrollView flex={1}>
                    <YStack flex={1} alignItems="center">
                    {odopguide.guides.map((guides) => (
                        <OdopCard key={guides.id} {...guides} video={guides.video} />
                    ))}
                    </YStack>
                </ScrollView>
                </Tabs.Content>
        </Tabs>
    );
}

const info = {
    "News": {
        title: "Latest News",
        desc: "Look out for the latest news of ODOP"
    },
    "ODOP_Guide": {
        title: "How to",
        desc: "Want some machines to use but won't buy it? We got you!"
    }
}

export default function PortalView() {
    const [currentTab, setCurrentTab] = useState<"News" | "ODOP_Guide">("News");

    return (
        <YStack flex={1} padding="$5">
            <XStack mb="$4" alignItems="center">
                <YStack mr="auto">
                    <H2 fontWeight={"bold"}>{info[currentTab].title}</H2>
                    <Paragraph theme={"alt2"}>{info[currentTab].desc}</Paragraph>
                </YStack>
            </XStack>

            <YStack flex={1}>
                <HorizontalTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
            </YStack>
        </YStack>
    );
}
