import React from 'react';
import { View, YStack, H2, Paragraph, Form, Label, Input, XStack, TextArea, Button } from 'tamagui';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SwitchWithLabel } from '~/components/shared/SwitchWithLabel';

function Create() {
  // Update the Yup schema to validate the 12-hour time format with AM/PM
  const schema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    startTime: yup
      .string()
      .required('Start Time is required')
      .matches(
        /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/,
        'Start Time must be in the format HH:MM AM/PM'
      ),
    endTime: yup
      .string()
      .required('End Time is required')
      .matches(
        /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/,
        'End Time must be in the format HH:MM AM/PM'
      ),
    availnow: yup.boolean().required(),
  });

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
    if (data) {
      setTimeout(() => reset(), 3000);
    }
  };

  return (
    <YStack width={'100%'} height={'100%'} justifyContent="center" paddingHorizontal="$5" mt="$6">
      <H2 fontWeight={'bold'} mb="$2">
        List a New Rental Machine
      </H2>
      <Paragraph theme={'alt2'} fontSize={'$4'}>
        Fill the form below to list your Rental Machine online so that other artisans can book and
        increase their productivity.
      </Paragraph>
      <Form width="100%" pb="$2" onSubmit={handleSubmit(onSubmit)} mt="$6">
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, value } }) => (
            <>
              <Label mb="$2">Title</Label>
              <Input
                keyboardType="default"
                size={'$5'}
                borderWidth={2}
                placeholder="Title"
                mb="$4"
                w={'100%'}
                onChangeText={onChange}
                value={value}
              />
            </>
          )}
        />
        {errors.title && (
          <Paragraph size={'$4'} color={'$red10'} mt="$-4">
            {errors.title.message}
          </Paragraph>
        )}

        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <>
              <Label mb="$2">Description</Label>
              <TextArea
                size={'$5'}
                borderWidth={2}
                placeholder="Describe the Machine you want others to rent"
                mb="$4"
                w={'100%'}
                onChangeText={onChange}
                value={value}
                numberOfLines={4}
              />
            </>
          )}
        />
        {errors.description && (
          <Paragraph size={'$4'} color={'$red10'} mt="$-4">
            {errors.description.message}
          </Paragraph>
        )}

        <XStack w="100%" justifyContent="space-between" alignItems="center" mb="$4">
          <YStack flex={1} mr="$2">
            <Controller
              control={control}
              name="startTime"
              render={({ field: { onChange, value } }) => (
                <>
                  <Label mb="$2">Start Time</Label>
                  <Input
                    size={'$5'}
                    borderWidth={2}
                    placeholder="HH:MM AM/PM"
                    mb="$2"
                    w={'100%'}
                    onChangeText={onChange} // pass the string value
                    value={value || ''} // ensure the value is a string
                    keyboardType="default"
                  />
                </>
              )}
            />
            {errors.startTime && (
              <Paragraph size={'$4'} color={'$red10'}>
                {errors.startTime.message}
              </Paragraph>
            )}
          </YStack>

          <YStack flex={1} ml="$2">
            <Controller
              control={control}
              name="endTime"
              render={({ field: { onChange, value } }) => (
                <>
                  <Label mb="$2">End Time</Label>
                  <Input
                    size={'$5'}
                    borderWidth={2}
                    placeholder="HH:MM AM/PM"
                    mb="$2"
                    w={'100%'}
                    onChangeText={onChange} // pass the string value
                    value={value || ''} // ensure the value is a string
                    keyboardType="default"
                  />
                </>
              )}
            />

            {errors.endTime && (
              <Paragraph size={'$4'} color={'$red10'}>
                {errors.endTime.message}
              </Paragraph>
            )}
          </YStack>
        </XStack>
        <Controller
          control={control}
          name="availnow"
          render={({ field: { onChange, value } }) => (
            <SwitchWithLabel
              size="$2"
              label="Enabling this would list the machinery for rental immediately"
              onChange={onChange} // Pass onChange to SwitchWithLabel
              value={value || false} // Pass value to SwitchWithLabel
            />
          )}
        />
        {errors.availnow && (
          <Paragraph size={'$4'} color={'$red10'} mt="$-4">
            {errors.availnow.message}
          </Paragraph>
        )}

        <Form.Trigger asChild>
          <Button my="$6" themeInverse width={'100%'}>
            SUBMIT
          </Button>
        </Form.Trigger>
      </Form>
    </YStack>
  );
}

export default Create;
