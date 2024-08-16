import React from 'react';
import { Label, Input, TextArea, YStack, Paragraph } from 'tamagui';
import { Controller } from 'react-hook-form';
import { KeyboardTypeOptions } from 'react-native';

// Controlled Input Component
interface ControlledInputProps {
  control: any;
  name: string;
  label: string;
  placeholder: string;
  error?: string;
  keyboardType?: KeyboardTypeOptions; // Use KeyboardTypeOptions for type safety
}

const ControlledInput: React.FC<ControlledInputProps> = ({
  control,
  name,
  label,
  placeholder,
  error,
  keyboardType = 'default', // Default to 'default' if not provided
}) => (
  <YStack mb="$4">
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <>
          <Label mb="$2">{label}</Label>
          <Input
            size={'$5'}
            borderWidth={2}
            placeholder={placeholder}
            mb="$2"
            w={'100%'}
            onChangeText={onChange}
            value={value?.toString()}
            keyboardType={keyboardType} // Use the correct keyboardType
          />
        </>
      )}
    />
    {error && (
      <Paragraph size={'$4'} color={'$red10'} mt="$-4">
        {error}
      </Paragraph>
    )}
  </YStack>
);

// Controlled Text Area Component
interface ControlledTextAreaProps {
  control: any;
  name: string;
  label: string;
  placeholder: string;
  error?: string;
  numberOfLines?: number;
}

const ControlledTextArea: React.FC<ControlledTextAreaProps> = ({
  control,
  name,
  label,
  placeholder,
  error,
  numberOfLines = 4,
}) => (
  <YStack mb="$4">
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <>
          <Label mb="$2">{label}</Label>
          <TextArea
            size={'$5'}
            borderWidth={2}
            placeholder={placeholder}
            mb="$2"
            w={'100%'}
            onChangeText={onChange}
            value={value}
            numberOfLines={numberOfLines}
          />
        </>
      )}
    />
    {error && (
      <Paragraph size={'$4'} color={'$red10'} mt="$-4">
        {error}
      </Paragraph>
    )}
  </YStack>
);

export { ControlledInput, ControlledTextArea };
