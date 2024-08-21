import { Android, Microphone, Microphone2, Send2 } from "iconsax-react-native";
import React, { useRef, useState } from "react";
import { KeyboardAvoidingView, TextInput, TouchableOpacity, ScrollView as RNScrollView } from "react-native";
import { Card, H2, Paragraph, Sheet, XStack, YStack } from "tamagui";
import { axiosRequest } from "~/lib/api";

type FilterSheetProps = {
  open: boolean,
  setOpen: any
}

interface ChatbotResponse {
  type: 'response' | 'intent';
  response: string | null;
  self: boolean;
  payload: {
    page: 'workshop' | 'events' | 'job_portal' | 'rental_machine' | 'odop_scheme' | 'orders';
    action: 'edit' | 'create' | 'view';
  } | null;
}

export default function FiltersSheet({
  open, setOpen
}: FilterSheetProps) {

  const [messages, setMessages] = useState<ChatbotResponse[]>([
    {
      type: 'response',
      self: false,
      payload: null,
      response: "Hello there! How can I help you today ..."
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const scrollViewRef = useRef<RNScrollView>(null);

  async function fetchResponse(prompt: string) {
    const res = await axiosRequest('artisan/getChatbotResponse/', {
      method: 'post',
      data: {
        prompt
      }
    }, false);

    if (res?.success) {
      if (res.type === "response") {
        setMessages(prev => [...prev, {
          type: 'response',
          self: false,
          payload: null,
          response: res?.response
        }])
      }
    }
  }

  function addArtisanResponse(resp: string) {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        type: 'response',
        response: resp,
        self: true,
        payload: null
      }
    ]);
  }


  // USE THIS FUCNTION AS REFERENCE
  const handleSend = () => {
    if (inputValue.trim()) {

      addArtisanResponse(inputValue.trim())
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
          <XStack alignSelf="center" alignItems="center" mb="$4">
            <Android size="24" color="#ffffff" />
            <H2 ml="$3" color="white">ODOP ChatBot</H2>
          </XStack>

          <RNScrollView
            ref={scrollViewRef}
            contentContainerStyle={{ paddingVertical: 10 }}
            style={{ flex: 1 }}
          >
            {messages.length === 0 ? (
              <Paragraph color="gray">No messages yet.</Paragraph>
            ) : (
              <>
                {messages.map((msg: ChatbotResponse, index: number) => (
                  <XStack
                    key={index}
                    width={"100%"}
                    justifyContent={!msg.self ? 'flex-start' : 'flex-end'}
                    mb="$1"
                  >
                    <Card
                      padding="$3"
                      backgroundColor={!msg.self ? "white" : "#181818"}
                      borderRadius="$4"
                      maxWidth={"75%"}
                    >
                      <Paragraph color={!msg.self ? "black" : "white"}>{msg.response}</Paragraph>
                    </Card>
                  </XStack>
                ))}
              </>
            )}
          </RNScrollView>

          <KeyboardAvoidingView behavior="padding" enabled style={{ marginTop: 10 }}>
            <XStack mt="$4" space="$3" alignItems="center">
              <TextInput
                style={{
                  flex: 1,
                  backgroundColor: "#181818",
                  color: 'white',
                  borderRadius: 100,
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                }}
                placeholder="Ask anything here ..."
                placeholderTextColor={"white"}
                value={inputValue}
                onChangeText={setInputValue}
              />
              <Microphone2 size="30" color="#ffffff" />
              <Send2 size="30" color="#ffffff" onPress={handleSend} />
            </XStack>
          </KeyboardAvoidingView>
        </YStack>
      </Sheet.Frame>
    </Sheet>
  );
}
