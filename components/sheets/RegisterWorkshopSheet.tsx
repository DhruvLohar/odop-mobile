import React from 'react';
import { Button, H1, H4, Input, Label, Paragraph, Sheet, Form, YStack } from 'tamagui';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ImageUploader from '../shared/ImageAdd';

// Define the schema
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
});

export default function WorkshopRegister({
  open,
  setOpen,
  title,
}: {
  open: boolean;
  setOpen: any;
  title: string;
}) {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle form submission
  const onSubmit = (data: any) => {
    console.log(data);
    setOpen(false);
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

      <Sheet.Frame
        paddingHorizontal="$5"
        justifyContent="flex-start"
        alignItems="flex-start"
        flex={1}>
        <H1 fontSize={'$9'} fontWeight={'bold'}>
          Register Now
        </H1>

        {/* Title Display */}
        <H4>{`Registering for ${title}`}</H4>

        {/* Form Component */}
        <Form width="100%" onSubmit={handleSubmit(onSubmit)}>
          {/* Name Input */}
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <>
                <Label mb="$2">Name</Label>
                <Input
                  size={'$5'}
                  borderWidth={2}
                  placeholder="Enter your name"
                  mb="$4"
                  w={'100%'}
                  onChangeText={onChange}
                  value={value}
                />
              </>
            )}
          />
          {errors.name && (
            <Paragraph size={'$4'} color={'$red10'} mt="$-4">
              {errors.name.message}
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
                  size={'$5'}
                  borderWidth={2}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  mb="$4"
                  w="100%"
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

          {/* Phone Number Input */}
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field: { onChange, value } }) => (
              <>
                <Label mb="$2">Phone Number</Label>
                <Input
                  size={'$5'}
                  borderWidth={2}
                  placeholder="Enter your phone number"
                  keyboardType="numeric"
                  mb="$4"
                  w="100%"
                  onChangeText={onChange}
                  value={value}
                />
              </>
            )}
          />
          {errors.phoneNumber && (
            <Paragraph size={'$4'} color={'$red10'} mt="$-4">
              {errors.phoneNumber.message}
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
