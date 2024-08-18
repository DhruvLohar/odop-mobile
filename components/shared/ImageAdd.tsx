import React, { useState } from 'react';
import { Button, YStack, XStack, Text, Card, H4, Paragraph } from 'tamagui';
import { CloseCircle, AddCircle, Add } from 'iconsax-react-native';
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

      if (!result.canceled && result.assets) {
        const selectedImages: any[] = result.assets.slice(0, 4 - images.length);
        
        selectedImages.map((img: any) => {
          const data = {
            uri: img?.uri,
            type: img?.mimeType,
            name: img?.name,
          }
          
          setImages(prev => [...prev, data])
        })
        
        // setImages([...images, ...selectedImages]);
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
      <H4 mt="$4">Add/Upload Images</H4>
      <Paragraph theme="alt2">You can add upto 4 images. Make sure each image is of size less than 5mb.</Paragraph>
      <XStack w="100%" my="$4" alignItems="center">
        <Button
          size="$6"
          onPress={uploadImage}
          circular
          themeInverse={images.length <= 4}
          disabled={images.length >= 4}
          icon={() => <Add size="32" color="black" />}
        />
        <XStack space="$3">
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
