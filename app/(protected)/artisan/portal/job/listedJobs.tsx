import React from 'react';
import { View, Image } from 'react-native';
import { H6, H4, XStack, YStack, Paragraph, ScrollView } from 'tamagui';
import { Star1 } from 'iconsax-react-native';
import { useRouter } from 'expo-router';
import JobPortalCard from '~/components/custom/JobPortalCard';
import jobs from '~/lib/data/Jobs.json';
import JobPortalCardArtisan from '~/components/custom/JobPortalCardArtisan';


export default function listedJob() {
  return (
    <ScrollView flex={1}>
    <YStack flex={1} alignItems="center" padding="$5">
      {jobs.jobs.map((jobs) => (
        <JobPortalCardArtisan key={jobs.id} {...jobs} />
      ))}
    </YStack>
  </ScrollView>
  );
};