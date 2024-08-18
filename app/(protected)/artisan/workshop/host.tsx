import React, { useState } from 'react';
import {
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
import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioGroup } from 'tamagui';
import { RadioGroupItemWithLabel } from '~/components/shared/RadioButtonwithLabel';
import { SwitchWithLabel } from '~/components/shared/SwitchWithLabel';
import ImageUploader from '~/components/shared/ImageAdd';

function Create() {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [images, setImages] = useState<any[]>([]);

  const schema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    address: yup.string().required(),
    price: yup.number().min(0, 'Only positive and free of cost allowed').default(0),
    availnow: yup.boolean().default(false),
    eventTime: yup.string().required('Event Time is required'),
    workshop_level: yup.string().required('Workshop level is required'),
    tags: yup.string().test('is-valid-tags', 'Please enter comma-separated tags', (value) => {
      if (!value) return true;
      const tagsArray = value.split(',').map((tag) => tag.trim());
      return tagsArray.every((tag) => tag.length > 0);
    }),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
      setShowTimePicker(true);
    }
  };

  const onTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime && startDate) {
      const combinedDateTime = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
        selectedTime.getHours(),
        selectedTime.getMinutes()
      );
      const formattedDateTime = combinedDateTime.toLocaleString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });

      setValue('eventTime', formattedDateTime);
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
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
    <ScrollView>
      <YStack width={'100%'} height={'100%'} justifyContent="center" paddingHorizontal="$5" my="$6">
        <H2 fontWeight={'bold'} mb="$2">
          Skillfill Workshops
        </H2>
        <Paragraph theme={'alt2'} fontSize={'$4'}>
          Fill the form below to create a new Workshop Post
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
                  placeholder="Describe the Workshop"
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
          <ImageUploader images={images} setImages={setImages} />
          <Controller
            control={control}
            name="address"
            render={({ field: { onChange, value } }) => (
              <>
                <Label mb="$2">Address</Label>
                <TextArea
                  size={'$5'}
                  borderWidth={2}
                  placeholder="Workshop Address"
                  mb="$4"
                  w={'100%'}
                  onChangeText={onChange}
                  value={value}
                  numberOfLines={4}
                />
              </>
            )}
          />
          {errors.address && (
            <Paragraph size={'$4'} color={'$red10'} mt="$-4">
              {errors.address.message}
            </Paragraph>
          )}

          <YStack>
            <Controller
              control={control}
              name="price"
              render={({ field: { onChange, value } }) => (
                <>
                  <Label mb="$2">Price</Label>
                  <Input
                    size={'$5'}
                    borderWidth={2}
                    placeholder="Cost of Workshop"
                    mb="$2"
                    w={'100%'}
                    onChangeText={(text) => onChange(Number(text))}
                    value={value?.toString()}
                    keyboardType="numeric"
                  />
                </>
              )}
            />
            {errors.price && (
              <Paragraph size={'$4'} color={'$red10'}>
                {errors.price.message}
              </Paragraph>
            )}
          </YStack>

          <Controller
            control={control}
            name="workshop_level"
            render={({ field: { onChange, value } }) => (
              <>
                <Label mb="$2">Workshop Level</Label>
                <RadioGroup
                  value={value}
                  onValueChange={onChange}
                  defaultValue="beginner"
                  orientation="horizontal">
                  <XStack my="$2">
                    <RadioGroupItemWithLabel size="$3" value="Begginer" label="Beginner" />
                    <RadioGroupItemWithLabel size="$3" value="intermediate" label="intermediate" />
                    <RadioGroupItemWithLabel size="$3" value="Advance" label="Advance" />
                  </XStack>
                </RadioGroup>
                {errors.workshop_level && (
                  <Paragraph size={'$4'} color={'$red10'}>
                    {errors.workshop_level.message}
                  </Paragraph>
                )}
              </>
            )}
          />

          {/* Tags Controller */}
          <Controller
            control={control}
            name="tags"
            render={({ field: { onChange, value } }) => (
              <>
                <Label mb="$2">Tags</Label>
                <TextArea
                  size={'$5'}
                  borderWidth={2}
                  placeholder="Enter tags, separated by commas (e.g., coding, design, marketing)"
                  mb="$4"
                  w={'100%'}
                  height={'fit'}
                  onChangeText={onChange}
                  value={value}
                  numberOfLines={2}
                />
                {errors.tags && (
                  <Paragraph size={'$4'} color={'$red10'}>
                    {errors.tags.message}
                  </Paragraph>
                )}
              </>
            )}
          />

          <Controller
            control={control}
            name="eventTime"
            render={({ field: { value } }) => (
              <>
                <Label mb="$2">Event Date & Time</Label>
                <Button onPress={showDatepicker}>{value || 'Select Date & Time'}</Button>
                <Input value={value} style={{ display: 'none' }} editable={false} />
              </>
            )}
          />
          {errors.eventTime && (
            <Paragraph size={'$4'} color={'$red10'}>
              {errors.eventTime.message}
            </Paragraph>
          )}

          <Controller
            control={control}
            name="availnow"
            render={({ field: { onChange, value } }) => (
              <SwitchWithLabel
                size="$2"
                label="List the Workshop immediately"
                onChange={onChange}
                value={value || false}
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
        {showDatePicker && (
          <DateTimePicker
            testID="datePicker"
            value={startDate || new Date()}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
        {showTimePicker && (
          <DateTimePicker
            testID="timePicker"
            value={new Date()}
            mode="time"
            display="default"
            onChange={onTimeChange}
          />
        )}
      </YStack>
    </ScrollView>
  );
}

export default Create;
