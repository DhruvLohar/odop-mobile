import { StatusBar } from "expo-status-bar";
import { Edit2, Location, MoneySend, More, WalletMoney } from "iconsax-react-native";
import { useState } from "react";
import { Pressable } from "react-native";
import { Avatar, Button, Card, H2, H3, H4, H5, Image, Paragraph, Separator, SizableText, Tabs, type TabsContentProps, Theme, View, XStack, YStack } from "tamagui";
import ProfileDetails from "~/components/profile/DetailsSheet";
import SupportArtisan from "~/components/profile/SupportArtisanSheet";

function HorizontalTabs() {
    return (
        <Tabs
            defaultValue="products"
            orientation="horizontal"
            flexDirection="column"
            width={"100%"}
            height={150}
            borderRadius={"$5"}
            overflow="hidden"
        >
            <Tabs.List
                separator={<Separator vertical />}
                aria-label="Manage your account"
            >
                <Tabs.Tab flex={1} value="products">
                    <SizableText fontFamily="$body">Products</SizableText>
                </Tabs.Tab>
                <Tabs.Tab flex={1} value="workshops">
                    <SizableText fontFamily="$body">Workshops</SizableText>
                </Tabs.Tab>
            </Tabs.List>

            <TabsContent value="products">
                <H5>Products</H5>
            </TabsContent>

            <TabsContent value="workshops">
                <H5>Workshops</H5>
            </TabsContent>
        </Tabs>
    )
}

const TabsContent = (props: TabsContentProps) => {
    return (
        <Tabs.Content
            key="tab3"
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

export default function ProfilePage() {

    const [open, setOpen] = useState(false);
    const [openSupport, setOpenSupport] = useState(false)

    return (
        <>
            <SupportArtisan
                open={openSupport}
                setOpen={setOpenSupport}
            />

            <ProfileDetails
                open={open}
                setOpen={setOpen}
            />
            
            <YStack padding="$5" rowGap="$4">
                <StatusBar style="light" />

                <XStack width={"100%"} justifyContent="center" alignItems="center">
                    <Avatar circular size="$11">
                        <Avatar.Image
                            accessibilityLabel="Nate Wienert"
                            src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?&w=100&h=100&dpr=2&q=80"
                        />
                        <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
                    </Avatar>

                    <YStack marginLeft="$5">
                        <H3 fontWeight={"bold"}>Aadish Gotekar</H3>
                        <Paragraph
                            flexDirection="row" alignItems="center"
                            fontSize={"$5"} theme={"alt2"} fontWeight={"bold"}
                        >
                            Cottonapur, Nigeria
                        </Paragraph>
                    </YStack>

                    <Button
                        circular
                        icon={() => <More rotation={90} size={22} color="white" />}
                        padding="$2"
                        ml="auto"
                        onPress={() => setOpen(true)}
                    />
                </XStack>

                <XStack width={"100%"} alignItems="center">
                    <Card backgroundColor={"transparent"} flex={1}>
                        <Card.Header alignItems="center">
                            <H3 fontWeight={"bold"}>4.3</H3>
                            <Paragraph theme={"alt2"}>Average Rating</Paragraph>
                        </Card.Header>
                    </Card>
                    <Separator vertical height={"$6"} />
                    <Card backgroundColor={"transparent"} flex={1}>
                        <Card.Header alignItems="center">
                            <H3 fontWeight={"bold"}>100+</H3>
                            <Paragraph theme={"alt2"}>Orders</Paragraph>
                        </Card.Header>
                    </Card>
                    <Separator vertical height={"$6"} />
                    <Card backgroundColor={"transparent"} flex={1}>
                        <Card.Header alignItems="center">
                            <H3 fontWeight={"bold"}>86%</H3>
                            <Paragraph theme={"alt2"}>Interactivity</Paragraph>
                        </Card.Header>
                    </Card>
                </XStack>

                <YStack padding="$0">
                    <H4 mb="$1" padding="$0">About Me</H4>
                    <Paragraph theme={"alt2"} lineHeight={"$1"} textAlign="justify" padding="$0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
                    </Paragraph>
                </YStack>

                <YStack>
                    <XStack mb="$4" justifyContent="space-between">
                        <Button width={"48%"}>View Brochure</Button>
                        <Button width={"48%"}>Get In Touch</Button>
                    </XStack>
                    <Button
                        themeInverse icon={() => <MoneySend color="black" />}
                        onPress={() => setOpenSupport(true)}
                    >Support Artisan</Button>
                </YStack>

                <Separator />

                <HorizontalTabs />
            </YStack>
        </>
    )
}