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
import { axiosRequest } from '~/lib/api';

function Create() {
  // Update the Yup schema to validate the 12-hour time format with AM/PM

  const schema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    prerequisites: yup.string().required(),
    vacancy: yup
      .number()
      .required('Number of Applicants is required')
      .min(1, 'Require at least 1 applicant'),
    is_active: yup.boolean().default(false),
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
  const onSubmit = async (data: any) => {

    const formData = new FormData()

    Object.keys(data).map((key) => {
      formData.append(key, data[key]);
    })

    console.log(formData)
    const res = await axiosRequest('community/job/', {
      method: 'post',
      data: formData
    }, false);

    if (res?.success) {
      alert("Job post was created")
    } else {
      alert(res?.message)
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
            name="vacancy"
          />

          <Controller
            control={control}
            name="is_active"
            render={({ field: { onChange, value } }) => (
              <SwitchWithLabel
                size="$2"
                label="Enabling this would list the Job immediately"
                onChange={onChange} // Pass onChange to SwitchWithLabel
                value={value || false} // Pass value to SwitchWithLabel
              />
            )}
          />
          {errors.is_active && (
            <Paragraph size={'$4'} color={'$red10'} mt="$-4">
              {errors.is_active.message}
            </Paragraph>
          )}

          <Form.Trigger asChild>
            <Button my="$6" themeInverse width={'100%'}>
              Post Now
            </Button>
          </Form.Trigger>
        </Form>
      </YStack>
    </ScrollView>
  );
}

export default Create;
