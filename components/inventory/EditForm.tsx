import { Message, MoneySend } from 'iconsax-react-native';
import React, { useState } from 'react';
import {
  Button,
  H1,
  Input,
  Label,
  Paragraph,
  Sheet,
  TextArea,
  Form,
  YStack,
  ScrollView,
  H4,
} from 'tamagui';
import * as yup from 'yup';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ControlledInput, ControlledTextArea } from '../forms/Controllers/ControlFields';
import { SwitchWithLabel } from '../shared/SwitchWithLabel';
import DateTimePicker from '@react-native-community/datetimepicker';
import ImageUploader from '../shared/ImageAdd';

const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  quantity: yup.number().required('Quantity is required'),
  is_customizable: yup.boolean().default(false),
  customize_note: yup.string().when('is_customizable', {
    is: true,
    then: (schema) => schema.default('none').required('Customize note is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  eventTime: yup.string().required('Event Time is required'),
});

export default function EditForm({ open, setOpen }: { open: boolean; setOpen: any }) {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date('2024-08-17'));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [images, setImages] = useState<any[]>([]);

  const {
    control,
    setValue,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: 'Sample Product',
      description: 'This is a description of the sample Product.',
      quantity: 10,
      is_customizable: false,
      customize_note: 'Please add a custom note if you have any specific requirements.',
      eventTime: 'Sat, Aug 17, 2024',
    },
  });

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);

      const formattedDate = selectedDate.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });

      setValue('eventTime', formattedDate);
    }
  };

  const isCustomizable = useWatch({
    control,
    name: 'is_customizable',
    defaultValue: false,
  });

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  async function onSubmit(data: any) {
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
  }

  return (
    <Sheet
      forceRemoveScrollEnabled={open}
      modal
      open={open}
      onOpenChange={setOpen}
      dismissOnSnapToBottom>
      <Sheet.Overlay animation={'lazy'} enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />

      <Sheet.Handle backgroundColor={'white'} />

      <Sheet.Frame
        paddingHorizontal="$5"
        paddingVertical="$3"
        justifyContent="flex-start"
        alignItems="flex-start">
        <H4 fontWeight={'bold'}>Edit details to be displayed</H4>
        <Form width="100%" h="100%" onSubmit={handleSubmit(onSubmit)}>
          <ScrollView mb="$6">
            <ImageUploader images={images} setImages={setImages} />
            <ControlledInput
              control={control}
              name="title"
              label="Title"
              placeholder="Title"
              error={errors.title?.message}
            />

            <ControlledInput
              control={control}
              name="quantity"
              label="Quantity"
              placeholder="Quantity"
              error={errors.quantity?.message}
            />

            <ControlledTextArea
              control={control}
              name="description"
              label="Description"
              placeholder="Describe the event and any expectations."
              error={errors.description?.message}
            />

            <Controller
              control={control}
              name="is_customizable"
              render={({ field: { onChange, value } }) => (
                <SwitchWithLabel
                  size="$2"
                  label="Enabling this would allow users to ask for customizations"
                  onChange={onChange}
                  value={value || false}
                />
              )}
            />
            {errors.is_customizable && (
              <Paragraph size={'$4'} color={'$red10'} mt="$-4">
                {errors.is_customizable.message}
              </Paragraph>
            )}

            {isCustomizable && (
              <ControlledTextArea
                control={control}
                name="customize_note"
                label="Customize Note"
                placeholder="Add any customization notes here"
                error={errors.customize_note?.message}
              />
            )}

            <Controller
              control={control}
              name="eventTime"
              render={({ field: { value } }) => (
                <>
                  <Label mb="$2">Event Date</Label>
                  <Button onPress={showDatepicker}>{value || 'Select Date'}</Button>
                  <Input value={value} style={{ display: 'none' }} editable={false} />
                </>
              )}
            />
            {errors.eventTime && (
              <Paragraph size={'$4'} color={'$red10'}>
                {errors.eventTime.message}
              </Paragraph>
            )}

            <Form.Trigger asChild>
              <Button my="$6" themeInverse width={'100%'}>
                SUBMIT
              </Button>
            </Form.Trigger>
          </ScrollView>
        </Form>
        {showDatePicker && (
          <DateTimePicker
            testID="datePicker"
            value={startDate || new Date()}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
      </Sheet.Frame>
    </Sheet>
  );
}
