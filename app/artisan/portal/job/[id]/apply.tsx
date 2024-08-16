import { YStack, H2, Paragraph, Form, Label, TextArea, Button } from 'tamagui';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React, { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';

function Create() {
  const [file, setFile] = useState<DocumentPicker.DocumentPickerResult | any>(null);

  const uploadDocument = async (docType: 'File') => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
      });

      setFile(result);
    } catch (error) {
      console.error(`Failed to upload ${docType}:`, error);
    }
  };
  const schema = yup.object().shape({
    aboutMe: yup.string().required(),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle form submission
  const onSubmit = (data: any) => {
    console.log(data);
    if (data) {
      setTimeout(() => reset(), 3000);
    }
  };

  return (
    <YStack width={'100%'} height={'100%'} justifyContent="center" paddingHorizontal="$5" mt="$6">
      <H2 fontWeight={'bold'} mb="$2">
        Apply for Work
      </H2>
      <Paragraph theme={'alt2'} fontSize={'$4'}>
        Work for like minded Artisans and gain more knowledge and experience
      </Paragraph>
      <Form width="100%" pb="$2" onSubmit={handleSubmit(onSubmit)} mt="$6">
        <Controller
          control={control}
          name="aboutMe"
          render={({ field: { onChange, value } }) => (
            <>
              <Label mb="$2">aboutMe</Label>
              <TextArea
                size={'$5'}
                borderWidth={2}
                placeholder="Give a brief description as to why you should be hired, keep it short"
                mb="$4"
                w={'100%'}
                onChangeText={onChange}
                value={value}
                numberOfLines={4}
              />
            </>
          )}
        />
        {errors.aboutMe && (
          <Paragraph size={'$4'} color={'$red10'} mt="$-4">
            {errors.aboutMe.message}
          </Paragraph>
        )}

        <YStack mb="$3">
          <Button onPress={() => uploadDocument('File')} my="$2">
            {!file ? 'Upload File' : `Uploaded File : ${file?.assets[0]?.name}`}
          </Button>
        </YStack>

        <Form.Trigger asChild>
          <Button my="$6" themeInverse width={'100%'}>
            SUBMIT
          </Button>
        </Form.Trigger>
      </Form>
    </YStack>
  );
}

export default Create;
