import { YStack, H2, Paragraph, Form, Label, TextArea, Button } from 'tamagui';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React, { useState } from 'react';
// import TimelineCalendarScreen from '~/components/custom/BookMachineSlots';
import { Calendar } from 'react-native-calendars';
import { themeColor } from '~/lib/mock/theme';

export default function BookMachineSlot() {

  const schema = yup.object().shape({
    purpose: yup.string().required(),
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
  async function onSubmit(data: any) {
    console.log(data);
  };

  return (
    <YStack width={'100%'} height={'100%'} justifyContent="flex-start" paddingHorizontal="$5" mt="$6">
      <H2 fontWeight={'bold'} mb="$2">
        Book your slot
      </H2>
      <Paragraph theme={'alt2'} fontSize={'$4'}>
        Book your slot for the machine just like that with ease.
      </Paragraph>
      <Form width="100%" pb="$2" onSubmit={handleSubmit(onSubmit)} mt="$6">
        <Controller
          control={control}
          name="purpose"
          render={({ field: { onChange, value } }) => (
            <>
              <Label mb="$2">Purpose of rent</Label>
              <TextArea
                size={'$5'}
                borderWidth={2}
                placeholder="Let the artisan know your plan for renting this machinery"
                mb="$4"
                w={'100%'}
                onChangeText={onChange}
                value={value}
                numberOfLines={4}
              />
            </>
          )}
        />
        {errors.purpose && (
          <Paragraph size={'$4'} color={'$red10'} mt="$-4">
            {errors.purpose.message}
          </Paragraph>
        )}



        <Calendar
          enableSwipeMonths
          current={'2022-06-06'}
          style={{
            backgroundColor: "transparent",
            color: 'white'
          }}
          headerStyle={{
            color: 'white'
          }}
          onDayPress={(e: any) => console.log(e)}
        />

        <Form.Trigger asChild>
          <Button my="$6" themeInverse width={'100%'}>
            Book Now
          </Button>
        </Form.Trigger>
      </Form>
    </YStack>
  );
}
