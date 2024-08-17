import { YStack, Button } from 'tamagui';
import * as DocumentPicker from 'expo-document-picker';
import { useState } from 'react';

const Stage3 = ({
  aadharCard, setAadharCard,
  panCard, setPanCard
}: any) => {

  const uploadDocument = async (docType: 'Aadhar' | 'PAN') => {
    try {
      const result: any = await DocumentPicker.getDocumentAsync({
        type: 'image/*',
      });

      const uri = result.assets[0].uri;
      const ext = uri.split(".").pop();
      const data = {
        uri: uri,
        type: result?.assets[0]?.mimeType,
        name: result?.assets[0]?.name,
      }

      if (docType === 'Aadhar') {
        setAadharCard(data);
      } else {
        setPanCard(data);
      }
    } catch (error) {
      console.error(`Failed to upload ${docType}:`, error);
    }
  };

  return (
    <YStack mb="$3">
      <Button
        size={"$5"}
        onPress={() => uploadDocument('Aadhar')}
        my="$2" themeInverse={aadharCard}
      >
        {!aadharCard ? 'Upload Aadhar' : `Uploaded File : ${aadharCard?.name}`}
      </Button>
      <Button
        size={"$5"}
        onPress={() => uploadDocument('PAN')}
        my="$2" themeInverse={panCard}
      >
        {!panCard ? 'Upload Pan Card' : `Uploaded File : ${panCard?.name}`}
      </Button>
    </YStack>
  );
};

export default Stage3;
