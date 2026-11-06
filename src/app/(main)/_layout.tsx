import { Tabs } from 'expo-router';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, TouchableOpacity } from 'react-native';

function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View className="absolute bottom-8 left-4 right-4 flex-row items-center justify-around bg-green-950 py-3.5 px-2 rounded-full shadow-xl">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title !== undefined ? options.title : route.name;
        const isFocused = state.index === index;
        const color = isFocused ? '#14532d' : '#d1d5db';

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };
        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            accessibilityRole="button"
            accessibilityLabel={options.tabBarAccessibilityLabel ?? label}
            accessibilityState={isFocused ? { selected: true } : {}}
            className={`py-3 px-6 rounded-full ${isFocused ? 'bg-lime-400' : 'bg-transparent'}`}
          >
            {options.tabBarIcon?.({ focused: isFocused, color, size: 24 })}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}



export default function MainLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...(props as unknown as BottomTabBarProps)} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: 'Analytics',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'bar-chart' : 'bar-chart-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: 'Add',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'add-circle' : 'add-circle-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="assistant"
        options={{
          title: 'AI Assistant',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'sparkles' : 'sparkles-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
