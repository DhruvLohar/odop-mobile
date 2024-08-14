// import { Text, View } from "react-native";

import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { 
    Button, Card, H1, H2, H3, Paragraph, YStack 
} from "tamagui";

export default function OnBoarding() {

    const router = useRouter()
    // 0 - user || 1 - artisan
    const [selectedState, setSelectedState] = useState(0)


    function handleContinue() {
        if (selectedState === 0) {
            router.push('/auth/login')
        } else {
            router.push('/auth/registerArtisan')
        }
    }

    return (
        <YStack
            width={"100%"} height={"100%"}
            justifyContent="center"
            paddingHorizontal="$5"
        >
            <StatusBar style="light" />

            <H2 fontWeight={"bold"} mb="$2">
                How do you want to join 
                our platform? 
            </H2>
            <Paragraph 
                size={"$4"}
                theme="alt2"
            >
                We'll personalize your experience accordingly, providing you the best for you!
            </Paragraph>

            <YStack mt="$6" rowGap="$4">

                <Card
                    borderWidth="$1"
                    borderColor={selectedState === 0 ? "$red10" : "transparent"}
                    onPress={() => setSelectedState(0)}
                >
                    <Card.Header>
                        <H3>User</H3>
                        <Paragraph theme="alt2">
                            I'm here to buy products and explore the ODOP
                            Platform
                        </Paragraph>
                    </Card.Header>
                </Card>

                <Card
                    borderWidth="$1"
                    borderColor={selectedState === 1 ? "$red10" : "transparent"}
                    onPress={() => setSelectedState(1)}
                >
                    <Card.Header>
                        <H3>Artisan</H3>
                        <Paragraph theme="alt2">
                            I'm here to list my unique product on the ODOP
                            Platform and represent my district!
                        </Paragraph>
                    </Card.Header>
                </Card>
                
                <Button 
                    themeInverse
                    onPress={handleContinue}
                >Create My Account</Button>
            </YStack>
        </YStack>
    )
}