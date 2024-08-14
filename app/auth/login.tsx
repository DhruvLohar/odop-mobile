// import { Text, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import { Google } from "iconsax-react-native";
import { Button, H1, Input, Paragraph, Separator, Theme, View, YStack } from "tamagui";

export default function Login() {
    return (
        <YStack
            width={"100%"} height={"100%"}
            justifyContent="center"
            paddingHorizontal="$5"
        >
            <StatusBar style="light" />

            <H1 fontWeight={"bold"}>Welcome Back</H1>
            <Paragraph 
                width={"90%"}
                size={"$4"}
                color={"$gray9"}
            >Login and reusme your journey on the ODOP Platform!</Paragraph>

            <YStack mt="$6">
                <Input 
                    id="email"
                    size={"$5"} borderWidth={2}
                    placeholder="name@example.com"
                    mb="$4"
                />
                
                <Button themeInverse>Login</Button>
            </YStack>

            <Separator alignSelf="stretch" my="$6" />
            
            <Button 
                size={"$5"}
                icon={() => <Google color="white" variant="Bold" />}
            >
                Continue with Google
            </Button>
        </YStack>
    )
}