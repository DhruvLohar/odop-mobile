import React from 'react';
import { H6, H4, XStack, YStack, Paragraph, Button } from 'tamagui';
import { Buildings, Location, InfoCircle } from 'iconsax-react-native';
import { useRouter, Href } from 'expo-router';


const JobPortalCard: React.FC<JobPosting> = (job) => {
  const router = useRouter();

  return (
    <YStack backgroundColor="#393939" borderRadius="$8" marginBottom="$5" width={'100%'}>
      <YStack width={'100%'} height={50}>
        <XStack flex={1} alignItems="center" paddingHorizontal="$3">
          <InfoCircle size={20} color="#ffffff" />
          <H6 marginLeft="$3" color={"white"}>hiring in artwork category</H6>
        </XStack>
      </YStack>
      <YStack padding="$4" borderRadius="$8" backgroundColor="#222222">
        <H4 fontWeight={700} marginBottom={'$2'}>
          {job.title}
        </H4>

        <XStack flex={1} alignItems="center" marginBottom={'$4'}>
          <XStack flex={1} alignItems="center">
            <Buildings size="14" color="#585858" />
            <H6 color="#585858" size={8} marginLeft={'$2'}>
              Pottery
            </H6>
          </XStack>
          <XStack marginLeft="$5" flex={1} alignItems="center">
            <Location size="14" color="#585858" />
            <H6 color="#585858" size={8} marginLeft={'$2'}>
              Burar, Uttar Pradesh
            </H6>
          </XStack>
        </XStack>

        <Paragraph width={'100%'} size={'$3'} theme="alt2" marginBottom={'$4'}>
          {job.description}
        </Paragraph>

        <Button
          size="$4"
          backgroundColor="$backgroundStrong"
          onPress={() => {
            router.push(`/(protected)/artisan/portal/job/${job.id}/apply` as Href);
          }}>
          Apply Now
        </Button>
      </YStack>
    </YStack>
  );
};

export default JobPortalCard;
