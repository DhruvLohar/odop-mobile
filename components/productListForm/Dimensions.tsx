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
        name="dimension.height"
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
        name="dimension.weight"
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
        name="dimension.width"
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
        name="dimension.length"
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
      {errors.dimension && (
        <YStack>
          {errors.dimension.height && (
            <Paragraph size={'$4'} color={'$red10'}>
              {errors.dimension.height.message}
            </Paragraph>
          )}
          {errors.dimension.weight && (
            <Paragraph size={'$4'} color={'$red10'}>
              {errors.dimension.weight.message}
            </Paragraph>
          )}
          {errors.dimension.width && (
            <Paragraph size={'$4'} color={'$red10'}>
              {errors.dimension.width.message}
            </Paragraph>
          )}
          {errors.dimension.length && (
            <Paragraph size={'$4'} color={'$red10'}>
              {errors.dimension.length.message}
            </Paragraph>
          )}
        </YStack>
      )}
    </YStack>
  );
};

export default Dimensions;
