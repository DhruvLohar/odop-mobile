import { SizeTokens, XStack, Label, Separator, Switch } from 'tamagui';

export function SwitchWithLabel(props: {
  size: SizeTokens;
  defaultChecked?: boolean;
  label: string;
  onChange: (value: boolean) => void; // onChange prop
  value: boolean; // value prop
}) {
  const id = `switch-${props.size.toString().slice(1)}-${props.defaultChecked ?? ''}`;

  return (
    <XStack borderWidth={2} borderColor={"$red1"} p="$4" alignItems="center" gap="$4">
      <Label width={"75%"} lineHeight={"$1"} justifyContent="flex-end" htmlFor={id}>
        {props.label}
      </Label>
      <Separator minHeight={20} vertical />
      <Switch
        id={id}
        size={props.size}
        checked={props.value} // bind value to checked prop
        onCheckedChange={props.onChange} // bind onChange handler
      >
        <Switch.Thumb animation="quick" backgroundColor={'$green10Light'} />
      </Switch>
    </XStack>
  );
}
