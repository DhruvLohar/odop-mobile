import React from 'react';
import { H1, H2, Paragraph, Sheet, YStack, Card, ScrollView, Input, Button } from 'tamagui';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type ProductDetailsSheetProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (details: Record<string, string>) => void;
};

// Define the type for form data, allowing for undefined values initially
type ProductDetailsForm = {
  TraditionSince?: string;
  ArtStyle?: string;
  MaterialsUsed?: string;
  OriginCountry?: string;
  SpecialTechniques?: string;
};

// Map questions array labels to corresponding form field keys
const questions = [
  { label: 'TraditionSince', placeholder: 'e.g., 1862' },
  { label: 'ArtStyle', placeholder: 'e.g., Greek' },
  { label: 'MaterialsUsed', placeholder: 'e.g., Marble, Gold' },
  { label: 'SpecialTechniques', placeholder: 'e.g., Hand-carved' },
];

// Define the validation schema using Yup
const schema = yup.object(
  questions.reduce(
    (acc, question) => {
      acc[question.label as keyof ProductDetailsForm] = yup.string().optional();
      return acc;
    },
    {} as Record<keyof ProductDetailsForm, yup.StringSchema<string | undefined>>
  )
);

export default function ProductDetailsSheet({ open, setOpen, onSubmit }: ProductDetailsSheetProps) {
  const { control, handleSubmit, setValue, watch } = useForm<ProductDetailsForm>({
    resolver: yupResolver(schema),
    defaultValues: questions.reduce((acc, q) => {
      acc[q.label as keyof ProductDetailsForm] = '';
      return acc;
    }, {} as ProductDetailsForm),
  });

  const selectedDetails = watch();

  const handleAnswerSubmit = (data: ProductDetailsForm) => {
    const filledDetails = Object.entries(data).reduce((acc, [key, value]) => {
      if (value) {
        acc[key as keyof ProductDetailsForm] = value;
      }
      return acc;
    }, {} as ProductDetailsForm);
    onSubmit(filledDetails);
    setOpen(false);
  };

  return (
    <Sheet
      forceRemoveScrollEnabled={open}
      modal
      open={open}
      onOpenChange={setOpen}
      dismissOnSnapToBottom
      zIndex={100_000}>
      <Sheet.Overlay animation={'lazy'} enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />

      <Sheet.Handle backgroundColor={'white'} />

      <Sheet.Frame px="$4" justifyContent="flex-end" alignItems="flex-start" width="100%">
        <H1 fontSize={'$9'} fontWeight={'bold'} width="100%">
          Product Details
        </H1>
        <Paragraph theme={'alt2'} fontSize={'$5'} mb="$4" width="100%">
          Answer the following questions to add more details to your product
        </Paragraph>
        <ScrollView width="100%">
          <YStack width="100%">
            {questions.map((question, i) => (
              <Card
                key={i}
                width="100%"
                padding="$4"
                marginBottom="$4"
                borderRadius="$3"
                onPress={() => setValue(question.label as keyof ProductDetailsForm, '')}>
                <YStack width="100%">
                  <H2 fontWeight="bold" fontSize="$6" color={'whitesmoke'} width="100%">
                    {question.label.replace(/([A-Z])/g, ' $1').trim()}
                  </H2>
                  <Controller
                    control={control}
                    name={question.label as keyof ProductDetailsForm}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <>
                        <Input
                          mt="$2"
                          placeholder={question.placeholder}
                          onChangeText={onChange}
                          value={value}
                          onBlur={() => {
                            if (!value) setValue(question.label as keyof ProductDetailsForm, '');
                          }}
                          width="100%"
                        />
                        {error && (
                          <Paragraph mt="$1" fontSize="$4" color="red" width="100%">
                            {error.message}
                          </Paragraph>
                        )}
                      </>
                    )}
                  />
                </YStack>
              </Card>
            ))}
          </YStack>
        </ScrollView>
        <Button my="$6" themeInverse width="100%" onPress={handleSubmit(handleAnswerSubmit)}>
          SUBMIT
        </Button>
      </Sheet.Frame>
    </Sheet>
  );
}
