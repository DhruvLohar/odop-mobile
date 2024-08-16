import { Link, Tabs } from 'expo-router';
import { Brodcast, Calendar, Home2, SearchNormal, User } from 'iconsax-react-native';
import { memo } from 'react';
import { View } from 'react-native';


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
  return (
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
        tabBarShowLabel: false
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} Icon={Home2} />,
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
          title: 'Events',
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} Icon={Calendar} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} Icon={User} />,
        }}
      />
      <Tabs.Screen
        name="portal"
        options={{
          title: 'Income',
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} Icon={Brodcast} />,
        }}
      />
    </Tabs>
  );
}
