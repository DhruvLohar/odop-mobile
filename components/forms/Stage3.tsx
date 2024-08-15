import { YStack, Button } from 'tamagui';
import * as DocumentPicker from 'expo-document-picker';
import { useState } from 'react';

const Stage3 = () => {
  const [aadharCard, setAadharCard] = useState<DocumentPicker.DocumentPickerResult | any>(null);
  const [panCard, setPanCard] = useState<DocumentPicker.DocumentPickerResult | any>(null);

  const uploadDocument = async (docType: 'Aadhar' | 'PAN') => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'image/*',
      });

      if (docType === 'Aadhar') {
        setAadharCard(result);
      } else {
        setPanCard(result);
      }
    } catch (error) {
      console.error(`Failed to upload ${docType}:`, error);
    }
  };

  return (
    <YStack mb="$3">
      <Button onPress={() => uploadDocument('Aadhar')} my="$2">
        {!aadharCard ? 'Upload Aadhar' : `Uploaded File : ${aadharCard?.assets[0]?.name}`}
      </Button>
      <Button onPress={() => uploadDocument('PAN')} my="$2">
        {!panCard ? 'Upload Pan Card' : `Uploaded File : ${panCard?.assets[0]?.name}`}
      </Button>
    </YStack>
  );
};

export default Stage3;
