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
  Theme,
  View,
  YStack,
  Sheet,
  H4,
} from 'tamagui';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import { Image } from 'react-native';

const schema = yup.object().shape({
  email: yup.string().required('Email is required').email('Please enter a valid email.'),
});

export default function Login() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
    },
  });

  const [showOtpSheet, setShowOtpSheet] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const correctOtp = '123456'; // Predefined OTP for demonstration
  const sizeProp = `$4` as const;

  const handleLogin = (values: any) => {
    console.log(values);
    setShowOtpSheet(true); // Show OTP sheet after email submission
  };

  const handleOtpConfirm = () => {
    if (otpInput === correctOtp) {
      setShowOtpSheet(false);
      router.push('/(tabs)/');
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

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
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <Label mb="$2">Email</Label>
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

        <Button mt="$5" themeInverse onPress={handleSubmit(handleLogin)}>
          Login
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
        dismissOnSnapToBottom>
        <Sheet.Overlay animation={'lazy'} enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />

        <Sheet.Handle backgroundColor={'white'} />
        <YStack p="$4">
          <H4 fontWeight={'bold'} mb="$2">
            Confirm OTP
          </H4>
          <Paragraph theme={'alt1'} mb="$2">
            Check your registered email for the OTP.
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
