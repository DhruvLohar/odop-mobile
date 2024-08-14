// import { Text, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import { CloudFog, Google } from "iconsax-react-native";
import { Button, H1, Input, Paragraph, Separator, Theme, View, YStack } from "tamagui";

import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
    email: yup.string().required('Email is required').email('Please enter a valid email.'),
});

export default function Login() {

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
        },
    });

    function handleLogin(values: any) {
        console.log(values)
    }

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
                theme="alt2"
            >Login and reusme your journey on the ODOP Platform!</Paragraph>

            <YStack mt="$6">
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field }) => (
                        <Input 
                            id="email"
                            size={"$5"} borderWidth={2}
                            placeholder="name@example.com"
                            mb="$4"
                            {...field}
                        />
                    )}
                    name="email"
                />
                {errors.email && <Paragraph size={"$4"} color={"$red10"} mt="$-4">{errors.email.message}</Paragraph>}
                
                <Button
                    mt="$6" 
                    themeInverse
                    onPress={handleSubmit(handleLogin)}
                >
                    Login
                </Button>
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