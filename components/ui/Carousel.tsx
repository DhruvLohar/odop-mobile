import * as React from "react";
import { Dimensions, Text, View } from "react-native";
import Carousel, {
    ICarouselInstance,
} from "react-native-reanimated-carousel";

import { Circle, H2, Image, Square, XStack } from "tamagui";

const width = Dimensions.get("window").width;

type CustomCarouselProps = {
    data: any[],
    CarouselItem: any
}

export default function CustomCarousel({
    data,
    CarouselItem
}: CustomCarouselProps) {

    const ref = React.useRef<ICarouselInstance>(null);
    
    const [activeIndex, setActiveIndex] = React.useState(0)
    
    // React.useEffect(() => {
    //     console.log(ref.current?.getCurrentIndex())
    // }, [ref])

    return (
        <View style={{ width: width, marginVertical: 10, borderRadius: 30 }}>
            <Carousel
                ref={ref}
                width={width}
                height={280}
                data={data}
                autoPlay
                autoPlayInterval={2500}
                scrollAnimationDuration={1000}
                mode="parallax"

                onSnapToItem={(e) => setActiveIndex(e)}

                renderItem={CarouselItem}
            />

            <XStack 
                width={"100%"} 
                alignItems="center" justifyContent="center"
                columnGap={"$3"}
                mb={"$4"}
            >
                {Array.from({ length: data.length }).map((_, idx) => (
                    <Circle 
                        key={idx} 
                        size={"$0.75"} backgroundColor={(idx === activeIndex) ? "white" : "$gray6"} 
                    />    
                ))}
            </XStack>
        </View>
    );
}