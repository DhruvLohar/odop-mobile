import { Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  YStack,
  H2,
  Paragraph,
  Progress,
  Button,
  Input,
  XStack,
  Sheet,
  Adapt,
  Select,
  SizeTokens,
  Form,
} from 'tamagui';
import { useMemo, useState } from 'react';
import { ArrowDown2, Check } from 'iconsax-react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Redirect, useRouter } from 'expo-router';

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  mobileNumber: yup
    .string()
    .required('Mobile number is required')
    .matches(/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number.'),
  email: yup.string().required('Email is required').email('Please enter a valid email.'),
  selectedState: yup.string().required('State is required'),
  selectedCity: yup.string().required('City is required'),
  selectedDistrict: yup.string().required('District is required'),
});

type FormData = {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
  selectedState: string;
  selectedCity: string;
  selectedDistrict: string;
};

type LocationType = {
  name: string;
  cities: { name: string; districts: string[] }[];
};

const locations: LocationType[] = [
  {
    name: 'Maharashtra',
    cities: [
      { name: 'Mumbai', districts: ['Andheri', 'Versova', 'Juhu'] },
      { name: 'Pune', districts: ['Kothrud', 'Shivajinagar', 'Baner'] },
    ],
  },
  {
    name: 'Tamil Nadu',
    cities: [
      { name: 'Chennai', districts: ['Adyar', 'T Nagar', 'Anna Nagar'] },
      { name: 'Coimbatore', districts: ['Gandhipuram', 'RS Puram', 'Peelamedu'] },
    ],
  },
  {
    name: 'Gujarat',
    cities: [
      { name: 'Ahmedabad', districts: ['Vastrapur', 'Bodakdev', 'Thaltej'] },
      { name: 'Surat', districts: ['Adajan', 'Vesu', 'Bhatar'] },
    ],
  },
  {
    name: 'Karnataka',
    cities: [
      { name: 'Bengaluru', districts: ['Koramangala', 'HSR Layout', 'Whitefield'] },
      { name: 'Mysore', districts: ['Jayalakshmipuram', 'Vidyaranyapuram', 'Hebbal'] },
    ],
  },
];

