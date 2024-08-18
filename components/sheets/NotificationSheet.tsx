import { Calendar, Wallet, Star } from 'iconsax-react-native';
import React from 'react';
import { ScrollView as RNScrollView, View, Text } from 'react-native';
import { Card, H2, Paragraph, Sheet, XStack, YStack } from 'tamagui';

type NotificationsSheetProps = {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};

export default function NotificationsSheet({
  open, setOpen
}: NotificationsSheetProps) {

  return (
    <Sheet
      forceRemoveScrollEnabled={open}
      modal
      open={open}
      onOpenChange={setOpen}
      dismissOnSnapToBottom
      zIndex={100_000}
    >
      <Sheet.Overlay
        animation={"lazy"}
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />

      <Sheet.Handle backgroundColor={"white"} />

      <Sheet.Frame
        flex={1}
        backgroundColor="#1e1e1e"
        borderRadius="$3"
        padding="$5"
        shadowColor="rgba(0, 0, 0, 0.1)"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={1}
        shadowRadius={2}
        elevation={3}
        width="100%"
      >
        <YStack
          flex={1}
          width="100%"
        >
          <XStack justifyContent="space-between" alignItems="center" mb="$4">
            <XStack alignItems="center">
              
              <H2 ml="$3" color="white">Notifications</H2>
            </XStack>
          </XStack>

          <RNScrollView
            contentContainerStyle={{ paddingVertical: 10 }}
            style={{ flex: 1 }}
          >
            
            <NotificationItem
              icon={<Calendar size="24" color="white" />}
              iconColor="secondary"
              title="Upcoming event"
              time="1 day ago"
              description="Your event 'Team Offsite' is coming up tomorrow."
            />
            <NotificationItem
              icon={<Wallet size="24" color="white" />}
              iconColor="accent"
              title="Payment received"
              time="3 days ago"
              description="Your payment of $50 has been received."
            />
            <NotificationItem
              icon={<Star size="24" color="white" />}
              iconColor="muted"
              title="New review"
              time="1 week ago"
              description="You received a 5-star review from a customer."
            />
          </RNScrollView>
        </YStack>
      </Sheet.Frame>
    </Sheet>
  );
}

interface NotificationItemProps {
  icon: React.ReactNode;
  iconColor: string;
  title: string;
  time: string;
  description: string;
}

const NotificationItem = ({ icon, iconColor, title, time, description }: NotificationItemProps) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 16, marginBottom: 24 }}>
      <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: iconColor, justifyContent: 'center', alignItems: 'center' }}>
        {icon}
      </View>
      <View style={{ flex: 1 }}>
        <XStack alignItems="center" justifyContent="space-between">
          <H2 fontSize={18} color="white" fontWeight="500">{title}</H2>
          <Paragraph fontSize={14} color="gray">{time}</Paragraph>
        </XStack>
        <Paragraph fontSize={16} color="gray">{description}</Paragraph>
      </View>
    </View>
  );
};
