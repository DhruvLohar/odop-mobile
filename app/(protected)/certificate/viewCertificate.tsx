import { Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button, H4, H6, Input, Label, Paragraph, ScrollView, XStack, YStack } from 'tamagui'

export default function ViewCertificate() {
  const [isInputVisible, setIsInputVisible] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const [proofOfPurchase, setProofOfPurchase] = useState('')

  const handleCheckCertificateClick = () => {
    setIsInputVisible(true)
  }

  const handleCheckClick = () => {
    // Validate proof of purchase here
    // For demo purposes, we'll just check if the input is not empty
    if (proofOfPurchase.trim() !== '') {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <YStack flex={1} alignItems="center" paddingHorizontal="$3" paddingVertical="$3">
        {!isInputVisible && !isValid && (
          <YStack
            borderWidth={1}
            borderColor={"#222222"}
            width="100%"
            borderRadius={"$4"}
            padding={"$5"}
            gap={"$4"}
            marginBottom={"$5"}
            alignItems="flex-start"
          >
            <H4 marginBottom="$4">Certificate</H4>
            <Paragraph width={"100%"} theme="alt2" size={14} marginBottom="$4">
              This certifies the authenticity of the following product
            </Paragraph>

            <YStack width="100%" space="$3">
              <XStack width="100%" justifyContent="space-between">
                <H6 size={16} marginLeft="$2">Product Name:</H6>
                <H6 size={16} marginRight="$2" textAlign="right">Handcrafted Ceramic Vase</H6>
              </XStack>

              <XStack width="100%" justifyContent="space-between">
                <H6 size={16} marginLeft="$2">Product ID:</H6>
                <H6 size={16} marginRight="$2" textAlign="right">ART-CV-0123</H6>
              </XStack>

              <XStack width="100%" justifyContent="space-between">
                <H6 size={16} marginLeft="$2">Purchase Date:</H6>
                <H6 size={16} marginRight="$2" textAlign="right">24th June, 2024</H6>
              </XStack>

              <XStack width="100%" justifyContent="space-between">
                <H6 size={16} marginLeft="$2">Customer Name:</H6>
                <H6 size={16} marginRight="$2" textAlign="right">John Doe</H6>
              </XStack>

              <XStack width="100%" justifyContent="space-between">
                <H6 size={16} marginLeft="$2">Artisan Name:</H6>
                <H6 size={16} marginRight="$2" textAlign="right">Jane Smith</H6>
              </XStack>

              <XStack flex={1} justifyContent="space-between" marginBottom="$3">
              <H6 size={16} marginLeft="$2" flex={1}>Proof of Purchase:</H6>
              <YStack flex={2} marginLeft="$2">
                <Paragraph size={16} numberOfLines={0}>
                  185f8db32271fe25f561a6fc938b2e264306ec304eda518007d1764826381969
                </Paragraph>
              </YStack>
            </XStack>

            <XStack flex={1} justifyContent="space-between" marginBottom="$3">
              <H6 size={16} marginLeft="$2" flex={1}>Product Authentication:</H6>
              <YStack flex={2} marginLeft="$2">
                <Paragraph size={16} numberOfLines={0}>
                  e29f9459394518169fcd00c72c095c8986a09bacaf65ceb2c2435822e6cccae4
                </Paragraph>
              </YStack>
            </XStack>

              <YStack width="100%" marginTop="$4">
                <Button width={"100%"} onPress={handleCheckCertificateClick}>
                  Check Certificate
                </Button>
              </YStack>
            </YStack>
          </YStack>
        )}

        {isInputVisible && !isValid && (
          <YStack gap="$3" width="100%" paddingHorizontal="$5">
            <Label htmlFor="expiry-date" marginBottom="$2">Check Certificate</Label>
            <Input
              id="expiry-date"
              placeholder="Enter the proof of purchase"
              value={proofOfPurchase}
              onChangeText={setProofOfPurchase}
            />
            <Button width={"100%"} onPress={handleCheckClick}>
              Check
            </Button>
          </YStack>
        )}

        {isValid && (
          <YStack flex={1} alignItems="center" paddingHorizontal="$3" paddingVertical="$3">
            <YStack
              borderWidth={1}
              borderColor={"#222222"}
              width="100%"
              borderRadius={"$4"}
              padding={"$5"}
              gap={"$4"}
              marginBottom={"$5"}
            >
              <H4 marginTop="$5" alignSelf='center'>It is Valid!!!</H4>
              <YStack width="100%" space="$3">
                <XStack width="100%" justifyContent="space-between">
                  <H6 size={16} marginLeft="$2">Product Name:</H6>
                  <H6 size={16} marginRight="$2" textAlign="right">Ceramic Vase</H6>
                </XStack>

                <XStack width="100%" justifyContent="space-between">
                  <H6 size={16} marginLeft="$2">Product ID:</H6>
                  <H6 size={16} marginRight="$2" textAlign="right">ART-CV-0123</H6>
                </XStack>

                <XStack width="100%" justifyContent="space-between">
                  <H6 size={16} marginLeft="$2">Purchase Date:</H6>
                  <H6 size={16} marginRight="$2" textAlign="right">24th June, 2024</H6>
                </XStack>

                <XStack width="100%" justifyContent="space-between">
                  <H6 size={16} marginLeft="$2">Customer Name:</H6>
                  <H6 size={16} marginRight="$2" textAlign="right">John Doe</H6>
                </XStack>

                <XStack width="100%" justifyContent="space-between">
                  <H6 size={16} marginLeft="$2">Artisan Name:</H6>
                  <H6 size={16} marginRight="$2" textAlign="right">Jane Smith</H6>
                </XStack>
              </YStack>
            </YStack>
          </YStack>
        )}
      </YStack>
    </ScrollView>
  )
}