export default function RegisterArtisan() {
  const {
    control,
    formState: { errors },
    trigger,
    handleSubmit,
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      mobileNumber: '',
      email: '',
      selectedState: '',
      selectedCity: '',
      selectedDistrict: '',
    },
  });

  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const sizeProp = `$4` as SizeTokens;

  const onSubmit = (data: FormData) => {
    console.log('Form Data:', data);
    reset();
    setStep(1); //Temporarily redirecting to step 1
  };

  const handleNext = async () => {
    const fieldNames: (keyof FormData)[] =
      step === 1
        ? ['firstName', 'lastName', 'mobileNumber', 'email']
        : ['selectedState', 'selectedCity', 'selectedDistrict'];

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

  const getCities = () => {
    const state = locations.find((loc) => loc.name === selectedState);
    return state ? state.cities : [];
  };

  const getDistricts = () => {
    const city = getCities().find((city) => city.name === selectedCity);
    return city ? city.districts : [];
  };

  const renderSelect = (
    label: string,
    value: string | null,
    onValueChange: (value: string) => void,
    items: string[],
    isDisabled: boolean
  ) => {
    const renderedItems = useMemo(() => {
      return items.map((item, index) => (
        <Select.Item key={index} index={index} value={item}>
          <Select.ItemText>{item}</Select.ItemText>
          <Select.ItemIndicator marginLeft="auto">
            <Check size={16} color="white" />
          </Select.ItemIndicator>
        </Select.Item>
      ));
    }, [items]);

    return (
      <Select value={value || ''} onValueChange={onValueChange}>
        <Select.Trigger width="100%" mb="$2" disabled={isDisabled}>
          <XStack justifyContent="space-between" alignItems="center" w="100%">
            <Select.Value placeholder={label} />
            <ArrowDown2 size={16} color="white" />
          </XStack>
        </Select.Trigger>
        <Adapt when="sm" platform="touch">
          <Sheet
            modal
            dismissOnSnapToBottom
            animationConfig={{ type: 'spring', damping: 20, mass: 1 }}>
            <Sheet.Frame padding="$4" maxHeight="$20" bottom="$0" position="absolute">
              <Sheet.ScrollView>
                <Adapt.Contents />
              </Sheet.ScrollView>
            </Sheet.Frame>
            <Sheet.Overlay />
          </Sheet>
        </Adapt>
        <Select.Content>
          <Select.Viewport>{renderedItems}</Select.Viewport>
        </Select.Content>
      </Select>
    );
  };

  const uploadDocument = async (docType: 'Aadhar' | 'PAN') => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'image/*',
      });
      console.log(result);
    } catch (error) {
      console.error(`Failed to upload ${docType}:`, error);
    }
  };

  return (
    <YStack width={'100%'} height={'100%'} justifyContent="center" paddingHorizontal="$5">
      <StatusBar style="light" />

      <H2 fontWeight={'bold'} mb="$2">
        Personal Information
      </H2>
      <Paragraph size={'$3'} theme="alt2" mb="$3">
        Fill Correct Details Below to create your account in a few seconds
      </Paragraph>

      <Progress key={step} size={sizeProp} value={progress} mb="$3" my="$1" br="$0">
        <Progress.Indicator animation="bouncy" />
      </Progress>

      <Form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && (
          <YStack mb="$3">
            <Text>Section 1: Basic Information</Text>
            <Controller
              control={control}
              name="firstName"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  id="firstName"
                  size={'$5'}
                  borderWidth={2}
                  placeholder="First Name"
                  mb="$4"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            {errors.firstName && (
              <Paragraph size={'$4'} color={'$red10'} mt="$-4">
                {errors.firstName.message}
              </Paragraph>
            )}

            <Controller
              control={control}
              name="lastName"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  id="lastName"
                  size={'$5'}
                  borderWidth={2}
                  placeholder="Last Name"
                  mb="$4"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            {errors.lastName && (
              <Paragraph size={'$4'} color={'$red10'} mt="$-4">
                {errors.lastName.message}
              </Paragraph>
            )}

            <Controller
              control={control}
              name="mobileNumber"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  id="mobileNumber"
                  size={'$5'}
                  borderWidth={2}
                  placeholder="Mobile Number"
                  mb="$4"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            {errors.mobileNumber && (
              <Paragraph size={'$4'} color={'$red10'} mt="$-4">
                {errors.mobileNumber.message}
              </Paragraph>
            )}

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  id="email"
                  size={'$5'}
                  borderWidth={2}
                  placeholder="Email"
                  mb="$4"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            {errors.email && (
              <Paragraph size={'$4'} color={'$red10'} mt="$-4">
                {errors.email.message}
              </Paragraph>
            )}
          </YStack>
        )}

        {step === 2 && (
          <YStack mb="$3">
            <Text>Section 2: Location Information</Text>
            <Controller
              control={control}
              name="selectedState"
              render={({ field: { onChange, value } }) =>
                renderSelect(
                  'Select State',
                  value,
                  (value) => {
                    onChange(value);
                    setSelectedState(value);
                    setSelectedCity(null); // Reset city and district when state changes
                    setSelectedDistrict(null);
                  },
                  locations.map((loc) => loc.name),
                  false
                )
              }
            />
            {errors.selectedState && (
              <Paragraph size={'$4'} color={'$red10'} mt="$-4">
                {errors.selectedState.message}
              </Paragraph>
            )}

            <Controller
              control={control}
              name="selectedCity"
              render={({ field: { onChange, value } }) =>
                renderSelect(
                  'Select City',
                  value,
                  (value) => {
                    onChange(value);
                    setSelectedCity(value);
                    setSelectedDistrict(null); // Reset district when city changes
                  },
                  getCities().map((city) => city.name),
                  !selectedState
                )
              }
            />
            {errors.selectedCity && (
              <Paragraph size={'$4'} color={'$red10'} mt="$-4">
                {errors.selectedCity.message}
              </Paragraph>
            )}

            <Controller
              control={control}
              name="selectedDistrict"
              render={({ field: { onChange, value } }) =>
                renderSelect('Select District', value, onChange, getDistricts(), !selectedCity)
              }
            />
            {errors.selectedDistrict && (
              <Paragraph size={'$4'} color={'$red10'} mt="$-4">
                {errors.selectedDistrict.message}
              </Paragraph>
            )}
          </YStack>
        )}

        {step === 3 && (
          <YStack mb="$3">
            <Text>Section 3: Upload Documents</Text>
            <Button onPress={() => uploadDocument('Aadhar')} my="$2">
              Upload Aadhar
            </Button>
            <Button onPress={() => uploadDocument('PAN')} my="$2">
              Upload PAN
            </Button>
          </YStack>
        )}

        <XStack justifyContent="space-between" mb="$4">
          <Button disabled={step === 1} onPress={handlePrev}>
            Previous
          </Button>
          {step < 3 ? (
            <Button onPress={handleNext}>Next</Button>
          ) : (
            <Form.Trigger asChild>
              <Button>Final Submit</Button>
            </Form.Trigger>
          )}
        </XStack>
      </Form>
    </YStack>
  );
}
