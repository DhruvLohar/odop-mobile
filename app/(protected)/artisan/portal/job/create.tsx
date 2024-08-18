import React from 'react';
import {
  View,
  YStack,
  H2,
  Paragraph,
  Form,
  Label,
  Input,
  XStack,
  TextArea,
  Button,
  ScrollView,
} from 'tamagui';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SwitchWithLabel } from '~/components/shared/SwitchWithLabel';
import { ControlledInput, ControlledTextArea } from '~/components/forms/Controllers/ControlFields';
import PortalSheet from '~/components/sheets/PortalSheet';

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
    <ScrollView mt="$6">
      <YStack width={'100%'} height={'100%'} justifyContent="center" paddingHorizontal="$5" mt="$6">
        <H2 fontWeight={'bold'} mb="$2">
          Hire Skilled Artisans
        </H2>
        <Paragraph theme={'alt2'} fontSize={'$4'}>
          Fill the form below to create a new Job Post
        </Paragraph>
        <Form width="100%" pb="$2" onSubmit={handleSubmit(onSubmit)} mt="$6">
          <ControlledInput
            control={control}
            name="title"
            label="Title"
            placeholder="Title"
            error={errors.title?.message}
          />

          <ControlledTextArea
            label="Description"
            control={control}
            name="description"
            numberOfLines={4}
            placeholder="Describe about the Job, and what are your expectations from the applicants."
            error={errors.description?.message}
          />

          <ControlledTextArea
            label="Prequisites"
            control={control}
            name="prerequisites"
            numberOfLines={4}
            placeholder="Any specific skill the applicant should have? Write it here"
            error={errors.prerequisites?.message}
          />

          <ControlledInput
            control={control}
            label="No. Of Applicants"
            placeholder="Number of applicants"
            keyboardType="numeric"
            name="numberOfApplicants"
          />

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
    </ScrollView>
  );
}

export default Create;
