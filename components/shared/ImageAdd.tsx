import React, { useState } from 'react';
import { Button, YStack, XStack, Text, Card, H4 } from 'tamagui';
import { CloseCircle, AddCircle } from 'iconsax-react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Avatar } from 'tamagui';

interface ImageUploaderProps {
  images: Array<{ uri: string; name?: string; type?: string }>;
  setImages: React.Dispatch<
    React.SetStateAction<Array<{ uri: string; name?: string; type?: string }>>
  >;
}

export default function ImageUploader({ images = [], setImages }: ImageUploaderProps) {
  const uploadImage = async () => {
    try {
      if (images.length >= 4) {
        alert('You can only upload a maximum of 4 images.');
        return;
      }

      const result = await DocumentPicker.getDocumentAsync({
        type: 'image/*',
        multiple: true,
        copyToCacheDirectory: true,
      });

      if (result.assets) {
        const selectedImages = result.assets.slice(0, 4 - images.length);
        setImages([...images, ...selectedImages]);
      }
    } catch (error) {
      console.error('Failed to upload image:', error);
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  return (
    <>
      <H4 mt="$4">Add Images (Max 4)</H4>
      <XStack w="100%" my="$4" alignItems="center">
        <Button
          size="$2"
          onPress={uploadImage}
          bg={'transparent'}
          w={'fit'}
          disabled={images.length >= 4}
          icon={() => <AddCircle size="32" color="#d9e3f0" variant="Bold" />}
        />
        <XStack space="$2">
          {images.map((image, index) => (
            <Card key={index} bg="transparent">
              <XStack alignItems="center" justifyContent="space-between">
                <Avatar circular size="$6" borderWidth={1} borderColor={'$backgroundFocus'}>
                  <Avatar.Image accessibilityLabel="Uploaded image" src={image.uri} />
                  <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
                </Avatar>
                <Button
                  size="$2"
                  onPress={() => removeImage(index)}
                  circular
                  icon={<CloseCircle size={20} color="red" variant="Bold" />}
                  backgroundColor="transparent"
                  position="absolute"
                  top={-4}
                />
              </XStack>
            </Card>
          ))}
        </XStack>
      </XStack>
    </>
  );
}
