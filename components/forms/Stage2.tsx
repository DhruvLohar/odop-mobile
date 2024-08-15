import { YStack, Paragraph } from 'tamagui';
import { Controller } from 'react-hook-form';
import { RenderSelect } from '../shared/RenderSelect';
import { States, StatesAndDistrict } from '~/lib/stateDistirctData';

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
        name="selectedState"
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
          {errors.selectedState.message}
        </Paragraph>
      )}

      <Controller
        control={control}
        name="selectedDistrict"
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
          {errors.selectedDistrict.message}
        </Paragraph>
      )}
    </YStack>
  );
};

export default Stage2;
