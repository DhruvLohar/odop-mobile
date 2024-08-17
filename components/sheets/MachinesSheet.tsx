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
    { label: "Date", options: [
        { id: "week", value: "This Week" },
        { id: "month", value: "This Month" },
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
                <Paragraph theme={"alt2"} fontSize={"$5"}>Filter Machines as you need!</Paragraph>

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

