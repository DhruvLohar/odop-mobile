import { Send2 } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { H4, YStack, ScrollView, XStack, Button, Text, SizableText, H2, Paragraph, Separator, Card } from 'tamagui';
import { axiosRequest } from '~/lib/api';
import { useSession } from '~/lib/auth';

// Define the type for chat message
interface ChatMessage {
  uid: number;
  msg_type: 'message' | 'workshop' | 'event' | 'job_portal' | 'rental_machine';
  message: string | null;
  object_id: number | null;
  self: boolean;
}

export default function IndividualNews() {

  const { session } = useSession()

  const [channels, setChannels] = useState<any[]>([])
  const [currentChannel, setCurrentChannel] = useState<any>()

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      uid: 1,
      msg_type: 'message',
      message: "Hellow",
      object_id: null,
      self: false,
    },
  ])

  const [newMessage, setNewMessage] = useState<string>('');

  async function fetchChannels() {
    const res = await axiosRequest('forum/', { method: 'get' }, false);

    if (res) {
      setChannels(res)
    }
  }

  async function fetchMessages() {

  }

  useEffect(() => {
    fetchChannels()
  }, [])

  // Handle sending a new chat message
  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages(prev => [...prev, {
        uid: session?.id as number,
        msg_type: 'message',
        message: newMessage.trim(),
        object_id: null,
        self: true,
      }])
      setNewMessage('');
    }
  };

  return (
    <YStack flex={1}>
      <YStack mr="auto" px="$4">
        <H2 fontWeight={'bold'}>Explore Channels</H2>
        <Paragraph width={'80%'} theme={'alt2'}>
          Explore the channels and share your thoughts openly and learn
        </Paragraph>
      </YStack>
      {/* Pills for selecting categories */}
      {channels.length > 0 ? (
        <XStack space="$2" padding="$4" paddingTop="$2">
          {channels.map((channel) => (
            <Button
              key={channel.id}
              size="$3"
              borderRadius="$10"
              backgroundColor={currentChannel === channel.id ? '#10274E' : '$gray4'}
              color="white"
              onPress={() => setCurrentChannel(channel.id)}
            >
              {channel.title}
            </Button>
          ))}
        </XStack>
      ) : <SizableText>No Channels Available</SizableText>}

      <Separator width={"90%"} alignSelf='center' />

      {/* ScrollView for chat messages */}
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <YStack padding="$5" flex={1}>
          {messages.map((message: ChatMessage, index) => (
            <XStack
              key={index}
              width={"100%"}
              justifyContent={!message.self ? 'flex-start' : 'flex-end'}
              mb="$1"
            >
              <Card
                padding="$3"
                backgroundColor={!message.self ? "white" : "#181818"}
                borderRadius="$4"
                maxWidth={"75%"}
              >
                <Paragraph color={!message.self ? "black" : "white"}>{message.message}</Paragraph>
              </Card>
            </XStack>
          ))}
        </YStack>
      </ScrollView>

      {/* Input for new chat message */}
      <XStack space="$2" alignItems="center" padding="$4">
        <TextInput
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type your message..."
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 100,
            paddingHorizontal: 20,
            paddingVertical: 8,
            backgroundColor: '#fff',
          }}
        />

        <Send2 size="30" color="#ffffff" onPress={sendMessage} />
      </XStack>
    </YStack>
  );
}
