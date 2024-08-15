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
    prerequisites: yup.string().required(),
    numberOfApplicants: yup
      .number()
      .required('Number of Applicants is required')
      .min(1, 'Require at least 1 applicant'),
    availnow: yup.boolean().default(false),
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
        Hire Skilled Artisans
      </H2>
      <Paragraph theme={'alt2'} fontSize={'$4'}>
        Fill the form below to create a new Job Post
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
                placeholder="Describe about the Job, and what are your expectations from the applicants."
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

        <Controller
          control={control}
          name="prerequisites"
          render={({ field: { onChange, value } }) => (
            <>
              <Label mb="$2">Prerequisites</Label>
              <TextArea
                size={'$5'}
                borderWidth={2}
                placeholder="Any specific skill the applicant should have? Write it here"
                mb="$4"
                w={'100%'}
                onChangeText={onChange}
                value={value}
                numberOfLines={4}
              />
            </>
          )}
        />
        {errors.prerequisites && (
          <Paragraph size={'$4'} color={'$red10'} mt="$-4">
            {errors.prerequisites.message}
          </Paragraph>
        )}

        <YStack>
          <Controller
            control={control}
            name="numberOfApplicants"
            render={({ field: { onChange, value } }) => (
              <>
                <Label mb="$2">No. of Applicants</Label>
                <Input
                  size={'$5'}
                  borderWidth={2}
                  placeholder="Number of applicants"
                  mb="$2"
                  w={'100%'}
                  onChangeText={(text) => onChange(Number(text))} // Convert the text input to a number
                  value={value?.toString()} // Convert the number to a string for the Input value
                  keyboardType="numeric" // Ensures the keyboard is optimized for number input
                />
              </>
            )}
          />
          {errors.numberOfApplicants && (
            <Paragraph size={'$4'} color={'$red10'}>
              {errors.numberOfApplicants.message}
            </Paragraph>
          )}
        </YStack>

        <Controller
          control={control}
          name="availnow"
          render={({ field: { onChange, value } }) => (
            <SwitchWithLabel
              size="$2"
              label="Enabling this would list the Job immediately"
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
