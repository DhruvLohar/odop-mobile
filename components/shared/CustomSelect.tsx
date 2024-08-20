import { ArrowDown2, TickCircle } from "iconsax-react-native"
import React from "react"
import { Adapt, Label, Select, Sheet } from "tamagui"

type CustomSelectProps = {
    label: string,
    value: string | undefined,
    setValue: any,

    options: {
        id: string | number,
        value: string
    }[]
}

export default function CustomSelect({
    label,
    value, setValue, options
}: CustomSelectProps) {
    return (
        <Select value={value} onValueChange={setValue} disablePreventBodyScroll>
            <Label>{label}</Label>
            <Select.Trigger width={"100%"} mb="$4" iconAfter={() => <ArrowDown2 color="white" />}>
                <Select.Value placeholder={label} />
            </Select.Trigger>

            <Adapt when="sm" platform="touch">
                <Sheet
                    native
                    modal
                    dismissOnSnapToBottom
                    snapPointsMode="fit"
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
                        <Select.Label>{label}</Select.Label>
                        {/* for longer lists memoizing these is useful */}
                        {React.useMemo(
                            () =>
                                options.map((item, i) => {
                                    return (
                                        <Select.Item
                                            index={i}
                                            key={item.id}
                                            value={item.id.toString()}
                                        >
                                            <Select.ItemText>{item.value}</Select.ItemText>
                                            <Select.ItemIndicator marginLeft="auto">
                                                <TickCircle color="white" size={16} />
                                            </Select.ItemIndicator>
                                        </Select.Item>
                                    )
                                }),
                            [options]
                        )}
                    </Select.Group>
                </Select.Viewport>
            </Select.Content>
        </Select>
    )
}