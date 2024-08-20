import React, { useState } from 'react';
import {
  Button,
  Card,
  H1,
  H4,
  Input,
  Paragraph,
  Sheet,
  XStack,
  YStack,
  Switch,
  ScrollView,
} from 'tamagui';
import {
  ArrowDown3,
  Moon,
  Box,
  Edit2,
  Hierarchy,
  Logout,
  People,
  Add,
  Judge,
  Briefcase,
  UserTick,
  WalletMoney
} from 'iconsax-react-native';
import { Href, router } from 'expo-router';

type ProfileDetailsProps = {
  open: boolean;
  setOpen: any;
  handleLogout: () => void;
};

const routes = [
  { title: 'Edit Profile', icon: Edit2, url: '/(protected)/artisan/profile/edit' as Href<string> },
  {
    title: 'Create Workshop',
    icon: Judge,
    url: '/artisan/workshop/host' as Href<string>,
  },
  {
    title: 'Create Job',
    icon: Briefcase,
    url: '/(protected)/artisan/portal/job/create' as Href<string>,
  },
  {
    title: 'Rent a Machine',
    icon: UserTick,
    url: '/(protected)/artisan/portal/rentalMachine/create' as Href<string>,
  },
  { title: 'Manage Orders', icon: Box, url: '/(protected)/order/all' as Href<string> },
  { title: 'Add Product', icon: Add, url: '/(protected)/product/list' as Href<string> },
  {
    title: 'Product Inventory',
    icon: Hierarchy,
    url: '/artisan/profile/inventory' as Href<string>,
  },
  {
    title: 'Connection Requests',
    icon: People,
    url: '/artisan/profile/connectionRequests' as Href<string>,
  },
  {
    title: 'My Listed Jobs',
    icon: WalletMoney,
    url: '/artisan/portal/job/listedJobs' as Href<string>,
  },
  {
    title: 'My Listed Machines',
    icon: WalletMoney,
    url: '/artisan/portal/rentalMachine/listedMachines' as Href<string>,
  },
];

export default function ProfileDetails({ open, setOpen, handleLogout }: ProfileDetailsProps) {
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

      <Sheet.Frame padding="$5" justifyContent="flex-start" alignItems="flex-start">
        <H1 fontSize={'$9'} fontWeight={'bold'}>
          Settings
        </H1>
        <Paragraph theme={'alt2'} fontSize={'$5'}>
          Manage everything easily in just one tap.
        </Paragraph>

        <ScrollView>
          <YStack width={'100%'} mt="$8" rowGap="$5">
            <XStack
              width={'100%'}
              space="$3"
              alignItems="center"
              pb="$4"
              justifyContent="space-between"
              borderBottomWidth={1}
              borderBottomColor={'$gray5'}>
              <XStack space="$3" alignItems="center">
                <Moon color="#ffffff" />
                <H4>Theme</H4>
              </XStack>

              <Switch size="$3">
                <Switch.Thumb animation="bouncy" />
              </Switch>
            </XStack>

            {routes.map((route, idx) => (
              <XStack
                key={idx}
                width={'100%'}
                space="$3"
                alignItems="center"
                pb="$4"
                borderBottomWidth={1}
                borderBottomColor={'$gray5'}
                onPress={() => {
                  setOpen(false);
                  router.push(route.url);
                }}>
                <route.icon color="white" />
                <H4>{route.title}</H4>
              </XStack>
            ))}

            <XStack
              width={'100%'}
              space="$3"
              alignItems="center"
              pb="$4"
              borderBottomWidth={1}
              borderBottomColor={'$gray5'}
              onPress={handleLogout}>
              <Logout color="white" />
              <H4>Logout</H4>
            </XStack>
          </YStack>
        </ScrollView>
      </Sheet.Frame>
    </Sheet>
  );
}
