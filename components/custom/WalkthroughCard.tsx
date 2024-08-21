import { Href, useRouter } from 'expo-router';
import React from 'react';
import { YStack, Paragraph, Image, Card, H4, H6, H3, H5, Button } from 'tamagui';

export default function WalkthroughCard() {

    const router = useRouter()

    function handleExplore() {       
        router.push('/(protected)/artisan/walkthrough/artisanwalkthrough' as Href)
    }

    return (
        <YStack width="100%" alignItems="center">
            <Card
                flex={1}
                justifyContent="center"
                overflow="visible"
                borderRadius={10}
                width="100%"
                padding="$4"
                alignItems="center"
            >
                <Image
                    source={require('~/assets/Walkthrough.png')}
                    style={{
                        width: "60%",
                        height: 120,
                        borderRadius: 10,
                        marginVertical: 5,
                    }}
                    />
                    <H4>
                        Get started with ODOP
                    </H4>
                <H6
                    theme="alt2"
                    size="$2"
                    fontWeight="100"
                    textAlign="center"
                    // marginTop="$2"
                >
                    Discover about this app by following the Walkthrough
                </H6>
                <Button size="$4" marginTop="$3" width="100%" theme="alt2" color="#ffffff" onPress={handleExplore}>
                    Walkthrough
                </Button>
            </Card>
        </YStack>
    );
}