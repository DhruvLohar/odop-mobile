import { useState } from 'react';
import {
  YStack,
  H2,
  Paragraph,
  Progress,
  Form,
  Button,
  SizeTokens,
  XStack,
  Sheet,
  Input,
  H4,
} from 'tamagui';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Stage1 from '~/components/forms/Stage1';
import Stage2 from '~/components/forms/Stage2';
import Stage3 from '~/components/forms/Stage3';
import { Image } from 'react-native';

type FieldNames =
  | 'name'
  | 'mobileNumber'
  | 'email'
  | 'gender'
  | 'age'
  | 'selectedState'
  | 'selectedDistrict'
  | 'address'
  | 'pinCode';

const RegisterArtisan = () => {
  const schema = Yup.object().shape({
    name: Yup.string().required('First name is required'),
    mobileNumber: Yup.string()
      .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
      .required('Mobile number is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    age: Yup.number().min(18, 'Minimum age required is 18').required('Age is Required'),
    pinCode: Yup.number()
      .typeError('Pincode must be a number')
      .positive()
      .integer()
      .min(100000)
      .max(999999)
      .required(),
    address: Yup.string().required('Address is required'),
    gender: Yup.string().required('Gender is required'),
    selectedState: Yup.string().required('State is required'),
    selectedDistrict: Yup.string().required('District is required'),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    trigger,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [showOtpSheet, setShowOtpSheet] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const correctOtp = '123456'; // Predefined OTP
  const sizeProp = `$4` as SizeTokens;

  const onSubmit = (data: any) => {
    console.log('Form Data:', data);
    reset();
    setStep(1);
    setProgress(33);
  };

  const handleNext = async () => {
    let fieldNames: FieldNames[] = [];

    if (step === 1) {
      fieldNames = ['name', 'mobileNumber', 'email', 'gender', 'age'];
    } else if (step === 2) {
      fieldNames = ['selectedState', 'selectedDistrict', 'address', 'pinCode'];
    }

    const isValid = await trigger(fieldNames);

    if (isValid && step < 3) {
      if (step === 1) {
        setShowOtpSheet(true); // Show OTP sheet at the end of step 1
      } else {
        setStep((prev) => prev + 1);
        setProgress((prev) => prev + 33);
      }
    } else if (step === 3) {
      setProgress(100);
      handleSubmit(onSubmit)();
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
      setProgress((prev) => prev - 33);
    }
  };

  const handleOtpConfirm = () => {
    if (otpInput === correctOtp) {
      setShowOtpSheet(false);
      setStep((prev) => prev + 1);
      setProgress((prev) => prev + 33);
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  return (
    <YStack width={'100%'} height={'100%'} justifyContent="center" paddingHorizontal="$5">

      <Image
        source={require('~/assets/Logo.png')}
        style={{
          width: "60%", height: 100,
          alignSelf: "center", marginBottom: 50,
          objectFit: 'cover'
        }}
      />

      <H2 fontWeight={'bold'} mb="$2">
        {['Personal Information', 'Where are you from?', 'Upload Documents'][step - 1]}
      </H2>
      <Paragraph size={'$3'} theme="alt2" mb="$3">
        {
          [
            'Fill correct details below to create your account in few seconds',
            'Select the state and district you belong',
            'Upload the required documents in order to finish the registration process',
          ][step - 1]
        }
      </Paragraph>

      <Progress key={step} size={sizeProp} value={progress} mb="$5" br="$0">
        <Progress.Indicator animation="bouncy" />
      </Progress>

      <Form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && <Stage1 control={control} errors={errors} />}
        {step === 2 && (
          <Stage2
            control={control}
            errors={errors}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            setSelectedDistrict={setSelectedDistrict}
          />
        )}
        {step === 3 && <Stage3 />}

        <XStack mt="$3">
          {step > 1 && (
            <Button disabled={step === 1} onPress={handlePrev} variant="outlined">
              Previous
            </Button>
          )}
          {step < 3 ? (
            <Button onPress={handleNext} ml="auto">
              Next
            </Button>
          ) : (
            <Form.Trigger asChild>
              <Button ml="auto">Final Submit</Button>
            </Form.Trigger>
          )}
        </XStack>
      </Form>

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
            Confirm Otp
          </H4>
          <Paragraph theme={'alt1'} mb="$2">
            Check out for the otp sent on your registered Email
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
};

export default RegisterArtisan;