import MainTabPlaceholder from '@/components/MainTabPlaceholder';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/Header';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, Text, View, TextInput } from 'react-native';

function LogTypeTab({
  logType,
  selected,
  onPress,
}: {
  logType: string;
  selected: boolean;
  onPress: () => void;
}) {
  const highlightOpacity = useRef(new Animated.Value(selected ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(highlightOpacity, {
      toValue: selected ? 1 : 0,
      duration: 180,
      useNativeDriver: true,
    }).start();
  }, [highlightOpacity, selected]);

  return (
    <Pressable
      className="relative rounded-full px-4 py-2"
      onPress={onPress}
      accessibilityRole="tab"
      accessibilityState={{ selected }}
    >
      <Animated.View
        className="absolute inset-0 rounded-full bg-lime-300"
        style={{ opacity: highlightOpacity }}
        pointerEvents="none"
      />
      <Text className="font-inter">{logType}</Text>
    </Pressable>
  );
}

export default function AddScreen() {
  const [selectedLogType, setSelectedLogType] = useState('Manual Log');
  const logTypes = ['Manual Log', 'Scan Receipt', 'Voice Input'];

  return (
    <SafeAreaView className="flex flex-col bg-indigo-50 justify-between px-6 py-6">
        <StatusBar></StatusBar>
        <Header pageTitle='Add New Logs'/>
        <View className='flex flex-col items-center h-full mt-6'>
          <View className='flex flex-row bg-white rounded-full p-2'>
            {logTypes.map((logType) => (
              <LogTypeTab
                key={logType}
                logType={logType}
                selected={selectedLogType === logType}
                onPress={() => setSelectedLogType(logType)}
              />
            ))}
          </View>
        </View>
    </SafeAreaView>
  );
}
