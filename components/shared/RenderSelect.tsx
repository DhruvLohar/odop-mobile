import { Select, XStack, Label, Sheet, Adapt } from 'tamagui';
import { Check, ArrowDown2 } from 'iconsax-react-native';
import { useMemo } from 'react';

export const RenderSelect = (
  label: string,
  value: string | null,
  onValueChange: (value: string) => void,
  items: string[],
  isDisabled: boolean
) => {
  const renderedItems = useMemo(() => {
    return items.map((item, index) => (
      <Select.Item key={index} index={index} value={item}>
        <Select.ItemText>{item}</Select.ItemText>
        <Select.ItemIndicator marginLeft="auto">
          <Check size={16} color="white" />
        </Select.ItemIndicator>
      </Select.Item>
    ));
  }, [items]);

  return (
    <Select value={value || ''} onValueChange={onValueChange}>
      <Label>{label}</Label>
      <Select.Trigger width="100%" mb="$2" disabled={isDisabled}>
        <XStack justifyContent="space-between" alignItems="center" w="100%">
          <Select.Value placeholder={label} />
          <ArrowDown2 size={16} color="white" />
        </XStack>
      </Select.Trigger>
      <Adapt when="sm" platform="touch">
        <Sheet
          modal
          dismissOnSnapToBottom
          animationConfig={{ type: 'spring', damping: 20, mass: 1 }}>
          <Sheet.Frame padding="$4" maxHeight="$20" bottom="$0" position="absolute">
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay />
        </Sheet>
      </Adapt>
      <Select.Content>
        <Select.Viewport>{renderedItems}</Select.Viewport>
      </Select.Content>
    </Select>
  );
};
