import { useRouter } from 'expo-router';
import React from 'react';
import { YStack, Paragraph, Image, Card, H4, H6, H3, H5, Button } from 'tamagui';

export default function KnowMoreCard() {

    const router = useRouter()

    function handleExplore() {
        
        router.push('/(protected)/artisan/info/all')
    }

    return (
        <YStack width="100%" alignItems="center">
            <Image
                position="absolute"
                top={-20}
                source={require('~/assets/Logo.png')}
                style={{
                    width: 180, 
                    height: 70, 
                    zIndex: 2,
                }}
            />
            <Card
                marginTop="$3"
                flex={1}
                justifyContent="center"
                overflow="visible"
                borderRadius={10}
                width="100%"
                padding="$4"
                alignItems="center"
            >
                <H5 marginTop="$7">Know more about ODOP</H5>
                <H6
                    theme="alt2"
                    size="$2"
                    fontWeight="100"
                    textAlign="center"
                    marginTop="$2"
                >
                    Discover what ODOP is all about. Get to know its latest news blah blah
                </H6>
                <Button size="$4" marginTop="$3" width="100%" theme="alt2" color="#ffffff" onPress={handleExplore}>
                    Explore
                </Button>
            </Card>
        </YStack>
    );
}