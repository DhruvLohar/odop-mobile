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
import { axiosRequest, postToAPI } from '~/lib/api';
import { useSession } from '~/lib/auth';
import { toFormData } from 'axios';

type FieldNames =
  | 'name'
  | 'phone_number'
  | 'email'
  | 'gender'
  | 'age'
  | 'state'
  | 'district'
  | 'address'
  | 'postal_code';

const RegisterArtisan = () => {
  const schema = Yup.object().shape({
    name: Yup.string().required('First name is required'),
    phone_number: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
      .required('Phone number is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    age: Yup.number().min(18, 'Minimum age required is 18').required('Age is Required'),
    postal_code: Yup.number()
      .typeError('Postal Code must be a number')
      .positive()
      .integer()
      .min(100000)
      .max(999999)
      .required(),
    address: Yup.string().required('Address is required'),
    gender: Yup.string().required('Gender is required'),
    state: Yup.string().required('State is required'),
    district: Yup.string().required('District is required'),
  });

  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    trigger,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { getOTP, verifyOTP, registerArtisan } = useSession()
  const [uid, setUID] = useState<any>()

  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [showOtpSheet, setShowOtpSheet] = useState(false);
  const [otpInput, setOtpInput] = useState('');

  const [aadharCard, setAadharCard] = useState<any>(null);
  const [panCard, setPanCard] = useState<any>(null);

  const sizeProp = `$4` as SizeTokens;

  async function onSubmit(data: any) {

    const formData = toFormData(data)
    formData.append('aadhar_image', aadharCard);
    formData.append('pan_image', panCard);
    
    const res = await axiosRequest(`artisan/${uid}/registerArtisan/`, {
      method: 'post',
      data: formData
    }, true);

    console.log(res, uid)
    if (res?.success) {
      
    } else {
      alert(res.message)
    }

    // reset();
    // setStep(1);
    // setProgress(33);
  };

  async function handleCreateArtisan() {
    const res = await postToAPI('artisan/createArtisan/', {
      email: getValues().email
    });

    if (res.success) {
      setUID(parseInt(res?.id))
      let otpSent = await getOTP(parseInt(res?.id), 'artisan');

      if (otpSent) {
        setShowOtpSheet(true);
      }
    } else {
      alert(res.message)
    }
  }

  const handleNext = async () => {
    let fieldNames: FieldNames[] = [];

    if (step === 1) {
      fieldNames = ['name', 'phone_number', 'email', 'gender', 'age'];
    } else if (step === 2) {
      fieldNames = ['state', 'district', 'address', 'postal_code'];
    }

    const isValid = await trigger(fieldNames);

    if (isValid && step < 3) {
      if (step === 1) {
        handleCreateArtisan()
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

  async function handleOtpConfirm() {

    const res = await verifyOTP(uid, "artisan", parseInt(otpInput), false);

    if (res) {
      setShowOtpSheet(false)
      setOtpInput("")
      setStep((prev) => prev + 1);
      setProgress((prev) => prev + 33);
    } else {
      alert("invalid otp")
      setOtpInput("")
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
        {step === 3 && (
          <Stage3
            aadharCard={aadharCard}
            setAadharCard={setAadharCard}
            panCard={panCard}
            setPanCard={setPanCard}
          />
        )}

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