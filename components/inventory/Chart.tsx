import { LineChart } from 'react-native-gifted-charts';
import { H2, H4, Paragraph, Text, View, YStack } from 'tamagui';
import React from 'react';

interface DataPoint {
  value: number;
}

interface MonthlyData {
  title: string;
  data: DataPoint[];
}

function Chart() {
  const data1: MonthlyData = {
    title: 'April',
    data: [
      { value: 70 },
      { value: 36 },
      { value: 50 },
      { value: 40 },
      { value: 18 },
      { value: 38 },
      { value: 38 },
      { value: 38 },
    ],
  };
  const data2: MonthlyData = {
    title: 'May',
    data: [
      { value: 50 },
      { value: 10 },
      { value: 45 },
      { value: 45 },
      { value: 45 },
      { value: 30 },
      { value: 45 },
      { value: 18 },
    ],
  };

  return (
    <YStack pt="$4" alignItems="center">
      {/* Added padding to the right */}
      <LineChart
        curved
        data={data1.data}
        isAnimated
        data2={data2.data}
        spacing={43}
        color1="#34d2eb"
        color2="#9234eb"
        endSpacing={0}
        dataPointsColor1="#34d2eb"
        dataPointsColor2="#9234eb"
        initialSpacing={0}
        noOfSections={4}
        yAxisColor="#FFFFFF" // Changed yAxisColor to white for dark mode
        yAxisThickness={0.4}
        rulesType="solid"
        rulesColor="#333333" // Changed rulesColor to a darker shade for dark mode
        yAxisTextStyle={{ color: '#ffffff', marginRight: 8, paddingBottom: 4 }} // Changed text color for better visibility in dark mode
        xAxisColor="#AAAAAA" // Changed xAxisColor for better visibility in dark mode
        pointerConfig={{
          pointerStripUptoDataPoint: true,
          pointerStripColor: 'lightgray',
          pointerStripWidth: 2,
          strokeDashArray: [2, 5],
          pointerColor: 'lightgray',
          radius: 4,
          pointerLabelWidth: 100,
          pointerLabelHeight: 120,
          pointerLabelComponent: (items: DataPoint[]) => {
            return (
              <View borderRadius={4} h="$10" pl="$4" justifyContent="flex-start">
                <Text color="gray">{data1.title}</Text>
                <Text color="white" fontSize="$5" fontWeight={500}>
                  {items[0].value}
                </Text>
                <Text color="gray">{data2.title}</Text>
                <Text color="white" fontSize="$5" fontWeight={500}>
                  {items[1].value}
                </Text>
              </View>
            );
          },
        }}
      />
    </YStack>
  );
}

export default Chart;
