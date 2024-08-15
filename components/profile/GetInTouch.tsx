import { Message, MoneySend } from 'iconsax-react-native';
import React, { useState } from 'react';
import { Button, H1, Input, Label, Paragraph, Sheet, TextArea, Form, YStack } from 'tamagui';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RenderSelect } from '../shared/RenderSelect'; // Import your RenderSelect component

// The options array for the dropdown
const options = ['ODOP Certified Artisan', 'Wholeseller', 'Influencer/Content-Creator', 'Other'];

const schema = yup.object().shape({
  mobileNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
    .required('Mobile number is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  Message: yup.string().required('Give a 5-10 word description minimum'),
  selectedOption: yup.string().required('Contact Purpose is required'),
});

export default function GetInTouch({ open, setOpen }: { open: boolean; setOpen: any }) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle form submission
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Sheet
      forceRemoveScrollEnabled={open}
      modal
      open={open}
      onOpenChange={setOpen}
      snapPointsMode="fit"
      dismissOnSnapToBottom>
      <Sheet.Overlay animation={'lazy'} enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />

      <Sheet.Handle backgroundColor={'white'} />

      <Sheet.Frame padding="$5" justifyContent="flex-start" alignItems="flex-start">
        <H1 fontSize={'$9'} fontWeight={'bold'}>
          Get in Touch
        </H1>
        <Paragraph theme={'alt2'} fontSize={'$5'}>
          Your Request is shown to the Artisan
        </Paragraph>

        {/* Form Component */}
        <Form width="100%" pb="$2" onSubmit={handleSubmit(onSubmit)}>
          {/* Dropdown for Options */}
          <Controller
            control={control}
            name="selectedOption"
            render={({ field: { onChange, value } }) =>
              RenderSelect(
                'Select Purpose',
                value,
                (value) => {
                  onChange(value);
                  setSelectedOption(value);
                },
                options,
                false
              )
            }
          />
          {errors.selectedOption && (
            <Paragraph size={'$4'} color={'$red10'} mt="$-4">
              {errors.selectedOption.message}
            </Paragraph>
          )}

          {/* Email Input */}
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <>
                <Label mb="$2">Email</Label>
                <Input
                  keyboardType="email-address"
                  size={'$5'}
                  borderWidth={2}
                  placeholder="name@example.com"
                  mb="$4"
                  w={'100%'}
                  onChangeText={onChange}
                  value={value}
                />
              </>
            )}
          />
          {errors.email && (
            <Paragraph size={'$4'} color={'$red10'} mt="$-4">
              {errors.email.message}
            </Paragraph>
          )}

          {/* Mobile Number Input */}
          <Controller
            control={control}
            name="mobileNumber"
            render={({ field: { onChange, value } }) => (
              <>
                <Label mb="$2">Contact Number</Label>
                <Input
                  size={'$5'}
                  borderWidth={2}
                  placeholder="Mobile Number"
                  keyboardType="numeric"
                  mb="$4"
                  w="100%"
                  onChangeText={onChange}
                  value={value}
                />
              </>
            )}
          />
          {errors.mobileNumber && (
            <Paragraph size={'$4'} color={'$red10'} mt="$-4">
              {errors.mobileNumber.message}
            </Paragraph>
          )}

          {/* Message Input */}
          <Controller
            control={control}
            name="Message"
            render={({ field: { onChange, value } }) => (
              <>
                <Label mb="$2">Message</Label>
                <Input
                  size={'$5'}
                  borderWidth={2}
                  placeholder="Write Your Message Here"
                  w="100%"
                  h="$10"
                  onChangeText={onChange}
                  value={value}
                  keyboardType="default"
                  numberOfLines={2}
                />
              </>
            )}
          />
          {errors.Message && (
            <Paragraph size={'$4'} color={'$red10'} mt="$4">
              {errors.Message.message}
            </Paragraph>
          )}
          {/* Submit Button */}
          <Form.Trigger asChild>
            <Button my="$6" themeInverse width={'100%'}>
              SUBMIT
            </Button>
          </Form.Trigger>
        </Form>
      </Sheet.Frame>
    </Sheet>
  );
}
