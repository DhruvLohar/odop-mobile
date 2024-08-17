import { YStack, Paragraph, Label, Input } from 'tamagui';
import { Controller } from 'react-hook-form';
import { RenderSelect } from '../shared/RenderSelect';
import { States, StatesAndDistrict } from '~/lib/constants/stateDistirctData';

const Stage2 = ({
  control,
  errors,
  selectedState,
  setSelectedState,
  setSelectedDistrict,
}: {
  control: any;
  errors: any;
  selectedState: string | null;
  setSelectedState: (value: string) => void;
  setSelectedDistrict: (value: string | null) => void;
}) => {
  return (
    <YStack mb="$3">
      <Controller
        control={control}
        name="state"
        render={({ field: { onChange, value } }) =>
          RenderSelect(
            'Select State',
            value,
            (value) => {
              onChange(value);
              setSelectedState(value);
              setSelectedDistrict(null);
            },
            States,
            false
          )
        }
      />
      {errors.selectedState && (
        <Paragraph size={'$4'} color={'$red10'} mt="$-4">
          {errors.state.message}
        </Paragraph>
      )}

      <Controller
        control={control}
        name="district"
        render={({ field: { onChange, value } }) =>
          RenderSelect(
            'Select District',
            value,
            onChange,
            StatesAndDistrict.find((state) => state.state === selectedState)?.districts || [],
            !selectedState
          )
        }
      />
      {errors.selectedDistrict && (
        <Paragraph size={'$4'} color={'$red10'} mt="$-4">
          {errors.district.message}
        </Paragraph>
      )}

      <YStack width={'100%'} mb="$2">
        <Controller
          control={control}
          name="address"
          render={({ field: { onChange, onBlur, value } }) => (
            <YStack>
              <Label mb="$2">Address</Label>
              <Input
                size={'$5'}
                borderWidth={2}
                placeholder="Address"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            </YStack>
          )}
        />
        {errors.address && (
          <Paragraph size={'$4'} color={'$red10'} mb="$2">
            {errors.address.message}
          </Paragraph>
        )}
      </YStack>

      <YStack>
        <Controller
          control={control}
          name="postal_code"
          render={({ field: { onChange, onBlur, value } }) => (
            <YStack>
              <Label mb="$2">Pincode</Label>
              <Input
                size={'$5'}
                borderWidth={2}
                placeholder="Enter Pincode"
                keyboardType="numeric"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            </YStack>
          )}
        />
        {errors.pinCode && (
          <Paragraph size={'$4'} color={'$red10'} mb="$2">
            {errors.postal_code.message}
          </Paragraph>
        )}
      </YStack>
    </YStack>
  );
};

export default Stage2;
