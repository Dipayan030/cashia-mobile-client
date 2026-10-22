import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';
import Header from '@/components/Header';
import { Pressable } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { AreaChart } from '@/components/charts/area-chart';

export default function HomeScreen() {
  const [email, setEmail] = useState<string | undefined>('');
  const [ name, setName ] = useState<string | undefined>('');
  const [ avatar, setAvatar ] = useState<string | undefined>('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setEmail(user?.email);
      setName(user?.user_metadata?.full_name?.trim().split(' ')[0]);
      setAvatar(user?.user_metadata?.avatar_url);
    });
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) Alert.alert('Error signing out', error.message);
  };

  const data = [
    { x: 'Jan', y: 100, label: 'January' },
    { x: 'Feb', y: 120, label: 'February' },
    { x: 'Mar', y: 90, label: 'March' },
    { x: 'Apr', y: 140, label: 'April' },
  ];

  return (
    <SafeAreaView className="flex flex-col bg-indigo-50 justify-between px-6 py-6">
      <Header pageTitle='Dashboard' name={name} avatar={avatar}/>

      <View className='bg-lime-300 p-6 flex flex-col gap-8 rounded-xl mt-6'>
        <View className='flex flex-row justify-between'>
          <Text className='text-green-950/80 font-inter'>Current Balance</Text>
          <Pressable className='h-10 w-10 rounded-full bg-white flex justify-center items-center'>
            <Feather name="arrow-up-right" size={24} color="#032e15" />
          </Pressable>
        </View>
        <Text className='font-inter text-4xl'>$ 4500.00</Text>
      </View>
      <View className='p-6 bg-white flex justify-center items-center rounded-xl mt-6'>
        <AreaChart
          data={data}
          config={{
            height: 200,
            showGrid: true,
            showLabels: true,
            animated: true,
          }}
        />
      </View>
      {/* <TouchableOpacity activeOpacity={0.8} onPress={handleSignOut} className="w-full bg-red-500/10 border border-red-500/20 h-14 rounded-xl items-center justify-center active:bg-red-500/20">
        <Text className="text-red-400 font-semibold text-base">Sign Out of Account</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
}
