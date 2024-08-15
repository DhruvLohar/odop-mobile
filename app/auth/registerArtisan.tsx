import { useState } from 'react';
import { YStack, H2, Paragraph, Progress, Form, Button, SizeTokens, XStack } from 'tamagui';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Stage1 from '~/components/forms/Stage1';
import Stage2 from '~/components/forms/Stage2';
import Stage3 from '~/components/forms/Stage3';

// Define the types for the field names
type FieldNames =
  | 'firstName'
  | 'lastName'
  | 'mobileNumber'
  | 'email'
  | 'selectedState'
  | 'selectedDistrict';

const RegisterArtisan = () => {
  // Validation Schema
  const schema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    mobileNumber: Yup.string()
      .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
      .required('Mobile number is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
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
      fieldNames = ['firstName', 'lastName', 'mobileNumber', 'email'];
    } else if (step === 2) {
      fieldNames = ['selectedState', 'selectedDistrict'];
    }

    const isValid = await trigger(fieldNames);

    if (isValid && step < 3) {
      setStep((prev) => prev + 1);
      setProgress((prev) => prev + 33);
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

  return (
    <YStack width={'100%'} height={'100%'} justifyContent="center" paddingHorizontal="$5">
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
    </YStack>
  );
};

export default RegisterArtisan;
