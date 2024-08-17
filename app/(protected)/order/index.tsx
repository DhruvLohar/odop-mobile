import React, { useState, useEffect, useRef } from "react";
import { View, TextInput, ScrollView, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { Android, Send2 } from "iconsax-react-native";
import { H2, YStack, XStack, Paragraph, Button, Card } from "tamagui";

export default function ChatBot() {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);

  const predefinedMessages = [
    "Hello! How can I help you?",
    "What are your operating hours?",
    "How do I contact customer support?",
  ];

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages((prevMessages) => [...prevMessages, inputValue]);
      setInputValue("");
    }
  };

  const handlePillClick = (message: string) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
      <YStack
        flex={1}
        borderRadius="$3"
        padding="$5"
        shadowColor="rgba(0, 0, 0, 0.1)"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={1}
        shadowRadius={2}
        elevation={3}
      >
        <XStack justifyContent="space-between" alignItems="center" mb="$4">
          <XStack alignItems="center">
            <Android size="24" color="#ffffff"/>
            <H2 ml="$3" color="white">ChatBot</H2>
          </XStack>
        </XStack>

        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={{ paddingVertical: 10, flexGrow: 1 }}
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
        </ScrollView>

          {/* if teko pre defined messages daalna hai to.....mai nhi daala tha cause wo keyboard ka fk hora tha if teko daalna hai daalde */}



        {/* <XStack space="$2" mt="$4" flexWrap="wrap">
          {predefinedMessages.map((msg, index) => (
            <Button
              key={index}
              onPress={() => handlePillClick(msg)}
              backgroundColor="#4A4A4A"
              color="white"
              borderRadius="$6"
              paddingHorizontal="$3"
              paddingVertical="$2"
              fontSize="$2"
            >
              {msg}
            </Button>
          ))}
        </XStack> */}

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
    
  );
}
