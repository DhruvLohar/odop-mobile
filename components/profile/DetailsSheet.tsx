import { Href } from "expo-router";
import { ArrowDown3, Box, Edit2, Hierarchy, Logout, People } from "iconsax-react-native";
import React from "react";
import { Button, Card, H1, H2, H3, H4, Input, Paragraph, Separator, Sheet, XStack, YStack } from "tamagui";

type ProfileDetailsProps = {
    open: boolean,
    setOpen: any
}

const routes = [
    { title: "Edit Profile", icon: Edit2, url: "/profile/edit" as Href<string> },
    { title: "Manage Orders", icon: Box, url: "/orders" as Href<string> },
    { title: "Product Inventory", icon: Hierarchy, url: "/profile/inventory" as Href<string> },
    { title: "Connection Requests", icon: People, url: "/profile/connectionRequests" as Href<string> },

    { title: "Logout", icon: Logout, url: "/auth/logout" as Href<string> },
]

export default function ProfileDetails({
    open, setOpen
}: ProfileDetailsProps) {

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
                <H1 fontSize={"$9"} fontWeight={"bold"}>Settings</H1>
                <Paragraph theme={"alt2"} fontSize={"$5"}>Manage everything easily in just one tap.</Paragraph>

                <YStack width={"100%"} mt="$8" rowGap="$5">
                    {routes.map((route, idx) => (
                        <XStack
                            key={idx}
                            width={"100%"}
                            space="$3" alignItems="center" pb="$4"
                            borderBottomWidth={1}
                            borderBottomColor={"$gray5"}
                        >
                            <route.icon color="white" />
                            <H4>{route.title}</H4>
                        </XStack>
                    ))}
                </YStack>
            </Sheet.Frame>

        </Sheet>
    )
}