import React, { useState } from 'react';
import { YStack, H2, Paragraph, Form, Label, Input, XStack, Button, ScrollView } from 'tamagui';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SwitchWithLabel } from '~/components/shared/SwitchWithLabel';
import ImageUploader from '~/components/shared/ImageAdd';

function Create() {
  const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    startTime: yup.string().required('Start Time is required'),
    endTime: yup.string().required('End Time is required'),
    availnow: yup.boolean().default(false),
  });
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [mode, setMode] = useState<'date' | 'time'>('time');
  const [show, setShow] = useState(false);
  const [currentField, setCurrentField] = useState<'startTime' | 'endTime' | null>(null);
  const [images, setImages] = useState<any[]>([]);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      startTime: '',
      endTime: '',
      availnow: false,
    },
  });

  const onChange = (event: any, selectedDate?: Date) => {
    setShow(false);
    if (currentField && selectedDate) {
      const formattedTime = selectedDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });

      if (currentField === 'startTime') {
        setStartDate(selectedDate);
        setValue('startTime', formattedTime); // Update the form value
      } else if (currentField === 'endTime') {
        setEndDate(selectedDate);
        setValue('endTime', formattedTime); // Update the form value
      }
    }
  };

  const showTimepicker = (field: 'startTime' | 'endTime') => {
    setCurrentField(field);
    setShow(true);
    setMode('time');
  };

  const onSubmit = (data: any) => {
    const formData = new FormData();

    // Append form data fields
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });

    console.log(formData);
    setTimeout(() => reset(), 3000);
  };

  return (
    <ScrollView mt="$6">
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
                <Input
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
                render={({ field: { value } }) => (
                  <>
                    <Label mb="$2">Start Time</Label>
                    <Button onPress={() => showTimepicker('startTime')}>
                      {startDate
                        ? startDate.toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                          })
                        : 'Select Start Time'}
                    </Button>
                    <Input value={value} style={{ display: 'none' }} editable={false} />
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
                render={({ field: { value } }) => (
                  <>
                    <Label mb="$2">End Time</Label>
                    <Button onPress={() => showTimepicker('endTime')}>
                      {endDate
                        ? endDate.toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                          })
                        : 'Select End Time'}
                    </Button>
                    <Input value={value} style={{ display: 'none' }} editable={false} />
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
          <ImageUploader images={images} setImages={setImages} />
          <Controller
            control={control}
            name="availnow"
            render={({ field: { onChange, value } }) => (
              <SwitchWithLabel
                size="$2"
                label="Enabling this would list the machinery for rental immediately"
                onChange={onChange}
                value={value}
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
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            mode={mode}
            is24Hour={false}
            display="default"
            onChange={onChange}
          />
        )}
      </YStack>
    </ScrollView>
  );
}

export default Create;
