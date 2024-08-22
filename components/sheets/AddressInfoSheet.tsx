import React, { useState } from 'react';
import { Button, H1, Input, Label, Paragraph, Sheet, TextArea, Form, YStack } from 'tamagui';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';

// Define the schema
const schema = yup.object().shape({
  address: yup.string().required('Address is required'),
  pincode: yup
    .string()
    .matches(/^[0-9]{6}$/, 'Pincode must be 6 digits')
    .required('Pincode is required'),
  customMessage: yup.string().when('is_customizable', {
    is: true,
    then: (schema) => schema.default('none').required('Custom message is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export default function AddressSheet({ open, setOpen }: { open: boolean; setOpen: any }) {
  const [isCustomizable] = useState<boolean>(true); // Hardcoded to true
  const router = useRouter();

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
    router.replace('/(protected)/order/checkout');
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
          Address Information
        </H1>

        {/* Form Component */}
        <Form width="100%" onSubmit={handleSubmit(onSubmit)}>
          {/* Address Input */}
          <Controller
            control={control}
            name="address"
            render={({ field: { onChange, value } }) => (
              <>
                <Label mb="$2">Address</Label>
                <Input
                  size={'$5'}
                  borderWidth={2}
                  placeholder="Enter your address"
                  mb="$4"
                  w={'100%'}
                  onChangeText={onChange}
                  value={value}
                />
              </>
            )}
          />
          {errors.address && (
            <Paragraph size={'$4'} color={'$red10'} mt="$-4">
              {errors.address.message}
            </Paragraph>
          )}

          {/* Pincode Input */}
          <Controller
            control={control}
            name="pincode"
            render={({ field: { onChange, value } }) => (
              <>
                <Label mb="$2">Pincode</Label>
                <Input
                  size={'$5'}
                  borderWidth={2}
                  placeholder="Enter your pincode"
                  keyboardType="numeric"
                  mb="$4"
                  w="100%"
                  onChangeText={onChange}
                  value={value}
                />
              </>
            )}
          />
          {errors.pincode && (
            <Paragraph size={'$4'} color={'$red10'} mt="$-4">
              {errors.pincode.message}
            </Paragraph>
          )}

          {/* Conditional TextArea */}
          {isCustomizable && (
            <Controller
              control={control}
              name="customMessage"
              render={({ field: { onChange, value } }) => (
                <>
                  <Label mb="$2">Customize Message</Label>
                  <TextArea
                    size={'$5'}
                    borderWidth={2}
                    placeholder="Enter a custom message"
                    mb="$4"
                    w="100%"
                    onChangeText={onChange}
                    value={value}
                  />
                </>
              )}
            />
          )}
          {errors.customMessage && (
            <Paragraph size={'$4'} color={'$red10'} mt="$4">
              {errors.customMessage.message}
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
