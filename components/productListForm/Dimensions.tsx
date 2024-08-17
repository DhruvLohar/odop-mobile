import React from 'react';
import { XStack, Label, H4, Input, YStack, Paragraph } from 'tamagui';
import { Controller } from 'react-hook-form';

interface DimensionsProps {
  control: any;
  errors: any;
}

const Dimensions: React.FC<DimensionsProps> = ({ control, errors }) => {
  return (
    <YStack my="$4" w="100%" space="$4" justifyContent="space-between" alignItems="stretch">
      <H4 mb="$2">Dimensions</H4>
      <Controller
        control={control}
        name="dimensions.height"
        render={({ field: { onChange, value } }) => (
          <XStack alignItems="center" justifyContent="space-between" space="$2">
            <Label>Height:</Label>
            <Input
              size={'$4'}
              borderWidth={2}
              placeholder="Height"
              w={'40%'}
              onChangeText={onChange}
              value={value?.toString()}
              keyboardType="numeric"
            />
          </XStack>
        )}
      />
      <Controller
        control={control}
        name="dimensions.weight"
        render={({ field: { onChange, value } }) => (
          <XStack alignItems="center" justifyContent="space-between" space="$2">
            <Label>Weight:</Label>
            <Input
              size={'$4'}
              borderWidth={2}
              placeholder="Weight"
              w={'40%'}
              onChangeText={onChange}
              value={value?.toString()}
              keyboardType="numeric"
            />
          </XStack>
        )}
      />
      <Controller
        control={control}
        name="dimensions.width"
        render={({ field: { onChange, value } }) => (
          <XStack alignItems="center" justifyContent="space-between" space="$2">
            <Label>Width:</Label>
            <Input
              size={'$4'}
              borderWidth={2}
              placeholder="Width"
              w={'40%'}
              onChangeText={onChange}
              value={value?.toString()}
              keyboardType="numeric"
            />
          </XStack>
        )}
      />
      <Controller
        control={control}
        name="dimensions.length"
        render={({ field: { onChange, value } }) => (
          <XStack alignItems="center" justifyContent="space-between" space="$2">
            <Label>Length:</Label>
            <Input
              size={'$4'}
              borderWidth={2}
              placeholder="Length"
              w={'40%'}
              onChangeText={onChange}
              value={value?.toString()}
              keyboardType="numeric"
            />
          </XStack>
        )}
      />

      {/* Error messages for dimension fields */}
      {errors.dimensions && (
        <YStack>
          {errors.dimensions.height && (
            <Paragraph size={'$4'} color={'$red10'}>
              {errors.dimensions.height.message}
            </Paragraph>
          )}
          {errors.dimensions.weight && (
            <Paragraph size={'$4'} color={'$red10'}>
              {errors.dimensions.weight.message}
            </Paragraph>
          )}
          {errors.dimensions.width && (
            <Paragraph size={'$4'} color={'$red10'}>
              {errors.dimensions.width.message}
            </Paragraph>
          )}
          {errors.dimensions.length && (
            <Paragraph size={'$4'} color={'$red10'}>
              {errors.dimensions.length.message}
            </Paragraph>
          )}
        </YStack>
      )}
    </YStack>
  );
};

export default Dimensions;
