import { Send2 } from 'iconsax-react-native';
import React, { useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { H4, YStack, ScrollView, XStack, Button, Text } from 'tamagui';

// Define the type for chat message
interface ChatMessage {
  id: number;
  content: string;
}

export default function IndividualNews() {
  

  const [selectedCategory, setSelectedCategory] = useState<string>('General');
  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>({
    General: [],
    Sports: [],
    Technology: [],
    Health: [],
    Entertainment: [],
  });
  const [newMessage, setNewMessage] = useState<string>('');

  // Example categories for pills
  const categories = ['General', 'Sports', 'Technology', 'Health', 'Entertainment'];

  // Handle sending a new chat message
  const sendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages((prevMessages) => ({
        ...prevMessages,
        [selectedCategory]: [...prevMessages[selectedCategory], { id: Date.now(), content: newMessage }],
      }));
      setNewMessage('');
    }
  };

  return (
    <YStack flex={1}>
      {/* Pills for selecting categories */}
      <XStack space="$2" padding="$5">
        {categories.map((category) => (
          <Button
            key={category}
            size="$3"
            borderRadius="$10"
            backgroundColor={selectedCategory === category ? '#10274E' : '$gray4'}
            color="white"
            onPress={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </XStack>

      {/* ScrollView for chat messages */}
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <YStack padding="$5" flex={1}>
          {chatMessages[selectedCategory].map((message) => (
            <YStack
              key={message.id}
              padding="$3"
              backgroundColor="#181818"
              borderRadius="$2"
              alignSelf="flex-end" // Align messages to the right
              maxWidth="80%"
              marginBottom="$2"
            >
              <Text color="white">{message.content}</Text>
            </YStack>
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
            borderRadius: 50,
            paddingHorizontal: 20,
            paddingVertical: 8,
            backgroundColor: '#fff',
          }}
        />
        <TouchableOpacity onPress={sendMessage}>
          <Send2 size="30" color="#ffffff" />
        </TouchableOpacity>
      </XStack>
    </YStack>
  );
}
