import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { CloudFog, Google } from 'iconsax-react-native';
import {
    Button,
    H1,
    Input,
    Label,
    Paragraph,
    Separator,
    YStack,
    Sheet,
    H4,
    Spinner,
} from 'tamagui';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import { Image } from 'react-native';
import { RenderSelect } from '~/components/shared/RenderSelect';
import { useSession } from '~/lib/auth';

const schema = yup.object().shape({
    email: yup.string().required('Email is required').email('Please enter a valid email.'),
    role: yup.string()
});

const options = ['Artisan', 'User'];

export default function Login() {

    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const [uid, setUID] = useState<number | any>(undefined);
    const { getOTP, verifyOTP, artisanLogin, userLogin } = useSession()

    const {
        control,
        handleSubmit,
        formState: { errors },
        getValues
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
            role: 'User'
        },
    });

    const [showOtpSheet, setShowOtpSheet] = useState(false);
    const [otpInput, setOtpInput] = useState('');
    const sizeProp = `$4` as const;

    const handleLogin = async (values: any) => {
        setLoading(true)

        let res: any;
        if (getValues().role === "User") {
            res = await userLogin({ email: values.email });
        } else {
            res = await artisanLogin({ email: values.email });
        }

        if (!res?.success) {
            alert(res?.message)
        } else {
            setUID(parseInt(res?.id));
            let otpSent = await getOTP(parseInt(res?.id), getValues().role?.toLowerCase());

            if (otpSent) {
                setShowOtpSheet(true);
            }
        }

        setLoading(false)
    };

    async function handleOtpConfirm() {
        const res = await verifyOTP(uid, getValues().role?.toLowerCase(), parseInt(otpInput), true);

        if (res) {
            setShowOtpSheet(false)
            router.replace('/(protected)/(tabs)/')
        } else {
            alert("invalid otp")
            setOtpInput("")
        }
    }

    return (
        <YStack width={'100%'} height={'100%'} justifyContent="center" paddingHorizontal="$5">
            <StatusBar style="light" />

            <Image
                source={require('~/assets/Logo.png')}
                style={{
                    width: '60%',
                    height: 100,
                    alignSelf: 'center',
                    marginBottom: 50,
                    objectFit: 'cover',
                }}
            />

            <H1 fontWeight={'bold'}>Welcome Back</H1>
            <Paragraph width={'90%'} size={'$4'} theme="alt2">
                Login and resume your journey on the ODOP Platform!
            </Paragraph>

            <YStack mt="$6">
                <Controller
                    control={control}
                    name="role"
                    render={({ field: { onChange, value } }) =>
                        RenderSelect(
                            'How you want to login?',
                            value,
                            (value) => {
                                onChange(value);
                            },
                            options,
                            false
                        )
                    }
                />
                {errors.role && (
                    <Paragraph size={'$4'} color={'$red10'} mt="$-4">
                        {errors.role.message}
                    </Paragraph>
                )}

                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, value } }) => (
                        <>
                            <Label mb="$2" mt="$4">Email</Label>
                            <Input
                                keyboardType="email-address"
                                size={'$5'}
                                borderWidth={2}
                                placeholder="name@example.com"
                                mb="$4"
                                onChangeText={onChange}
                                value={value}
                            />
                        </>
                    )}
                    name="email"
                />
                {errors.email && (
                    <Paragraph size={'$4'} color={'$red10'} mt="$-4">
                        {errors.email.message}
                    </Paragraph>
                )}

                <Button 
                    icon={() => loading && <Spinner size='large' />}
                    size={'$5'}
                    mt="$5" themeInverse 
                    onPress={handleSubmit(handleLogin)}
                >
                    {!loading ? "Login" : ""}
                </Button>
            </YStack>

            <Separator alignSelf="stretch" my="$6" />

            <Button size={'$5'} icon={() => <Google color="white" variant="Bold" />}>
                Continue with Google
            </Button>

            <Sheet
                forceRemoveScrollEnabled={showOtpSheet}
                modal
                open={showOtpSheet}
                onOpenChange={setShowOtpSheet}
                snapPointsMode="fit"
                dismissOnSnapToBottom={false}
                dismissOnOverlayPress={false}
            >
                <Sheet.Overlay animation={'lazy'} enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />

                <Sheet.Handle backgroundColor={'white'} />
                <YStack 
                    p="$4" 
                    borderTopRightRadius={"$5"} borderTopLeftRadius={"$5"} 
                    backgroundColor={"$background"}
                >
                    <H4 fontWeight={'bold'}>
                        Confirm OTP
                    </H4>
                    <Paragraph theme={'alt1'} mb="$4">
                        We've sent your OTP on your email.
                    </Paragraph>
                    <Input
                        placeholder="Enter OTP"
                        value={otpInput}
                        onChangeText={setOtpInput}
                        size={sizeProp}
                        keyboardType="numeric"
                    />
                    <Button onPress={handleOtpConfirm} mt="$4">
                        Confirm
                    </Button>
                </YStack>
            </Sheet>
        </YStack>
    );
}
