import { Android, Send2 } from "iconsax-react-native";
import React, { useRef, useState } from "react";
import { KeyboardAvoidingView, TextInput, TouchableOpacity, ScrollView as RNScrollView } from "react-native";
import { Card, H2, Paragraph, Sheet, XStack, YStack } from "tamagui";

type FilterSheetProps = {
  open: boolean,
  setOpen: any
}

export default function FiltersSheet({
  open, setOpen
}: FilterSheetProps) {

  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const scrollViewRef = useRef<RNScrollView>(null); 

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages((prevMessages) => [...prevMessages, inputValue]);
      setInputValue("");
      setTimeout(() => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollToEnd({ animated: true });
        }
      }, 100);
    }
  };

  return (
    <Sheet
      forceRemoveScrollEnabled={open}
      modal
      open={open}
      onOpenChange={setOpen}
      dismissOnSnapToBottom
      zIndex={100_000}
    >
      <Sheet.Overlay
        animation={"lazy"}
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />

      <Sheet.Handle backgroundColor={"white"} />

      <Sheet.Frame
        flex={1}
        backgroundColor="#1e1e1e"
        borderRadius="$3"
        padding="$5"
        shadowColor="rgba(0, 0, 0, 0.1)"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={1}
        shadowRadius={2}
        elevation={3}
        width="100%"
      >
        <YStack
          flex={1}
          width="100%"
        >
          <XStack justifyContent="space-between" alignItems="center" mb="$4">
            <XStack alignItems="center">
              <Android size="24" color="#ffffff"/>
              <H2 ml="$3" color="white">ChatBot</H2>
            </XStack>
          </XStack>

          <RNScrollView
            ref={scrollViewRef}
            contentContainerStyle={{ paddingVertical: 10 }}
            style={{ flex: 1 }}
          >
            {messages.length === 0 ? (
              <Paragraph color="gray">No messages yet.</Paragraph>
            ) : (
              <YStack space="$3" flex={1} alignItems="flex-end">
                {messages.map((msg, index) => (
                  <Card key={index} padding="$3" backgroundColor="#181818" borderRadius="$4" maxWidth={"75%"}>
                    <Paragraph color="white">{msg}</Paragraph>
                  </Card>
                ))}
              </YStack>
            )}
          </RNScrollView>

          <KeyboardAvoidingView behavior="padding" enabled style={{ marginTop: 10 }}>
            <XStack mt="$4" space="$3" alignItems="center">
              <TextInput
                style={{
                  flex: 1,
                  backgroundColor: "white",
                  borderRadius: 20,
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                }}
                placeholder="Type your message..."
                value={inputValue}
                onChangeText={setInputValue}
              />
              <TouchableOpacity onPress={handleSend}>
                <Send2 size="30" color="#ffffff"/>  
              </TouchableOpacity>
            </XStack>
          </KeyboardAvoidingView>
        </YStack>
      </Sheet.Frame>
    </Sheet>
  );
}
