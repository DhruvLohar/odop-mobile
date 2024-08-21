import { Message, MoneySend } from 'iconsax-react-native';
import React, { useState } from 'react';
import { Button, H1, Input, Label, Paragraph, Sheet, TextArea, Form, YStack } from 'tamagui';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RenderSelect } from '../shared/RenderSelect'; // Import your RenderSelect component
import { axiosRequest } from '~/lib/api';
import CustomSelect from '../shared/CustomSelect';

// The options array for the dropdown
const options = [
  { id: 'odop_artisan', value: "ODOP Certified Aritsan" },
  { id: 'wholesaler', value: "Wholesaler" },
  { id: 'influencer', value: "Influencer or Content Creator" },
  { id: 'other', value: "Other" },
];
// const options = ["ODOP Certified Artisan", "Wholesaler", "Influencer or Content Creator", "Other"]

const schema = yup.object().shape({
  message: yup.string().required('Convey atleast 20+ words of message, it helps in connecting faster.'),
  purpose: yup.string().required('Purpose of Contact is required'),
});

export default function GetInTouch({ open, setOpen }: { open: boolean; setOpen: any }) {

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle form submission
  const onSubmit = async (data: any) => {
    const res = await axiosRequest('', {
      method: 'post',
      data
    }, false);

    if (res?.success) {
      alert("Your request was sent to artisan")
    } else {
      alert(res?.message)
    }
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
        paddingTop="$6"
        paddingHorizontal="$5"
        justifyContent="flex-start"
        alignItems="flex-start"
        flex={1}>
        <H1 fontSize={'$9'} fontWeight={'bold'}>
          Get in Touch
        </H1>
        <Paragraph theme={'alt2'} fontSize={'$5'} mb="$4">
          Your Request is shown to the Artisan, by submitting this form your are sharing your email and phone number to artisan
        </Paragraph>

        {/* Form Component */}
        <Form width="100%" onSubmit={handleSubmit(onSubmit)}>
          {/* Dropdown for Options */}
          <Controller
            control={control}
            name="purpose"
            render={({ field: { onChange, value } }) => (
              <CustomSelect
                label='Purpose of Contact'
                value={value}
                setValue={onChange}
                options={options}
              />
            )}
          />
          {errors.purpose && (
            <Paragraph size={'$4'} color={'$red10'} mt="$-4">
              {errors.purpose.message}
            </Paragraph>
          )}

          {/* Message Input */}
          <Controller
            control={control}
            name="message"
            render={({ field: { onChange, value } }) => (
              <>
                <Label mb="$2" mt="$3">Message</Label>
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
          {errors.message && (
            <Paragraph size={'$4'} color={'$red10'} mt="$4">
              {errors.message.message}
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
