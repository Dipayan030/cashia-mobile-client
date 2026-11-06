import { Text, View, Pressable, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProfileScreen() {
  const router = useRouter();
  const [ name, setName ] = useState<string | undefined>('');
  const [ avatar, setAvatar ] = useState<string | undefined>('');
  const [ email, setEmail ] = useState<string | undefined>('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setName(user?.user_metadata?.full_name);
      setAvatar(user?.user_metadata?.avatar_url);
      setEmail(user?.email)
    });
  }, []);


  return (
    <SafeAreaView className='flex-1 gap-6 bg-indigo-50 pt-6 pb-8'>
      <View className="flex flex-row mx-6 items-center gap-4">
        <Pressable onPress={() => router.push('/(main)')}>
          <Feather name="arrow-left" size={24} color="#032e15" />
        </Pressable>
        <Text className="text-2xl font-inter">Profile</Text>
      </View>
      <View className="flex flex-col gap-4 mt-6 justify-center items-center">
        <Image source={avatar ? { uri: avatar } : undefined} resizeMode="cover" className="h-20 w-20 rounded-full bg-white/95 p-1 bg-center"/>
        <Text className="text-green-950 text-xl font-inter-medium">{name}</Text>
      </View>
      <ScrollView className="mx-6 flex-1 flex-col rounded-xl p-4 relative">
        <View className="bg-[#032e1508] py-3 px-6 rounded-xl mb-2">
          <Text className="text-green-950 text-lg">Currency</Text>
          <Text className="text-green-950/40 text-sm">INR</Text>
        </View>
        <View className="bg-[#032e1508] py-3 px-6 rounded-xl mb-2">
          <Text className="text-green-950 text-lg">Currency</Text>
          <Text className="text-green-950/40 text-sm">INR</Text>
        </View>
        <View className="bg-[#032e1508] py-3 px-6 rounded-xl mb-2">
          <Text className="text-green-950 text-lg">Currency</Text>
          <Text className="text-green-950/40 text-sm">INR</Text>
        </View>
      </ScrollView>
      <View className="bg-[#032e1508] py-3 px-6 rounded-xl mx-10">
        <Text className="text-rose-500 text-lg">Sign Out</Text>
        <Text className="text-green-950/40 text-sm">{email}</Text>
      </View>
    </SafeAreaView>
  );
}
