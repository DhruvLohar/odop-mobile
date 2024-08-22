import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { H2, H3, H6, ScrollView, XStack, YStack, Paragraph, Button } from 'tamagui';
import { Location } from 'iconsax-react-native';
import { useLocalSearchParams } from 'expo-router';
import { axiosRequest } from '~/lib/api';


export default function EventDetails() {

    const { id } = useLocalSearchParams()
    const [event, setEvent] = useState<EventDetails | null>(null)

    async function fetchEvent() {
        const res = await axiosRequest(`event/${id}/`, {
            method: 'get'
        }, false);

        if (res?.success) {
            setEvent(res.workshop)
        }
    }

    useEffect(() => {
        fetchEvent()
    }, [])

    return (
        <ScrollView>
            <YStack flex={1} alignItems="center" paddingHorizontal="$5" paddingVertical="$3">

                <H3 width={"100%"} marginBottom="$2">
                    Event 1
                </H3>
                <XStack width={"100%"} flex={1} alignItems='center'>
                    <Location size="16" color="#585858" />
                    <H6 marginLeft="$2" size={16} color={"#585858"}>Ratnagiri, Maharashtra</H6>
                </XStack>
                <YStack width={"100%"} paddingTop={10}>
                    <H6 size={28}>Description</H6>
                    <Paragraph width={"100%"} size={"$4"} theme="alt2" marginBottom={"$5"}>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere reiciendis ipsum culpa quis obcaecati deleniti, animi in dolorum atque
                    </Paragraph>
                </YStack>

                <YStack width={"100%"}>
                    <H6 size={28}>Organizers</H6>
                    <Paragraph width={"100%"} size={"$4"} theme="alt2" marginBottom={"$5"}>
                        Xyz Company : Path to Success
                    </Paragraph>
                </YStack>

                <Button size="$4" width={"100%"} backgroundColor="#191919">
                    Notify Me
                </Button>

            </YStack>
        </ScrollView>
    );
}