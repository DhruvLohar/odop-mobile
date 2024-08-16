import React from 'react';
import { View, Image } from 'react-native';
import { H6, H2, H4, XStack, YStack, Paragraph, Button, H3 } from 'tamagui';
import { Buildings, Location, InfoCircle } from 'iconsax-react-native';

type ConnectionRequestCardProps = {
  id: number;
  message: string;
  purpose: string;
  person: string;
  email: string;
  number: number;
};

const ConnectionRequestCard: React.FC<ConnectionRequestCardProps> = ({ id, purpose, message, email, person, number }) => {
  return (
    <YStack
      marginBottom="$5"
      width={"100%"}
    >
      <YStack padding="$4" borderRadius="$5" backgroundColor="#222222">
        <H3>Connection Request</H3>
        <Paragraph width={"100%"} size={"$3"} theme="alt2" marginBottom={"$7"}>
          Someone would like to connect with you
        </Paragraph>

        <YStack marginBottom="$4">
          <H6>Purpose</H6>
          <Paragraph
            width={"100%"}
            size={"$4"}
            theme="alt2"
            borderWidth={1}
            borderColor="#4A4A4A"
            padding="$2"
            paddingHorizontal="$4"
            borderRadius="$3"
            marginTop="$2"
          >
            {purpose}
          </Paragraph>
        </YStack>

        <XStack flex={1} justifyContent='space-between' width={"100%"} marginBottom="$4">
          <YStack flex={1} marginRight="$2">
            <H6>Email</H6>
            <Paragraph
              width={"100%"}
              size={"$4"}
              theme="alt2"
              borderWidth={1}
              borderColor="#4A4A4A"
              padding="$2"
              paddingHorizontal="$4"
              borderRadius="$3"
              marginTop="$2"
            >
              {email}
            </Paragraph>
          </YStack>

          <YStack flex={1} marginLeft="$2">
            <H6>Contact</H6>
            <Paragraph
              width={"100%"}
              size={"$4"}
              theme="alt2"
              borderWidth={1}
              borderColor="#4A4A4A"
              padding="$2"
              paddingHorizontal="$4"
              borderRadius="$3"
              marginTop="$2"
            >
              {number}
            </Paragraph>
          </YStack>
        </XStack>

        <YStack marginBottom="$4">
          <H6>Message</H6>
          <Paragraph
            width={"100%"}
            size={"$4"}
            theme="alt2"
            borderWidth={1}
            borderColor="#4A4A4A"
            padding="$2"
            paddingHorizontal="$4"
            borderRadius="$3"
            marginTop="$2"
          >
            {message}
          </Paragraph>
        </YStack>

        <XStack justifyContent="flex-end" marginTop="$7">
          <Button
            size="$4"
            borderColor="#4A4A4A"
            borderWidth={1}
            borderRadius="$2"
          >
            Decline
          </Button>

          <Button
            size="$4"
            borderRadius="$2"
            backgroundColor="#191919"
            ml="$3"
          >
            Contact Back
          </Button>
        </XStack>
      </YStack>
    </YStack>
  );
}

export default ConnectionRequestCard;
