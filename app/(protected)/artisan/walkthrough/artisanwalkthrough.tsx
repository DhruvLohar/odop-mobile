import React from 'react';
import { YStack, XStack, Paragraph, H5, H3, Button, ScrollView, View } from 'tamagui';
import { useRouter } from 'expo-router';

export default function ArtisanWalkthrough() {
  const router = useRouter();

  // Define your steps with the correct routes
  const steps = [
    {
      number: 1,
      title: "Complete Your Profile to reach larger audience",
      description: "Update your personal information, change your profile picture, and manage account settings.",
      actionText: "Edit Profile",
      route: "/artisan/profile/edit" 
    },
    {
      number: 2,
      title: "Manage Your Products",
      description: "List new products, update existing listings, and monitor your inventory with ease.",
      actionText: "Manage Products",
      route: "/product/list" 
    },
    {
      number: 3,
      title: "Engage with the Community",
      description: "Create and join workshops, participate in discussions, and connect with other artisans.",
      actionText: "Explore Workshops",
      route:"/(tabs)/events"
    },
    {
      number: 4,
      title: "Explore Jobs and Rental Machines",
      description: "Explore job openings, rental machinery, and manage your listings in one place.",
      actionText: "Post Job/Machine",
      route:"/(tabs)/portal"

    },
    {
      number: 5,
      title: "Track and Manage Orders",
      description: "Keep track of orders, update order statuses, and handle returns or exchanges seamlessly.",
      actionText: "Manage Orders",
      route: "/order/all"
    },
    {
      number: 6,
      title: "Explore the benefits of ODOP",
      description: "Discover how ODOP empowers artisans by promoting local crafts, offering resources, workshops, and a platform to boost your business.",
      actionText: "Learn More",
      route: "/artisan/info/all"
    },
  ];

  return (
    <ScrollView>
      <YStack padding="$4">
        <H3>Go through the Walkthrough</H3>
        <YStack marginTop="$3" space="$6">
          <View 
            width={4} 
            height="100%" 
            backgroundColor="#cccccc" 
            position="absolute" 
            left={20}
            top={40}
            bottom={-40}
          />
          {steps.map((step, index) => (
            <XStack key={index} space="$6" alignItems="flex-start">
              <YStack
                width={50}
                height={50}
                borderRadius={50}
                backgroundColor="#4A4A4A"
                alignItems="center"
                justifyContent="center"
                position="relative"
              >
                <H5 color="white">{step.number}</H5>
              </YStack>
              <YStack flex={1} space="$1">
                <H5>{step.title}</H5>
                <Paragraph theme="alt2">{step.description}</Paragraph>
                <Button
                  marginTop="$3"
                  alignSelf="flex-start"
                  backgroundColor="#4A4A4A"
                  color="white"
                  paddingHorizontal="$3"
                  borderRadius="$10"
                  onPress={() => router.push(step.route as any)} // Type assertion if needed
                >
                  {step.actionText}
                </Button>
              </YStack>
            </XStack>
          ))}
        </YStack>
      </YStack>
    </ScrollView>
  );
}
