import { YStack, XStack, Input, Label, Paragraph, RadioGroup } from 'tamagui';
import { Controller } from 'react-hook-form';
import { RadioGroupItemWithLabel } from '../shared/RadioButtonwithLabel';
import { LearnMoreLinks } from 'react-native/Libraries/NewAppScreen';

const Stage1 = ({ control, errors }: { control: any; errors: any }) => {
  return (
    <YStack mb="$3" rowGap="$4">
      <YStack width={'100%'}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <YStack>
              <Label mb="$2">Name</Label>
              <Input
                size={'$5'}
                borderWidth={2}
                placeholder="Full Name"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            </YStack>
          )}
        />
        {errors.name && (
          <Paragraph size={'$4'} color={'$red10'} mb="$2">
            {errors.name.message}
          </Paragraph>
        )}
      </YStack>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <YStack>
            <Label mb="$2">Email</Label>
            <Input
              size={'$5'}
              borderWidth={2}
              placeholder="Email"
              onChangeText={onChange}
              keyboardType="email-address"
              onBlur={onBlur}
              value={value}
            />
          </YStack>
        )}
      />

      {errors.email && (
        <Paragraph size={'$4'} color={'$red10'} mb="$2">
          {errors.email.message}
        </Paragraph>
      )}

      <XStack width={'100%'} justifyContent="space-between">
        <YStack width={'48%'}>
          <Controller
            control={control}
            name="age"
            render={({ field: { onChange, onBlur, value } }) => (
              <YStack>
                <Label mb="$2">Age</Label>
                <Input
                  size={'$5'}
                  borderWidth={2}
                  placeholder="Enter Your Age"
                  keyboardType='numeric'
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              </YStack>
            )}
          />
          {errors.age && (
            <Paragraph size={'$4'} color={'$red10'} mb="$2">
              {errors.age.message}
            </Paragraph>
          )}
        </YStack>

        <YStack width={'48%'}>
          <Controller
            control={control}
            name="phone_number"
            render={({ field: { onChange, onBlur, value } }) => (
              <YStack>
                <Label mb="$2">Phone Number</Label>
                <Input
                  size={'$5'}
                  borderWidth={2}
                  placeholder="Phone Number"
                  keyboardType="numeric"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              </YStack>
            )}
          />
          {errors.phone_number && (
            <Paragraph size={'$4'} color={'$red10'} mb="$2">
              {errors.phone_number.message}
            </Paragraph>
          )}
        </YStack>
      </XStack>

      <Controller
        control={control}
        name="gender"
        render={({ field: { onChange, value } }) => (
          <YStack>
            <Label mb="$2">Gender</Label>
            <RadioGroup
              aria-labelledby="Select one item"
              value={value}
              onValueChange={onChange} // This ensures the selected value is stored
              name="gender">
              <XStack width="100%" alignItems="center" justifyContent="flex-start">
                <RadioGroupItemWithLabel size="fit" value="male" label="Male" />
                <RadioGroupItemWithLabel size="fit" value="female" label="Female" />
                <RadioGroupItemWithLabel size="fit" value="other" label="Other" />
              </XStack>
            </RadioGroup>
          </YStack>
        )}
      />
      {errors.gender && (
        <Paragraph size={'$4'} color={'$red10'} mb="$2">
          {errors.gender.message}
        </Paragraph>
      )}
    </YStack>
  );
};

export default Stage1;
