import { Link, Tabs } from 'expo-router';
import { Android, Brodcast, Calendar, Home2, Notification, SearchNormal, User } from 'iconsax-react-native';
import { memo, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Image, XStack } from 'tamagui';
import ChatBot from '~/components/sheets/Chatbot';
import NotificationsSheet from '~/components/sheets/NotificationSheet';
import { useSession } from '~/lib/auth';


type TabIcon = {
  Icon: any,
  focused: boolean
}

const TabIcon = memo(({ Icon, focused }: TabIcon) => {


  return (
    <View style={{
      alignItems: "center",
      // paddingVertical: 16,
    }}>
      <Icon
        size={28}
        variant={focused ? "Bold" : "Outline"}
        color={focused ? "white" : "#ffffffA3"}
        style={{ marginBottom: -4 }}
      />
    </View>
  );
});

export default function TabLayout() {

  const { session } = useSession()
  const [open, setOpen] = useState(false)
  const [Noti, setNotiOpen] = useState(false)

  return (
    <>
      <ChatBot
                open={open}
                setOpen={setOpen}
            />

            <NotificationsSheet
              open={Noti}
              setOpen={setNotiOpen}
              />
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 65
        },
        tabBarLabelStyle: {
          fontSize: 15,
          fontWeight: 500,
          color: "white"
        },
        tabBarShowLabel: false,
        headerStyle: {
          backgroundColor: "transparent",
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 16
        }
      }}>

      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} Icon={Home2} />,

          headerStyle: {
            height: 120,
            backgroundColor: "transparent"
          },

          headerLeft: () => <Image
            source={require('~/assets/Logo.png')}
            width={100} height={50}
            style={{ objectFit: "contain", marginLeft: 24 }}
          />,

          headerRight: () => (
            <XStack space="$4" marginRight={24}>
              <Android color='white' onPress={() => setOpen(true)} />
              <Notification color='white' onPress={() => setNotiOpen(true)} />
            </XStack>
          )
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} Icon={SearchNormal} />,
        }}
      />

      <Tabs.Screen
        name="events"
        options={{
          title: 'Workshops & Events',
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} Icon={Calendar} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'My Profile',
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} Icon={User} />,
        }}
      />

      <Tabs.Screen
        name="portal"
        options={{
          title: 'Job Portal & Rental Machines',
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} Icon={Brodcast} />,
          href: session?.role === "user" ? null : "/(protected)/(tabs)/portal"
        }}
      />

    </Tabs>
    </>
  );
}
