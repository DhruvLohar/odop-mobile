import { ArrowDown2, ArrowDown3, Check, TickCircle } from "iconsax-react-native";
import React from "react";
import { Adapt, Button, Card, H1, H2, H3, H4, Input, Label, Paragraph, Select, SelectProps, Separator, Sheet, XStack, YStack } from "tamagui";
import CustomSelect from "../shared/CustomSelect";

type FilterSheetProps = {
    open: boolean,
    setOpen: any
}

const filters = [
    { label: "Location", options: [
        { id: "near", value: "Nearby" },
        { id: "far", value: "Far away" },
    ]},
    { label: "Price", options: [
        { id: "htl", value: "High to Low" },
        { id: "lth", value: "Low to High" },
    ]},
    { label: "Price", options: [
        { id: "htl", value: "High to Low" },
        { id: "lth", value: "Low to High" },
    ]},
]

export default function FiltersSheet({
    open, setOpen
}: FilterSheetProps) {

    return (
        <Sheet
            forceRemoveScrollEnabled={open}
            modal
            open={open}
            onOpenChange={setOpen}
            snapPointsMode="fit"
            dismissOnSnapToBottom
            zIndex={100_000}
        >
            <Sheet.Overlay
                animation={"lazy"}
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
            />

            <Sheet.Handle backgroundColor={"white"} />

            <Sheet.Frame padding="$5" justifyContent="flex-start" alignItems="flex-start">
                <H1 fontSize={"$9"} fontWeight={"bold"}>Filters</H1>
                <Paragraph theme={"alt2"} fontSize={"$5"}>Filter the products according to what you're looking for!</Paragraph>

                <YStack width={"100%"} my="$6">
                    {filters.map((item, i) => (
                        <CustomSelect
                            key={i}
                            value={""}
                            setValue={undefined}
                            label={item.label}
                            options={item.options}
                        />
                    ))}
                </YStack>
            </Sheet.Frame>

        </Sheet>
    )
}

export function ItemSelect(props: SelectProps) {
    const [val, setVal] = React.useState('apple')

    return (
        <Select value={val} onValueChange={setVal} disablePreventBodyScroll {...props}>
            <Label>Something</Label>
            <Select.Trigger width={"100%"} iconAfter={() => <ArrowDown2 color="white" />}>
                <Select.Value placeholder="Something" />
            </Select.Trigger>

            <Adapt when="sm" platform="touch">
                <Sheet
                    native
                    modal
                    dismissOnSnapToBottom
                    animationConfig={{
                        type: 'spring',
                        damping: 20,
                        mass: 1.2,
                        stiffness: 250,
                    }}
                >
                    <Sheet.Frame>
                        <Sheet.ScrollView>
                            <Adapt.Contents />
                        </Sheet.ScrollView>
                    </Sheet.Frame>
                    <Sheet.Overlay
                        animation="lazy"
                        enterStyle={{ opacity: 0 }}
                        exitStyle={{ opacity: 0 }}
                    />
                </Sheet>
            </Adapt>

            <Select.Content zIndex={200000}>

                <Select.Viewport
                    // to do animations:
                    // animation="quick"
                    // animateOnly={['transform', 'opacity']}
                    // enterStyle={{ o: 0, y: -10 }}
                    // exitStyle={{ o: 0, y: 10 }}
                    width={"100%"}
                >
                    <Select.Group>
                        <Select.Label>Fruits</Select.Label>
                        {/* for longer lists memoizing these is useful */}
                        {React.useMemo(
                            () =>
                                items.map((item, i) => {
                                    return (
                                        <Select.Item
                                            index={i}
                                            key={item.name}
                                            value={item.name.toLowerCase()}
                                        >
                                            <Select.ItemText>{item.name}</Select.ItemText>
                                            <Select.ItemIndicator marginLeft="auto">
                                                <TickCircle color="white" size={16} />
                                            </Select.ItemIndicator>
                                        </Select.Item>
                                    )
                                }),
                            [items]
                        )}
                    </Select.Group>
                </Select.Viewport>
            </Select.Content>
        </Select>
    )
}

const items = [
    { name: 'Apple' },
    { name: 'Pear' },
    { name: 'Blackberry' },
    { name: 'Peach' },
    { name: 'Apricot' },
    { name: 'Melon' },
    { name: 'Honeydew' },
    { name: 'Starfruit' },
    { name: 'Blueberry' },
    { name: 'Raspberry' },
    { name: 'Strawberry' },
    { name: 'Mango' },
    { name: 'Pineapple' },
    { name: 'Lime' },
    { name: 'Lemon' },
    { name: 'Coconut' },
    { name: 'Guava' },
    { name: 'Papaya' },
    { name: 'Orange' },
    { name: 'Grape' },
    { name: 'Jackfruit' },
    { name: 'Durian' },
]
