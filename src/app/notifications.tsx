import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from "expo-router";

export default function NotificationsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className='flex-1 bg-indigo-50 pt-6 pb-28'>
      <View className="flex flex-row mx-6 items-center gap-4">
        <Pressable onPress={() => router.push('/(main)')}>
          <Feather name="arrow-left" size={24} color="#032e15" />
        </Pressable>
        <Text className="text-2xl">Notifications</Text>
      </View>
    </SafeAreaView>
  );
}
