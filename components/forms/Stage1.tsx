import { YStack, XStack, Input, Label, Paragraph } from 'tamagui';
import { Controller } from 'react-hook-form';

const Stage1 = ({ control, errors }: { control: any; errors: any }) => {
  return (
    <YStack mb="$3" rowGap="$4">
      <XStack width={'100%'} justifyContent="space-between">
        <YStack width={'48%'}>
          <Controller
            control={control}
            name="firstName"
            render={({ field: { onChange, onBlur, value } }) => (
              <YStack>
                <Label>First Name</Label>
                <Input
                  size={'$5'}
                  borderWidth={2}
                  placeholder="First Name"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              </YStack>
            )}
          />
          {errors.firstName && (
            <Paragraph size={'$4'} color={'$red10'} mb="$2">
              {errors.firstName.message}
            </Paragraph>
          )}
        </YStack>

        <YStack width={'48%'}>
          <Controller
            control={control}
            name="lastName"
            render={({ field: { onChange, onBlur, value } }) => (
              <YStack>
                <Label>Last Name</Label>
                <Input
                  size={'$5'}
                  borderWidth={2}
                  placeholder="Last Name"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              </YStack>
            )}
          />
          {errors.lastName && (
            <Paragraph size={'$4'} color={'$red10'} mb="$2">
              {errors.lastName.message}
            </Paragraph>
          )}
        </YStack>
      </XStack>

      <Controller
        control={control}
        name="mobileNumber"
        render={({ field: { onChange, onBlur, value } }) => (
          <YStack>
            <Label>Contact Number</Label>
            <Input
              size={'$5'}
              borderWidth={2}
              placeholder="Mobile Number"
              keyboardType="numeric"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          </YStack>
        )}
      />
      {errors.mobileNumber && (
        <Paragraph size={'$4'} color={'$red10'} mb="$2">
          {errors.mobileNumber.message}
        </Paragraph>
      )}

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <YStack>
            <Label>Email</Label>
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
    </YStack>
  );
};

export default Stage1;
